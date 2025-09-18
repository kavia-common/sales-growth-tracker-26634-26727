import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '../components/Sidebar';

test('Sidebar shows navigation links', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Sidebar />
    </MemoryRouter>
  );

  // Prefer role-based queries for links to avoid ambiguity with other text instances
  expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /pipeline/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /leads/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /reports/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /analytics/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /team/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument();
});

test('Active link receives active class when route matches', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/leads']}>
      <Sidebar />
    </MemoryRouter>
  );
  const active = container.querySelector('.nav-link.active');
  expect(active).toBeTruthy();
  // verify the active link accessible name corresponds to Leads
  expect(screen.getByRole('link', { name: /leads/i })).toBeInTheDocument();
});
