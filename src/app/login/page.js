'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

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
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('/login_bg.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="login-card" style={{
        background: 'var(--color-bg-card)',
        padding: '3rem',
        borderRadius: 'var(--radius-xl)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        width: '100%',
        maxWidth: '440px',
        border: '1px solid var(--color-border)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="login-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>Manager Login</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>Sign in to access the incident dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="incident-form" style={{ background: 'transparent', padding: 0, border: 'none', boxShadow: 'none' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="admin@californiaburrito.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={form.password}
              onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading} style={{ marginTop: '1.5rem', width: '100%', padding: '12px' }}>
            {loading ? <span className="spinner"></span> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
