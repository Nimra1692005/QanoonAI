import Link from 'next/link';
import { Scale, Github, Twitter, Mail, MessageSquare, FileText, Search, BookOpen, Phone, Gavel, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-green-700 p-2 rounded-xl">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-black text-xl">QanoonAI</span>
                <p className="text-green-400 text-xs urdu-text" style={{lineHeight:'1.3'}}>آپ کا قانونی معاون</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              Free AI-powered legal assistance for every Pakistani citizen. Know your rights.
            </p>
            <p className="text-gray-600 text-xs urdu-text">ہر پاکستانی کے لیے مفت قانونی مدد</p>
            <div className="flex gap-2.5 mt-5">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-green-700 rounded-xl flex items-center justify-center transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-green-700 rounded-xl flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="mailto:contact@qanoonai.pk" className="w-9 h-9 bg-gray-800 hover:bg-green-700 rounded-xl flex items-center justify-center transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-5">Features</h3>
            <ul className="space-y-3">
              {[
                { href: '/chat', icon: MessageSquare, label: 'AI Legal Chat', urdu: 'قانونی چیٹ' },
                { href: '/documents', icon: FileText, label: 'Document Generator', urdu: 'دستاویز ساز' },
                { href: '/cases', icon: Search, label: 'Case Search', urdu: 'مقدمہ تلاش' },
                { href: '/rights', icon: BookOpen, label: 'Know Your Rights', urdu: 'آپ کے حقوق' },
                { href: '/lawyers', icon: Gavel, label: 'Find a Lawyer', urdu: 'وکیل تلاش' },
                { href: '/emergency', icon: Phone, label: 'Emergency Help', urdu: 'فوری مدد' },
              ].map(({ href, icon: Icon, label, urdu }) => (
                <li key={href}>
                  <Link href={href} className="flex items-center gap-2.5 text-gray-400 hover:text-green-400 text-sm transition-colors group">
                    <Icon className="w-3.5 h-3.5 group-hover:text-green-400" />
                    <span>{label}</span>
                    <span className="text-gray-600 text-xs urdu-text">— {urdu}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Areas */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-5">Legal Areas</h3>
            <ul className="space-y-2.5">
              {['Family Law', 'Property Law', 'Criminal Law', 'Civil Law', 'Labour Law', 'Constitutional Law', 'Consumer Rights', 'Cyber Law'].map(area => (
                <li key={area}>
                  <Link href={`/chat?topic=${encodeURIComponent(area)}`} className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-5">Resources</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Supreme Court Pakistan', href: 'https://supremecourt.gov.pk' },
                { label: 'Pakistan Law Site', href: 'http://pakistanlawsite.com' },
                { label: 'National Assembly', href: 'https://na.gov.pk' },
                { label: 'Pakistan Bar Council', href: 'http://pakistanbarcouncil.org' },
                { label: 'FBR Tax Laws', href: 'https://fbr.gov.pk' },
                { label: 'SECP Company Laws', href: 'https://secp.gov.pk' },
              ].map(r => (
                <li key={r.href}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 text-sm transition-colors flex items-center gap-1">
                    {r.label} <span className="text-gray-600 text-xs">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer + bottom */}
        <div className="border-t border-gray-800 pt-6">
          <div className="bg-gray-900 rounded-2xl p-4 mb-6 text-xs text-gray-400 leading-relaxed">
            <strong className="text-gray-300">⚠️ Legal Disclaimer:</strong> QanoonAI provides general legal information for educational and informational purposes only. The information does not constitute legal advice and should not be relied upon as a substitute for advice from a qualified legal professional. Always consult a qualified lawyer for specific legal matters.
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} QanoonAI. Built with <Heart className="w-3 h-3 inline text-red-500" /> for Pakistan 🇵🇰</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Use</Link>
              <Link href="/about" className="hover:text-gray-400 transition-colors">About</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
