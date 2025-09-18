import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header
 * Responsive top bar with search, notifications, and user settings.
 */
export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="search" role="search">
          <span aria-hidden="true">🔎</span>
          <input placeholder="Search leads, accounts, notes..." aria-label="Search" />
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn" aria-label="Notifications">
          🔔
          <span className="dot" />
        </button>
        <button className="icon-btn" aria-label="Quick actions">➕</button>
        <div className="icon-btn" aria-label="User profile" title="You">
          <span aria-hidden="true">🧑‍💼</span>
        </div>
      </div>
    </header>
  );
}
