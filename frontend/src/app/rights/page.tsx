'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen, Shield, Home, Briefcase, Heart, Scale,
  ChevronDown, ChevronUp, ArrowRight, MessageSquare, CheckCircle
} from 'lucide-react';

const rightsData = [
  {
    category: 'Constitutional Rights',
    categoryUrdu: 'آئینی حقوق',
    icon: Scale,
    color: 'green',
    rights: [
      { title: 'Right to Life & Liberty (Article 9)', urdu: 'زندگی اور آزادی کا حق', detail: 'No person can be deprived of life or liberty except according to law. You cannot be detained without legal grounds.' },
      { title: 'Right to Fair Trial (Article 10A)', urdu: 'منصفانہ مقدمے کا حق', detail: 'Every person is entitled to a fair trial. You have the right to be heard, present evidence, and be defended by a lawyer.' },
      { title: 'Freedom of Speech (Article 19)', urdu: 'آزادی اظہار', detail: 'Every citizen has the right to freedom of speech and expression, subject to reasonable restrictions under law.' },
      { title: 'Equality Before Law (Article 25)', urdu: 'قانون کے سامنے مساوات', detail: 'All citizens are equal before law. No discrimination on basis of sex, religion, caste, or creed.' },
      { title: 'Right to Education (Article 25A)', urdu: 'تعلیم کا حق', detail: 'The state must provide free and compulsory education to children between ages 5 to 16.' },
      { title: 'Freedom of Religion (Article 20)', urdu: 'مذہبی آزادی', detail: 'Every citizen has the right to profess, practice, and propagate their religion.' },
    ],
  },
  {
    category: 'Rights When Arrested',
    categoryUrdu: 'گرفتاری کے وقت حقوق',
    icon: Shield,
    color: 'red',
    rights: [
      { title: 'Right to Know Reason of Arrest', urdu: 'گرفتاری کی وجہ جاننے کا حق', detail: 'Police MUST tell you why you are being arrested. They cannot arrest you without disclosing grounds.' },
      { title: 'Right to Lawyer', urdu: 'وکیل کا حق', detail: 'You have the right to consult a lawyer of your choice immediately after arrest. Do not waive this right.' },
      { title: 'Produced Before Magistrate in 24 Hours', urdu: 'چوبیس گھنٹے میں مجسٹریٹ کے سامنے پیشی', detail: 'Police must produce you before a magistrate within 24 hours of arrest. Longer detention without this is illegal.' },
      { title: 'Right to Bail (Bailable Offences)', urdu: 'ضمانت کا حق', detail: 'For bailable offences, bail is your right. Police or magistrate must grant it. They cannot refuse without reason.' },
      { title: 'No Torture or Inhumane Treatment', urdu: 'تشدد سے تحفظ', detail: 'Article 14 prohibits torture. Any confession obtained through torture is inadmissible in court.' },
      { title: 'Habeas Corpus', urdu: 'حبس بے جا', detail: 'If illegally detained, you or your family can file a Habeas Corpus petition in High Court for immediate release.' },
    ],
  },
  {
    category: 'Tenant Rights',
    categoryUrdu: 'کرایہ دار کے حقوق',
    icon: Home,
    color: 'blue',
    rights: [
      { title: 'Right to Written Lease Agreement', urdu: 'تحریری معاہدے کا حق', detail: 'Always demand a written lease agreement. Verbal agreements are harder to enforce in court.' },
      { title: 'No Illegal Eviction', urdu: 'غیر قانونی بے دخلی سے تحفظ', detail: 'Landlord cannot evict you without a court order. Police cannot assist in forcible eviction without legal order.' },
      { title: 'Prior Notice Before Eviction', urdu: 'بے دخلی سے پہلے نوٹس', detail: 'Landlord must give proper legal notice before seeking eviction. Immediate eviction without notice is illegal.' },
      { title: 'Right to Basic Amenities', urdu: 'بنیادی سہولیات کا حق', detail: 'Landlord must maintain the property in habitable condition. Essential utilities cannot be cut without court order.' },
      { title: 'Security Deposit Return', urdu: 'ضمانتی رقم واپسی', detail: 'Landlord must return your security deposit after the tenancy ends, unless proven damages exceed it.' },
      { title: 'Rent Control Protection', urdu: 'کرایہ کنٹرول تحفظ', detail: 'Rent Restriction Ordinances in Punjab, Sindh, KPK protect tenants from arbitrary rent increases.' },
    ],
  },
  {
    category: 'Worker / Labour Rights',
    categoryUrdu: 'مزدور / ملازم کے حقوق',
    icon: Briefcase,
    color: 'orange',
    rights: [
      { title: 'Minimum Wage (PKR 32,000/month)', urdu: 'کم از کم اجرت', detail: 'As of 2024, minimum wage is PKR 32,000/month. Employer cannot pay less. File complaint with Labour Court if violated.' },
      { title: 'One Month Notice on Termination', urdu: 'برطرفی پر ایک ماہ نوٹس', detail: 'Employer must give one month notice or pay wages in lieu. Wrongful termination can be challenged in Labour Court.' },
      { title: 'Overtime Pay (Double Rate)', urdu: 'اوور ٹائم کی دوگنی اجرت', detail: 'Workers are entitled to double wage rate for overtime. Maximum working hours are 48 per week.' },
      { title: 'Annual Leave (14 Days)', urdu: 'سالانہ چھٹی', detail: 'Employees with 1+ year service get 14 days annual leave and 10 days casual leave. Cannot be denied without reason.' },
      { title: 'Right Against Discrimination', urdu: 'امتیاز سے تحفظ', detail: 'Workplace discrimination based on religion, sex, caste or ethnicity is illegal under labour laws.' },
      { title: 'EOBI Pension Rights', urdu: 'EOBI پنشن', detail: 'Registered employees are entitled to EOBI pension, old age benefits, and invalidity pension contributions.' },
    ],
  },
  {
    category: 'Family Rights',
    categoryUrdu: 'خاندانی حقوق',
    icon: Heart,
    color: 'pink',
    rights: [
      { title: 'Mehr is Wife\'s Absolute Right', urdu: 'مہر بیوی کا مطلق حق', detail: 'Mehr (dower) is wife\'s right and becomes her absolute property. It cannot be waived under duress or coercion.' },
      { title: 'Right to Maintenance (Nafaqa)', urdu: 'نفقے کا حق', detail: 'Wife is entitled to maintenance including food, clothing, and shelter. Amount is determined by court based on husband\'s capacity.' },
      { title: 'Child Custody (Hizanat)', urdu: 'بچوں کی تحویل', detail: 'Mother has primary right to custody of sons up to 7 years and daughters until puberty. Father is natural guardian.' },
      { title: 'Right to Khula', urdu: 'خلع کا حق', detail: 'Wife can seek judicial divorce (Khula) through Family Court. Court must dissolve marriage even without husband\'s consent.' },
      { title: 'Daughters\' Inheritance Rights', urdu: 'بیٹیوں کا وراثت کا حق', detail: 'Under Islamic law, daughters are entitled to half the share of sons. Denying daughters their inheritance is illegal.' },
      { title: 'Marriage Registration Required', urdu: 'نکاح رجسٹریشن لازمی', detail: 'Every marriage must be registered with Union Council. Nikahnamah is the official legal marriage document.' },
    ],
  },
];

export default function RightsPage() {
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [openRight, setOpenRight] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-600 to-amber-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">Know Your Rights</h1>
          <p className="text-3xl urdu-text text-orange-200 mb-4">اپنے حقوق جانیں</p>
          <p className="text-orange-100 max-w-xl mx-auto">Your complete guide to fundamental rights under Pakistani law. Know your rights — protect yourself.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Quick tip */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-3">
          <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">Pro Tip</p>
            <p className="text-amber-700 text-sm">Screenshot or save any rights information for offline reference. Having this knowledge can protect you in critical situations.</p>
          </div>
        </div>

        {/* Rights Categories */}
        <div className="space-y-4">
          {rightsData.map((cat, ci) => {
            const CatIcon = cat.icon;
            const isOpen = openCategory === ci;
            const colorMap: Record<string, string> = {
              green: 'bg-green-600',
              red: 'bg-red-600',
              blue: 'bg-blue-600',
              orange: 'bg-orange-600',
              pink: 'bg-pink-600',
            };
            const bgColor = colorMap[cat.color] || 'bg-green-600';

            return (
              <div key={ci} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenCategory(isOpen ? null : ci)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`${bgColor} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <CatIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{cat.category}</h2>
                      <p className="text-sm text-gray-400 urdu-text">{cat.categoryUrdu}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{cat.rights.length} rights</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 divide-y divide-gray-50">
                    {cat.rights.map((r, ri) => {
                      const key = `${ci}-${ri}`;
                      const isRightOpen = openRight === key;
                      return (
                        <div key={ri} className="px-6">
                          <button
                            className="w-full flex items-center justify-between py-4 text-left hover:text-green-700 transition-colors group"
                            onClick={() => setOpenRight(isRightOpen ? null : key)}
                          >
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <div>
                                <p className="font-semibold text-gray-800 text-sm group-hover:text-green-700">{r.title}</p>
                                <p className="text-xs text-gray-400 urdu-text">{r.urdu}</p>
                              </div>
                            </div>
                            {isRightOpen ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                          </button>
                          {isRightOpen && (
                            <div className="pb-4 ml-7">
                              <p className="text-gray-600 text-sm leading-relaxed bg-green-50 rounded-xl p-4 border border-green-100">{r.detail}</p>
                              <Link
                                href={`/chat?q=${encodeURIComponent('Tell me more about: ' + r.title)}`}
                                className="inline-flex items-center gap-1.5 text-green-700 text-xs font-semibold mt-3 hover:underline"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                Ask AI for more details <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-8 text-white text-center">
          <Scale className="w-10 h-10 mx-auto mb-4 text-green-300" />
          <h3 className="text-2xl font-black mb-2">Have a Specific Legal Question?</h3>
          <p className="text-green-200 urdu-text mb-5">کوئی خاص قانونی سوال ہے؟</p>
          <Link href="/chat" className="inline-flex items-center gap-2 bg-white text-green-800 font-black py-3 px-8 rounded-2xl hover:shadow-xl transition-all hover:scale-105">
            <MessageSquare className="w-5 h-5" />
            Ask AI Legal Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}
