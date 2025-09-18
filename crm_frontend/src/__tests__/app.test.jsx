import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Dashboard from '../pages/Dashboard';

// Helper to set initial location before rendering App directly.
// App mounts its own BrowserRouter, so we must not wrap it in an additional router.
function renderAtPath(path) {
  window.history.pushState({}, 'Test page', path);
  return render(<App />);
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

// Sanity check AppLayout composition by rendering sample page directly via MemoryRouter to supply routing context
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
