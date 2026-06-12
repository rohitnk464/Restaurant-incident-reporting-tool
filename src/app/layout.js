import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import AuthProvider from '@/components/AuthProvider';
import ThemeProvider from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata = {
  title: 'California Burrito — Incident Reporting Tool',
  description: 'Real-time incident tracking and reporting system for California Burrito restaurant chain.',
  keywords: 'restaurant, incident reporting, QSR, California Burrito, operations',
  openGraph: {
    title: 'California Burrito — Incident Reporting Tool',
    description: 'Real-time incident tracking and reporting system for California Burrito restaurant chain.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Header />
            <main className="page-container">
              {children}
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
