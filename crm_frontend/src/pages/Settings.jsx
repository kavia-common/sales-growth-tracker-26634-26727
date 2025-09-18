import React from 'react';
import { AppLayout } from 'layouts/AppLayout';
import { Card } from 'components/UI';

/**
 * PUBLIC_INTERFACE
 * Settings
 * Application preferences and integration info.
 */
export default function Settings() {
  return (
    <AppLayout>
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">Configure preferences and integrations</p>
      <section className="grid-2">
        <Card title="Theme">
          <div className="form-row">
            <div className="input">
              <label>Appearance</label>
              <select defaultValue="Classic">
                <option>Classic</option>
                <option>Compact</option>
              </select>
            </div>
            <div className="input">
              <label>Accent</label>
              <select defaultValue="Ocean Professional">
                <option>Ocean Professional</option>
              </select>
            </div>
          </div>
        </Card>
        <Card title="API Integration">
          <p style={{marginTop:0}}>
            Configure backend URL using environment variable:
          </p>
          <pre style={{background:'#F9FAFB', padding:12, border:'1px solid var(--ocean-border)', borderRadius:'8px', overflow:'auto'}}>
REACT_APP_API_BASE=https://your-backend.example.com
          </pre>
          <p style={{color:'var(--ocean-text-muted)'}}>
            Current base: {process.env.REACT_APP_API_BASE || '(not set - using demo data)'}
          </p>
        </Card>
      </section>
    </AppLayout>
  );
}
