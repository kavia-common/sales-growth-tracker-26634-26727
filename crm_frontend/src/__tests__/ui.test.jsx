import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Card, DataTable, Sparkline, Badge } from '../components/UI';

test('Card renders title, extra, and children', () => {
  render(
    <Card title="My Card" extra={<span data-testid="extra">X</span>}>
      <div>Body</div>
    </Card>
  );
  expect(screen.getByText('My Card')).toBeInTheDocument();
  expect(screen.getByTestId('extra')).toBeInTheDocument();
  expect(screen.getByText('Body')).toBeInTheDocument();
});

test('DataTable renders headers and rows', () => {
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Score', dataIndex: 'score' },
  ];
  const data = [
    { id: '1', name: 'A', score: 10 },
    { id: '2', name: 'B', score: 20 },
  ];
  render(<DataTable columns={columns} data={data} />);
  const table = screen.getByRole('table');
  const headers = within(table).getAllByRole('columnheader').map(th => th.textContent);
  expect(headers).toEqual(['Name', 'Score']);
  const rows = within(table).getAllByRole('row');
  // rows include header row
  expect(rows.length).toBe(1 + data.length);
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('20')).toBeInTheDocument();
});

test('Sparkline renders svg when values present and placeholder when empty', () => {
  const { rerender, container } = render(<Sparkline values={[1,2,3]} />);
  expect(container.querySelector('svg')).toBeInTheDocument();
  rerender(<Sparkline values={[]} />);
  expect(container.querySelector('svg')).not.toBeInTheDocument();
  // placeholder div exists
  expect(container.querySelector('div')).toBeInTheDocument();
});

test('Badge renders with type classes', () => {
  const { container } = render(<Badge type="success">Active</Badge>);
  expect(screen.getByText('Active')).toBeInTheDocument();
  expect(container.querySelector('.badge.success')).toBeInTheDocument();
});
