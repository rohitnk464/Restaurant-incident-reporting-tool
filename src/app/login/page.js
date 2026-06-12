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
    <div className="login-container">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="login-card">
        <div className="login-header">
          <h2>Manager Login</h2>
          <p>Sign in to access the incident dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="incident-form">
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

          <button type="submit" className="submit-btn" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? <span className="spinner"></span> : 'Login'}
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Demo Admin:</strong> admin@californiaburrito.com / admin123</p>
        </div>
      </div>
    </div>
  );
}
