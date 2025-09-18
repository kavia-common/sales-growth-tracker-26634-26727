export const api = {
  // Dashboard metrics
  getMetrics: jest.fn().mockResolvedValue({
    revenue: 128000,
    growth: 18.4,
    conversion: 12.6,
    avgDeal: 5400,
    trendRevenue: [80, 86, 90, 95, 100, 105, 110, 118, 125, 128],
    trendLeads: [40, 44, 42, 50, 52, 56, 60, 62, 68, 72],
  }),

  // Pipeline
  getPipeline: jest.fn().mockResolvedValue([
    { id: 'p1', stage: 'Prospecting', count: 32, value: 45000, trend: [2, 4, 6, 4, 8, 10, 12] },
    { id: 'p2', stage: 'Qualification', count: 20, value: 72000, trend: [1, 2, 3, 4, 5, 6, 7] },
  ]),

  // Leads
  getLeads: jest.fn().mockResolvedValue([
    { id: 'l1', name: 'Acme Corp', owner: 'Alex Kim', status: 'New', score: 78, source: 'Web', value: 12000 },
    { id: 'l2', name: 'Globex', owner: 'Sam Lee', status: 'Contacted', score: 64, source: 'Referral', value: 9000 },
  ]),
  createLead: jest.fn().mockResolvedValue({
    id: 'l_new',
    name: 'NewCo',
    owner: 'Jamie',
    status: 'Qualified',
    score: 90,
    source: 'Referral',
    value: 5000,
  }),

  // Reports
  getReportSummary: jest.fn().mockResolvedValue({
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    revenue: [240, 280, 320, 410],
    deals: [40, 52, 58, 76],
    winRate: [22, 24, 26, 30],
  }),

  // Team / Users
  getUsers: jest.fn().mockResolvedValue([
    { id: 'u1', name: 'Alex Kim', role: 'Sales Lead', email: 'alex@example.com', active: true },
    { id: 'u2', name: 'Sam Lee', role: 'AE', email: 'sam@example.com', active: false },
  ]),
  updateUser: jest.fn().mockResolvedValue({}),
};
