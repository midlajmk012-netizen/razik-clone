import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { messagesStore, type Message } from '@/lib/admin-store';
import { Trash2, Mail, MailOpen, RefreshCw } from 'lucide-react';

export const Route = createFileRoute('/admin/messages')({ component: AdminMessages });

function AdminMessages() {
  const [items, setItems] = useState(() => messagesStore.getAll());
  const [selected, setSelected] = useState<Message | null>(null);

  function refresh() { setItems(messagesStore.getAll()); }

  function open(m: Message) {
    setSelected(m);
    if (!m.read) { messagesStore.markRead(m.id); refresh(); }
  }

  function remove(id: string) {
    if (!confirm('Delete this message?')) return;
    messagesStore.remove(id);
    if (selected?.id === id) setSelected(null);
    refresh();
  }

  function clearAll() {
    if (!confirm('Delete ALL messages? This cannot be undone.')) return;
    messagesStore.save([]);
    setSelected(null);
    refresh();
  }

  const unread = items.filter(m => !m.read).length;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Messages {unread > 0 && <span className="admin-badge admin-badge--lg">{unread} new</span>}</h1>
          <p>{items.length} total message{items.length !== 1 ? 's' : ''}</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="admin-btn-ghost" onClick={refresh}><RefreshCw size={14}/> Refresh</button>
          {items.length > 0 && <button className="admin-btn-danger" onClick={clearAll}><Trash2 size={14}/> Clear All</button>}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="admin-empty">
          <Mail size={40} style={{ opacity:.3, margin:'0 auto 12px' }}/>
          <p>No messages yet. Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="admin-messages-layout">
          {/* list */}
          <div className="admin-msg-list">
            {items.map(m => (
              <div
                key={m.id}
                className={`admin-msg-item ${!m.read ? 'admin-msg-item--unread' : ''} ${selected?.id === m.id ? 'admin-msg-item--active' : ''}`}
                onClick={() => open(m)}
              >
                <div className="admin-msg-meta">
                  <span className="admin-msg-name">{m.name}</span>
                  {!m.read && <span className="admin-dot"/>}
                </div>
                <div className="admin-msg-subject">{m.subject}</div>
                <div className="admin-msg-date">{m.date}</div>
              </div>
            ))}
          </div>

          {/* detail */}
          <div className="admin-msg-detail">
            {selected ? (
              <>
                <div className="admin-msg-detail-header">
                  <div>
                    <h3>{selected.subject}</h3>
                    <p className="admin-msg-from">From: <strong>{selected.name}</strong> &lt;{selected.email}&gt;</p>
                    <p className="admin-msg-date-detail">{selected.date}</p>
                  </div>
                  <div className="admin-actions">
                    <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`} className="admin-btn-primary admin-btn-sm">Reply</a>
                    <button className="admin-icon-btn admin-icon-btn--danger" onClick={()=>remove(selected.id)}><Trash2 size={15}/></button>
                  </div>
                </div>
                <div className="admin-msg-body">{selected.message}</div>
              </>
            ) : (
              <div className="admin-msg-placeholder">
                <MailOpen size={36} style={{ opacity:.25, margin:'0 auto 10px' }}/>
                <p>Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
