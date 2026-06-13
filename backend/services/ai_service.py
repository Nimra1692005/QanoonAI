"""
AI Service — Groq integration for Pakistani legal Q&A
Using: llama-3.3-70b-versatile (Free & Fast)
"""
import logging
from config import settings

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────────────
# System Prompts
# ─────────────────────────────────────────────────────────

SYSTEM_PROMPT_EN = """You are QanoonAI, an expert AI legal assistant specializing in Pakistani law.
You have comprehensive knowledge of:

1. The Constitution of Pakistan (1973)
2. Pakistan Penal Code (PPC)
3. Code of Criminal Procedure (CrPC)
4. Civil Procedure Code (CPC)
5. Muslim Family Laws Ordinance (1961)
6. Transfer of Property Act
7. Contract Act
8. Labour laws (Industrial Relations Act, Workmen's Compensation Act, etc.)
9. Consumer Protection laws
10. Punjab, Sindh, KPK, and Balochistan provincial laws
11. Prevention of Electronic Crimes Act (PECA 2016)
12. Cyber Crime laws

GUIDELINES:
- Provide clear, accurate, and helpful legal information
- Always cite relevant laws, sections, and articles when applicable
- Mention if something requires consulting a qualified lawyer
- Be culturally sensitive to Pakistani context
- Structure your answers with clear sections when the topic is complex
- Mention relevant court precedents if applicable
- Keep responses concise but comprehensive (200-500 words)
- End with a brief disclaimer about seeking professional legal advice

You must NOT:
- Provide advice on illegal activities
- Make definitive legal judgments (only a court can do that)
- Guarantee outcomes of legal cases
"""

SYSTEM_PROMPT_UR = """آپ QanoonAI ہیں، پاکستانی قانون کے ماہر AI قانونی معاون۔
آپ کو ان موضوعات پر جامع علم ہے:

۱. آئین پاکستان (۱۹۷۳)
۲. پاکستان پینل کوڈ
۳. ضابطہ فوجداری
۴. ضابطہ دیوانی
۵. مسلم فیملی لاز آرڈیننس (۱۹۶۱)
۶. قانون انتقال جائیداد
۷. قانون معاہدات
۸. محنت کے قوانین
۹. صارف تحفظ قوانین
۱۰. سائبر جرائم قانون (PECA 2016)

اہم ہدایات:
- واضح، درست اور مددگار قانونی معلومات فراہم کریں
- متعلقہ قوانین اور دفعات کا حوالہ دیں
- اگر کسی مستند وکیل سے مشورہ ضروری ہو تو بتائیں
- پاکستانی ثقافتی پس منظر کا خیال رکھیں
- جواب مختصر مگر جامع رکھیں (200-500 الفاظ)
- آخر میں پیشہ ور قانونی مشورے کی ضرورت کا ذکر کریں
"""

FALLBACK_RESPONSE_EN = """I'm sorry, I'm currently unable to connect to the AI service. Please ensure:

1. The **GROQ_API_KEY** is set in your backend `.env` file
2. The backend server is running (`uvicorn main:app --reload`)
3. You have a valid Groq API key from [console.groq.com](https://console.groq.com)

**General Legal Resources for Pakistan:**
- **Supreme Court of Pakistan**: [supremecourt.gov.pk](https://supremecourt.gov.pk)
- **Pakistan Law Site**: [pakistanlawsite.com](http://pakistanlawsite.com)
- **Punjab Bar Council**: For finding qualified lawyers

*Please set up the AI service for personalized legal guidance.*
"""

FALLBACK_RESPONSE_UR = """معذرت، میں ابھی AI سروس سے منسلک نہیں ہو پا رہا۔ براہ کرم یقینی بنائیں:

۱. `.env` فائل میں **GROQ_API_KEY** موجود ہو
۲. بیک اینڈ سرور چل رہا ہو
۳. آپ کے پاس درست Groq API کی ہو (console.groq.com)

**پاکستان میں قانونی مدد کے لیے:**
- سپریم کورٹ آف پاکستان: supremecourt.gov.pk
- پاکستان بار کونسل: مستند وکیل تلاش کرنے کے لیے
"""


# ─────────────────────────────────────────────────────────
# AI Service Class
# ─────────────────────────────────────────────────────────

class AIService:
    """Groq-powered legal assistant service."""

    def __init__(self):
        self._client = None

    def _get_client(self):
        """Lazy initialization of Groq client."""
        if self._client is None:
            if not settings.GROQ_API_KEY:
                logger.warning("GROQ_API_KEY is not set in .env file")
                return None
            try:
                from groq import AsyncGroq
                self._client = AsyncGroq(api_key=settings.GROQ_API_KEY)
                logger.info("Groq client initialized successfully")
            except ImportError:
                logger.error("groq package not installed. Run: pip install groq")
                return None
            except Exception as e:
                logger.error(f"Failed to initialize Groq client: {e}")
                return None
        return self._client

    async def get_legal_answer(self, question: str, language: str = "en") -> dict:
        """
        Get an AI-powered answer to a legal question.

        Args:
            question: The legal question
            language: 'en' for English, 'ur' for Urdu

        Returns:
            dict with 'answer' and 'sources' keys
        """
        client = self._get_client()

        if client is None:
            return {
                "answer": FALLBACK_RESPONSE_UR if language == "ur" else FALLBACK_RESPONSE_EN,
                "sources": [],
            }

        try:
            system_prompt = SYSTEM_PROMPT_UR if language == "ur" else SYSTEM_PROMPT_EN

            if language == "ur":
                lang_instruction = "\n\nہمیشہ اردو میں جواب دیں۔ قانونی اصطلاحات کے ساتھ انگریزی بھی لکھیں۔"
            else:
                lang_instruction = "\n\nAlways respond in English. Include Urdu translations of key legal terms where helpful."

            messages = [
                {"role": "system", "content": system_prompt + lang_instruction},
                {"role": "user", "content": question},
            ]

            response = await client.chat.completions.create(
                model=settings.GROQ_MODEL,
                messages=messages,
                max_tokens=settings.AI_MAX_TOKENS,
                temperature=settings.AI_TEMPERATURE,
            )

            answer = response.choices[0].message.content or "No response generated."
            logger.info(f"Groq response generated — tokens: {response.usage.total_tokens if response.usage else 'unknown'}")

            return {"answer": answer, "sources": []}

        except Exception as e:
            logger.error(f"Groq API error: {e}", exc_info=True)
            error_msg = f"AI error: {str(e)[:200]}\n\n"
            error_msg += FALLBACK_RESPONSE_UR if language == "ur" else FALLBACK_RESPONSE_EN
            return {"answer": error_msg, "sources": []}
