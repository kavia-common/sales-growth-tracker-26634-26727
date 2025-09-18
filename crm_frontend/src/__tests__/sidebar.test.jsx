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
  expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/pipeline/i)).toBeInTheDocument();
  expect(screen.getByText(/leads/i)).toBeInTheDocument();
  expect(screen.getByText(/reports/i)).toBeInTheDocument();
  expect(screen.getByText(/analytics/i)).toBeInTheDocument();
  expect(screen.getByText(/team/i)).toBeInTheDocument();
  expect(screen.getByText(/settings/i)).toBeInTheDocument();
});

test('Active link receives active class when route matches', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/leads']}>
      <Sidebar />
    </MemoryRouter>
  );
  const active = container.querySelector('.nav-link.active');
  expect(active).toBeTruthy();
  expect(active?.textContent?.toLowerCase()).toContain('leads');
});
