'use client';

import { useState } from 'react';
import { FileText, Download, Loader2, CheckCircle, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { generateDocument } from '@/lib/api';
import toast from 'react-hot-toast';

type DocumentType = 'rental_agreement' | 'affidavit' | 'power_of_attorney' | 'employment_contract' | 'sale_deed';

interface DocumentOption {
  value: DocumentType;
  label: string;
  labelUrdu: string;
  description: string;
  fields: FieldDefinition[];
}

interface FieldDefinition {
  name: string;
  label: string;
  labelUrdu: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'select';
  placeholder: string;
  options?: string[];
  required: boolean;
}

const documentOptions: DocumentOption[] = [
  {
    value: 'rental_agreement',
    label: 'Rental Agreement',
    labelUrdu: 'کرایہ نامہ',
    description: 'Tenancy agreement between landlord and tenant',
    fields: [
      { name: 'landlord_name', label: 'Landlord Name', labelUrdu: 'مالک مکان کا نام', type: 'text', placeholder: 'Full name of landlord', required: true },
      { name: 'tenant_name', label: 'Tenant Name', labelUrdu: 'کرایہ دار کا نام', type: 'text', placeholder: 'Full name of tenant', required: true },
      { name: 'property_address', label: 'Property Address', labelUrdu: 'جائیداد کا پتہ', type: 'textarea', placeholder: 'Complete address of the property', required: true },
      { name: 'monthly_rent', label: 'Monthly Rent (PKR)', labelUrdu: 'ماہانہ کرایہ', type: 'number', placeholder: '25000', required: true },
      { name: 'duration_months', label: 'Duration (Months)', labelUrdu: 'مدت (مہینے)', type: 'number', placeholder: '12', required: true },
      { name: 'start_date', label: 'Start Date', labelUrdu: 'شروع کی تاریخ', type: 'date', placeholder: '', required: true },
      { name: 'security_deposit', label: 'Security Deposit (PKR)', labelUrdu: 'سیکیورٹی ڈپازٹ', type: 'number', placeholder: '50000', required: false },
      { name: 'city', label: 'City', labelUrdu: 'شہر', type: 'text', placeholder: 'Lahore', required: true },
    ],
  },
  {
    value: 'affidavit',
    label: 'Affidavit',
    labelUrdu: 'حلف نامہ',
    description: 'Sworn written statement of facts',
    fields: [
      { name: 'deponent_name', label: 'Deponent Name', labelUrdu: 'حلف اٹھانے والے کا نام', type: 'text', placeholder: 'Your full name', required: true },
      { name: 'father_name', label: "Father's Name", labelUrdu: 'والد کا نام', type: 'text', placeholder: "Father's full name", required: true },
      { name: 'cnic', label: 'CNIC Number', labelUrdu: 'شناختی کارڈ نمبر', type: 'text', placeholder: '35201-1234567-8', required: true },
      { name: 'address', label: 'Residential Address', labelUrdu: 'رہائشی پتہ', type: 'textarea', placeholder: 'Full address', required: true },
      { name: 'purpose', label: 'Purpose of Affidavit', labelUrdu: 'حلف نامے کا مقصد', type: 'textarea', placeholder: 'Describe the purpose...', required: true },
      { name: 'city', label: 'City', labelUrdu: 'شہر', type: 'text', placeholder: 'Karachi', required: true },
    ],
  },
  {
    value: 'power_of_attorney',
    label: 'Power of Attorney',
    labelUrdu: 'وکالت نامہ',
    description: 'Authorize someone to act on your behalf',
    fields: [
      { name: 'grantor_name', label: 'Grantor Name (Principal)', labelUrdu: 'دینے والے کا نام', type: 'text', placeholder: 'Your full name', required: true },
      { name: 'grantor_cnic', label: 'Grantor CNIC', labelUrdu: 'دینے والے کا شناختی کارڈ', type: 'text', placeholder: '35201-1234567-8', required: true },
      { name: 'attorney_name', label: 'Attorney Name (Agent)', labelUrdu: 'وکیل کا نام', type: 'text', placeholder: "Attorney's full name", required: true },
      { name: 'attorney_cnic', label: 'Attorney CNIC', labelUrdu: 'وکیل کا شناختی کارڈ', type: 'text', placeholder: '35201-7654321-0', required: true },
      { name: 'powers_granted', label: 'Powers Granted', labelUrdu: 'دیے گئے اختیارات', type: 'textarea', placeholder: 'Describe the powers being granted...', required: true },
      { name: 'city', label: 'City', labelUrdu: 'شہر', type: 'text', placeholder: 'Islamabad', required: true },
    ],
  },
  {
    value: 'employment_contract',
    label: 'Employment Contract',
    labelUrdu: 'ملازمت معاہدہ',
    description: 'Employment agreement between employer and employee',
    fields: [
      { name: 'employer_name', label: 'Employer / Company Name', labelUrdu: 'آجر / کمپنی کا نام', type: 'text', placeholder: 'Company or employer name', required: true },
      { name: 'employee_name', label: 'Employee Name', labelUrdu: 'ملازم کا نام', type: 'text', placeholder: "Employee's full name", required: true },
      { name: 'designation', label: 'Job Title / Designation', labelUrdu: 'عہدہ', type: 'text', placeholder: 'Software Engineer', required: true },
      { name: 'monthly_salary', label: 'Monthly Salary (PKR)', labelUrdu: 'ماہانہ تنخواہ', type: 'number', placeholder: '80000', required: true },
      { name: 'start_date', label: 'Start Date', labelUrdu: 'آغاز کی تاریخ', type: 'date', placeholder: '', required: true },
      { name: 'city', label: 'City', labelUrdu: 'شہر', type: 'text', placeholder: 'Lahore', required: true },
    ],
  },
  {
    value: 'sale_deed',
    label: 'Sale Deed',
    labelUrdu: 'فروخت نامہ',
    description: 'Property transfer agreement',
    fields: [
      { name: 'seller_name', label: 'Seller Name', labelUrdu: 'فروخت کنندہ کا نام', type: 'text', placeholder: "Seller's full name", required: true },
      { name: 'buyer_name', label: 'Buyer Name', labelUrdu: 'خریدار کا نام', type: 'text', placeholder: "Buyer's full name", required: true },
      { name: 'property_description', label: 'Property Description', labelUrdu: 'جائیداد کی تفصیل', type: 'textarea', placeholder: 'Plot No, Street, Block, City...', required: true },
      { name: 'sale_price', label: 'Sale Price (PKR)', labelUrdu: 'فروخت قیمت', type: 'number', placeholder: '5000000', required: true },
      { name: 'city', label: 'City', labelUrdu: 'شہر', type: 'text', placeholder: 'Lahore', required: true },
    ],
  },
];

export default function LegalDocumentForm() {
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<'en' | 'ur'>('en');

  const selectedDoc = documentOptions.find(d => d.value === selectedType);

  const handleFieldChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!selectedType || !selectedDoc) return;

    // Validate required fields
    const missingFields = selectedDoc.fields
      .filter(f => f.required && !formData[f.name]?.trim())
      .map(f => f.label);

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    try {
      const result = await generateDocument(selectedType, formData, lang);
      setGeneratedDoc(result.document);
      toast.success('Document generated successfully!');
    } catch {
      toast.error('Failed to generate document. Please check if the backend is running.');
      // Show a sample document for demo
      setGeneratedDoc(`SAMPLE ${selectedDoc.label.toUpperCase()}\n\nThis is a sample ${selectedDoc.label} document.\n\nNote: Connect the backend server to generate real documents.\n\n[Document content would appear here with your filled details]`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedDoc) return;
    const blob = new Blob([generatedDoc], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedType}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Document downloaded!');
  };

  const handleReset = () => {
    setSelectedType(null);
    setFormData({});
    setGeneratedDoc(null);
  };

  return (
    <div className="space-y-6">
      {/* Document Type Selection */}
      {!generatedDoc && (
        <>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Select Document Type</h2>
            <p className="text-sm text-gray-500 urdu-text">دستاویز کی قسم منتخب کریں</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentOptions.map(doc => (
              <button
                key={doc.value}
                onClick={() => { setSelectedType(doc.value); setFormData({}); setGeneratedDoc(null); }}
                className={clsx(
                  'text-left p-5 rounded-2xl border-2 transition-all duration-200',
                  selectedType === doc.value
                    ? 'border-green-600 bg-green-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-sm'
                )}
              >
                <FileText className={clsx('w-6 h-6 mb-3', selectedType === doc.value ? 'text-green-700' : 'text-gray-400')} />
                <h3 className="font-semibold text-gray-900">{doc.label}</h3>
                <p className="text-green-700 text-sm urdu-text">{doc.labelUrdu}</p>
                <p className="text-gray-500 text-xs mt-1">{doc.description}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Form */}
      {selectedDoc && !generatedDoc && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedDoc.label}</h2>
              <p className="text-green-700 urdu-text">{selectedDoc.labelUrdu}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang(prev => prev === 'en' ? 'ur' : 'en')}
                className="text-sm bg-gray-100 hover:bg-green-50 text-gray-600 hover:text-green-700 px-3 py-1.5 rounded-lg transition-colors border"
              >
                {lang === 'en' ? 'اردو' : 'English'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {selectedDoc.fields.map(field => (
              <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'en' ? field.label : field.labelUrdu}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    className={clsx(
                      'input-field resize-none h-20',
                      lang === 'ur' ? 'urdu-text text-right' : ''
                    )}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={e => handleFieldChange(field.name, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <input
                    type={field.type}
                    className={clsx(
                      'input-field',
                      lang === 'ur' ? 'urdu-text text-right' : ''
                    )}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={e => handleFieldChange(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white font-semibold py-3 px-8 rounded-2xl transition-colors shadow-md"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
              ) : (
                <><FileText className="w-5 h-5" /> Generate Document</>
              )}
            </button>
            <button
              onClick={() => { setSelectedType(null); setFormData({}); }}
              className="text-gray-600 hover:text-gray-900 font-medium py-3 px-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Generated Document */}
      {generatedDoc && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-green-50">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Document Generated Successfully</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={handleReset}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-xl text-sm border border-gray-200 hover:border-gray-300 transition-colors"
              >
                New Document
              </button>
            </div>
          </div>
          <div className="p-6">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 bg-gray-50 rounded-xl p-5 border border-gray-200 max-h-[500px] overflow-y-auto leading-relaxed">
              {generatedDoc}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
