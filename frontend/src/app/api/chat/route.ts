import { NextRequest, NextResponse } from 'next/server';

// Dynamic import to avoid Edge runtime issues
async function getGroqClient(apiKey: string) {
  const { default: Groq } = await import('groq-sdk');
  return new Groq({ apiKey });
}

const SYSTEM_PROMPT_EN = `You are QanoonAI, an expert AI legal assistant specializing in Pakistani law.
You have comprehensive knowledge of:
1. The Constitution of Pakistan (1973)
2. Pakistan Penal Code (PPC)
3. Code of Criminal Procedure (CrPC)
4. Muslim Family Laws Ordinance (1961)
5. Transfer of Property Act
6. Labour laws (Industrial Relations Act)
7. Consumer Protection laws
8. Prevention of Electronic Crimes Act (PECA 2016)

GUIDELINES:
- Provide clear, accurate legal information
- Cite relevant laws, sections, and articles
- Be culturally sensitive to Pakistani context
- Keep responses concise but comprehensive (200-400 words)
- End with a brief disclaimer about seeking professional legal advice
- Do NOT provide advice on illegal activities`;

const SYSTEM_PROMPT_UR = `آپ QanoonAI ہیں، پاکستانی قانون کے ماہر AI قانونی معاون۔
آپ کو ان موضوعات پر جامع علم ہے:
۱. آئین پاکستان (۱۹۷۳)، ۲. پاکستان پینل کوڈ، ۳. ضابطہ فوجداری
۴. مسلم فیملی لاز آرڈیننس، ۵. قانون انتقال جائیداد، ۶. محنت کے قوانین

ہمیشہ اردو میں جواب دیں۔ متعلقہ قوانین اور دفعات کا حوالہ دیں۔`;

export async function POST(req: NextRequest) {
  try {
    const { question, language } = await req.json();

    if (!question || question.trim().length < 3) {
      return NextResponse.json({ error: 'Question too short' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    const groq = await getGroqClient(apiKey);

    const systemPrompt = language === 'ur' ? SYSTEM_PROMPT_UR : SYSTEM_PROMPT_EN;
    const langInstruction = language === 'ur'
      ? '\n\nہمیشہ اردو میں جواب دیں۔ قانونی اصطلاحات کے ساتھ انگریزی بھی لکھیں۔'
      : '\n\nAlways respond in English. Include Urdu translations of key legal terms where helpful.';

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt + langInstruction },
        { role: 'user', content: question },
      ],
      max_tokens: 1500,
      temperature: 0.3,
    });

    const answer = completion.choices[0]?.message?.content || 'No response generated.';

    return NextResponse.json({ answer, language: language || 'en', sources: [] });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      answer: `Error: ${error.message || 'Something went wrong'}. Please try again.`,
      language: 'en',
      sources: [],
    }, { status: 500 });
  }
}
