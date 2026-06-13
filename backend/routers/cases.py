"""
Cases Router — Legal case search
"""
from fastapi import APIRouter, Query, HTTPException, status
from typing import Optional
from models import CaseSearchResponse
import json
import os
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


def _load_legal_data() -> dict:
    """Load legal data from JSON file."""
    data_path = os.path.join(os.path.dirname(__file__), "..", "data", "legal_data.json")
    try:
        with open(data_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        logger.warning("legal_data.json not found, using empty data")
        return {"cases": []}
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding legal_data.json: {e}")
        return {"cases": []}


@router.get(
    "/cases/search",
    response_model=CaseSearchResponse,
    summary="Search Legal Cases",
    description="Search Pakistani case law by keywords, court, or legal area.",
)
async def search_cases(
    query: str = Query(..., min_length=2, description="Search query"),
    court: Optional[str] = Query(None, description="Filter by court name"),
    area: Optional[str] = Query(None, description="Filter by legal area"),
    year: Optional[str] = Query(None, description="Filter by year"),
    limit: int = Query(default=20, ge=1, le=100, description="Maximum results"),
    offset: int = Query(default=0, ge=0, description="Result offset for pagination"),
) -> CaseSearchResponse:
    """
    Search Pakistani case law.
    
    - **query**: Keywords to search for in case titles and summaries
    - **court**: Filter by court (e.g., Supreme Court, Lahore High Court)
    - **area**: Filter by legal area (e.g., Family Law, Criminal Law)
    - **year**: Filter by year
    - **limit**: Max number of results (default 20)
    - **offset**: Pagination offset
    """
    try:
        legal_data = _load_legal_data()
        all_cases = legal_data.get("cases", [])

        query_lower = query.lower()

        # Filter cases by query
        filtered = [
            case for case in all_cases
            if (
                query_lower in case.get("title", "").lower()
                or query_lower in case.get("summary", "").lower()
                or any(query_lower in kw.lower() for kw in case.get("keywords", []))
                or query_lower in case.get("area", "").lower()
            )
        ]

        # Apply court filter
        if court:
            filtered = [c for c in filtered if court.lower() in c.get("court", "").lower()]

        # Apply area filter
        if area:
            filtered = [c for c in filtered if area.lower() in c.get("area", "").lower()]

        # Apply year filter
        if year:
            filtered = [c for c in filtered if c.get("year") == year]

        # Paginate
        total = len(filtered)
        paginated = filtered[offset : offset + limit]

        return CaseSearchResponse(
            cases=paginated,
            total=total,
            query=query,
        )

    except Exception as e:
        logger.error(f"Case search error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to search cases. Please try again.",
        )


@router.get(
    "/cases/{case_id}",
    summary="Get Case by ID",
    description="Retrieve a specific case by its ID.",
)
async def get_case(case_id: str):
    """Retrieve a specific case by ID."""
    try:
        legal_data = _load_legal_data()
        all_cases = legal_data.get("cases", [])
        case = next((c for c in all_cases if c.get("id") == case_id), None)

        if not case:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Case with ID '{case_id}' not found",
            )

        return case

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get case error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve case.",
        )
