import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { projectsStore, type Project } from '@/lib/admin-store';
import { Plus, Pencil, Trash2, X, Check, ExternalLink } from 'lucide-react';

export const Route = createFileRoute('/admin/projects')({ component: AdminProjects });

const empty = { name:'', description:'', tags:'', url:'' };

function AdminProjects() {
  const [items, setItems] = useState(() => projectsStore.getAll());
  const [editing, setEditing] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(empty);

  function refresh() { setItems(projectsStore.getAll()); }

  function startEdit(p: Project) { setEditing(p); setForm({ name:p.name, description:p.description, tags:p.tags, url:p.url }); setAdding(false); }
  function startAdd() { setAdding(true); setEditing(null); setForm(empty); }
  function cancel() { setEditing(null); setAdding(false); setForm(empty); }

  function save() {
    if (!form.name.trim()) return;
    if (editing) { projectsStore.update(editing.id, form); }
    else { projectsStore.add(form); }
    refresh(); cancel();
  }

  function remove(id: string) {
    if (!confirm('Delete this project?')) return;
    projectsStore.remove(id); refresh();
  }

  const f = (k: keyof typeof empty, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div><h1>Projects</h1><p>Manage your portfolio projects</p></div>
        <button className="admin-btn-primary" onClick={startAdd}><Plus size={15}/> Add Project</button>
      </div>

      {(adding || editing) && (
        <div className="admin-form-card">
          <h3>{editing ? 'Edit Project' : 'New Project'}</h3>
          <div className="admin-form-grid">
            <label className="admin-label">Project Name<input className="admin-input" value={form.name} onChange={e=>f('name',e.target.value)} placeholder="AI ISLAM OFFICIAL"/></label>
            <label className="admin-label">Description<input className="admin-input" value={form.description} onChange={e=>f('description',e.target.value)} placeholder="Short description"/></label>
            <label className="admin-label">Tech Tags<input className="admin-input" value={form.tags} onChange={e=>f('tags',e.target.value)} placeholder="React · Next.js · OpenAI"/></label>
            <label className="admin-label">Live URL<input className="admin-input" value={form.url} onChange={e=>f('url',e.target.value)} placeholder="https://..."/></label>
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn-primary" onClick={save}><Check size={14}/> Save</button>
            <button className="admin-btn-ghost" onClick={cancel}><X size={14}/> Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>#</th><th>Name</th><th>Description</th><th>Tags</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((p, i) => (
              <tr key={p.id}>
                <td className="admin-td-num">0{i+1}</td>
                <td className="admin-td-bold">{p.name}</td>
                <td>{p.description}</td>
                <td><span className="admin-tag">{p.tags}</span></td>
                <td>
                  <div className="admin-actions">
                    {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="admin-icon-btn" title="Visit"><ExternalLink size={15}/></a>}
                    <button className="admin-icon-btn" onClick={()=>startEdit(p)} title="Edit"><Pencil size={15}/></button>
                    <button className="admin-icon-btn admin-icon-btn--danger" onClick={()=>remove(p.id)} title="Delete"><Trash2 size={15}/></button>
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
