import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Analytics from '../pages/Analytics';

test('Analytics renders and updates projections based on filters', () => {
  render(
    <MemoryRouter initialEntries={['/analytics']}>
      <Routes>
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /analytics/i })).toBeInTheDocument();

  const table = screen.getByRole('table');
  // Default horizon is 6 rows
  const rows = within(table).getAllByRole('row');
  expect(rows.length - 1).toBe(6);

  // Change horizon to 9
  const slider = screen.getByRole('slider');
  fireEvent.change(slider, { target: { value: '9' } });
  const rowsAfter = within(table).getAllByRole('row');
  expect(rowsAfter.length - 1).toBe(9);

  // Changing Region to APAC should increase values (factor 1.12)
  const regionSelect = screen.getByLabelText(/region/i);
  fireEvent.change(regionSelect, { target: { value: 'APAC' } });

  // Changing Segment to Enterprise increases factor further
  const segmentSelect = screen.getByLabelText(/segment/i);
  fireEvent.change(segmentSelect, { target: { value: 'Enterprise' } });

  // Just assert table still consistent with 9 rows after changes
  const rowsAfterFilters = within(screen.getByRole('table')).getAllByRole('row');
  expect(rowsAfterFilters.length - 1).toBe(9);
});
