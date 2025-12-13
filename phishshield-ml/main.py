from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import List, Optional
from services.analyzer import analyze_email

app = FastAPI(title="PhishShield AI Engine")

class EmailData(BaseModel):
    # Field names aligned with what your Node/React side sends
    from_email: str = Field("", alias="from_email")
    to: str = ""
    subject: str = ""
    body: str = ""
    mailedBy: str = ""
    signedBy: str = ""
    security: str = ""
    urls: List[str] = Field(default_factory=list)
    attachments: List[str] = Field(default_factory=list)

    class Config:
        allow_population_by_field_name = True
        extra = "ignore"  # ignore unexpected fields, no crash

@app.post("/scan")
def scan_email(data: EmailData):
    # Use native field names (from_email, subject, body, etc.)
    prepared = data.dict(by_alias=False)
    result = analyze_email(prepared)
    return result
