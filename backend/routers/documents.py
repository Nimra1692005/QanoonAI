"""
Documents Router — Legal document generation
"""
from fastapi import APIRouter, HTTPException, status
from models import DocumentRequest, DocumentResponse
from services.document_service import DocumentService
import logging

logger = logging.getLogger(__name__)
router = APIRouter()
document_service = DocumentService()


@router.post(
    "/documents/generate",
    response_model=DocumentResponse,
    summary="Generate Legal Document",
    description="Generate a legal document based on the provided type and form data.",
)
async def generate_document(request: DocumentRequest) -> DocumentResponse:
    """
    Generate a legal document.
    
    Supported document types:
    - `rental_agreement` — کرایہ نامہ
    - `affidavit` — حلف نامہ
    - `power_of_attorney` — وکالت نامہ
    - `employment_contract` — ملازمت معاہدہ
    - `sale_deed` — فروخت نامہ
    """
    try:
        logger.info(f"Document generation — type={request.document_type}, lang={request.language}")
        document = await document_service.generate(
            document_type=request.document_type.value,
            form_data=request.form_data,
            language=request.language.value,
        )
        return DocumentResponse(
            document=document,
            document_type=request.document_type.value,
            language=request.language.value,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"Document generation error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate the document. Please try again.",
        )


@router.get(
    "/documents/types",
    summary="List Document Types",
    description="Get a list of all available document types.",
)
async def list_document_types():
    """Return all supported legal document types."""
    return {
        "document_types": [
            {
                "value": "rental_agreement",
                "label": "Rental Agreement",
                "label_urdu": "کرایہ نامہ",
                "description": "Tenancy agreement between landlord and tenant",
            },
            {
                "value": "affidavit",
                "label": "Affidavit",
                "label_urdu": "حلف نامہ",
                "description": "Sworn written statement of facts",
            },
            {
                "value": "power_of_attorney",
                "label": "Power of Attorney",
                "label_urdu": "وکالت نامہ",
                "description": "Authorize someone to act on your behalf",
            },
            {
                "value": "employment_contract",
                "label": "Employment Contract",
                "label_urdu": "ملازمت معاہدہ",
                "description": "Employment agreement between employer and employee",
            },
            {
                "value": "sale_deed",
                "label": "Sale Deed",
                "label_urdu": "فروخت نامہ",
                "description": "Property transfer agreement",
            },
        ]
    }
