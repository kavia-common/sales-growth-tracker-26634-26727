import React from 'react';
import { NavLink } from 'react-router-dom';

const LinkItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
  >
    <span aria-hidden="true">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * Vertical navigation with branded header and grouped links.
 */
export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="brand" title="Ocean CRM">
        <span aria-hidden="true">🌊</span>
        <span>Ocean CRM</span>
        <span className="badge">Pro</span>
      </div>

      <nav className="nav-section">
        <div className="nav-title">Overview</div>
        <LinkItem to="/" icon="📊" label="Dashboard" />
        <LinkItem to="/pipeline" icon="🧭" label="Pipeline" />
        <LinkItem to="/leads" icon="🧲" label="Leads" />
      </nav>

      <nav className="nav-section">
        <div className="nav-title">Insights</div>
        <LinkItem to="/reports" icon="📈" label="Reports" />
        <LinkItem to="/analytics" icon="📐" label="Analytics" />
      </nav>

      <nav className="nav-section">
        <div className="nav-title">Team</div>
        <LinkItem to="/team" icon="👥" label="Team" />
        <LinkItem to="/settings" icon="⚙️" label="Settings" />
      </nav>
    </aside>
  );
}
