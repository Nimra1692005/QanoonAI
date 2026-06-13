import LegalDocumentForm from '@/components/LegalDocumentForm';
import { FileText, Zap, Shield, Download } from 'lucide-react';

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black">Legal Document Generator</h1>
              <p className="text-blue-200 urdu-text text-base">قانونی دستاویزات بنائیں</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 text-xs text-blue-200 mt-2">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Generate in seconds</span>
            <span className="flex items-center gap-1"><Download className="w-3 h-3" /> Download instantly</span>
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Legally formatted</span>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <LegalDocumentForm />
      </div>
    </div>
  );
}
