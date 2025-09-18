# Ocean Professional CRM Frontend

This React app implements a polished, business-oriented CRM frontend with:
- Sidebar navigation: Dashboard, Pipeline, Leads, Reports, Analytics, Team, Settings
- Responsive header with search, notifications, and settings
- Advanced analytics, user management, customizable sales tracking, and visualizations
- Ocean Professional theme (classic, minimalist styling)

Run:
- npm install
- npm start

Environment:
- REACT_APP_API_BASE=https://your-backend.example.com
If not set, the app uses demo data via graceful fallbacks.

Structure:
- src/theme.js: Theme variables and applyTheme()
- src/styles.css: Global styles and layout
- src/layouts/AppLayout.jsx: Shell with header/sidebar
- src/components/: Sidebar, Header, UI primitives (Card, DataTable, Sparkline, Badge)
- src/pages/: Dashboard, Pipeline, Leads, Reports, Analytics, Team, Settings
- src/services/api.js: Placeholder REST integration
