'use client';
import { FileText, CircleDashed, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function StatsBar({ incidents }) {
  const total = incidents.length;
  const open = incidents.filter(i => i.status === 'Open').length;
  const inProgress = incidents.filter(i => i.status === 'In Progress').length;
  const critical = incidents.filter(i => i.severity === 'Critical').length;
  const resolved = incidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;

  const stats = [
    { label: 'Total Incidents', value: total, icon: <FileText size={24} color="#a78bfa" />, color: '#a78bfa' },
    { label: 'Open', value: open, icon: <CircleDashed size={24} color="#3b82f6" />, color: '#3b82f6' },
    { label: 'In Progress', value: inProgress, icon: <Clock size={24} color="#f59e0b" />, color: '#f59e0b' },
    { label: 'Critical', value: critical, icon: <AlertTriangle size={24} color="#ef4444" />, color: '#ef4444' },
    { label: 'Resolved', value: resolved, icon: <CheckCircle2 size={24} color="#22c55e" />, color: '#22c55e' },
  ];

  return (
    <div className="stats-bar">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-info">
            <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
