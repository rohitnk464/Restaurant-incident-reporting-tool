'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES, SEVERITY_LEVELS, STORE_LOCATIONS } from '@/lib/constants';
import Toast from './Toast';

export default function IncidentForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    storeLocation: '',
    severity: '',
    reportedAt: new Date().toISOString().slice(0, 16),
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title || form.title.length < 5) newErrors.title = 'Title must be at least 5 characters';
    if (form.title.length > 100) newErrors.title = 'Title must be under 100 characters';
    if (!form.description || form.description.length < 10) newErrors.description = 'Description must be at least 10 characters';
    if (form.description.length > 2000) newErrors.description = 'Description must be under 2000 characters';
    if (!form.category) newErrors.category = 'Please select a category';
    if (!form.storeLocation) newErrors.storeLocation = 'Please select a store location';
    if (!form.severity) newErrors.severity = 'Please select a severity level';
    if (!form.reportedAt) newErrors.reportedAt = 'Please enter date and time';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setToast({ type: 'success', message: '🌯 Incident reported successfully!' });
        setTimeout(() => router.push('/'), 1500);
      } else {
        setToast({ type: 'error', message: data.errors?.join(', ') || 'Failed to submit incident' });
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <form className="incident-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            📝 Incident Title <span className="required">*</span>
          </label>
          <input
            id="title"
            type="text"
            className={`form-input ${errors.title ? 'form-input-error' : ''}`}
            placeholder="e.g., POS Terminal #3 Unresponsive"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            maxLength={100}
          />
          <div className="form-meta">
            {errors.title && <span className="form-error">{errors.title}</span>}
            <span className="char-count">{form.title.length}/100</span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">
            📄 Description <span className="required">*</span>
          </label>
          <textarea
            id="description"
            className={`form-textarea ${errors.description ? 'form-input-error' : ''}`}
            placeholder="Describe the incident in detail... What happened? When? What's the impact?"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={5}
            maxLength={2000}
          />
          <div className="form-meta">
            {errors.description && <span className="form-error">{errors.description}</span>}
            <span className="char-count">{form.description.length}/2000</span>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="category">
              🏷️ Category <span className="required">*</span>
            </label>
            <select
              id="category"
              className={`form-select ${errors.category ? 'form-input-error' : ''}`}
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              <option value="">Select category...</option>
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            {errors.category && <span className="form-error">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="storeLocation">
              📍 Store Location <span className="required">*</span>
            </label>
            <select
              id="storeLocation"
              className={`form-select ${errors.storeLocation ? 'form-input-error' : ''}`}
              value={form.storeLocation}
              onChange={(e) => handleChange('storeLocation', e.target.value)}
            >
              <option value="">Select store...</option>
              {STORE_LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            {errors.storeLocation && <span className="form-error">{errors.storeLocation}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            ⚠️ Severity Level <span className="required">*</span>
          </label>
          <div className="severity-chips">
            {SEVERITY_LEVELS.map(sev => (
              <button
                key={sev.value}
                type="button"
                className={`severity-chip ${form.severity === sev.value ? 'severity-chip-active' : ''}`}
                style={{
                  '--chip-color': sev.color,
                  '--chip-bg': sev.bg,
                }}
                onClick={() => handleChange('severity', sev.value)}
              >
                {sev.label}
              </button>
            ))}
          </div>
          {errors.severity && <span className="form-error">{errors.severity}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reportedAt">
            📅 Date & Time <span className="required">*</span>
          </label>
          <input
            id="reportedAt"
            type="datetime-local"
            className={`form-input ${errors.reportedAt ? 'form-input-error' : ''}`}
            value={form.reportedAt}
            onChange={(e) => handleChange('reportedAt', e.target.value)}
          />
          {errors.reportedAt && <span className="form-error">{errors.reportedAt}</span>}
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? (
            <><span className="spinner"></span> Submitting...</>
          ) : (
            <>🌯 Submit Incident Report</>
          )}
        </button>
      </form>
    </>
  );
}
