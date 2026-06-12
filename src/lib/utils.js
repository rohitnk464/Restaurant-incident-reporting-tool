export function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function truncate(str, maxLen = 120) {
  if (!str) return '';
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trim() + '...';
}

export function getCategoryIcon(category) {
  const icons = {
    'POS Issue': '🖥️',
    'Delivery Delay': '🚚',
    'Inventory': '📦',
    'Kitchen Equipment': '🔧',
    'Customer Complaint': '😤',
    'Other': '📋',
  };
  return icons[category] || '📋';
}

export function getSeverityColor(severity) {
  const colors = {
    'Low': '#22c55e',
    'Medium': '#f59e0b',
    'High': '#f97316',
    'Critical': '#ef4444',
  };
  return colors[severity] || '#6b7280';
}

export function getStatusColor(status) {
  const colors = {
    'Open': '#3b82f6',
    'In Progress': '#f59e0b',
    'Resolved': '#22c55e',
    'Closed': '#6b7280',
  };
  return colors[status] || '#6b7280';
}
