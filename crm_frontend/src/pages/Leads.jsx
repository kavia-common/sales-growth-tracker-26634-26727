import React, { useEffect, useState } from 'react';
import { AppLayout } from '../layouts/AppLayout';
import { api } from '../services/api';
import { Card, DataTable, Badge } from '../components/UI';

/**
 * PUBLIC_INTERFACE
 * Leads
 * Lead management with creation form and list.
 */
export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({ name: '', owner: '', status: 'New', source: 'Web', value: 0 });

  useEffect(() => {
    api.getLeads().then(setLeads);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, score: Math.floor(50 + Math.random()*50), value: Number(form.value) || 0 };
    const created = await api.createLead(payload);
    setLeads(prev => [created, ...prev]);
    setForm({ name: '', owner: '', status: 'New', source: 'Web', value: 0 });
  };

  const columns = [
    { title: 'Lead', dataIndex: 'name' },
    { title: 'Owner', dataIndex: 'owner' },
    { title: 'Status', dataIndex: 'status', render: v => {
      const type = v === 'Qualified' || v === 'Negotiation' ? 'success' : v === 'Contacted' ? 'info' : 'warn';
      return <Badge type={type}>{v}</Badge>;
    }},
    { title: 'Score', dataIndex: 'score' },
    { title: 'Source', dataIndex: 'source' },
    { title: 'Value', dataIndex: 'value', render: v => `$${v.toLocaleString()}` },
  ];

  return (
    <AppLayout>
      <h1 className="page-title">Leads</h1>
      <p className="page-subtitle">Manage and track potential customers</p>

      <Card title="Create Lead" extra={<span className="badge info">Customizable</span>}>
        <form onSubmit={submit}>
          <div className="form-row">
            <div className="input">
              <label htmlFor="lead-name">Lead Name</label>
              <input id="lead-name" value={form.name} onChange={e=>setForm(prev=>({...prev,name:e.target.value}))} required />
            </div>
            <div className="input">
              <label htmlFor="lead-owner">Owner</label>
              <input id="lead-owner" value={form.owner} onChange={e=>setForm(prev=>({...prev,owner:e.target.value}))} required />
            </div>
            <div className="input">
              <label htmlFor="lead-status">Status</label>
              <select id="lead-status" value={form.status} onChange={e=>setForm(prev=>({...prev,status:e.target.value}))}>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Negotiation</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="lead-source">Source</label>
              <select id="lead-source" value={form.source} onChange={e=>setForm(prev=>({...prev,source:e.target.value}))}>
                <option>Web</option>
                <option>Referral</option>
                <option>Event</option>
                <option>Ads</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="lead-value">Deal Value ($)</label>
              <input id="lead-value" type="number" value={form.value} onChange={e=>setForm(prev=>({...prev,value:e.target.value}))} />
            </div>
          </div>
          <div style={{marginTop:12}}>
            <button className="btn btn-primary" type="submit">Add Lead</button>
          </div>
        </form>
      </Card>

      <div style={{marginTop:16}}>
        <DataTable columns={columns} data={leads} keyField="id" />
      </div>
    </AppLayout>
  );
}
