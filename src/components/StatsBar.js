'use client';

export default function StatsBar({ incidents }) {
  const total = incidents.length;
  const open = incidents.filter(i => i.status === 'Open').length;
  const inProgress = incidents.filter(i => i.status === 'In Progress').length;
  const critical = incidents.filter(i => i.severity === 'Critical').length;
  const resolved = incidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;

  const stats = [
    { label: 'Total Incidents', value: total, icon: '📋', color: '#a78bfa' },
    { label: 'Open', value: open, icon: '🔵', color: '#3b82f6' },
    { label: 'In Progress', value: inProgress, icon: '🟡', color: '#f59e0b' },
    { label: 'Critical', value: critical, icon: '🔴', color: '#ef4444' },
    { label: 'Resolved', value: resolved, icon: '✅', color: '#22c55e' },
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
