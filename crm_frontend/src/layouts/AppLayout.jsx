import React from 'react';
import { Sidebar } from 'components/Sidebar';
import { Header } from 'components/Header';

/**
 * PUBLIC_INTERFACE
 * AppLayout
 * Top-level layout with sidebar, header, and main content area.
 */
export function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <Header />
      <main className="main">{children}</main>
    </div>
  );
}
