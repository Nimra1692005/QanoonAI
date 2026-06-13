'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Send, Bot, User, RotateCcw, Copy, ThumbsUp, ThumbsDown,
  Globe, Loader2, ChevronDown, Sparkles, BookOpen, CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Suspense } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  liked?: boolean;
}

const suggestedQuestions = [
  { en: 'What are my rights if police arrest me?', ur: 'پولیس گرفتار کرے تو میرے کیا حقوق ہیں؟', tag: 'Criminal' },
  { en: 'How to file for divorce in Pakistan?', ur: 'پاکستان میں طلاق کیسے لیں؟', tag: 'Family' },
  { en: 'What is the process to register an FIR?', ur: 'ایف آئی آر کیسے درج کروائیں؟', tag: 'Criminal' },
  { en: 'Tenant rights — can landlord evict me without notice?', ur: 'کیا مالک مکان بغیر نوٹس کے نکال سکتا ہے؟', tag: 'Property' },
  { en: 'What is the minimum wage in Pakistan 2024?', ur: 'پاکستان میں کم از کم اجرت کتنی ہے؟', tag: 'Labour' },
  { en: 'How to get a power of attorney made?', ur: 'وکالت نامہ کیسے بنوائیں؟', tag: 'Civil' },
];

const tagColors: Record<string, string> = {
  Criminal: 'bg-red-100 text-red-700',
  Family: 'bg-pink-100 text-pink-700',
  Property: 'bg-blue-100 text-blue-700',
  Labour: 'bg-orange-100 text-orange-700',
  Civil: 'bg-purple-100 text-purple-700',
};

function ChatContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Use Next.js API routes — no separate backend needed
  const API_URL = '';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  // Pre-fill from URL param
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) { setInput(q); setShowSuggestions(false); }
  }, [searchParams]);

  const sendMessage = useCallback(async (text?: string) => {
    const question = (text || input).trim();
    if (!question || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setShowSuggestions(false);

    try {
      const res = await fetch(`/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, language: lang }),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer || 'No response received.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Unable to connect to the AI service. Please ensure the backend is running.\n\nRun: `cd backend && uvicorn main:app --reload`',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
      toast.error('Connection error. Is the backend running?');
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [input, lang, loading, API_URL]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!');
  };

  const clearChat = () => {
    setMessages([]);
    setShowSuggestions(true);
    toast('Chat cleared', { icon: '🗑️' });
  };

  const likeMessage = (id: string, liked: boolean) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, liked } : m));
    toast(liked ? 'Thanks for the feedback! 👍' : 'Thanks for the feedback!', { icon: liked ? '👍' : '👎' });
  };

  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^## (.*)/gm, '<h2 class="text-base font-bold text-green-800 mt-3 mb-1">$1</h2>')
      .replace(/^### (.*)/gm, '<h3 class="text-sm font-bold text-gray-800 mt-2 mb-1">$1</h3>')
      .replace(/^- (.*)/gm, '<li class="ml-4 list-disc text-sm">$1</li>')
      .replace(/^\d+\. (.*)/gm, '<li class="ml-4 list-decimal text-sm">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-2">')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-[75vh] overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-gray-700">Legal Assistant</span>
          <span className="text-xs text-gray-400">({messages.length} messages)</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={() => setLang(l => l === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-green-400 text-gray-600 hover:text-green-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === 'en' ? 'اردو میں پوچھیں' : 'Ask in English'}
          </button>
          {messages.length > 0 && (
            <button onClick={clearChat} className="flex items-center gap-1 text-gray-400 hover:text-red-500 px-2 py-1.5 rounded-xl text-xs transition-colors">
              <RotateCcw className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Welcome */}
        {messages.length === 0 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-1">QanoonAI Legal Assistant</h3>
            <p className="text-gray-400 text-sm mb-1">Ask any legal question about Pakistani law</p>
            <p className="text-gray-300 text-sm urdu-text">پاکستانی قانون کے بارے میں کوئی بھی سوال پوچھیں</p>
          </div>
        )}

        {/* Suggestions */}
        {showSuggestions && messages.length === 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Suggested Questions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(lang === 'en' ? q.en : q.ur)}
                  className="text-left bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-xl p-3.5 transition-all group"
                >
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColors[q.tag]} mb-2 inline-block`}>{q.tag}</span>
                  <p className={`text-sm text-gray-700 group-hover:text-green-800 ${lang === 'ur' ? 'urdu-text' : ''}`}>
                    {lang === 'en' ? q.en : q.ur}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message list */}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
              msg.role === 'user' ? 'bg-green-700' : 'bg-gray-100'
            }`}>
              {msg.role === 'user'
                ? <User className="w-4 h-4 text-white" />
                : <Bot className="w-4 h-4 text-green-700" />
              }
            </div>

            {/* Bubble */}
            <div className={`flex flex-col gap-1.5 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}>
                {msg.role === 'assistant' ? (
                  <div
                    className="prose-legal text-sm"
                    dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                  />
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
              <div className={`flex items-center gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="text-xs text-gray-300">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.role === 'assistant' && (
                  <>
                    <button onClick={() => copyMessage(msg.content)} className="text-gray-300 hover:text-green-600 transition-colors" title="Copy">
                      <Copy className="w-3 h-3" />
                    </button>
                    <button onClick={() => likeMessage(msg.id, true)} className={`transition-colors ${msg.liked === true ? 'text-green-500' : 'text-gray-300 hover:text-green-500'}`} title="Helpful">
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button onClick={() => likeMessage(msg.id, false)} className={`transition-colors ${msg.liked === false ? 'text-red-400' : 'text-gray-300 hover:text-red-400'}`} title="Not helpful">
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-green-700" />
            </div>
            <div className="chat-bubble-assistant flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="loading-dot w-2 h-2 bg-green-400 rounded-full"></div>
                ))}
              </div>
              <span className="text-xs text-gray-400">Analyzing Pakistani law...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-4 bg-gray-50">
        {lang === 'ur' && (
          <p className="text-xs text-green-600 urdu-text mb-2 text-right">اردو میں لکھیں — جواب بھی اردو میں آئے گا</p>
        )}
        <div className="flex gap-3 items-end">
          <div className="flex-1 bg-white border-2 border-gray-200 focus-within:border-green-500 rounded-2xl transition-colors overflow-hidden">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={lang === 'en' ? 'Ask your legal question...' : 'اپنا قانونی سوال پوچھیں...'}
              className={`w-full px-4 py-3 text-sm resize-none focus:outline-none bg-transparent ${lang === 'ur' ? 'urdu-input' : ''}`}
              rows={2}
              dir={lang === 'ur' ? 'rtl' : 'ltr'}
              disabled={loading}
            />
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="flex-shrink-0 w-12 h-12 bg-green-700 hover:bg-green-800 disabled:bg-gray-200 text-white rounded-2xl flex items-center justify-center transition-all disabled:cursor-not-allowed active:scale-95 shadow-md"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-xs text-gray-300 mt-2 text-center">Press Enter to send • Shift+Enter for new line • For legal advice, consult a qualified lawyer</p>
      </div>
    </div>
  );
}

export default function ChatInterface() {
  return (
    <Suspense fallback={<div className="bg-white rounded-3xl h-[75vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>}>
      <ChatContent />
    </Suspense>
  );
}
