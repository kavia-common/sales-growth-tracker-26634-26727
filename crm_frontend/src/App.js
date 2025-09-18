import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'styles.css';
import { applyTheme } from 'src/theme';
import Dashboard from 'src/pages/Dashboard';
import Pipeline from 'src/pages/Pipeline';
import Leads from 'src/pages/Leads';
import Reports from 'src/pages/Reports';
import Analytics from 'src/pages/Analytics';
import Team from 'src/pages/Team';
import Settings from 'src/pages/Settings';

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
