import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';

test('Header renders search input and action buttons', () => {
  render(<Header />);
  expect(screen.getByRole('search')).toBeInTheDocument();
  expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /notifications/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /quick actions/i })).toBeInTheDocument();
  // User profile is a div; assert by title
  expect(screen.getByTitle('You')).toBeInTheDocument();
});
