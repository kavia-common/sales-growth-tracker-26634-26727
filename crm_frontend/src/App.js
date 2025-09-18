import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'styles.css';
import { applyTheme } from 'theme';
import Dashboard from 'pages/Dashboard';
import Pipeline from 'pages/Pipeline';
import Leads from 'pages/Leads';
import Reports from 'pages/Reports';
import Analytics from 'pages/Analytics';
import Team from 'pages/Team';
import Settings from 'pages/Settings';

/**
 * PUBLIC_INTERFACE
 * App
 * Root component with routing across CRM sections.
 */
function App() {
  useEffect(() => { applyTheme(); }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
