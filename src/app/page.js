'use client';
import LandingPage from '@/components/LandingPage';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';
import StatsBar from '@/components/StatsBar';
import FilterBar from '@/components/FilterBar';
import IncidentCard from '@/components/IncidentCard';

export default function Dashboard() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    severity: '',
    status: '',
    search: '',
  });

  const fetchIncidents = async () => {
    try {
      const res = await fetch('/api/incidents');
      const data = await res.json();
      if (data.success) {
        setIncidents(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authStatus === 'authenticated') {
      fetchIncidents();
    }
  }, [authStatus]);

  if (authStatus === 'loading') {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // --- STAFF LANDING PAGE (UNAUTHENTICATED) ---
  if (authStatus === 'unauthenticated') {
    return <LandingPage />;
  }

  // --- MANAGER DASHBOARD (AUTHENTICATED) ---
  // Client-side filtering
  const filteredIncidents = incidents.filter(incident => {
    if (filters.category && incident.category !== filters.category) return false;
    if (filters.severity && incident.severity !== filters.severity) return false;
    if (filters.status && incident.status !== filters.status) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        incident.title.toLowerCase().includes(search) ||
        incident.description.toLowerCase().includes(search)
      );
    }
    return true;
  });

  if (authStatus === 'loading' || loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading dashboard...</p>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') return null;

  const criticalCount = incidents.filter(i => i.severity === 'Critical' && i.status !== 'Resolved' && i.status !== 'Closed').length;
  const highCount = incidents.filter(i => i.severity === 'High' && i.status !== 'Resolved' && i.status !== 'Closed').length;
  const statusColor = criticalCount > 0 ? '#ef4444' : highCount > 0 ? '#f59e0b' : '#22c55e';
  const statusText = criticalCount > 0 ? 'CRITICAL INCIDENTS' : highCount > 0 ? 'WARNING ALERTS' : 'ALL SYSTEMS OPERATIONAL';

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header-panel">
        <div className="dashboard-header-left">
          <div className="system-status-badge">
            <span className="pulse-dot" style={{ backgroundColor: statusColor, boxShadow: `0 0 8px ${statusColor}` }}></span>
            <span className="status-label-text" style={{ color: statusColor }}>{statusText}</span>
          </div>
          <h1 className="page-title">
            Incident Command Center
            <span className="store-tag">
              {session?.user?.role === 'admin' ? 'Global Admin' : session?.user?.storeLocation?.replace('California Burrito — ', '')}
            </span>
          </h1>
          <p className="page-subtitle">
            {session?.user?.role === 'admin' 
              ? 'Real-time operational overview, incident response, and performance analytics across all outlets.'
              : `Operational incident log and resolution console for your store location.`}
          </p>
        </div>
        <div className="dashboard-header-actions">
          <Link href="/report" className="premium-btn primary-btn">
            <PlusCircle size={18} />
            <span>Report Incident</span>
          </Link>
        </div>
      </div>

      <StatsBar incidents={incidents} />
      <FilterBar filters={filters} setFilters={setFilters} />

      {filteredIncidents.length > 0 ? (
        <div className="incidents-grid">
          {filteredIncidents.map((incident, index) => (
            <IncidentCard key={incident.id} incident={incident} index={index} />
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <div className="empty-illustration">
            <div className="empty-orb"></div>
            <span className="empty-emoji">🌯</span>
          </div>
          <h2 className="empty-title">
            {incidents.length === 0 ? 'Clean Slate' : 'No matches found'}
          </h2>
          <p className="empty-text">
            {incidents.length === 0
              ? 'Excellent! No operational incidents recorded. Everything is running smoothly.'
              : 'No incidents match your current search queries or filter selections.'}
          </p>
          {incidents.length === 0 ? (
            <Link href="/report" className="premium-btn primary-btn" style={{ display: 'inline-flex', margin: '0 auto' }}>
              <PlusCircle size={18} />
              <span>Report First Incident</span>
            </Link>
          ) : (
            <button className="premium-btn secondary-btn" onClick={() => setFilters({ category: '', severity: '', status: '', search: '' })} style={{ display: 'inline-flex', margin: '0 auto' }}>
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

