'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatsBar from '@/components/StatsBar';
import FilterBar from '@/components/FilterBar';
import IncidentCard from '@/components/IncidentCard';

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    severity: '',
    status: '',
    search: '',
  });

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const res = await fetch('/api/incidents');
      const data = await res.json();
      if (data.success) {
        setIncidents(data.data);
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading incidents...</p>
      </div>
    );
  }

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
