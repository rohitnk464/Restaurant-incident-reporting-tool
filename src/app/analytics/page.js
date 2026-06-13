'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d54'];

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/incidents');
      const json = await res.json();
      if (json.success) {
        setIncidents(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch analytics data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading analytics dashboard...</p>
      </div>
    );
  }

  // --- Data Processing ---

  // Severity Distribution
  const severityData = incidents.reduce((acc, inc) => {
    const existing = acc.find(item => item.name === inc.severity);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: inc.severity, value: 1 });
    }
    return acc;
  }, []);

  // Category Distribution
  const categoryData = incidents.reduce((acc, inc) => {
    const existing = acc.find(item => item.name === inc.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: inc.category, value: 1 });
    }
    return acc;
  }, []);

  // Status Distribution
  const statusData = incidents.reduce((acc, inc) => {
    const existing = acc.find(item => item.name === inc.status);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: inc.status, value: 1 });
    }
    return acc;
  }, []);

  // Helper to format date in local YYYY-MM-DD format
  const getLocalDateString = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Trend over time (last 7 days grouped by local date string)
  const trendMap = {};
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = getLocalDateString(d);
    trendMap[dateStr] = 0;
  }
  
  incidents.forEach(inc => {
    const dateStr = getLocalDateString(inc.reportedAt);
    if (trendMap[dateStr] !== undefined) {
      trendMap[dateStr] += 1;
    }
  });
  
  const trendData = Object.keys(trendMap).map(date => ({
    date: date.substring(5), // Show MM-DD
    incidents: trendMap[date]
  }));

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Incident Analytics {session?.user?.role === 'admin' ? '(Global)' : `(${session?.user?.storeLocation?.replace('California Burrito — ', '')})`}</h1>
        <p>
          {session?.user?.role === 'admin' 
            ? 'Deep insights into operational performance across all stores.'
            : 'Deep insights into your store\'s operational performance.'}
        </p>
      </div>

      <div className="analytics-grid">
        {/* Trend Chart */}
        <div className="chart-card full-width">
          <h3>Incident Trend (Last 7 Days)</h3>
          <div className="chart-wrapper" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="incidents" stroke="var(--color-primary)" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Chart */}
        <div className="chart-card">
          <h3>Incidents by Severity</h3>
          <div className="chart-wrapper" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#ff4d54" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Chart */}
        <div className="chart-card">
          <h3>Incidents by Category</h3>
          <div className="chart-wrapper" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Status Chart */}
        <div className="chart-card">
          <h3>Current Status Distribution</h3>
          <div className="chart-wrapper" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="name" type="category" />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#00C49F" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
