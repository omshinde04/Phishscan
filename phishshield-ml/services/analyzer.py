from typing import Dict, List
import re

from .models import phishing_classifier
from .scorer import calculate_risk
from .urlscan import scan_urls
from .attachments import scan_attachments


# Well-known brands commonly impersonated in phishing
KNOWN_BRANDS = [
    "paypal", "google", "microsoft", "apple", "amazon",
    "netflix", "facebook", "meta", "linkedin", "bank"
]


def _extract_basic_flags(text: str) -> List[str]:
    """
    Heuristic patterns for social engineering, credential theft,
    financial pressure, and reward-based scams.
    """
    flags: List[str] = []

    # Psychological manipulation
    social_engineering_patterns = [
        r"\burgent\b", r"\bimmediately\b", r"\bverify\b", r"\bupdate\b",
        r"\bpassword\b", r"\blogin\b",
        r"account (?:suspended|locked|limited)",
        r"\bunauthorized\b", r"\bunusual activity\b",
        r"\botp\b", r"\bone[- ]time password\b",
        r"payment (?:failed|required)", r"confirm your identity",
    ]
    if any(re.search(p, text, re.I) for p in social_engineering_patterns):
        flags.append("Content uses urgency or pressure tactics")

    # Fake rewards & giveaways
    reward_patterns = [
        r"\byou (?:have )?won\b", r"\bcongratulations\b",
        r"\bprize\b", r"\blottery\b", r"\breward\b", r"\bgift card\b",
    ]
    if any(re.search(p, text, re.I) for p in reward_patterns):
        flags.append("Content promises unexpected rewards")

    # Credential harvesting phrases
    credential_patterns = [
        r"login here", r"sign in", r"verify your account",
        r"confirm your password", r"reset your password",
    ]
    if any(re.search(p, text, re.I) for p in credential_patterns):
        flags.append("Email is asking for credentials")

    # Billing & invoice scams
    payment_patterns = [
        r"overdue invoice", r"pending payment", r"billing issue",
    ]
    if any(re.search(p, text, re.I) for p in payment_patterns):
        flags.append("Payment-related pressure detected")

    return flags


def _analyze_sender(sender: str, signed_by: str, mailed_by: str) -> Dict:
    """
    Analyze sender authenticity and detect impersonation / spoofing / typosquatting.
    """
    sender_flags: List[str] = []
    sender_score = "Safe"

    domain = ""
    if "@" in sender:
        domain = sender.split("@", 1)[1].lower().strip()

    signed = signed_by.lower() if signed_by else ""
    mailed = mailed_by.lower() if mailed_by else ""

    # 1) Domain mismatch checks
    if domain and signed and domain not in signed:
        sender_flags.append("Sender domain does not match signed-by domain")

    if domain and mailed and domain not in mailed:
        sender_flags.append("Sender domain does not match mailed-by domain")

    # 2) Missing DKIM/SPF header
    if not signed_by:
        sender_flags.append("Missing signed-by header (SPF/DKIM information)")

    # 3) Basic typosquatting detection (paypa1, g00gle)
    for brand in KNOWN_BRANDS:
        if brand in (sender.lower() + signed + mailed):
            if any(char.isdigit() for char in domain):
                sender_flags.append("Lookalike brand domain detected (typosquatting attack)")
                break

    # 4) Free email pretending to be brand (paypal@gmail.com)
    if domain.endswith(("gmail.com", "yahoo.com", "outlook.com")):
        for brand in KNOWN_BRANDS:
            if brand in sender.lower():
                sender_flags.append("Free email domain pretending to be official brand")
                break

    # 5) Stronger brand similarity match
    if domain:
        for brand in KNOWN_BRANDS:
            pattern = brand[0] + r"[a-z0-9_-]{1,15}" + brand[-1]
            if re.search(pattern, domain) and brand not in domain:
                sender_flags.append(f"Brand impersonation detected ({domain} looks like {brand})")
                break

    # Final sender classification
    if sender_flags:
        sender_score = "Suspicious"

    # Header technical validation
    header_fail = (
        not signed_by or
        any("fail" in h.lower() for h in [signed_by, mailed_by] if isinstance(h, str))
    )

    header_score = "Passed" if not header_fail else "Failed"

    return {
        "sender_flags": sender_flags,
        "sender_score": sender_score,
        "header_fail": header_fail,
        "header_score": header_score,
    }


def analyze_email(data: Dict) -> Dict:
    """
    Enterprise phishing detection engine.
    AI + NLP + URL intelligence + sender auth + attachment intelligence
    """

    subject = data.get("subject", "") or ""
    body = data.get("body", "") or ""
    sender = data.get("from_email", "") or ""
    mailed_by = data.get("mailedBy", "") or ""
    signed_by = data.get("signedBy", "") or ""
    security = data.get("security", "") or ""
    urls = data.get("urls", []) or []
    attachments = data.get("attachments", []) or []

    raw_text = f"{subject}\n\n{body}".strip()

    # === 1) AI CLASSIFICATION ===
    if not raw_text:
        ml_score = 0
        ml_label = "legitimate"
    else:
        pred = phishing_classifier(raw_text)[0]
        label = str(pred.get("label", "")).lower()
        score = float(pred.get("score", 0.0))

        is_phishing = "1" in label or "phish" in label
        ml_score = round(score * 100) if is_phishing else round((1 - score) * 100)
        ml_label = "phishing" if ml_score >= 50 else "legitimate"

    # === 2) NLP HEURISTICS ===
    flags = _extract_basic_flags(raw_text)

    if security:
        flags.append(f"Inbox security warning present: '{security}'")

    # === 3) SENDER / AUTH CHECK ===
    sender_info = _analyze_sender(sender, signed_by, mailed_by)
    flags.extend(sender_info["sender_flags"])

    # === 4) URL INTELLIGENCE ===
    url_info = scan_urls(urls, raw_text)
    flags.extend(url_info["issues"])

    # === 5) ATTACHMENT INTELLIGENCE ===
    attach_info = scan_attachments(attachments)
    flags.extend(attach_info["issues"])

    # === 6) HYBRID RISK ENGINE ===
    # Use the worst of URL and attachment risk as "link/attachment surface"
    combined_surface_risk = max(url_info["risk_score"], attach_info["risk_score"])

    risk = calculate_risk(
        ml_score=ml_score,
        url_risk_score=combined_surface_risk,
        flags=flags,
        header_fail=sender_info["header_fail"],
        has_security_warning=bool(security),
    )

    unique_flags = list(dict.fromkeys(flags))

    return {
        "risk": risk["level"],
        "score": risk["value"],
        "senderScore": sender_info["sender_score"],
        "linkScore": url_info["status"],
        "attachmentScore": attach_info["status"],

        # Strict security mode: suspicious sender = header fail
        "headerScore": "Failed" if sender_info["sender_score"] == "Suspicious" else sender_info["header_score"],

        "issues": unique_flags,
        "recommendation": risk["tip"],

        "model": {
            "name": "ealvaradob/bert-finetuned-phishing",
            "type": "BERT phishing classifier",
            "phishing_probability": ml_score,
            "raw_label": ml_label,
        },
        "urls": url_info,
        "attachments": attach_info,
    }
