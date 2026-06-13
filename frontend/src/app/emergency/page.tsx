'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Phone, AlertTriangle, Shield, Home, Briefcase,
  ChevronRight, MessageSquare, CheckCircle, Copy, ExternalLink
} from 'lucide-react';

const emergencies = [
  {
    id: 'arrested',
    title: 'I Was Arrested',
    titleUrdu: 'مجھے گرفتار کیا گیا',
    icon: Shield,
    color: 'bg-red-600',
    urgency: 'CRITICAL',
    steps: [
      { step: 1, action: 'Stay Calm — Do Not Resist', detail: 'Physically resisting arrest is a separate offence. Stay calm. Comply with police physically but know your legal rights.' },
      { step: 2, action: 'Ask Why You Are Being Arrested', detail: 'You have a constitutional right to know the reason for your arrest (Article 10). Clearly ask: "What are the charges against me?"' },
      { step: 3, action: 'Ask for a Lawyer Immediately', detail: 'Say: "I want to speak to a lawyer." This is your constitutional right. Do not give any statement without a lawyer present.' },
      { step: 4, action: 'Do Not Sign Any Document Without Reading', detail: 'Police may try to get you to sign documents. Do not sign anything without reading it fully and consulting a lawyer.' },
      { step: 5, action: 'You Must Be Produced Before Magistrate Within 24 Hours', detail: 'If police do not produce you before a magistrate within 24 hours, this is illegal detention. Your family can file Habeas Corpus in High Court.' },
      { step: 6, action: 'For Bailable Offences — Demand Bail', detail: 'If charged with a bailable offence, bail is your right. Police or magistrate must grant it. If refused, immediately contact a lawyer.' },
      { step: 7, action: 'Contact Family / Lawyer', detail: 'You have the right to inform a family member or friend of your arrest. Give them the police station name and your custody.' },
    ],
    hotlines: [{ name: 'Police Emergency', number: '15' }, { name: 'Legal Aid', number: '0800-70711' }],
  },
  {
    id: 'fir',
    title: 'Police Refusing to Register FIR',
    titleUrdu: 'پولیس ایف آئی آر درج نہیں کر رہی',
    icon: AlertTriangle,
    color: 'bg-orange-600',
    urgency: 'URGENT',
    steps: [
      { step: 1, action: 'Know Your Right — FIR is Mandatory', detail: 'Under Section 154 CrPC, police MUST register FIR for cognizable offences. Refusal is illegal and punishable.' },
      { step: 2, action: 'Ask for SHO (Station House Officer)', detail: 'If the constable refuses, ask to speak with the SHO (Station House Officer) directly. Formally request FIR registration.' },
      { step: 3, action: 'Complain to DSP / SSP', detail: 'If SHO refuses, go to DSP (Deputy Superintendent Police) or SSP (Senior Superintendent Police) of the district with a written complaint.' },
      { step: 4, action: 'File Application Before Magistrate', detail: 'Under Section 22-A CrPC, you can file an application before a Judicial Magistrate to order police to register FIR.' },
      { step: 5, action: 'File Writ Petition in High Court', detail: 'As a last resort, file a Writ Petition in the High Court. Courts routinely direct police to register FIRs and take action against SHOs.' },
      { step: 6, action: 'Contact CPLC or Legal Aid', detail: 'Citizens Police Liaison Committee (CPLC) in Karachi or local Legal Aid Society can assist in getting FIR registered.' },
    ],
    hotlines: [{ name: 'Police Emergency', number: '15' }, { name: 'CPLC Karachi', number: '021-35662000' }, { name: 'Complaint Cell', number: '8787' }],
  },
  {
    id: 'eviction',
    title: 'Illegal Eviction / Forced Out',
    titleUrdu: 'غیر قانونی بے دخلی',
    icon: Home,
    color: 'bg-blue-600',
    urgency: 'URGENT',
    steps: [
      { step: 1, action: 'Know — Eviction Without Court Order is ILLEGAL', detail: 'A landlord CANNOT evict you without a court order. Police cannot assist in eviction without a court directive. This is settled law (SC 2019).' },
      { step: 2, action: 'Do Not Leave Voluntarily Under Pressure', detail: 'If forced out, document everything. Take photos/videos of your belongings inside the property. Do not sign anything under duress.' },
      { step: 3, action: 'File FIR Against Landlord', detail: 'Forcible eviction without court order is a criminal offence. File FIR at the nearest police station for "house trespass" and "wrongful confinement".' },
      { step: 4, action: 'Approach Rent Controller / Court', detail: 'File an application before the Rent Controller or Civil Court for immediate interim injunction to prevent eviction and restore possession.' },
      { step: 5, action: 'Get Urgent Injunction from Court', detail: 'Courts regularly grant urgent (ex-parte) injunctions in eviction cases within 24-48 hours. Hire a lawyer and apply immediately.' },
      { step: 6, action: 'Preserve Your Lease Agreement', detail: 'Your lease agreement is your most important document. Keep a copy on your phone/email. It proves your right to remain in the property.' },
    ],
    hotlines: [{ name: 'Police', number: '15' }, { name: 'Legal Aid Punjab', number: '042-99213226' }],
  },
  {
    id: 'workplace',
    title: 'Workplace Harassment / Wrongful Termination',
    titleUrdu: 'دفتری ہراسانی / غلط برطرفی',
    icon: Briefcase,
    color: 'bg-purple-600',
    urgency: 'IMPORTANT',
    steps: [
      { step: 1, action: 'Document Everything', detail: 'Save all emails, messages, and written communications related to harassment or termination. This evidence is crucial for your case.' },
      { step: 2, action: 'Check Your Employment Contract', detail: 'Review your contract for notice period, termination clauses, and grievance procedures. Know what the employer was legally required to do.' },
      { step: 3, action: 'Send Legal Notice to Employer', detail: 'Through a lawyer, send a formal legal notice to the employer citing violation of labour laws and demanding compliance or compensation.' },
      { step: 4, action: 'File Complaint with Labour Department', detail: 'File a complaint with the Provincial Labour Department. They have authority to investigate and take action against employers.' },
      { step: 5, action: 'Approach Labour Court', detail: 'For wrongful termination, file a complaint in Labour Court. Courts regularly order reinstatement or payment of compensation (3-6 months salary).' },
      { step: 6, action: 'For Harassment — File Under POSH Act', detail: 'Sexual harassment is punishable under the Protection Against Harassment of Women at Workplace Act 2010. File complaint with the Ombudsman.' },
    ],
    hotlines: [{ name: 'Labour Department Punjab', number: '042-99263180' }, { name: 'Harassment Ombudsman', number: '051-9219865' }],
  },
];

export default function EmergencyPage() {
  const [active, setActive] = useState<string>('arrested');
  const [copied, setCopied] = useState<string | null>(null);

  const current = emergencies.find(e => e.id === active)!;

  const copyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopied(num);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 animate-pulse">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">Emergency Legal Help</h1>
          <p className="text-3xl urdu-text text-red-200 mb-4">فوری قانونی مدد</p>
          <p className="text-red-100 max-w-xl mx-auto">Step-by-step guidance for urgent legal situations. What to do right now.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Emergency selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {emergencies.map(e => {
            const Icon = e.icon;
            return (
              <button
                key={e.id}
                onClick={() => setActive(e.id)}
                className={`rounded-2xl p-4 text-left transition-all border-2 ${
                  active === e.id
                    ? 'bg-white border-red-500 shadow-lg'
                    : 'bg-white border-transparent hover:border-gray-200 shadow-sm'
                }`}
              >
                <div className={`${e.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-gray-900 text-xs leading-tight">{e.title}</p>
                <p className="text-gray-400 text-xs urdu-text mt-1">{e.titleUrdu}</p>
                <span className={`inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                  e.urgency === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                  e.urgency === 'URGENT' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'
                }`}>{e.urgency}</span>
              </button>
            );
          })}
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className={`${current.color} px-7 py-5`}>
            <h2 className="text-xl font-black text-white">{current.title}</h2>
            <p className="text-white/75 urdu-text text-sm">{current.titleUrdu}</p>
          </div>
          <div className="divide-y divide-gray-50">
            {current.steps.map((s) => (
              <div key={s.step} className="flex gap-5 p-6">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-black">{s.step}</div>
                <div>
                  <p className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {s.action}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hotlines */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
          <h3 className="font-black text-red-800 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5" /> Emergency Hotlines — فوری نمبر
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {current.hotlines.map((h, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-red-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{h.name}</p>
                  <p className="text-red-600 font-black text-lg">{h.number}</p>
                </div>
                <button
                  onClick={() => copyNumber(h.number)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Copy number"
                >
                  {copied === h.number ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Help CTA */}
        <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-lg">Need More Specific Help?</p>
            <p className="text-green-200 text-sm">Describe your exact situation to our AI legal assistant</p>
          </div>
          <Link
            href={`/chat?q=${encodeURIComponent('Emergency help: ' + current.title)}`}
            className="flex items-center gap-2 bg-white text-green-800 font-black px-6 py-3 rounded-xl hover:shadow-lg transition-all whitespace-nowrap"
          >
            <MessageSquare className="w-5 h-5" />
            Ask AI Now
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
