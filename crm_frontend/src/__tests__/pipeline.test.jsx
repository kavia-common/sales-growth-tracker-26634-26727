import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import Pipeline from '../pages/Pipeline';

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
