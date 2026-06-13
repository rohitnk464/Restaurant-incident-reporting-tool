import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Lock, CheckSquare, PlusCircle, BarChart3, Clock, MapPin, TrendingUp, Users, AlertTriangle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="corp-landing">
      {/* Hero Section */}
      <section className="corp-hero">
        <div className="corp-hero-bg-elements">
          <div className="corp-hero-orb corp-hero-orb-1"></div>
          <div className="corp-hero-orb corp-hero-orb-2"></div>
          <div className="corp-hero-grid-pattern"></div>
        </div>
        <div className="corp-hero-content">
          <div className="corp-badge">
            <span className="corp-badge-dot"></span>
            Official Internal Operations Portal
          </div>
          <h1 className="corp-title">
            Operational Safety <br /> <span className="ampersand">&</span> <span className="corp-highlight">Incident Control</span>
          </h1>
          <p className="corp-subtitle">
            Standardized reporting protocol for all California Burrito regional locations. Ensuring store safety, food compliance, and rapid response through centralized incident management.
          </p>
          <div className="corp-hero-actions">
            <Link href="/report" className="corp-btn corp-btn-primary">
              Report an Incident <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="corp-btn corp-btn-outline">
              Manager Login
            </Link>
          </div>

          {/* Trust badges */}
          <div className="corp-trust-row">
            <div className="corp-trust-item">
              <ShieldCheck size={16} /> SOC 2 Compliant
            </div>
            <div className="corp-trust-item">
              <Lock size={16} /> 256-bit Encryption
            </div>
            <div className="corp-trust-item">
              <Clock size={16} /> 99.9% Uptime
            </div>
          </div>
        </div>
        <div className="corp-hero-image-wrapper">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" alt="Manager reviewing operations" className="corp-hero-img" crossOrigin="anonymous" />
          <div className="corp-system-badge">
            <div className="corp-system-icon"><ShieldCheck size={20} color="white" /></div>
            <div className="corp-system-text">
              <strong>System Online</strong>
              <span>Connected to Regional Hub #4</span>
            </div>
          </div>
          {/* Floating metrics card */}
          <div className="corp-floating-card corp-floating-card-top">
            <TrendingUp size={18} color="#22c55e" />
            <div>
              <strong>94%</strong>
              <span>Resolution Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="corp-marquee-strip">
        <div className="corp-marquee-content">
          <span>🌮 POS Systems</span>
          <span>🚚 Delivery Delays</span>
          <span>📦 Inventory Shortages</span>
          <span>🔧 Equipment Issues</span>
          <span>💬 Customer Complaints</span>
          <span>👥 Staff Incidents</span>
          <span>🌮 POS Systems</span>
          <span>🚚 Delivery Delays</span>
          <span>📦 Inventory Shortages</span>
          <span>🔧 Equipment Issues</span>
          <span>💬 Customer Complaints</span>
          <span>👥 Staff Incidents</span>
        </div>
      </div>

      {/* Features Section */}
      <section className="corp-features-section">
        <div className="corp-section-header">
          <div className="corp-section-tag">Features</div>
          <h2>The Standard for Operational Integrity</h2>
          <p>Built to support floor managers and regional directors with a streamlined reporting ecosystem.</p>
        </div>
        <div className="corp-features-grid">
          <div className="corp-feature-card">
            <div className="corp-feature-icon"><Zap size={24} color="#e61c24" /></div>
            <h3>Fast Reporting</h3>
            <p>File complex incidents in under 120 seconds with our optimized mobile-first entry system.</p>
            <ul className="corp-feature-list">
              <li><CheckSquare size={14} color="#e61c24" />Voice-to-text narratives</li>
              <li><CheckSquare size={14} color="#e61c24" />Instant photo attachments</li>
            </ul>
          </div>
          <div className="corp-feature-card corp-feature-card-featured">
            <div className="corp-featured-label">Most Popular</div>
            <div className="corp-feature-icon"><BarChart3 size={24} color="#e61c24" /></div>
            <h3>Live Analytics</h3>
            <p>Real-time dashboards with severity breakdowns, trend analysis, and category insights for every store.</p>
            <ul className="corp-feature-list">
              <li><CheckSquare size={14} color="#e61c24" />Role-based dashboards</li>
              <li><CheckSquare size={14} color="#e61c24" />Export-ready reports</li>
            </ul>
          </div>
          <div className="corp-feature-card">
            <div className="corp-feature-icon"><Lock size={24} color="#e61c24" /></div>
            <h3>Role-Based Access</h3>
            <p>Secure multi-store data isolation. Store managers see their store; admins see everything.</p>
            <ul className="corp-feature-list">
              <li><CheckSquare size={14} color="#e61c24" />Multi-store support</li>
              <li><CheckSquare size={14} color="#e61c24" />Restricted access roles</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="corp-stats-section">
        <div className="corp-stats-inner">
          <div className="corp-stat">
            <div className="corp-stat-icon"><AlertTriangle size={24} /></div>
            <div className="corp-stat-value">1,240</div>
            <div className="corp-stat-label">REPORTS RESOLVED</div>
          </div>
          <div className="corp-stat">
            <div className="corp-stat-icon"><Clock size={24} /></div>
            <div className="corp-stat-value">15 min</div>
            <div className="corp-stat-label">AVG RESPONSE TIME</div>
          </div>
          <div className="corp-stat">
            <div className="corp-stat-icon"><MapPin size={24} /></div>
            <div className="corp-stat-value">450+</div>
            <div className="corp-stat-label">ACTIVE LOCATIONS</div>
          </div>
          <div className="corp-stat">
            <div className="corp-stat-icon"><Users size={24} /></div>
            <div className="corp-stat-value">100%</div>
            <div className="corp-stat-label">COMPLIANCE SCORE</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="corp-steps-section">
        <div className="corp-section-header">
          <div className="corp-section-tag">How It Works</div>
          <h2>Report in 3 Simple Steps</h2>
          <p>From incident to resolution — streamlined for speed.</p>
        </div>
        <div className="corp-steps-grid">
          <div className="corp-step-card">
            <div className="corp-step-number">01</div>
            <h3>Report</h3>
            <p>Staff files incident via the quick reporting form with category, severity, and optional photo evidence.</p>
          </div>
          <div className="corp-step-connector"></div>
          <div className="corp-step-card">
            <div className="corp-step-number">02</div>
            <h3>Review</h3>
            <p>Managers receive real-time notifications for high-priority alerts and review via the dashboard.</p>
          </div>
          <div className="corp-step-connector"></div>
          <div className="corp-step-card">
            <div className="corp-step-number">03</div>
            <h3>Resolve</h3>
            <p>Track status changes, analyze trends in analytics, and close incidents with full audit history.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="corp-cta-section">
        <div className="corp-cta-inner">
          <h2>Need to document an incident?</h2>
          <p>The sooner we document, the faster we resolve. Use the standardized reporting tool to ensure store safety.</p>
          <div className="corp-cta-actions">
            <Link href="/report" className="corp-cta-btn">
              <PlusCircle size={20} /> Start New Report
            </Link>
            <Link href="/login" className="corp-cta-btn-secondary">
              Manager Dashboard <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="corp-footer">
        <div className="corp-footer-left">
          <strong>California Burrito Operations</strong>
          <p>© 2026 California Burrito Operations. Confidential Internal Use Only.</p>
        </div>
        <div className="corp-footer-right">
          <Link href="#">Support</Link>
          <Link href="#">Safety Policy</Link>
          <Link href="#">Contact Admin</Link>
        </div>
      </footer>
    </div>
  );
}
