'use client';
import { CATEGORIES, SEVERITY_LEVELS, STATUSES } from '@/lib/constants';

export default function FilterBar({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: '', severity: '', status: '', search: '' });
  };

  const hasActiveFilters = filters.category || filters.severity || filters.status || filters.search;

  return (
    <div className="filter-bar">
      <div className="filter-row">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search incidents..."
            className="search-input"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />
          {filters.search && (
            <button
              className="search-clear"
              onClick={() => handleChange('search', '')}
            >
              ✕
            </button>
          )}
        </div>

        <div className="filter-selects">
          <select
            className="filter-select"
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filters.severity}
            onChange={(e) => handleChange('severity', e.target.value)}
          >
            <option value="">All Severities</option>
            {SEVERITY_LEVELS.map(sev => (
              <option key={sev.value} value={sev.value}>{sev.label}</option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            {STATUSES.map(st => (
              <option key={st.value} value={st.value}>{st.label}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            ✕ Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
