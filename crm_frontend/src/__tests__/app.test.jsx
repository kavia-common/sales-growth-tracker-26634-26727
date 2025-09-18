import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Dashboard from '../pages/Dashboard';
import Pipeline from '../pages/Pipeline';
import Leads from '../pages/Leads';
import Reports from '../pages/Reports';
import Analytics from '../pages/Analytics';
import Team from '../pages/Team';
import Settings from '../pages/Settings';

// Mock api used in pages to avoid real network and control rendering timing
jest.mock('../services/api', () => ({
  api: {
    getMetrics: jest.fn().mockResolvedValue({
      revenue: 100000,
      growth: 10,
      conversion: 10,
      avgDeal: 5000,
      trendRevenue: [1,2],
      trendLeads: [1,2]
    }),
    getLeads: jest.fn().mockResolvedValue([]),
    createLead: jest.fn().mockResolvedValue({ id: 'l-new', name: 'X', owner: 'Y', status: 'New', score: 70, source: 'Web', value: 0 }),
    getPipeline: jest.fn().mockResolvedValue([]),
    getReportSummary: jest.fn().mockResolvedValue({
      quarters: ['Q1','Q2','Q3','Q4'],
      revenue: [1,2,3,4],
      deals: [10,10,10,10],
      winRate: [20,20,20,20]
    }),
    getUsers: jest.fn().mockResolvedValue([]),
    updateUser: jest.fn().mockResolvedValue({}),
  }
}));

function renderAtPath(path) {
  // Use MemoryRouter with full App to verify routes
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

test('Dashboard route renders header title', async () => {
  renderAtPath('/');
  const title = await screen.findByRole('heading', { name: /dashboard/i });
  expect(title).toBeInTheDocument();
});

test('Pipeline route renders', async () => {
  renderAtPath('/pipeline');
  const title = await screen.findByRole('heading', { name: /pipeline/i });
  expect(title).toBeInTheDocument();
});

test('Leads route renders', async () => {
  renderAtPath('/leads');
  const title = await screen.findByRole('heading', { name: /leads/i });
  expect(title).toBeInTheDocument();
});

test('Reports route renders', async () => {
  renderAtPath('/reports');
  const title = await screen.findByRole('heading', { name: /reports/i });
  expect(title).toBeInTheDocument();
});

test('Analytics route renders', async () => {
  renderAtPath('/analytics');
  const title = await screen.findByRole('heading', { name: /analytics/i });
  expect(title).toBeInTheDocument();
});

test('Team route renders', async () => {
  renderAtPath('/team');
  const title = await screen.findByRole('heading', { name: /team/i });
  expect(title).toBeInTheDocument();
});

test('Settings route renders', async () => {
  renderAtPath('/settings');
  const title = await screen.findByRole('heading', { name: /settings/i });
  expect(title).toBeInTheDocument();
});

// Sanity check AppLayout composition by rendering sample pages directly
test('Layout includes Sidebar and Header elements', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </MemoryRouter>
  );
  // Sidebar landmark/section via aria-label
  expect(await screen.findByLabelText(/primary/i)).toBeInTheDocument();
  // Header search role
  expect(screen.getByRole('search')).toBeInTheDocument();
});
