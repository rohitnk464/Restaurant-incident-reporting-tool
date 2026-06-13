'use client';
import { FileText, CircleDashed, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function StatsBar({ incidents }) {
  const total = incidents.length;
  const open = incidents.filter(i => i.status === 'Open').length;
  const inProgress = incidents.filter(i => i.status === 'In Progress').length;
  const critical = incidents.filter(i => i.severity === 'Critical').length;
  const resolved = incidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;

  const stats = [
    { label: 'Total Logs', value: total, icon: <FileText size={20} />, color: '#a78bfa' },
    { label: 'Open', value: open, icon: <CircleDashed size={20} />, color: '#3b82f6' },
    { label: 'In Progress', value: inProgress, icon: <Clock size={20} />, color: '#f59e0b' },
    { label: 'Critical', value: critical, icon: <AlertTriangle size={20} />, color: '#ef4444' },
    { label: 'Resolved', value: resolved, icon: <CheckCircle2 size={20} />, color: '#22c55e' },
  ];

  return (
    <div className="stats-bar-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="premium-stat-card" style={{ '--stat-color': stat.color }}>
          <div className="stat-card-glow"></div>
          <div className="stat-icon-container">
            {stat.icon}
          </div>
          <div className="stat-card-details">
            <span className="stat-card-value">{stat.value}</span>
            <span className="stat-card-label">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

