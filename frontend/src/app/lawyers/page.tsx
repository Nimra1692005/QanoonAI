'use client';

import { useState } from 'react';
import { Gavel, MapPin, Star, Phone, Mail, CheckCircle, Search, Filter, ExternalLink } from 'lucide-react';

const cities = ['All Cities', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Quetta', 'Faisalabad', 'Multan'];
const specializations = ['All Areas', 'Family Law', 'Criminal Law', 'Property Law', 'Civil Law', 'Labour Law', 'Corporate Law', 'Cyber Law'];

const lawyers = [
  { name: 'Adv. Muhammad Khalid', city: 'Karachi', area: 'Criminal Law', exp: 15, rating: 4.8, reviews: 124, verified: true, fee: 'PKR 3,000–8,000', langs: ['Urdu', 'English', 'Sindhi'], about: 'Expert in criminal defence with extensive experience in bail applications, FIR matters, and High Court cases.' },
  { name: 'Adv. Ayesha Farooq', city: 'Lahore', area: 'Family Law', exp: 10, rating: 4.9, reviews: 89, verified: true, fee: 'PKR 2,000–5,000', langs: ['Urdu', 'English', 'Punjabi'], about: 'Specialist in divorce, custody, maintenance, and inheritance cases. Strong advocate for women\'s legal rights.' },
  { name: 'Adv. Tariq Mahmood', city: 'Islamabad', area: 'Property Law', exp: 20, rating: 4.7, reviews: 201, verified: true, fee: 'PKR 5,000–15,000', langs: ['Urdu', 'English'], about: 'Senior property lawyer handling title disputes, registration matters, housing society cases, and real estate fraud.' },
  { name: 'Adv. Sana Mirza', city: 'Lahore', area: 'Labour Law', exp: 8, rating: 4.6, reviews: 67, verified: true, fee: 'PKR 2,500–6,000', langs: ['Urdu', 'English'], about: 'Labour law specialist handling wrongful termination, wage disputes, and workplace harassment cases.' },
  { name: 'Adv. Zafar Iqbal', city: 'Rawalpindi', area: 'Civil Law', exp: 18, rating: 4.5, reviews: 156, verified: true, fee: 'PKR 3,000–10,000', langs: ['Urdu', 'English', 'Punjabi'], about: 'Civil litigation expert with experience in contract disputes, breach of agreement, and recovery cases.' },
  { name: 'Adv. Nadia Hassan', city: 'Karachi', area: 'Corporate Law', exp: 12, rating: 4.8, reviews: 93, verified: true, fee: 'PKR 8,000–25,000', langs: ['Urdu', 'English'], about: 'Corporate and commercial lawyer specializing in business contracts, company registration, and commercial disputes.' },
  { name: 'Adv. Imran Baig', city: 'Peshawar', area: 'Criminal Law', exp: 14, rating: 4.6, reviews: 78, verified: true, fee: 'PKR 2,000–6,000', langs: ['Urdu', 'Pashto', 'English'], about: 'Experienced criminal lawyer in Peshawar High Court with expertise in bail, trial, and appeal cases.' },
  { name: 'Adv. Rabia Qureshi', city: 'Multan', area: 'Family Law', exp: 9, rating: 4.7, reviews: 54, verified: true, fee: 'PKR 1,500–4,000', langs: ['Urdu', 'Punjabi'], about: 'Family law practitioner handling divorce, custody, mehr, and inheritance cases in South Punjab courts.' },
  { name: 'Adv. Ahmed Raza Cyber', city: 'Islamabad', area: 'Cyber Law', exp: 6, rating: 4.8, reviews: 41, verified: true, fee: 'PKR 5,000–20,000', langs: ['Urdu', 'English'], about: 'Pakistan\'s leading cyber law attorney specializing in PECA cases, online harassment, and digital fraud.' },
];

export default function LawyersPage() {
  const [city, setCity] = useState('All Cities');
  const [spec, setSpec] = useState('All Areas');
  const [search, setSearch] = useState('');

  const filtered = lawyers.filter(l =>
    (city === 'All Cities' || l.city === city) &&
    (spec === 'All Areas' || l.area === spec) &&
    (search === '' || l.name.toLowerCase().includes(search.toLowerCase()) || l.area.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-600 to-pink-800 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Gavel className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">Find a Lawyer</h1>
          <p className="text-3xl urdu-text text-rose-200 mb-4">وکیل تلاش کریں</p>
          <p className="text-rose-100 max-w-xl mx-auto">Connect with verified Pakistani lawyers by city and specialization.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search lawyers..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-400"
              />
            </div>
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 bg-white"
            >
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
            <select
              value={spec}
              onChange={e => setSpec(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 bg-white"
            >
              {specializations.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <p className="text-xs text-gray-400 mt-3">{filtered.length} lawyers found</p>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-700">
          ⚠️ This is a <strong>sample directory</strong> for demonstration. Always verify a lawyer's credentials with the relevant Bar Council before hiring.
        </div>

        {/* Lawyer Cards */}
        <div className="space-y-4">
          {filtered.map((l, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                {/* Avatar */}
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-700 rounded-2xl flex items-center justify-center text-white font-black text-xl">
                  {l.name.split(' ')[1]?.[0] || l.name[0]}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg font-black text-gray-900">{l.name}</h3>
                    {l.verified && (
                      <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{l.city}</span>
                    <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-xs font-semibold">{l.area}</span>
                    <span>{l.exp} years exp.</span>
                    <span className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />{l.rating} ({l.reviews})
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{l.about}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {l.langs.map(lang => (
                      <span key={lang} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{lang}</span>
                    ))}
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">Fee: {l.fee}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 md:w-36">
                  <button className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-2.5 px-4 rounded-xl text-sm font-bold transition-colors">
                    <Phone className="w-4 h-4" /> Contact
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors">
                    <Mail className="w-4 h-4" /> Message
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Gavel className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No lawyers found matching your filters</p>
            </div>
          )}
        </div>

        {/* Bar Councils */}
        <div className="mt-10 bg-gray-900 rounded-3xl p-8 text-white">
          <h3 className="text-xl font-black mb-2">Official Bar Councils</h3>
          <p className="text-gray-400 text-sm mb-5">Find certified lawyers through official bar councils</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Pakistan Bar Council', link: 'pakistanbarcouncil.org' },
              { name: 'Punjab Bar Council', link: 'punjabbarcouncil.org' },
              { name: 'Sindh Bar Council', link: 'sindhbarcouncil.gov.pk' },
              { name: 'KPK Bar Council', link: 'kpkbarcouncil.org' },
            ].map((b, i) => (
              <a key={i} href={`https://${b.link}`} target="_blank" rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 rounded-xl p-3 text-center transition-colors group">
                <p className="font-semibold text-sm group-hover:text-green-300 transition-colors">{b.name}</p>
                <p className="text-gray-400 text-xs flex items-center justify-center gap-1 mt-1">
                  <ExternalLink className="w-3 h-3" />{b.link}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
