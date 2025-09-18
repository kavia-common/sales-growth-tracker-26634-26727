import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Card
 * Generic container with title and actions
 */
export function Card({ title, extra, children, style }) {
  return (
    <section className="card" style={style}>
      {(title || extra) && (
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 10}}>
          <h3 className="card-title">{title}</h3>
          {extra}
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * DataTable
 * Simple table with header, items, and renderers
 */
export function DataTable({ columns, data, keyField = 'id' }) {
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            {columns.map(col => <th key={col.key || col.dataIndex}>{col.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row[keyField]}>
              {columns.map(col => (
                <td key={col.key || col.dataIndex}>
                  {col.render ? col.render(row[col.dataIndex], row) : row[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Sparkline
 * Small inline area chart using SVG
 */
export function Sparkline({ values = [], color = 'var(--ocean-primary)' }) {
  if (!values.length) return <div style={{height:32}} />;
  const width = 140, height = 42, pad = 6;
  const min = Math.min(...values), max = Math.max(...values);
  const norm = v => {
    if (max === min) return height/2;
    return height - pad - ((v - min) / (max - min)) * (height - pad*2);
  };
  const step = (width - pad*2) / (values.length - 1);
  const points = values.map((v,i) => `${pad + i*step},${norm(v)}`).join(' ');
  const area = `M ${pad},${height-pad} L ${points} L ${width-pad},${height-pad} Z`;
  const line = `M ${points.replace(' ', ' L ')}`;
  return (
    <svg width={width} height={height} role="img" aria-label="trend">
      <path d={area} fill={color} opacity="0.15" />
      <path d={line} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

/**
 * PUBLIC_INTERFACE
 * Badge
 * Status pill
 */
export function Badge({ type = 'info', children }) {
  return <span className={`badge ${type}`}>{children}</span>;
}
