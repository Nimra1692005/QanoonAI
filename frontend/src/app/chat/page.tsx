import ChatInterface from '@/components/ChatInterface';
import { MessageSquare, Zap, Shield, Globe } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black">AI Legal Chat</h1>
              <p className="text-green-200 urdu-text text-base">قانونی چیٹ</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 bg-green-600 px-3 py-1.5 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              AI Online
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-green-200">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Powered by Llama 3.3</span>
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Urdu & English</span>
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Pakistani Law Expert</span>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <ChatInterface />
      </div>
    </div>
  );
}
