from transformers import pipeline

phishing_classifier = pipeline(
    "text-classification",
    model="ealvaradob/bert-finetuned-phishing",
    truncation=True,
    max_length=512
)
