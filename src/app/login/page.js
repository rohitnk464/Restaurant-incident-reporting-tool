'use client';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';
import { Shield, Store, Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeRole, setActiveRole] = useState('admin');
  const [form, setForm] = useState({
    email: 'admin@californiaburrito.com',
    password: 'admin123',
  });

  useEffect(() => {
    if (activeRole === 'admin') {
      setForm({ email: 'admin@californiaburrito.com', password: 'admin123' });
    } else {
      setForm({ email: 'dtla@californiaburrito.com', password: 'manager123' });
    }
  }, [activeRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.error) {
      setToast({ type: 'error', message: 'Invalid email or password' });
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: 'calc(100vh - 70px)',
      marginLeft: 'calc(-50vw + 50%)',
      marginTop: 'calc(var(--space-lg) * -1)',
      marginBottom: 'calc(var(--space-3xl) * -1)',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.75)), url('/login_bg.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-lg)',
    }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="login-card" style={{
        background: 'var(--color-bg-card)',
        padding: '3rem 2.5rem',
        borderRadius: 'var(--radius-xl)',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), var(--shadow-glow)',
        width: '100%',
        maxWidth: '450px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px)',
        transition: 'transform var(--transition-base)',
      }}>
        <div className="login-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '2.2rem', 
            fontWeight: 800,
            color: 'var(--color-text)', 
            marginBottom: '0.75rem',
            letterSpacing: '-0.5px'
          }}>
            System Login
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Select your role to access the portal
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div style={{ 
          display: 'flex', 
          background: 'var(--color-bg-secondary)', 
          borderRadius: 'var(--radius-md)', 
          padding: '6px', 
          marginBottom: '2rem',
          border: '1px solid var(--color-border)',
        }}>
          <button
            type="button"
            onClick={() => setActiveRole('admin')}
            style={{
              flex: 1, 
              padding: '0.8rem 1rem', 
              borderRadius: 'var(--radius-sm)', 
              border: 'none', 
              cursor: 'pointer', 
              fontWeight: '700', 
              transition: 'all var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: activeRole === 'admin' ? 'var(--color-primary)' : 'transparent',
              color: activeRole === 'admin' ? '#ffffff' : 'var(--color-text-muted)',
              boxShadow: activeRole === 'admin' ? '0 4px 14px rgba(230,28,36,0.35)' : 'none',
              transform: activeRole === 'admin' ? 'scale(1.02)' : 'none',
            }}
          >
            <Shield size={16} />
            Global Admin
          </button>
          <button
            type="button"
            onClick={() => setActiveRole('manager')}
            style={{
              flex: 1, 
              padding: '0.8rem 1rem', 
              borderRadius: 'var(--radius-sm)', 
              border: 'none', 
              cursor: 'pointer', 
              fontWeight: '700', 
              transition: 'all var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: activeRole === 'manager' ? 'var(--color-primary)' : 'transparent',
              color: activeRole === 'manager' ? '#ffffff' : 'var(--color-text-muted)',
              boxShadow: activeRole === 'manager' ? '0 4px 14px rgba(230,28,36,0.35)' : 'none',
              transform: activeRole === 'manager' ? 'scale(1.02)' : 'none',
            }}
          >
            <Store size={16} />
            Store Manager
          </button>
        </div>

        {activeRole === 'manager' && (
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '1.5rem', 
            fontSize: '0.82rem', 
            color: 'var(--color-text-muted)',
            padding: '10px',
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-sm)',
            border: '1px dashed var(--color-border)',
            lineHeight: '1.4'
          }}>
            Auto-filled: <strong>Downtown LA</strong> credentials.<br/>
            <span style={{ fontSize: '0.75rem' }}>Other managers (sm, sd, sf, oakland) also active.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ background: 'transparent', padding: 0, border: 'none', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group-panel">
            <label className="premium-form-label" htmlFor="email">
              <Mail size={16} />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="premium-form-input"
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="name@californiaburrito.com"
              required
            />
          </div>

          <div className="form-group-panel">
            <label className="premium-form-label" htmlFor="password">
              <Lock size={16} />
              Password
            </label>
            <input
              id="password"
              type="password"
              className="premium-form-input"
              value={form.password}
              onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="premium-btn primary-btn" 
            disabled={loading} 
            style={{ 
              marginTop: '1rem', 
              width: '100%', 
              padding: '14px', 
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
