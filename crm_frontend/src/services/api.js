const API_BASE = process.env.REACT_APP_API_BASE || '';

// Internal helper for request
async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    // Fallback to demo data
    return { error: e.message, fallback: true };
  }
}

/**
 * PUBLIC_INTERFACE
 * api
 * Placeholder RESTful API methods. Replace endpoints when backend is ready.
 */
export const api = {
  // Dashboard metrics
  async getMetrics() {
    const data = await request('/api/metrics');
    if (data && !data.error) return data;
    // Fallback demo
    return {
      revenue: 128000,
      growth: 18.4,
      conversion: 12.6,
      avgDeal: 5400,
      trendRevenue: [80,86,90,95,100,105,110,118,125,128],
      trendLeads: [40,44,42,50,52,56,60,62,68,72],
    };
  },

  // Pipeline
  async getPipeline() {
    const data = await request('/api/pipeline');
    if (data && !data.error) return data;
    return [
      { id: 'p1', stage: 'Prospecting', count: 32, value: 45000, trend: [2,4,6,4,8,10,12] },
      { id: 'p2', stage: 'Qualification', count: 20, value: 72000, trend: [1,2,3,4,5,6,7] },
      { id: 'p3', stage: 'Proposal', count: 12, value: 91000, trend: [4,5,6,7,6,8,9] },
      { id: 'p4', stage: 'Negotiation', count: 6, value: 60000, trend: [2,3,4,5,4,6,7] },
      { id: 'p5', stage: 'Closed Won', count: 4, value: 38000, trend: [1,1,2,3,5,8,13] },
    ];
  },

  // Leads
  async getLeads() {
    const data = await request('/api/leads');
    if (data && !data.error) return data;
    return [
      { id: 'l1', name: 'Acme Corp', owner: 'Alex Kim', status: 'New', score: 78, source: 'Web', value: 12000 },
      { id: 'l2', name: 'Globex', owner: 'Sam Lee', status: 'Contacted', score: 64, source: 'Referral', value: 9000 },
      { id: 'l3', name: 'Umbrella', owner: 'Jordan', status: 'Qualified', score: 88, source: 'Ads', value: 15000 },
      { id: 'l4', name: 'Stark Ltd', owner: 'Taylor', status: 'Negotiation', score: 92, source: 'Event', value: 32000 },
    ];
  },
  async createLead(payload) {
    // placeholder POST
    const res = await request('/api/leads', { method: 'POST', body: JSON.stringify(payload) });
    if (!res || res.error) return { ...payload, id: `l${Math.random().toString(36).slice(2,7)}` };
    return res;
  },

  // Reports & Analytics
  async getReportSummary() {
    const res = await request('/api/reports/summary');
    if (res && !res.error) return res;
    return {
      quarters: ['Q1','Q2','Q3','Q4'],
      revenue: [240, 280, 320, 410],
      deals: [40, 52, 58, 76],
      winRate: [22, 24, 26, 30],
    };
  },

  // Team & Users
  async getUsers() {
    const res = await request('/api/users');
    if (res && !res.error) return res;
    return [
      { id: 'u1', name: 'Alex Kim', role: 'Sales Lead', email: 'alex@example.com', active: true },
      { id: 'u2', name: 'Sam Lee', role: 'AE', email: 'sam@example.com', active: true },
      { id: 'u3', name: 'Jordan P', role: 'SDR', email: 'jordan@example.com', active: false },
    ];
  },
  async updateUser(id, patch) {
    const res = await request(`/api/users/${id}`, { method: 'PATCH', body: JSON.stringify(patch) });
    if (res && !res.error) return res;
    return { id, ...patch };
  }
};
