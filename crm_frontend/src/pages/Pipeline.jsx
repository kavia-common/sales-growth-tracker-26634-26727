import React, { useEffect, useState } from 'react';
import { AppLayout } from 'layouts/AppLayout';
import { api } from 'services/api';
import { Card, DataTable, Sparkline, Badge } from 'components/UI';

/**
 * PUBLIC_INTERFACE
 * Pipeline
 * Sales pipeline overview and stages with trends.
 */
export default function Pipeline() {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    api.getPipeline().then(setStages);
  }, []);

  const columns = [
    { title: 'Stage', dataIndex: 'stage' },
    { title: 'Deals', dataIndex: 'count' },
    { title: 'Value', dataIndex: 'value', render: v => `$${v.toLocaleString()}` },
    { title: 'Momentum', dataIndex: 'trend', render: v => <Sparkline values={v} /> },
    // Use a unique dataIndex/key for Health to avoid duplicate key warnings with 'count'
    { title: 'Health', dataIndex: 'health', render: (_v, row) => (row.count > 10 ? <Badge type="success">Healthy</Badge> : <Badge type="warn">Low</Badge>) },
  ];

  return (
    <AppLayout>
      <h1 className="page-title">Pipeline</h1>
      <p className="page-subtitle">Stage distribution and momentum indicators</p>
      <Card title="Current Pipeline Stages">
        <DataTable columns={columns} data={stages} keyField="id" />
      </Card>
    </AppLayout>
  );
}
