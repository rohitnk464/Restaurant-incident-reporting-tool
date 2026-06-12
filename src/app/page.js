'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FilePlus } from 'lucide-react';
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

  useEffect(() => {
    if (authStatus === 'authenticated') {
      fetchIncidents();
    }
  }, [authStatus]);

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

  if (authStatus === 'loading') {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // --- STAFF LANDING PAGE (UNAUTHENTICATED) ---
  if (authStatus === 'unauthenticated') {
    return (
      <div className="landing-wrapper">
        <div className="floating-element burrito-1">🌯</div>
        <div className="floating-element burrito-2">🌯</div>
        <div className="floating-element burrito-3">🔥</div>
        <div className="floating-element burrito-4">✨</div>
        
        <div className="landing-card">
          <div className="landing-icon-wrapper">
            <div className="landing-icon-pulse"></div>
            <FilePlus size={48} className="landing-main-icon" />
          </div>
          
          <h1 className="landing-title">
            Welcome to <span className="brand-highlight">California Burrito</span>
          </h1>
          
          <p className="landing-subtitle">
            This is the internal portal for reporting store incidents. If you are a staff member needing to log an issue, please click below to start a new report.
          </p>
          
          <Link href="/report" className="landing-btn">
            <FilePlus size={22} />
            <span>Report an Incident</span>
            <div className="btn-glow"></div>
          </Link>
          
          <div className="landing-footer">
            <p>Store Managers: Please use the Manager Login at the top right to access the dashboard.</p>
          </div>
        </div>
      </div>
    );
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

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Incident Dashboard</h1>
        <p className="page-subtitle">
          Monitor and manage operational incidents across all California Burrito locations
        </p>
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
        <div className="empty-state">
          <div className="empty-icon">🌯</div>
          <h2 className="empty-title">
            {incidents.length === 0 ? 'No incidents yet' : 'No matching incidents'}
          </h2>
          <p className="empty-text">
            {incidents.length === 0
              ? 'Everything is running smoothly! Report an incident when something comes up.'
              : 'Try adjusting your filters or search query.'}
          </p>
          {incidents.length === 0 && (
            <Link href="/report" className="submit-btn" style={{ display: 'inline-flex', textDecoration: 'none' }}>
              🌯 Report First Incident
            </Link>
          )}
        </div>
      )}
    </>
  );
}
