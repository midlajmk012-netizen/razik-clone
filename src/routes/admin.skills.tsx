import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { skillsStore, type Skill } from '@/lib/admin-store';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

export const Route = createFileRoute('/admin/skills')({ component: AdminSkills });

const empty = { name:'', level:'', tools:'' };

function AdminSkills() {
  const [items, setItems] = useState(() => skillsStore.getAll());
  const [editing, setEditing] = useState<Skill | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(empty);

  function refresh() { setItems(skillsStore.getAll()); }
  function startEdit(s: Skill) { setEditing(s); setForm({ name:s.name, level:s.level, tools:s.tools }); setAdding(false); }
  function startAdd() { setAdding(true); setEditing(null); setForm(empty); }
  function cancel() { setEditing(null); setAdding(false); setForm(empty); }
  function save() {
    if (!form.name.trim()) return;
    if (editing) { skillsStore.update(editing.id, form); }
    else { skillsStore.add(form); }
    refresh(); cancel();
  }
  function remove(id: string) {
    if (!confirm('Delete this skill?')) return;
    skillsStore.remove(id); refresh();
  }
  const f = (k: keyof typeof empty, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div><h1>Skills</h1><p>Manage your skills and expertise levels</p></div>
        <button className="admin-btn-primary" onClick={startAdd}><Plus size={15}/> Add Skill</button>
      </div>

      {(adding || editing) && (
        <div className="admin-form-card">
          <h3>{editing ? 'Edit Skill' : 'New Skill'}</h3>
          <div className="admin-form-grid">
            <label className="admin-label">Skill Name<input className="admin-input" value={form.name} onChange={e=>f('name',e.target.value)} placeholder="FRONTEND DEVELOPMENT"/></label>
            <label className="admin-label">Level (e.g. 90%)<input className="admin-input" value={form.level} onChange={e=>f('level',e.target.value)} placeholder="90%"/></label>
            <label className="admin-label admin-label--full">Tools / Stack<input className="admin-input" value={form.tools} onChange={e=>f('tools',e.target.value)} placeholder="React · Next.js · TypeScript"/></label>
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn-primary" onClick={save}><Check size={14}/> Save</button>
            <button className="admin-btn-ghost" onClick={cancel}><X size={14}/> Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>#</th><th>Skill</th><th>Level</th><th>Tools</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((s, i) => (
              <tr key={s.id}>
                <td className="admin-td-num">{String(i+1).padStart(2,'0')}</td>
                <td className="admin-td-bold">{s.name}</td>
                <td>
                  <div className="admin-level-wrap">
                    <div className="admin-level-bar" style={{ '--pct': s.level } as React.CSSProperties}/>
                    <span>{s.level}</span>
                  </div>
                </td>
                <td className="admin-td-muted">{s.tools}</td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-icon-btn" onClick={()=>startEdit(s)}><Pencil size={15}/></button>
                    <button className="admin-icon-btn admin-icon-btn--danger" onClick={()=>remove(s.id)}><Trash2 size={15}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
