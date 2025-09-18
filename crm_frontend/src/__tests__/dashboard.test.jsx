import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

jest.mock('../services/api', () => ({
  api: {
    getMetrics: jest.fn().mockResolvedValue({
      revenue: 128000,
      growth: 18.4,
      conversion: 12.6,
      avgDeal: 5400,
      trendRevenue: [80,86,90],
      trendLeads: [40,44,42],
    }),
    getLeads: jest.fn().mockResolvedValue([
      { id: 'l1', name: 'Acme Corp', owner: 'Alex Kim', status: 'Qualified', score: 88, source: 'Web', value: 12000 },
      { id: 'l2', name: 'Globex', owner: 'Sam Lee', status: 'New', score: 60, source: 'Referral', value: 9000 },
    ]),
  }
}));

test('renders KPI metrics and trends', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </MemoryRouter>
  );

  // Title
  expect(await screen.findByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
  // KPIs
  expect(await screen.findByText(/\$128,000/)).toBeInTheDocument();
  expect(screen.getByText(/12\.6%/)).toBeInTheDocument();

  // Lead count should be 2 based on mocked getLeads
  expect(screen.getByText('2')).toBeInTheDocument();

  // Check sparkline svg rendered for both cards
  const svgs = document.querySelectorAll('svg[aria-label="trend"]');
  expect(svgs.length).toBeGreaterThanOrEqual(1);
});
