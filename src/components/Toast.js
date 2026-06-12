'use client';
import { useEffect } from 'react';

export default function Toast({ type = 'success', message, link, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, link ? 6000 : 3000);
    return () => clearTimeout(timer);
  }, [onClose, link]);

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{type === 'success' ? '✅' : '⚠️'}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span className="toast-message">{message}</span>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" style={{ color: 'white', fontSize: '0.8rem', textDecoration: 'underline' }}>
            View Email
          </a>
        )}
      </div>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  );
}
