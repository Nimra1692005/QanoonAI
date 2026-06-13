"""
Chat Router — Legal Q&A via AI
"""
from fastapi import APIRouter, HTTPException, status
from models import ChatRequest, ChatResponse
from services.ai_service import AIService
import logging

logger = logging.getLogger(__name__)
router = APIRouter()
ai_service = AIService()


@router.post(
    "/chat",
    response_model=ChatResponse,
    summary="Ask a Legal Question",
    description="Send a legal question and receive an AI-powered answer about Pakistani law.",
)
async def chat(request: ChatRequest) -> ChatResponse:
    """
    Ask any legal question about Pakistani law in Urdu or English.
    
    - **question**: Your legal question (3–2000 characters)
    - **language**: Response language — `en` (English) or `ur` (Urdu)
    """
    try:
        logger.info(f"Chat request — lang={request.language}, question_length={len(request.question)}")
        result = await ai_service.get_legal_answer(
            question=request.question,
            language=request.language.value,
        )
        return ChatResponse(
            answer=result["answer"],
            language=request.language.value,
            sources=result.get("sources"),
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"Chat endpoint error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process your legal question. Please try again.",
        )
