'use client';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { formatDate, getCategoryIcon, getSeverityColor, getStatusColor } from '@/lib/utils';
import { STATUSES } from '@/lib/constants';
import Toast from '@/components/Toast';

export default function IncidentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { status: authStatus } = useSession();
  
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/login');
    }
  }, [authStatus, router]);

  const fetchIncident = useCallback(async () => {
    try {
      const res = await fetch(`/api/incidents/${id}`);
      const data = await res.json();
      if (data.success) {
        setIncident(data.data);
      } else {
        setToast({ type: 'error', message: 'Incident not found' });
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to load incident' });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchIncident();
  }, [fetchIncident]);

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`/api/incidents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setIncident(data.data);
        setToast({ type: 'success', message: `Status updated to "${newStatus}"` });
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to update status' });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this incident? This cannot be undone.')) return;

    try {
      const res = await fetch(`/api/incidents/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setToast({ type: 'success', message: 'Incident deleted' });
        setTimeout(() => router.push('/'), 1000);
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to delete incident' });
    }
  };

  const handleGenerateAISummary = async () => {
    setAiLoading(true);
    setAiError('');
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incidentId: id }),
      });
      const data = await res.json();
      if (data.success) {
        setIncident(prev => ({ ...prev, aiSummary: data.data.summary }));
        setToast({ type: 'success', message: '✨ AI summary generated!' });
      } else {
        setAiError(data.error || 'Failed to generate summary');
      }
    } catch (error) {
      setAiError('Network error. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading || authStatus === 'loading') {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading incident details...</p>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') return null;

  if (!incident) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h2 className="empty-title">Incident Not Found</h2>
        <p className="empty-text">This incident may have been deleted or doesn&apos;t exist.</p>
        <Link href="/" className="submit-btn" style={{ display: 'inline-flex', textDecoration: 'none' }}>
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <Link href="/" className="back-link">
        ← Back to Dashboard
      </Link>

      <div className="detail-card">
        <div className="detail-card-accent"></div>
        <div className="detail-content">
          <div className="detail-header">
            <div className="detail-title-section">
              <h1 className="detail-title">
                {getCategoryIcon(incident.category)} {incident.title}
              </h1>
              <div className="detail-badges">
                <span
                  className="badge severity-badge"
                  style={{
                    color: getSeverityColor(incident.severity),
                    backgroundColor: getSeverityColor(incident.severity) + '20',
                    borderColor: getSeverityColor(incident.severity) + '40',
                  }}
                >
                  {incident.severity}
                </span>
                <span
                  className="badge status-badge"
                  style={{
                    color: getStatusColor(incident.status),
                    backgroundColor: getStatusColor(incident.status) + '20',
                    borderColor: getStatusColor(incident.status) + '40',
                  }}
                >
                  {incident.status}
                </span>
              </div>
            </div>

            <div className="detail-status-control">
              <span className="status-label">Update Status</span>
              <select
                className="status-select"
                value={incident.status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                {STATUSES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Category</span>
              <span className="meta-value">{getCategoryIcon(incident.category)} {incident.category}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Store Location</span>
              <span className="meta-value">📍 {incident.storeLocation}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Reported At</span>
              <span className="meta-value">{formatDate(incident.reportedAt)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Last Updated</span>
              <span className="meta-value">{formatDate(incident.updatedAt)}</span>
            </div>
          </div>

          <div className="detail-description">
            <h3>📝 Incident Description</h3>
            <p>{incident.description}</p>
          </div>

          {incident.imageUrl && (
            <div className="detail-image" style={{ marginTop: '2rem' }}>
              <h3>📸 Attached Photo</h3>
              <img 
                src={incident.imageUrl} 
                alt="Incident attachment" 
                style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} 
              />
            </div>
          )}

          {/* AI Summary Section */}
          <div className="ai-section">
            <h3>🤖 AI-Powered Analysis</h3>
            {incident.aiSummary ? (
              <div className="ai-summary-content">
                {incident.aiSummary}
              </div>
            ) : (
              <>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-md)' }}>
                  Generate an AI-powered summary with impact analysis and recommended actions.
                </p>
                <button
                  className="ai-generate-btn"
                  onClick={handleGenerateAISummary}
                  disabled={aiLoading}
                >
                  {aiLoading ? (
                    <><span className="spinner"></span> Analyzing...</>
                  ) : (
                    <>✨ Generate AI Summary</>
                  )}
                </button>
                {aiError && <p className="ai-error">⚠️ {aiError}</p>}
              </>
            )}
          </div>

          {/* Delete Section */}
          <div className="delete-section">
            <button className="delete-btn" onClick={handleDelete}>
              🗑️ Delete Incident
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
