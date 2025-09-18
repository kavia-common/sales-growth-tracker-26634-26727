import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Reports from '../pages/Reports';

test('renders reports summary with quarters and revenue cards', async () => {
  render(
    <MemoryRouter initialEntries={['/reports']}>
      <Routes>
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </MemoryRouter>
  );
  expect(await screen.findByRole('heading', { name: /reports/i })).toBeInTheDocument();

  // Quarter labels render
  expect(await screen.findByText('Q1')).toBeInTheDocument();
  expect(screen.getByText('Q4')).toBeInTheDocument();

  // KPI section titles
  expect(screen.getByText(/revenue by quarter/i)).toBeInTheDocument();
  expect(screen.getByText(/key ratios/i)).toBeInTheDocument();
});
