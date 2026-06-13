'use client';

import { useState } from 'react';
import { Search, BookOpen, Calendar, Building2, Tag, ExternalLink, Loader2, Filter } from 'lucide-react';
import clsx from 'clsx';
import { searchCases } from '@/lib/api';
import toast from 'react-hot-toast';

interface Case {
  id: string;
  title: string;
  court: string;
  year: string;
  citation: string;
  summary: string;
  keywords: string[];
  decision: 'Allowed' | 'Dismissed' | 'Remanded' | 'Settled';
}

const COURTS = ['All Courts', 'Supreme Court', 'High Court', 'Federal Shariat Court', 'Sessions Court'];
const LEGAL_AREAS = ['All Areas', 'Family Law', 'Property Law', 'Criminal Law', 'Constitutional Law', 'Labour Law'];

const DECISION_COLORS: Record<string, string> = {
  Allowed: 'bg-green-100 text-green-700',
  Dismissed: 'bg-red-100 text-red-700',
  Remanded: 'bg-yellow-100 text-yellow-700',
  Settled: 'bg-blue-100 text-blue-700',
};

export default function CaseSearch() {
  const [query, setQuery] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('All Courts');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [results, setResults] = useState<Case[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const data = await searchCases(query, {
        court: selectedCourt !== 'All Courts' ? selectedCourt : undefined,
        area: selectedArea !== 'All Areas' ? selectedArea : undefined,
      });
      setResults(data.cases || []);
    } catch {
      toast.error('Failed to search. Please check if the backend is running.');
      // Demo fallback data
      setResults(getDemoResults(query));
    } finally {
      setLoading(false);
    }
  };

  const getDemoResults = (q: string): Case[] => [
    {
      id: '1',
      title: 'Malik Ahmed vs State',
      court: 'Supreme Court of Pakistan',
      year: '2019',
      citation: '2019 SCMR 1234',
      summary: `This landmark case addressed tenant rights in urban properties. The court held that tenants cannot be evicted without proper legal notice and due process as required under the Rent Restriction Ordinance.`,
      keywords: ['tenant', 'eviction', 'rent', 'property'],
      decision: 'Allowed',
    },
    {
      id: '2',
      title: 'Khan vs Khan (Family Law)',
      court: 'Lahore High Court',
      year: '2021',
      citation: '2021 PLD 456',
      summary: 'The court examined custody rights and welfare of minor children. Established that the welfare of the child is paramount in all custody decisions under Muslim Family Laws Ordinance 1961.',
      keywords: ['custody', 'family', 'children', 'divorce'],
      decision: 'Remanded',
    },
    {
      id: '3',
      title: 'Ali Corporation vs Labour Dept',
      court: 'Sindh High Court',
      year: '2020',
      citation: '2020 CLC 789',
      summary: 'Case concerning wrongful termination of employees. The court reaffirmed that workers are entitled to proper notice or compensation in lieu thereof under the Industrial and Commercial Employment Ordinance.',
      keywords: ['labour', 'termination', 'employment', 'wages'],
      decision: 'Allowed',
    },
  ];

  const sampleSearches = ['tenant rights', 'divorce procedure', 'FIR filing', 'property transfer', 'bail application'];

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Search Pakistani Case Law</h2>
        <p className="text-sm text-gray-500 urdu-text mb-5">پاکستانی مقدمات تلاش کریں</p>

        <form onSubmit={handleSearch} className="space-y-4">
          {/* Main search input */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search cases, keywords, or legal topics..."
                className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 focus:border-green-500 rounded-2xl text-sm outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white font-semibold px-6 py-3.5 rounded-2xl transition-colors shadow-sm whitespace-nowrap"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search
            </button>
          </div>

          {/* Filter toggle */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Court</label>
                <select
                  value={selectedCourt}
                  onChange={e => setSelectedCourt(e.target.value)}
                  className="input-field text-sm"
                >
                  {COURTS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Legal Area</label>
                <select
                  value={selectedArea}
                  onChange={e => setSelectedArea(e.target.value)}
                  className="input-field text-sm"
                >
                  {LEGAL_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
          )}
        </form>

        {/* Sample Searches */}
        {!searched && (
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {sampleSearches.map(s => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); }}
                  className="text-xs px-3 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-full hover:bg-purple-100 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {loading && (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-3" />
          <p className="text-gray-500">Searching case law...</p>
          <p className="text-gray-400 text-sm urdu-text">مقدمات تلاش ہو رہے ہیں...</p>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-gray-200">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No cases found</p>
          <p className="text-gray-400 text-sm mt-1">Try different keywords or broaden your search</p>
          <p className="text-gray-300 text-xs urdu-text mt-1">مختلف الفاظ سے تلاش کریں</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 font-medium">
              Found <span className="text-green-700 font-bold">{results.length}</span> cases
            </p>
          </div>

          {results.map(caseItem => (
            <div key={caseItem.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200 p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base mb-1">{caseItem.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {caseItem.court}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {caseItem.year}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {caseItem.citation}
                    </span>
                  </div>
                </div>
                <span className={clsx(
                  'flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-full',
                  DECISION_COLORS[caseItem.decision] || 'bg-gray-100 text-gray-600'
                )}>
                  {caseItem.decision}
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">{caseItem.summary}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {caseItem.keywords.map(kw => (
                    <span
                      key={kw}
                      className="flex items-center gap-1 text-xs bg-purple-50 text-purple-600 border border-purple-200 px-2 py-0.5 rounded-full"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {kw}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-1 text-xs text-green-700 hover:text-green-800 font-medium">
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Full Case
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
