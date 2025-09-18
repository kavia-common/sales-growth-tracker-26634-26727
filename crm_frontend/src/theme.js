export const theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#1E3A8A',
    primary700: '#1E40AF',
    secondary: '#F59E0B',
    success: '#059669',
    error: '#DC2626',
    background: '#F3F4F6',
    surface: '#FFFFFF',
    text: '#111827',
    textMuted: '#6B7280',
    border: '#E5E7EB',
    gradientFrom: 'rgba(30, 58, 138, 0.08)',
    gradientTo: 'rgba(245, 158, 11, 0.08)',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.06)',
    md: '0 4px 6px rgba(0,0,0,0.08)',
    lg: '0 10px 15px rgba(0,0,0,0.12)',
  },
  radii: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    round: '9999px',
  },
};

/**
 * PUBLIC_INTERFACE
 * applyTheme
 * Apply CSS variables to document root for theme values.
 */
export function applyTheme(t = theme) {
  const r = document.documentElement;
  const { colors } = t;
  const map = {
    '--ocean-primary': colors.primary,
    '--ocean-primary-700': colors.primary700,
    '--ocean-secondary': colors.secondary,
    '--ocean-success': colors.success,
    '--ocean-error': colors.error,
    '--ocean-bg': colors.background,
    '--ocean-surface': colors.surface,
    '--ocean-text': colors.text,
    '--ocean-text-muted': colors.textMuted,
    '--ocean-border': colors.border,
    '--ocean-gradient-from': colors.gradientFrom,
    '--ocean-gradient-to': colors.gradientTo,
    '--shadow-sm': '0 1px 2px rgba(0,0,0,0.06)',
    '--shadow-md': '0 4px 6px rgba(0,0,0,0.08)',
    '--shadow-lg': '0 10px 15px rgba(0,0,0,0.12)',
    '--radius-sm': '8px',
    '--radius-md': '12px',
    '--radius-lg': '16px',
    '--radius-xl': '20px',
  };
  Object.entries(map).forEach(([k, v]) => r.style.setProperty(k, v));
}
