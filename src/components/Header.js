'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from '@/components/ThemeToggle';
import Notifications from '@/components/Notifications';
import { Flame } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          <span className="logo-icon" style={{ display: 'flex' }}>
            <img 
              src="/logo.png" 
              alt="California Burrito" 
              style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
            />
          </span>
          <div className="logo-text">
            <span className="logo-title">California Burrito</span>
            <span className="logo-subtitle">Incident Reporting</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link href="/report" className={`nav-link ${pathname === '/report' ? 'active' : ''}`}>
            Report Incident
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--color-border)' }}>
            <ThemeToggle />
          </div>

          {session ? (
            <>
              <Link href="/analytics" className={`nav-link ${pathname === '/analytics' ? 'active' : ''}`}>
                Analytics
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--color-border)' }}>
                <Notifications />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.2' }}>
                  <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: '600' }}>
                    {session.user.role === 'admin' ? 'Global Admin' : 'Store Manager'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {session.user.role === 'admin' ? 'All Locations' : session.user.storeLocation?.replace('California Burrito — ', '') || 'Local Store'}
                  </span>
                </div>
                <button onClick={() => signOut()} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 1rem' }}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link href="/login" className={`nav-link ${pathname === '/login' ? 'active' : ''}`} style={{ marginLeft: '1rem' }}>
              Manager Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="mobile-nav">
          <div style={{ padding: '1rem' }}>
             <ThemeToggle />
          </div>
          <Link href="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Dashboard
          </Link>
          <Link href="/report" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Report Incident
          </Link>
            {session ? (
              <>
                <Link href="/analytics" className={`nav-link ${pathname === '/analytics' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                  Analytics
                </Link>
                <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '1rem' }}>
                  Logout ({session.user.email})
                </button>
              </>
            ) : (
            <Link href="/login" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Manager Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
