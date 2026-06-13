'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  MessageSquare, FileText, Search, Scale, Shield, Clock,
  ChevronRight, BookOpen, Phone, Gavel, Star, Users, Award,
  CheckCircle, ArrowRight, Zap, Globe, TrendingUp, Heart,
  AlertTriangle, HelpCircle, Building2, Landmark
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare, title: 'AI Legal Chat', titleUrdu: 'قانونی چیٹ',
    description: 'Ask any legal question in Urdu or English. Get instant expert-level answers powered by advanced AI.',
    descriptionUrdu: 'اردو یا انگریزی میں کوئی بھی قانونی سوال پوچھیں۔ فوری ماہرانہ جواب پائیں۔',
    href: '/chat', gradient: 'from-green-500 to-emerald-600', bg: 'bg-green-50', icon_color: 'text-green-600', border: 'border-green-100',
  },
  {
    icon: FileText, title: 'Document Generator', titleUrdu: 'دستاویز ساز',
    description: 'Generate rental agreements, affidavits, power of attorney, and 10+ legal documents instantly.',
    descriptionUrdy: 'کرایہ نامہ، حلف نامہ، وکالت نامہ اور ۱۰ سے زیادہ قانونی دستاویزات فوری بنائیں۔',
    href: '/documents', gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', icon_color: 'text-blue-600', border: 'border-blue-100',
  },
  {
    icon: Search, title: 'Case Search', titleUrdu: 'مقدمہ تلاش',
    description: 'Search thousands of Pakistani court decisions, precedents from Supreme Court to District Courts.',
    descriptionUrdu: 'سپریم کورٹ سے ضلعی عدالتوں تک ہزاروں پاکستانی مقدمات اور فیصلے تلاش کریں۔',
    href: '/cases', gradient: 'from-purple-500 to-violet-600', bg: 'bg-purple-50', icon_color: 'text-purple-600', border: 'border-purple-100',
  },
  {
    icon: BookOpen, title: 'Know Your Rights', titleUrdu: 'آپ کے حقوق',
    description: 'Learn your constitutional rights, tenant rights, worker rights, and consumer rights in simple language.',
    descriptionUrdu: 'آسان زبان میں آئینی حقوق، کرایہ دار حقوق، مزدور حقوق اور صارف حقوق جانیں۔',
    href: '/rights', gradient: 'from-orange-500 to-amber-600', bg: 'bg-orange-50', icon_color: 'text-orange-600', border: 'border-orange-100',
  },
  {
    icon: Gavel, title: 'Find a Lawyer', titleUrdu: 'وکیل تلاش',
    description: 'Connect with verified Pakistani lawyers by city, specialization, and budget.',
    descriptionUrdu: 'شہر، تخصص اور بجٹ کے مطابق تصدیق شدہ پاکستانی وکلاء سے جڑیں۔',
    href: '/lawyers', gradient: 'from-rose-500 to-pink-600', bg: 'bg-rose-50', icon_color: 'text-rose-600', border: 'border-rose-100',
  },
  {
    icon: Phone, title: 'Emergency Legal Help', titleUrdu: 'فوری قانونی مدد',
    description: 'Arrested? Facing eviction? Get immediate step-by-step guidance for urgent legal situations.',
    descriptionUrdu: 'گرفتار؟ بے دخلی کا سامنا؟ فوری قانونی حالات میں قدم بہ قدم رہنمائی حاصل کریں۔',
    href: '/emergency', gradient: 'from-red-500 to-rose-600', bg: 'bg-red-50', icon_color: 'text-red-600', border: 'border-red-100',
  },
];

const stats = [
  { value: '50K+', label: 'Citizens Helped', labelUrdu: 'شہریوں کی مدد', icon: Users },
  { value: '12+', label: 'Legal Areas', labelUrdu: 'قانونی شعبے', icon: Scale },
  { value: '10K+', label: 'Cases Database', labelUrdu: 'مقدمات ڈیٹابیس', icon: Search },
  { value: '2', label: 'Languages', labelUrdu: 'زبانیں', icon: Globe },
];

const legalAreas = [
  { en: 'Family Law', ur: 'خاندانی قانون', icon: Heart, color: 'text-pink-600 bg-pink-50' },
  { en: 'Property Law', ur: 'جائیداد قانون', icon: Building2, color: 'text-blue-600 bg-blue-50' },
  { en: 'Criminal Law', ur: 'فوجداری قانون', icon: Shield, color: 'text-red-600 bg-red-50' },
  { en: 'Civil Law', ur: 'دیوانی قانون', icon: Scale, color: 'text-purple-600 bg-purple-50' },
  { en: 'Labour Law', ur: 'محنت قانون', icon: Award, color: 'text-orange-600 bg-orange-50' },
  { en: 'Constitutional Law', ur: 'آئینی قانون', icon: Landmark, color: 'text-green-600 bg-green-50' },
  { en: 'Consumer Rights', ur: 'صارف حقوق', icon: CheckCircle, color: 'text-teal-600 bg-teal-50' },
  { en: 'Cyber Law', ur: 'سائبر قانون', icon: Zap, color: 'text-indigo-600 bg-indigo-50' },
];

const sampleQuestions = [
  { q: 'What are my rights if arrested?', q_ur: 'گرفتار ہونے پر کیا حقوق ہیں؟', tag: 'Criminal' },
  { q: 'How to file a divorce in Pakistan?', q_ur: 'طلاق کیسے دیں؟', tag: 'Family' },
  { q: 'Tenant rights in Pakistan?', q_ur: 'کرایہ دار کے حقوق؟', tag: 'Property' },
  { q: 'How to register an FIR?', q_ur: 'ایف آئی آر کیسے درج کریں؟', tag: 'Criminal' },
];

const testimonials = [
  { name: 'Ahmed Raza', city: 'Lahore', text: 'QanoonAI helped me understand my tenant rights. My landlord tried to illegally evict me but I knew exactly what to do!', stars: 5 },
  { name: 'Fatima Noor', city: 'Karachi', text: 'I generated my rental agreement in 5 minutes. Saved me Rs 5000 in lawyer fees for a simple document.', stars: 5 },
  { name: 'Bilal Khan', city: 'Islamabad', text: 'Amazing! Asked about my employee rights in Urdu and got a complete, accurate answer instantly.', stars: 5 },
];

export default function HomePage() {
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveQuestion(i => (i + 1) % sampleQuestions.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="hero-gradient text-white relative overflow-hidden min-h-[92vh] flex items-center">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/10"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full pulse-ring"></span>
                🇵🇰 Pakistan's #1 AI Legal Assistant
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-3 leading-tight">
                Qanoon<span className="text-green-300">AI</span>
              </h1>
              <p className="text-3xl md:text-4xl font-bold mb-2 urdu-text text-green-200">آپ کا قانونی معاون</p>
              <p className="text-white/75 text-lg mb-8 max-w-lg leading-relaxed">
                Free, instant legal guidance in <strong className="text-white">Urdu & English</strong> for every Pakistani citizen.
                Know your rights. Protect yourself.
              </p>

              {/* Animated question */}
              <div className="glass-card rounded-2xl p-4 mb-8 max-w-lg">
                <p className="text-white/60 text-xs mb-2 flex items-center gap-1"><HelpCircle className="w-3 h-3" /> People are asking:</p>
                <p className="text-white font-medium transition-all duration-500">
                  "{sampleQuestions[activeQuestion].q}"
                </p>
                <p className="text-white/70 text-sm urdu-text mt-1">
                  {sampleQuestions[activeQuestion].q_ur}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/chat" className="flex items-center gap-2 bg-white text-green-800 font-black py-4 px-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-base">
                  <MessageSquare className="w-5 h-5" />
                  Start Free Chat
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/emergency" className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-7 rounded-2xl transition-all text-base shadow-lg">
                  <Phone className="w-5 h-5" />
                  Emergency Help
                </Link>
              </div>
            </div>

            {/* Right — Feature grid */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Link key={i} href={f.href} className="glass-card rounded-2xl p-4 hover:bg-white/15 transition-all group">
                    <div className={`w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-bold text-sm">{f.title}</p>
                    <p className="text-white/60 text-xs urdu-text mt-0.5">{f.titleUrdu}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 15C1200 45 960 60 720 45C480 30 240 5 0 20L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-green-50 border border-green-100 hover:border-green-300 transition-all hover:shadow-md group">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                    <Icon className="w-5 h-5 text-green-700" />
                  </div>
                  <div className="text-3xl font-black text-green-700 mb-0.5">{s.value}</div>
                  <div className="text-gray-600 text-xs font-medium">{s.label}</div>
                  <div className="text-gray-400 text-xs urdu-text">{s.labelUrdu}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-green-700 font-semibold text-sm uppercase tracking-widest">Everything You Need</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-2">All Legal Tools. One App.</h2>
            <p className="text-xl text-gray-400 urdu-text">تمام قانونی ٹولز ایک جگہ</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Link key={i} href={f.href} className="group">
                  <div className={`feature-card bg-white rounded-3xl p-7 h-full border ${f.border} hover:border-transparent hover:shadow-xl`}>
                    <div className={`${f.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 ${f.icon_color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{f.title}</h3>
                    <p className={`text-base font-semibold mb-3 urdu-text ${f.icon_color}`}>{f.titleUrdu}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                    <div className={`mt-5 flex items-center gap-2 text-sm font-bold ${f.icon_color} group-hover:gap-3 transition-all`}>
                      Get Started <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-2">How It Works</h2>
            <p className="text-xl text-gray-400 urdu-text">یہ کیسے کام کرتا ہے</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-16 right-16 h-0.5 bg-gradient-to-r from-green-200 via-green-400 to-green-200"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Ask in Any Language', urdu: 'کسی بھی زبان میں پوچھیں', desc: 'Type your legal question in Urdu or English', icon: MessageSquare, color: 'bg-green-600' },
                { step: '02', title: 'AI Analyzes Instantly', urdu: 'AI فوری تجزیہ کرتا ہے', desc: 'Our AI checks Pakistani laws, constitution & precedents', icon: Zap, color: 'bg-blue-600' },
                { step: '03', title: 'Get Clear Guidance', urdu: 'واضح رہنمائی پائیں', desc: 'Receive actionable, cited legal information instantly', icon: CheckCircle, color: 'bg-purple-600' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="text-center relative z-10">
                    <div className={`${s.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-black text-gray-100 absolute top-0 left-1/2 -translate-x-1/2 -z-10">{s.step}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{s.title}</h3>
                    <p className="text-green-600 urdu-text text-sm mb-2">{s.urdu}</p>
                    <p className="text-gray-500 text-sm">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEGAL AREAS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-2">Legal Areas We Cover</h2>
            <p className="text-xl text-gray-400 urdu-text">قانونی شعبہ جات</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {legalAreas.map((a, i) => {
              const Icon = a.icon;
              const [iconCls, bgCls] = a.color.split(' ');
              return (
                <Link key={i} href={`/chat?topic=${encodeURIComponent(a.en)}`} className="group">
                  <div className={`${bgCls} rounded-2xl p-5 text-center hover:shadow-md transition-all border border-transparent hover:border-current`}>
                    <Icon className={`w-8 h-8 ${iconCls} mx-auto mb-3`} />
                    <p className={`font-bold text-sm ${iconCls}`}>{a.en}</p>
                    <p className="text-gray-400 text-xs urdu-text mt-1">{a.ur}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-2">What People Say</h2>
            <p className="text-xl text-gray-400 urdu-text">لوگ کیا کہتے ہیں</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-green-50 rounded-3xl p-7 border border-green-100">
                <div className="flex mb-3">
                  {Array(t.stars).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY BANNER ── */}
      <section className="py-12 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-black mb-2">Facing a Legal Emergency?</h2>
          <p className="text-xl urdu-text text-red-200 mb-6">قانونی ایمرجنسی کا سامنا ہے؟</p>
          <p className="text-red-100 mb-6">Arrested? Facing illegal eviction? Police refusing FIR? Get immediate step-by-step help.</p>
          <Link href="/emergency" className="inline-flex items-center gap-2 bg-white text-red-600 font-black py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-lg">
            <Phone className="w-6 h-6" />
            Get Emergency Help Now
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Scale className="w-14 h-14 mx-auto mb-6 text-green-300" />
          <h2 className="text-4xl md:text-5xl font-black mb-3">Justice for Every Pakistani</h2>
          <p className="text-2xl urdu-text text-green-300 mb-4">ہر پاکستانی کے لیے انصاف</p>
          <p className="text-green-100 mb-8 max-w-lg mx-auto">QanoonAI is free for all Pakistani citizens. No registration needed. Start asking legal questions right now.</p>
          <Link href="/chat" className="inline-flex items-center gap-3 bg-white text-green-800 font-black py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-lg">
            <MessageSquare className="w-6 h-6" />
            Start Free Legal Chat
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div className="bg-gray-100 py-4 px-4 text-center">
        <p className="text-gray-400 text-xs max-w-3xl mx-auto">
          ⚠️ <strong>Disclaimer:</strong> QanoonAI provides general legal information for educational purposes only. It does not constitute legal advice. For specific legal matters, always consult a qualified lawyer (وکیل).
        </p>
      </div>
    </div>
  );
}
