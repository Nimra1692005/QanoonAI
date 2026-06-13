'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Scale, Menu, X, MessageSquare, FileText, Search,
  Globe, BookOpen, Phone, ChevronDown, Gavel, Info
} from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { href: '/chat', label: 'AI Legal Chat', labelUrdu: 'قانونی چیٹ', icon: MessageSquare, color: 'text-green-600' },
  { href: '/documents', label: 'Documents', labelUrdu: 'دستاویزات', icon: FileText, color: 'text-blue-600' },
  { href: '/cases', label: 'Case Search', labelUrdu: 'مقدمات', icon: Search, color: 'text-purple-600' },
  { href: '/rights', label: 'Know Your Rights', labelUrdu: 'آپ کے حقوق', icon: BookOpen, color: 'text-orange-600' },
  { href: '/lawyers', label: 'Find a Lawyer', labelUrdu: 'وکیل تلاش', icon: Gavel, color: 'text-rose-600' },
  { href: '/emergency', label: 'Emergency Help', labelUrdu: 'فوری مدد', icon: Phone, color: 'text-red-600' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-white/98 backdrop-blur-lg shadow-md border-b border-gray-200'
        : 'bg-white border-b border-gray-100'
    )}>
      {/* Top bar */}
      <div className="bg-green-800 text-white text-xs py-1.5 px-4 text-center">
        <span className="opacity-90">🇵🇰 Free Legal Information for Every Pakistani Citizen — </span>
        <span className="urdu-text opacity-80 text-xs">ہر پاکستانی شہری کے لیے مفت قانونی معلومات</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-gradient-to-br from-green-700 to-green-900 p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl text-gray-900 tracking-tight">QanoonAI</span>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-1.5 py-0.5 rounded-full">BETA</span>
              </div>
              <p className="text-xs text-green-700 urdu-text leading-none" style={{lineHeight:'1.2'}}>آپ کا قانونی معاون</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ href, label, labelUrdu, icon: Icon, color }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap',
                  pathname === href
                    ? 'bg-green-700 text-white shadow-sm'
                    : `text-gray-600 hover:bg-gray-50 hover:${color}`
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {lang === 'en' ? label : labelUrdu}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(l => l === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-green-50 hover:text-green-700 text-gray-600 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border border-transparent hover:border-green-200"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'اردو' : 'EN'}
            </button>

            <Link
              href="/emergency"
              className="hidden sm:flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shadow-sm animate-pulse"
            >
              <Phone className="w-3.5 h-3.5" />
              Emergency
            </Link>

            <Link
              href="/chat"
              className="hidden sm:flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {lang === 'en' ? 'Get Legal Help' : 'مدد لیں'}
            </Link>

            <button
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {navLinks.map(({ href, label, labelUrdu, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  pathname === href ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <div>
                  <div>{label}</div>
                  <div className="text-xs opacity-60 urdu-text">{labelUrdu}</div>
                </div>
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 flex gap-2">
              <Link href="/emergency" className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold">
                <Phone className="w-4 h-4" /> Emergency
              </Link>
              <Link href="/chat" className="flex-1 flex items-center justify-center gap-2 bg-green-700 text-white py-2.5 rounded-xl text-sm font-bold">
                <MessageSquare className="w-4 h-4" /> Get Help
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
