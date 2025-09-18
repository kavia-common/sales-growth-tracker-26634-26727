import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Leads from '../pages/Leads';
import { api } from 'src/services/api';

function renderLeads() {
  return render(
    <MemoryRouter initialEntries={['/leads']}>
      <Routes>
        <Route path="/leads" element={<Leads />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  // Override global mock for this test's specific data
  api.getLeads.mockResolvedValueOnce([
    { id: 'l1', name: 'Acme Corp', owner: 'Alex', status: 'New', score: 80, source: 'Web', value: 1000 },
  ]);
  api.createLead.mockResolvedValueOnce({
    id: 'l2', name: 'NewCo', owner: 'Jamie', status: 'Qualified', score: 90, source: 'Referral', value: 5000
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders leads table with initial data', async () => {
  renderLeads();
  expect(await screen.findByRole('heading', { name: /leads/i })).toBeInTheDocument();
  const table = await screen.findByRole('table');
  expect(within(table).getByText(/acme corp/i)).toBeInTheDocument();
});

test('creates a new lead via form and appears in table', async () => {
  renderLeads();

  // Wait for initial to load
  await screen.findByText(/acme corp/i);

  fireEvent.change(screen.getByLabelText(/lead name/i), { target: { value: 'NewCo' } });
  fireEvent.change(screen.getByLabelText(/owner/i), { target: { value: 'Jamie' } });
  fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'Qualified' } });
  fireEvent.change(screen.getByLabelText(/source/i), { target: { value: 'Referral' } });
  fireEvent.change(screen.getByLabelText(/deal value/i), { target: { value: '5000' } });

  fireEvent.click(screen.getByRole('button', { name: /add lead/i }));

  await waitFor(() => expect(api.createLead).toHaveBeenCalled());

  // New row appears (since component unshifts to top)
  const table = await screen.findByRole('table');
  expect(within(table).getByText(/newco/i)).toBeInTheDocument();

  // Form resets after submit
  expect(screen.getByLabelText(/lead name/i)).toHaveValue('');
  expect(screen.getByLabelText(/owner/i)).toHaveValue('');
  // Selects reset to defaults
  expect(screen.getByLabelText(/status/i)).toHaveValue('New');
  expect(screen.getByLabelText(/source/i)).toHaveValue('Web');
});
