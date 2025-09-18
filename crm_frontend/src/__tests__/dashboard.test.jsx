import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

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
  // KPIs (use global mock defaults)
  expect(await screen.findByText(/\$128,000/)).toBeInTheDocument();
  expect(screen.getByText(/12\.6%/)).toBeInTheDocument();

  // Leads count present based on global mock
  expect(screen.getByText('2')).toBeInTheDocument();

  // Check sparkline svg rendered for both cards
  const svgs = document.querySelectorAll('svg[aria-label="trend"]');
  expect(svgs.length).toBeGreaterThanOrEqual(1);
});
