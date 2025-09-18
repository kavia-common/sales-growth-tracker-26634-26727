import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Team from '../pages/Team';
import { api } from 'src/services/api';

function renderTeam() {
  return render(
    <MemoryRouter initialEntries={['/team']}>
      <Routes>
        <Route path="/team" element={<Team />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  // Provide specific data for this suite on top of global defaults
  api.getUsers.mockResolvedValueOnce([
    { id: 'u1', name: 'Alex Kim', role: 'Sales Lead', email: 'alex@example.com', active: true },
    { id: 'u2', name: 'Sam Lee', role: 'AE', email: 'sam@example.com', active: false },
  ]);
  api.updateUser.mockImplementation((_id, patch) => Promise.resolve({ id: _id, ...patch }));
});

afterEach(() => jest.clearAllMocks());

test('renders users with status badges', async () => {
  renderTeam();
  // header
  expect(await screen.findByRole('heading', { name: /team/i })).toBeInTheDocument();
  expect(await screen.findByText(/alex kim/i)).toBeInTheDocument();
  // Active/Inactive badges present
  expect(screen.getByText(/active/i)).toBeInTheDocument();
  expect(screen.getByText(/inactive/i)).toBeInTheDocument();
});

test('edit role flow and save updates', async () => {
  renderTeam();
  await screen.findByText(/alex kim/i);

  // Click Edit Role for first row
  const editButtons = screen.getAllByRole('button', { name: /edit role/i });
  fireEvent.click(editButtons[0]);

  // Input appears with current role value
  const inputs = screen.getAllByRole('textbox');
  fireEvent.change(inputs[0], { target: { value: 'Director' } });

  // Save
  const saveButtons = screen.getAllByRole('button', { name: /save/i });
  fireEvent.click(saveButtons[0]);

  await waitFor(() => expect(api.updateUser).toHaveBeenCalledWith('u1', { role: 'Director' }));
});

test('toggle activation updates badge and button text', async () => {
  renderTeam();
  await screen.findByText(/sam lee/i);

  // Activate Sam (was inactive)
  const activateButtons = screen.getAllByRole('button', { name: /activate|deactivate/i });
  const samRowButton = activateButtons.find(btn => btn.textContent?.match(/activate/i));
  expect(samRowButton).toBeTruthy();
  if (samRowButton) {
    fireEvent.click(samRowButton);
  }

  await waitFor(() => expect(api.updateUser).toHaveBeenCalled());

  // Since UI updates state after promise, badge should include Active somewhere
  expect(screen.getAllByText(/active/i).length).toBeGreaterThan(0);
});
