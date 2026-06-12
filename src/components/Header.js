'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <span className="logo-icon">🌯</span>
          <div className="logo-text">
            <span className="logo-title">California Burrito</span>
            <span className="logo-subtitle">Incident Reporting</span>
          </div>
        </Link>

        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'nav-link-active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="nav-icon">📊</span>
            Dashboard
          </Link>
          <Link
            href="/report"
            className={`nav-link nav-link-cta ${pathname === '/report' ? 'nav-link-active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="nav-icon">➕</span>
            Report Incident
          </Link>
          
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{session.user.email}</span>
              <button onClick={() => signOut()} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 1rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className={`nav-link ${pathname === '/login' ? 'nav-link-active' : ''}`} style={{ marginLeft: '1rem' }} onClick={() => setMobileMenuOpen(false)}>
              Manager Login
            </Link>
          )}
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'hamburger-open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  );
}
