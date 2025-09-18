import React, { useEffect, useState } from 'react';
import { AppLayout } from 'layouts/AppLayout';
import { api } from 'services/api';
import { Card, DataTable, Badge } from 'components/UI';

/**
 * PUBLIC_INTERFACE
 * Team
 * User management with activation and role editing.
 */
export default function Team() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState({});

  useEffect(() => {
    api.getUsers().then(setUsers);
  }, []);

  const toggleActive = async (u) => {
    const updated = await api.updateUser(u.id, { active: !u.active });
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, ...updated } : x));
  };

  const saveRole = async (u) => {
    const updated = await api.updateUser(u.id, { role: editing[u.id] || u.role });
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, ...updated } : x));
    setEditing(prev => { const cp = {...prev}; delete cp[u.id]; return cp; });
  };

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Role', dataIndex: 'role', render: (v, row) => (
      editing[row.id] !== undefined
        ? <input value={editing[row.id]} onChange={e=>setEditing(prev=>({...prev, [row.id]: e.target.value}))} />
        : v
    ) },
    { title: 'Status', dataIndex: 'active', render: v => v ? <Badge type="success">Active</Badge> : <Badge type="warn">Inactive</Badge> },
    { title: 'Actions', dataIndex: 'id', render: (_, row) => (
      <div style={{display:'flex', gap:8}}>
        {editing[row.id] !== undefined
          ? <button className="btn btn-primary" onClick={()=>saveRole(row)}>Save</button>
          : <button className="btn" onClick={()=>setEditing(prev=>({...prev, [row.id]: row.role}))}>Edit Role</button>
        }
        <button className="btn" onClick={()=>toggleActive(row)}>{row.active ? 'Deactivate' : 'Activate'}</button>
      </div>
    ) }
  ];

  return (
    <AppLayout>
      <h1 className="page-title">Team</h1>
      <p className="page-subtitle">Manage your sales team and permissions</p>
      <DataTable columns={columns} data={users} keyField="id" />
    </AppLayout>
  );
}
