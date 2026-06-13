'use client';
import { Search, Tag, AlertTriangle, Activity, X } from 'lucide-react';
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
    <div className="premium-filter-bar">
      <div className="filter-grid">
        <div className="search-field-wrapper">
          <Search size={18} className="search-prefix-icon" />
          <input
            type="text"
            placeholder="Search incident titles or descriptions..."
            className="premium-search-input"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />
          {filters.search && (
            <button
              className="premium-search-clear"
              onClick={() => handleChange('search', '')}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="select-filters-group">
          <div className="select-wrapper">
            <Tag size={16} className="select-prefix-icon" />
            <select
              className="premium-select"
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <AlertTriangle size={16} className="select-prefix-icon" />
            <select
              className="premium-select"
              value={filters.severity}
              onChange={(e) => handleChange('severity', e.target.value)}
            >
              <option value="">All Severities</option>
              {SEVERITY_LEVELS.map(sev => (
                <option key={sev.value} value={sev.value}>{sev.label}</option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <Activity size={16} className="select-prefix-icon" />
            <select
              className="premium-select"
              value={filters.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="">All Statuses</option>
              {STATUSES.map(st => (
                <option key={st.value} value={st.value}>{st.label}</option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <button className="premium-clear-btn" onClick={clearFilters}>
            <X size={16} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}

