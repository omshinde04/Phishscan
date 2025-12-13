from typing import List, Dict


def calculate_risk(
    ml_score: int,
    url_risk_score: int,
    flags: List[str],
    header_fail: bool,
    has_security_warning: bool,
) -> Dict:
    """
    Enterprise-grade hybrid phishing risk engine.

    Enforces:
    - Malware = HIGH RISK (no exceptions)
    - Impersonation = HIGH RISK
    - Header failure + suspicious content = HIGH RISK
    - Clean signals override weak ML confidence
    """

    # -------------------------------------------------
    # 🚨 HARD OVERRIDE ZONE (NON-NEGOTIABLE SECURITY)
    # -------------------------------------------------
    critical_indicators = [
        "Dangerous executable file type",
        "Double file extension detected",
        "VirusTotal reports malicious",
        "ClamAV detected malware",
        "Brand impersonation detected",
        "credential harvesting",
        "malicious attachment",
    ]

    for flag in flags:
        for keyword in critical_indicators:
            if keyword.lower() in flag.lower():
                return {
                    "level": "High",
                    "value": 90,
                    "tip": (
                        "Critical security threat detected (malware or impersonation). "
                        "Delete this email immediately. Do not open files or click links."
                    ),
                }

    # Strong auth failure + AI suspicion
    if header_fail and ml_score >= 40:
        return {
            "level": "High",
            "value": 85,
            "tip": (
                "Authentication failure combined with suspicious content. "
                "Delete this email and report to security."
            ),
        }

    # -------------------------------------------------
    # ✅ TRUST OVERRIDE (ANTI–FALSE POSITIVE ENGINE)
    # -------------------------------------------------
    # Clean email overrides AI false alarm
    if (
        ml_score < 85
        and not flags
        and not header_fail
        and url_risk_score == 0
        and not has_security_warning
    ):
        return {
            "level": "Low",
            "value": max(10, ml_score - 35),
            "tip": "No threat detected. This appears to be a legitimate email.",
        }

    # -------------------------------------------------
    # ✅ CORE HYBRID SCORING MODEL (WEIGHTED)
    # -------------------------------------------------
    base = (
        (ml_score * 0.45) +              # AI model weight
        (url_risk_score * 0.35) +        # URLs / attachments
        (min(len(flags), 6) * 4) +       # Heuristics (cap)
        (12 if header_fail else 0) +     # Header failure
        (8 if has_security_warning else 0)
    )

    value = max(0, min(100, round(base)))

    # -------------------------------------------------
    # ✅ DECISION ENGINE
    # -------------------------------------------------
    if value >= 75:
        level = "High"
        tip = (
            "Delete immediately. Do not click links or open attachments. "
            "Report this email to your IT/security team."
        )
    elif value >= 45:
        level = "Medium"
        tip = (
            "This email shows warning signs. "
            "Verify sender before taking any action."
        )
    else:
        level = "Low"
        tip = (
            "No strong phishing indicators detected. "
            "Still remain cautious with unexpected messages."
        )

    return {
        "level": level,
        "value": value,
        "tip": tip,
    }
