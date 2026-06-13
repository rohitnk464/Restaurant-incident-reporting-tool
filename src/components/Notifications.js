'use client';
import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [unread, setUnread] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchIncidents();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchIncidents = async () => {
    try {
      const res = await fetch('/api/incidents');
      const json = await res.json();
      if (json.success) {
        // Filter high/critical incidents that are open
        const urgent = json.data.filter(
          i => (i.severity === 'High' || i.severity === 'Critical') && i.status === 'Open'
        ).slice(0, 5); // Take top 5 recent
        setIncidents(urgent);
        setUnread(urgent.length);
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  const toggleDropdown = () => {
    setOpen(!open);
    if (!open) {
      setUnread(0); // Clear badge on open
    }
  };

  return (
    <div className="notifications-wrapper" ref={dropdownRef}>
      <button className="notifications-btn" onClick={toggleDropdown} title="Notifications">
        <Bell size={20} />
        {unread > 0 && <span className="notifications-badge">{unread}</span>}
      </button>

      {open && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h4>Urgent Alerts</h4>
          </div>
          <div className="notifications-list">
            {incidents.length === 0 ? (
              <div className="notifications-empty">No urgent incidents.</div>
            ) : (
              incidents.map(inc => (
                <Link href={`/incident/${inc.id}`} key={inc.id} className="notification-item" onClick={() => setOpen(false)}>
                  <div className={`notification-dot ${inc.severity === 'Critical' ? 'dot-critical' : 'dot-high'}`}></div>
                  <div className="notification-content">
                    <p className="notification-title">{inc.title}</p>
                    <span className="notification-store">{inc.storeLocation}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
