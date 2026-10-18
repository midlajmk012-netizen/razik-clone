import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { servicesStore, type Service } from '@/lib/admin-store';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

export const Route = createFileRoute('/admin/services')({ component: AdminServices });

const empty = { name:'', description:'' };

function AdminServices() {
  const [items, setItems] = useState(() => servicesStore.getAll());
  const [editing, setEditing] = useState<Service | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(empty);

  function refresh() { setItems(servicesStore.getAll()); }
  function startEdit(s: Service) { setEditing(s); setForm({ name:s.name, description:s.description }); setAdding(false); }
  function startAdd() { setAdding(true); setEditing(null); setForm(empty); }
  function cancel() { setEditing(null); setAdding(false); setForm(empty); }
  function save() {
    if (!form.name.trim()) return;
    if (editing) { servicesStore.update(editing.id, form); }
    else { servicesStore.add(form); }
    refresh(); cancel();
  }
  function remove(id: string) {
    if (!confirm('Delete this service?')) return;
    servicesStore.remove(id); refresh();
  }
  const f = (k: keyof typeof empty, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div><h1>Services</h1><p>Manage services shown on your portfolio</p></div>
        <button className="admin-btn-primary" onClick={startAdd}><Plus size={15}/> Add Service</button>
      </div>

      {(adding || editing) && (
        <div className="admin-form-card">
          <h3>{editing ? 'Edit Service' : 'New Service'}</h3>
          <div className="admin-form-grid">
            <label className="admin-label admin-label--full">Service Name<input className="admin-input" value={form.name} onChange={e=>f('name',e.target.value)} placeholder="WEB DEVELOPMENT"/></label>
            <label className="admin-label admin-label--full">Description<textarea className="admin-input admin-textarea" value={form.description} onChange={e=>f('description',e.target.value)} placeholder="Short description of this service..." rows={3}/></label>
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn-primary" onClick={save}><Check size={14}/> Save</button>
            <button className="admin-btn-ghost" onClick={cancel}><X size={14}/> Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-services-grid">
        {items.map((s, i) => (
          <div key={s.id} className="admin-service-card">
            <div className="admin-service-num">0{i+1}</div>
            <div className="admin-service-body">
              <h4>{s.name}</h4>
              <p>{s.description}</p>
            </div>
            <div className="admin-actions admin-actions--col">
              <button className="admin-icon-btn" onClick={()=>startEdit(s)}><Pencil size={15}/></button>
              <button className="admin-icon-btn admin-icon-btn--danger" onClick={()=>remove(s.id)}><Trash2 size={15}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
