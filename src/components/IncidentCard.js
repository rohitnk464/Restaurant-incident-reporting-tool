'use client';
import Link from 'next/link';
import { timeAgo, truncate, getSeverityColor, getStatusColor } from '@/lib/utils';
import CategoryIcon from '@/components/CategoryIcon';
import { MapPin } from 'lucide-react';

export default function IncidentCard({ incident, index }) {
  return (
    <Link
      href={`/incident/${incident.id}`}
      className="incident-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="card-header">
        <div className="card-badges">
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
        <span className="card-time" title={new Date(incident.reportedAt).toLocaleString()}>
          {timeAgo(incident.reportedAt)}
        </span>
      </div>

      <div className="card-body">
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="card-category-icon" style={{ display: 'flex', color: 'var(--color-primary)' }}>
            <CategoryIcon category={incident.category} size={20} />
          </span>
          {incident.title}
        </h3>
        <p className="card-description">{truncate(incident.description)}</p>
      </div>

      <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="card-category">{incident.category}</span>
        <span className="card-store" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
          <MapPin size={14} color="var(--color-primary)" />
          {incident.storeLocation.replace('California Burrito — ', '')}
        </span>
      </div>
    </Link>

  );
}
