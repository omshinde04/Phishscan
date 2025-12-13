from typing import List, Dict
from urllib.parse import urlparse
import re

SUSPICIOUS_TLDS = {"xyz", "top", "ru", "zip", "click", "link", "tk"}

BRAND_MISMATCH_KEYWORDS = [
    "paypal", "apple", "google", "microsoft", "amazon",
    "bank", "netflix", "meta", "facebook"
]


def scan_urls(urls: List[str], text: str = "") -> Dict:
    result = {
        "status": "Safe",
        "risk_score": 0,
        "issues": [],
        "details": [],
    }

    if not urls:
        return result

    danger_points = 0

    for url in urls:
        if not isinstance(url, str):
            continue

        url = url.strip()
        parsed = urlparse(url)
        domain = parsed.netloc.lower()

        if not domain:
            continue

        # Suspicious TLD
        for tld in SUSPICIOUS_TLDS:
            if domain.endswith("." + tld):
                msg = f"Suspicious domain extension: {domain}"
                result["issues"].append(msg)
                result["details"].append({"url": url, "issue": msg})
                danger_points += 25
                break

        # IP instead of domain
        if re.fullmatch(r"\d{1,3}(\.\d{1,3}){3}", domain):
            msg = "URL uses raw IP address instead of a domain name"
            result["issues"].append(msg)
            result["details"].append({"url": url, "issue": msg})
            danger_points += 35

        # @ redirection trick
        if "@" in url:
            msg = "URL contains '@' redirection trick"
            result["issues"].append(msg)
            result["details"].append({"url": url, "issue": msg})
            danger_points += 25

        # Overly long URL
        if len(url) > 120:
            msg = "Unusually long URL length"
            result["issues"].append(msg)
            result["details"].append({"url": url, "issue": msg})
            danger_points += 10

        # Credential harvesting detection
        if re.search(r"login|verify|secure|account", url.lower()):
            msg = "Potential credential harvesting page detected"
            result["issues"].append(msg)
            result["details"].append({"url": url, "issue": msg})
            danger_points += 25

        # Brand abuse detection
        for brand in BRAND_MISMATCH_KEYWORDS:
            if brand in url.lower():
                if brand not in domain or any(c.isdigit() for c in domain):
                    msg = f"Suspicious brand usage in URL: {brand}"
                    result["issues"].append(msg)
                    result["details"].append({"url": url, "issue": msg})
                    danger_points += 35
                    break

    risk_score = max(0, min(100, danger_points))
    result["risk_score"] = risk_score

    if risk_score >= 50:
        result["status"] = "Dangerous"
    elif risk_score >= 20:
        result["status"] = "Suspicious"

    return result
