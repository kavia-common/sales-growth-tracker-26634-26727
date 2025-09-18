import React, { useEffect, useState } from 'react';
import { AppLayout } from 'src/layouts/AppLayout';
import { api } from 'src/services/api';
import { Card } from 'src/components/UI';
import { Sparkline, Badge } from 'src/components/UI';

/**
 * PUBLIC_INTERFACE
 * Dashboard
 * Executive overview with KPIs and trends.
 */
export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.getMetrics().then(setMetrics);
    api.getLeads().then(setLeads);
  }, []);

  return (
    <AppLayout>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Growth overview and key performance metrics</p>

      <section className="metrics">
        <div className="metric">
          <div className="label">Monthly Revenue</div>
          <div className="value">${metrics ? metrics.revenue.toLocaleString() : '—'}</div>
          <div className="delta delta-up">▲ {metrics ? metrics.growth : '—'}% MoM</div>
        </div>
        <div className="metric">
          <div className="label">Conversion Rate</div>
          <div className="value">{metrics ? metrics.conversion : '—'}%</div>
          <div className="delta delta-up">▲ steady</div>
        </div>
        <div className="metric">
          <div className="label">Avg Deal Size</div>
          <div className="value">${metrics ? metrics.avgDeal.toLocaleString() : '—'}</div>
          <div className="delta delta-down">◀ trend</div>
        </div>
        <div className="metric">
          <div className="label">New Leads</div>
          <div className="value">{leads.length}</div>
          <div className="delta delta-up">▲ +8%</div>
        </div>
      </section>

      <section className="grid-2" style={{marginTop: 16}}>
        <Card title="Revenue Trend">
          <Sparkline values={metrics ? metrics.trendRevenue : []} />
        </Card>
        <Card title="Lead Volume Trend">
          <Sparkline values={metrics ? metrics.trendLeads : []} color="var(--ocean-secondary)" />
        </Card>
      </section>

      <section style={{marginTop: 16}}>
        <Card title="Top Leads">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12}}>
            {leads.slice(0, 4).map(ld => (
              <div key={ld.id} className="card" style={{padding:12}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <strong>{ld.name}</strong>
                  <Badge type={ld.status === 'Qualified' || ld.status === 'Negotiation' ? 'success' : 'info'}>
                    {ld.status}
                  </Badge>
                </div>
                <div style={{color:'var(--ocean-text-muted)', fontSize:13, marginTop:6}}>
                  Owner: {ld.owner} • Score: {ld.score}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}
