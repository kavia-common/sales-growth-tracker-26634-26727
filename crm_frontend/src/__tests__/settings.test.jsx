import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Settings from '../pages/Settings';

test('renders settings page with theme and API info', () => {
  render(
    <MemoryRouter initialEntries={['/settings']}>
      <Routes>
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
  expect(screen.getByText(/appearance/i)).toBeInTheDocument();
  expect(screen.getByText(/api integration/i)).toBeInTheDocument();
  // Current base line renders with fallback text
  expect(screen.getByText(/current base/i)).toBeInTheDocument();
});
