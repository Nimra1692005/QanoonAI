// All API calls go to Next.js API routes — no separate backend needed!

export interface ChatResponse {
  answer: string;
  language: string;
  sources?: string[];
}

export interface DocumentResponse {
  document: string;
  document_type: string;
  language: string;
}

export interface CaseSearchResponse {
  cases: Array<{
    id: string;
    title: string;
    court: string;
    year: string;
    citation: string;
    summary: string;
    keywords: string[];
    area?: string;
    decision: string;
  }>;
  total: number;
  query: string;
}

export const sendChatMessage = async (
  question: string,
  language: 'en' | 'ur' = 'en'
): Promise<ChatResponse> => {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, language }),
  });
  if (!res.ok) throw new Error(`Chat error: ${res.status}`);
  return res.json();
};

export const generateDocument = async (
  documentType: string,
  formData: Record<string, string>,
  language: 'en' | 'ur' = 'en'
): Promise<DocumentResponse> => {
  const res = await fetch('/api/documents/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ document_type: documentType, form_data: formData, language }),
  });
  if (!res.ok) throw new Error(`Document error: ${res.status}`);
  return res.json();
};

export const searchCases = async (
  query: string,
  filters?: { court?: string; area?: string; year?: string }
): Promise<CaseSearchResponse> => {
  const params = new URLSearchParams({ query });
  if (filters?.court) params.append('court', filters.court);
  if (filters?.area) params.append('area', filters.area);
  if (filters?.year) params.append('year', filters.year);

  const res = await fetch(`/api/cases/search?${params.toString()}`);
  if (!res.ok) throw new Error(`Search error: ${res.status}`);
  return res.json();
};
