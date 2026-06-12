import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Lock, CheckSquare, PlusCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="corp-landing">
      {/* Hero Section */}
      <section className="corp-hero">
        <div className="corp-hero-content">
          <div className="corp-badge">
            <ShieldCheck size={16} /> Official Internal Operations Portal
          </div>
          <h1 className="corp-title">
            Operational Safety <br /> & <span className="corp-highlight">Incident Control</span>
          </h1>
          <p className="corp-subtitle">
            Standardized reporting protocol for all California Burrito regional locations. Ensuring store safety, food compliance, and rapid response through centralized incident management.
          </p>
          <div className="corp-hero-actions">
            <Link href="/report" className="corp-btn corp-btn-primary">
              Report an Incident <ArrowRight size={18} />
            </Link>
            <button className="corp-btn corp-btn-outline">
              View Protocols
            </button>
          </div>
        </div>
        <div className="corp-hero-image-wrapper">
          <img src="/hero_bg.png" alt="Manager using tablet" className="corp-hero-img" />
          <div className="corp-system-badge">
            <div className="corp-system-icon"><ShieldCheck size={20} color="white" /></div>
            <div className="corp-system-text">
              <strong>System Online</strong>
              <span>Connected to Regional Hub #4</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="corp-features-section">
        <div className="corp-section-header">
          <h2>The Standard for Operational Integrity</h2>
          <p>Built to support floor managers and regional directors with a streamlined reporting ecosystem.</p>
        </div>
        <div className="corp-features-grid">
          {/* Feature 1 */}
          <div className="corp-feature-card">
            <div className="corp-feature-icon"><Zap size={24} color="#e61c24" /></div>
            <h3>Fast Reporting</h3>
            <p>File complex incidents in under 120 seconds with our optimized mobile-first entry system.</p>
            <ul className="corp-feature-list">
              <li><CheckSquare size={14} color="#e61c24" /> Voice-to-text narratives</li>
              <li><CheckSquare size={14} color="#e61c24" /> Instant photo attachments</li>
            </ul>
          </div>
          {/* Feature 2 */}
          <div className="corp-feature-card">
            <div className="corp-feature-icon"><Lock size={24} color="#e61c24" /></div>
            <h3>Secure & Private</h3>
            <p>Enterprise-grade encryption for all internal communications and sensitive personnel data.</p>
            <ul className="corp-feature-list">
              <li><CheckSquare size={14} color="#e61c24" /> Single Sign-On (SSO)</li>
              <li><CheckSquare size={14} color="#e61c24" /> Restricted Access Roles</li>
            </ul>
          </div>
          {/* Feature 3 */}
          <div className="corp-feature-card">
            <div className="corp-feature-icon"><CheckSquare size={24} color="#e61c24" /></div>
            <h3>Compliance Ready</h3>
            <p>Automatic OSHA and regional health department formatting for immediate export.</p>
            <ul className="corp-feature-list">
              <li><CheckSquare size={14} color="#e61c24" /> Regulatory Auto-updates</li>
              <li><CheckSquare size={14} color="#e61c24" /> Audit-ready logs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="corp-stats-section">
        <div className="corp-stat">
          <div className="corp-stat-value">1,240</div>
          <div className="corp-stat-label">REPORTS RESOLVED</div>
        </div>
        <div className="corp-stat">
          <div className="corp-stat-value">15 min</div>
          <div className="corp-stat-label">AVG RESPONSE TIME</div>
        </div>
        <div className="corp-stat">
          <div className="corp-stat-value">450+</div>
          <div className="corp-stat-label">ACTIVE LOCATIONS</div>
        </div>
        <div className="corp-stat">
          <div className="corp-stat-value">100%</div>
          <div className="corp-stat-label">COMPLIANCE SCORE</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="corp-cta-section">
        <h2>Need to document an incident?</h2>
        <p>The sooner we document, the faster we resolve. Use the standardized reporting tool to ensure store safety.</p>
        <Link href="/report" className="corp-cta-btn">
          <PlusCircle size={20} /> Start New Report
        </Link>
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
