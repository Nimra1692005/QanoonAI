"""
QanoonAI Data Models
"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from enum import Enum


class Language(str, Enum):
    ENGLISH = "en"
    URDU = "ur"


class DocumentType(str, Enum):
    RENTAL_AGREEMENT = "rental_agreement"
    AFFIDAVIT = "affidavit"
    POWER_OF_ATTORNEY = "power_of_attorney"
    EMPLOYMENT_CONTRACT = "employment_contract"
    SALE_DEED = "sale_deed"


# ── Chat Models ──────────────────────────────
class ChatRequest(BaseModel):
    question: str = Field(..., min_length=3, max_length=2000)
    language: Language = Field(default=Language.ENGLISH)


class ChatResponse(BaseModel):
    answer: str
    language: str
    sources: Optional[List[str]] = None


# ── Document Models ───────────────────────────
class DocumentRequest(BaseModel):
    document_type: DocumentType
    form_data: Dict[str, Any]
    language: Language = Field(default=Language.ENGLISH)


class DocumentResponse(BaseModel):
    document: str
    document_type: str
    language: str


# ── Case Models ───────────────────────────────
class LegalCase(BaseModel):
    id: str
    title: str
    court: str
    year: str
    citation: str
    summary: str
    keywords: List[str]
    area: Optional[str] = None
    decision: Optional[str] = None


class CaseSearchResponse(BaseModel):
    cases: List[LegalCase]
    total: int
    query: str
