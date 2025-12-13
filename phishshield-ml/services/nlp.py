from transformers import pipeline
from services.scorer import calculate_risk
from services.urlscan import scan_urls
import re

clf = pipeline("text-classification", model="bhadresh-savani/distilbert-base-uncased-emotion")

from transformers import pipeline
from services.scorer import calculate_risk
from services.urlscan import scan_urls
import re

clf = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

def analyze_email(data):

    text = f"{data.get('subject','')} {data.get('body','')}"

    ai = clf(text)[0]
    score = round(ai["score"] * 100)

    flags = []

    # Psychological triggers
    if re.search(r"urgent|verify|login|password|bank|alert", text, re.I):
        flags.append("Psychological pressure detected")

    # Sender mismatch
    if data.get("from") and data.get("signedBy"):
        sender_domain = data["from"].split("@")[-1]
        if sender_domain not in data["signedBy"]:
            flags.append("Sender domain mismatch")

    # URL analysis
    url_list = []
    if data.get("url"):
        url_list.append(data["url"])
    url_result = scan_urls(url_list)

    linkScore = url_result.get("status","Safe")

    if linkScore != "Safe":
        for i in url_result.get("issues", []):
            flags.append(i)

    # Risk engine
    header_fail = "Failed" in data.get("signedBy", "") or data.get("signedBy") == ""
    risk = calculate_risk(score, flags, header_fail)


    return {
        "risk": risk["level"],
        "score": risk["value"],
        "senderScore": "Suspicious" if "mismatch" in str(flags).lower() else "Safe",
        "linkScore": linkScore,
        "attachmentScore": "Not found",
        "headerScore": "Passed" if data.get("signedBy") else "Failed",
        "issues": flags,
        "recommendation": risk["tip"]
    }
