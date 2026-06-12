export const CATEGORIES = [
  { value: 'POS Issue', label: 'POS Issue', icon: '🖥️', description: 'Point-of-sale system crashes, payment failures' },
  { value: 'Delivery Delay', label: 'Delivery Delay', icon: '🚚', description: 'Late deliveries, wrong orders delivered' },
  { value: 'Inventory', label: 'Inventory', icon: '📦', description: 'Stock shortages, expired ingredients' },
  { value: 'Kitchen Equipment', label: 'Kitchen Equipment', icon: '🔧', description: 'Broken grills, fryer issues, refrigeration failures' },
  { value: 'Customer Complaint', label: 'Customer Complaint', icon: '😤', description: 'Negative feedback, refund requests' },
  { value: 'Other', label: 'Other', icon: '📋', description: 'Anything that doesn\'t fit above' },
];

export const SEVERITY_LEVELS = [
  { value: 'Low', label: 'Low', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
  { value: 'Medium', label: 'Medium', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  { value: 'High', label: 'High', color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
  { value: 'Critical', label: 'Critical', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
];

export const STATUSES = [
  { value: 'Open', label: 'Open', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
  { value: 'In Progress', label: 'In Progress', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  { value: 'Resolved', label: 'Resolved', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
  { value: 'Closed', label: 'Closed', color: '#6b7280', bg: 'rgba(107,114,128,0.15)' },
];

export const STORE_LOCATIONS = [
  'California Burrito — Downtown LA',
  'California Burrito — Santa Monica',
  'California Burrito — San Diego',
  'California Burrito — San Francisco',
  'California Burrito — Oakland',
];
