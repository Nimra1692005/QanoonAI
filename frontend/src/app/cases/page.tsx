import CaseSearch from '@/components/CaseSearch';
import { Search, BookOpen, Landmark } from 'lucide-react';

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-violet-800 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black">Case Law Search</h1>
              <p className="text-purple-200 urdu-text text-base">مقدمات تلاش کریں</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 text-xs text-purple-200 mt-2">
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> 12+ legal categories</span>
            <span className="flex items-center gap-1"><Landmark className="w-3 h-3" /> Supreme Court to District Courts</span>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <CaseSearch />
      </div>
    </div>
  );
}
