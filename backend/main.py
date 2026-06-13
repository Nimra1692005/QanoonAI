"""
QanoonAI FastAPI Backend
Pakistani Legal AI Assistant
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import logging
from datetime import datetime
from contextlib import asynccontextmanager

from config import settings
from routers import chat, documents, cases

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info(f"QanoonAI API starting — {settings.APP_ENV} mode")
    if not settings.GROQ_API_KEY:
        logger.warning("GROQ_API_KEY not set — AI will use fallback responses")
    yield
    # Shutdown
    logger.info("QanoonAI API shutting down")


app = FastAPI(
    title="QanoonAI API",
    description="Pakistani Legal AI Assistant — Helping citizens understand Pakistani law in Urdu and English.",
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(documents.router, prefix="/api", tags=["Documents"])
app.include_router(cases.router, prefix="/api", tags=["Cases"])


@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to QanoonAI — Pakistani Legal AI Assistant",
        "message_urdu": "QanoonAI میں خوش آمدید — آپ کا قانونی معاون",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "status": "running",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": settings.APP_VERSION,
        "environment": settings.APP_ENV,
        "groq_configured": bool(settings.GROQ_API_KEY),
    }


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "message": str(exc)},
    )


if __name__ == "__main__":
    uvicorn.run("main:app", host=settings.APP_HOST, port=settings.APP_PORT, reload=True)
