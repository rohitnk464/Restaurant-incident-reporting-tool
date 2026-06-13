'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES, SEVERITY_LEVELS, STORE_LOCATIONS } from '@/lib/constants';
import Toast from './Toast';
import { FileText, Tag, MapPin, Calendar, Image, Send, AlertTriangle } from 'lucide-react';

export default function IncidentForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  // Helper to get local date string in YYYY-MM-DDTHH:MM format
  const getLocalISOString = () => {
    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    return new Date(Date.now() - tzOffset).toISOString().slice(0, 16);
  };

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    storeLocation: '',
    severity: '',
    imageUrl: '',
    reportedAt: getLocalISOString(),
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
      const payload = {
        ...form,
        reportedAt: new Date(form.reportedAt).toISOString(),
      };

      const res = await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        let msg = '🌯 Incident reported successfully!';
        if (data.emailPreviewUrl) {
           msg += ' (Email Alert Sent!)';
           console.log('Manager Email Preview: ', data.emailPreviewUrl);
        }
        setToast({ type: 'success', message: msg, link: data.emailPreviewUrl });
        setTimeout(() => router.push('/'), data.emailPreviewUrl ? 4000 : 1500);
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
      <form className="premium-incident-form" onSubmit={handleSubmit}>
        <div className="form-group-panel">
          <label className="premium-form-label" htmlFor="title">
            <FileText size={16} />
            <span>Incident Title <span className="required-star">*</span></span>
          </label>
          <input
            id="title"
            type="text"
            className={`premium-form-input ${errors.title ? 'premium-input-error' : ''}`}
            placeholder="e.g., Main POS Screen Unresponsive"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            maxLength={100}
          />
          <div className="premium-form-meta">
            {errors.title && <span className="premium-validation-error">{errors.title}</span>}
            <span className="premium-char-counter">{form.title.length}/100</span>
          </div>
        </div>

        <div className="form-group-panel">
          <label className="premium-form-label" htmlFor="description">
            <FileText size={16} />
            <span>Incident Description <span className="required-star">*</span></span>
          </label>
          <textarea
            id="description"
            className={`premium-form-textarea ${errors.description ? 'premium-input-error' : ''}`}
            placeholder="Provide a detailed description of the incident... What happened? How does it impact restaurant operations?"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={5}
            maxLength={2000}
          />
          <div className="premium-form-meta">
            {errors.description && <span className="premium-validation-error">{errors.description}</span>}
            <span className="premium-char-counter">{form.description.length}/2000</span>
          </div>
        </div>

        <div className="form-grid-row">
          <div className="form-group-panel">
            <label className="premium-form-label" htmlFor="category">
              <Tag size={16} />
              <span>Category <span className="required-star">*</span></span>
            </label>
            <div className="form-select-wrapper">
              <select
                id="category"
                className={`premium-form-select ${errors.category ? 'premium-input-error' : ''}`}
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="">Select category...</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && <span className="premium-validation-error">{errors.category}</span>}
          </div>

          <div className="form-group-panel">
            <label className="premium-form-label" htmlFor="storeLocation">
              <MapPin size={16} />
              <span>Store Location <span className="required-star">*</span></span>
            </label>
            <div className="form-select-wrapper">
              <select
                id="storeLocation"
                className={`premium-form-select ${errors.storeLocation ? 'premium-input-error' : ''}`}
                value={form.storeLocation}
                onChange={(e) => handleChange('storeLocation', e.target.value)}
              >
                <option value="">Select store location...</option>
                {STORE_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            {errors.storeLocation && <span className="premium-validation-error">{errors.storeLocation}</span>}
          </div>
        </div>

        <div className="form-group-panel">
          <label className="premium-form-label">
            <AlertTriangle size={16} />
            <span>Severity Level <span className="required-star">*</span></span>
          </label>
          <div className="premium-severity-selector">
            {SEVERITY_LEVELS.map(sev => (
              <button
                key={sev.value}
                type="button"
                className={`premium-severity-chip-btn ${form.severity === sev.value ? 'chip-active' : ''}`}
                style={{
                  '--chip-color': sev.color,
                  '--chip-bg': sev.bg,
                }}
                onClick={() => handleChange('severity', sev.value)}
              >
                <span className="severity-chip-dot"></span>
                <span>{sev.label}</span>
              </button>
            ))}
          </div>
          {errors.severity && <span className="premium-validation-error">{errors.severity}</span>}
        </div>

        <div className="form-group-panel">
          <label className="premium-form-label" htmlFor="reportedAt">
            <Calendar size={16} />
            <span>Date & Time of Occurrence <span className="required-star">*</span></span>
          </label>
          <input
            id="reportedAt"
            type="datetime-local"
            className={`premium-form-input ${errors.reportedAt ? 'premium-input-error' : ''}`}
            value={form.reportedAt}
            onChange={(e) => handleChange('reportedAt', e.target.value)}
          />
          {errors.reportedAt && <span className="premium-validation-error">{errors.reportedAt}</span>}
        </div>

        <div className="form-group-panel">
          <label className="premium-form-label">
            <Image size={16} />
            <span>Attach Photo (Optional)</span>
          </label>
          <div className="premium-file-drag-area">
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="premium-hidden-file-input"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (file.size > 2 * 1024 * 1024) {
                    setToast({ type: 'error', message: 'Image must be less than 2MB' });
                    e.target.value = '';
                    return;
                  }
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleChange('imageUrl', reader.result);
                  };
                  reader.readAsDataURL(file);
                } else {
                  handleChange('imageUrl', '');
                }
              }}
            />
            <label htmlFor="imageUpload" className="premium-file-upload-trigger">
              <div className="trigger-icon-bg">
                <Image size={24} />
              </div>
              <div className="trigger-main-text">
                {form.imageUrl ? '✓ Photo Attached Successfully' : 'Select a photo to attach'}
              </div>
              <div className="trigger-sub-text">
                Supports JPG, PNG up to 2MB size
              </div>
            </label>
          </div>
          {form.imageUrl && (
            <div className="premium-file-preview-card">
              <img src={form.imageUrl} alt="Uploaded attachment preview" />
              <button 
                type="button" 
                className="remove-preview-btn"
                onClick={() => handleChange('imageUrl', '')}
              >
                Remove Photo
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="premium-submit-action-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="premium-loading-spinner-circle"></span>
              <span>Submitting Report...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Submit Incident Report</span>
            </>
          )}
        </button>
      </form>
    </>
  );
}

