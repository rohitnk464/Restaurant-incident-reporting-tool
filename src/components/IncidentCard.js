'use client';
import Link from 'next/link';
import { timeAgo, truncate, getSeverityColor, getStatusColor } from '@/lib/utils';
import CategoryIcon from '@/components/CategoryIcon';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export default function IncidentCard({ incident, index }) {
  const sevColor = getSeverityColor(incident.severity);
  const statColor = getStatusColor(incident.status);

  return (
    <Link
      href={`/incident/${incident.id}`}
      className="premium-incident-card"
      style={{ 
        animationDelay: `${index * 0.05}s`,
        '--severity-color': sevColor,
        '--status-color': statColor
      }}
    >
      <div className="card-top-row">
        <div className="badge-group">
          <span className="premium-badge severity-badge">
            {incident.severity}
          </span>
          <span className="premium-badge status-badge">
            {incident.status}
          </span>
        </div>
        <div className="time-ago-badge" title={new Date(incident.reportedAt).toLocaleString()}>
          <Clock size={12} />
          <span>{timeAgo(incident.reportedAt)}</span>
        </div>
      </div>

      <div className="card-content-area">
        <h3 className="incident-title">
          <span className="category-icon-bg">
            <CategoryIcon category={incident.category} size={16} />
          </span>
          <span className="title-text">{incident.title}</span>
        </h3>
        <p className="incident-desc">{truncate(incident.description, 120)}</p>
      </div>

      <div className="card-bottom-row">
        <span className="category-text-label">{incident.category}</span>
        <div className="store-location-info">
          <MapPin size={13} />
          <span>{incident.storeLocation.replace('California Burrito — ', '')}</span>
        </div>
      </div>
      
      <div className="card-hover-arrow">
        <span>View Details</span>
        <ArrowRight size={14} />
      </div>
    </Link>
  );
}

