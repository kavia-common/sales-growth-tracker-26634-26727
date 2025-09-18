import React, { useMemo, useState } from 'react';
import { AppLayout } from 'layouts/AppLayout';
import { Card, Sparkline } from 'components/UI';

/**
 * PUBLIC_INTERFACE
 * Analytics
 * Customizable tracking with filters and projections.
 */
export default function Analytics() {
  const [filters, setFilters] = useState({ region: 'All', segment: 'All', horizon: 6 });
  const base = [80, 86, 90, 95, 100, 105, 110, 118, 125, 132, 138, 144];

  const adjusted = useMemo(() => {
    const factor =
      (filters.region === 'EMEA' ? 1.06 : filters.region === 'APAC' ? 1.12 : 1.0) *
      (filters.segment === 'Enterprise' ? 1.15 : filters.segment === 'SMB' ? 0.95 : 1.0);
    return base.slice(0, filters.horizon).map((v) => Math.round(v * factor));
  }, [filters]);

  return (
    <AppLayout>
      <h1 className="page-title">Analytics</h1>
      <p className="page-subtitle">Advanced analytics and growth projections</p>

      <Card title="Filters">
        <div className="form-row">
          <div className="input">
            <label htmlFor="analytics-region">Region</label>
            <select
              id="analytics-region"
              value={filters.region}
              onChange={(e) => setFilters((f) => ({ ...f, region: e.target.value }))}
            >
              <option>All</option>
              <option>NA</option>
              <option>EMEA</option>
              <option>APAC</option>
              <option>LATAM</option>
            </select>
          </div>
          <div className="input">
            <label htmlFor="analytics-segment">Segment</label>
            <select
              id="analytics-segment"
              value={filters.segment}
              onChange={(e) => setFilters((f) => ({ ...f, segment: e.target.value }))}
            >
              <option>All</option>
              <option>SMB</option>
              <option>Mid-Market</option>
              <option>Enterprise</option>
            </select>
          </div>
          <div className="input">
            <label htmlFor="analytics-horizon">Forecast Horizon (months)</label>
            <input
              id="analytics-horizon"
              type="range"
              min="3"
              max="12"
              value={filters.horizon}
              onChange={(e) => setFilters((f) => ({ ...f, horizon: Number(e.target.value) }))}
            />
            <div style={{ fontSize: 12, color: 'var(--ocean-text-muted)' }}>{filters.horizon} months</div>
          </div>
        </div>
      </Card>

      <section style={{ marginTop: 16 }} className="grid-2">
        <Card title="Projected Revenue">
          <Sparkline values={adjusted} />
        </Card>
        <Card title="Projection Table">
          <table className="table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Projected</th>
              </tr>
            </thead>
            <tbody>
              {adjusted.map((v, i) => (
                <tr key={i}>
                  <td>M{i + 1}</td>
                  <td>${v}k</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </AppLayout>
  );
}
