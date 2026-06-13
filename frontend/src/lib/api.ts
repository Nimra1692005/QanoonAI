import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
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
    decision: 'Allowed' | 'Dismissed' | 'Remanded' | 'Settled';
  }>;
  total: number;
  query: string;
}

// Chat API
export const sendChatMessage = async (
  question: string,
  language: 'en' | 'ur' = 'en'
): Promise<ChatResponse> => {
  const response = await apiClient.post<ChatResponse>('/api/chat', {
    question,
    language,
  });
  return response.data;
};

// Document Generation API
export const generateDocument = async (
  documentType: string,
  formData: Record<string, string>,
  language: 'en' | 'ur' = 'en'
): Promise<DocumentResponse> => {
  const response = await apiClient.post<DocumentResponse>('/api/documents/generate', {
    document_type: documentType,
    form_data: formData,
    language,
  });
  return response.data;
};

// Case Search API
export const searchCases = async (
  query: string,
  filters?: {
    court?: string;
    area?: string;
    year?: string;
  }
): Promise<CaseSearchResponse> => {
  const params = new URLSearchParams({ query });
  if (filters?.court) params.append('court', filters.court);
  if (filters?.area) params.append('area', filters.area);
  if (filters?.year) params.append('year', filters.year);

  const response = await apiClient.get<CaseSearchResponse>(
    `/api/cases/search?${params.toString()}`
  );
  return response.data;
};

// Health check
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health');
    return response.status === 200;
  } catch {
    return false;
  }
};

export default apiClient;
