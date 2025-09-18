import React, { useEffect, useState } from 'react';
import { AppLayout } from 'src/layouts/AppLayout';
import { api } from 'src/services/api';
import { Card, Sparkline } from 'src/components/UI';

/**
 * PUBLIC_INTERFACE
 * Reports
 * Quarterly performance summary with simple charts.
 */
export default function Reports() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.getReportSummary().then(setSummary);
  }, []);

  const values = summary ? summary.revenue : [];

  return (
    <AppLayout>
      <h1 className="page-title">Reports</h1>
      <p className="page-subtitle">Quarterly performance and growth metrics</p>

      <section className="grid-2">
        <Card title="Revenue by Quarter">
          <Sparkline values={values} />
          <div style={{display:'flex', gap:8, marginTop:8}}>
            {summary?.quarters.map((q,i)=>(
              <div key={q} className="card" style={{padding:10}}>
                <div style={{fontSize:12, color:'var(--ocean-text-muted)'}}>{q}</div>
                <div style={{fontWeight:700}}>${summary.revenue[i]}k</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Key Ratios">
          <div className="metrics">
            <div className="metric">
              <div className="label">Deals</div>
              <div className="value">{summary ? summary.deals.reduce((a,b)=>a+b,0) : '—'}</div>
              <div className="delta delta-up">▲ Volume</div>
            </div>
            <div className="metric">
              <div className="label">Avg Win Rate</div>
              <div className="value">{summary ? Math.round(summary.winRate.reduce((a,b)=>a+b,0)/summary.winRate.length) : '—'}%</div>
              <div className="delta delta-up">▲ Efficiency</div>
            </div>
            <div className="metric">
              <div className="label">YoY Growth</div>
              <div className="value">24%</div>
              <div className="delta delta-up">▲ Momentum</div>
            </div>
            <div className="metric">
              <div className="label">Churn</div>
              <div className="value">3.2%</div>
              <div className="delta delta-down">▼ Lower is better</div>
            </div>
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}
