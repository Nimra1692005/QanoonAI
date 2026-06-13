import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'QanoonAI — آپ کا قانونی معاون | Pakistani Legal AI Assistant',
  description:
    'QanoonAI helps Pakistani citizens understand their legal rights, generate legal documents, search case law, and get emergency legal help — powered by AI in Urdu & English.',
  keywords: [
    'Pakistani law', 'legal AI Pakistan', 'قانونی معاون', 'پاکستان قانون',
    'FIR Pakistan', 'legal documents Pakistan', 'case search Pakistan',
    'family law Pakistan', 'property law Pakistan', 'criminal law Pakistan',
  ],
  authors: [{ name: 'QanoonAI Team' }],
  openGraph: {
    title: 'QanoonAI — Pakistani Legal AI Assistant',
    description: 'AI-powered legal assistance for every Pakistani citizen in Urdu and English',
    type: 'website',
    locale: 'en_PK',
    siteName: 'QanoonAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QanoonAI — آپ کا قانونی معاون',
    description: 'Pakistan\'s first AI-powered legal assistant',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#1f2937', color: '#fff', borderRadius: '12px', fontSize: '14px' },
            success: { iconTheme: { primary: '#15803d', secondary: '#fff' } },
            error: { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
          }}
        />
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
