import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import Pipeline from '../pages/Pipeline';

jest.mock('../services/api', () => ({
  api: {
    getPipeline: jest.fn().mockResolvedValue([
      { id: 'p1', stage: 'Prospecting', count: 32, value: 45000, trend: [1,2,3] },
      { id: 'p2', stage: 'Qualification', count: 8, value: 12000, trend: [1,1,2] },
    ]),
    // Defaults for completeness
    getMetrics: jest.fn().mockResolvedValue([]),
    getLeads: jest.fn().mockResolvedValue([]),
    getReportSummary: jest.fn().mockResolvedValue({}),
    getUsers: jest.fn().mockResolvedValue([]),
    updateUser: jest.fn().mockResolvedValue({}),
    createLead: jest.fn().mockResolvedValue({ id: 1 }),
  }
}));

test('renders pipeline stages table', async () => {
  render(
    <MemoryRouter initialEntries={['/pipeline']}>
      <Routes>
        <Route path="/pipeline" element={<Pipeline />} />
      </Routes>
    </MemoryRouter>
  );
  expect(await screen.findByRole('heading', { name: /pipeline/i })).toBeInTheDocument();

  const table = await screen.findByRole('table');
  expect(within(table).getByText(/prospecting/i)).toBeInTheDocument();
  expect(within(table).getByText(/\$45,000/)).toBeInTheDocument();
});
