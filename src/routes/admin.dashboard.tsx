import { createFileRoute, Link } from '@tanstack/react-router';
import { projectsStore, skillsStore, servicesStore, messagesStore, settingsStore } from '@/lib/admin-store';
import { FolderOpen, Zap, Wrench, MessageSquare, TrendingUp, Users, Clock, Star } from 'lucide-react';

export const Route = createFileRoute('/admin/dashboard')({ component: Dashboard });

function Dashboard() {
  const projects = projectsStore.getAll();
  const skills   = skillsStore.getAll();
  const services = servicesStore.getAll();
  const messages = messagesStore.getAll();
  const settings = settingsStore.get();
  const unread   = messages.filter(m => !m.read).length;

  const cards = [
    { label: 'Projects',  value: projects.length, icon: FolderOpen,    to: '/admin/projects',  color: '#48A9FF' },
    { label: 'Skills',    value: skills.length,   icon: Zap,           to: '/admin/skills',    color: '#7cc8ff' },
    { label: 'Services',  value: services.length, icon: Wrench,        to: '/admin/services',  color: '#00d4ff' },
    { label: 'Messages',  value: messages.length, icon: MessageSquare, to: '/admin/messages',  color: unread ? '#ff6b6b' : '#48A9FF', badge: unread },
  ];

  const stats = [
    { label: 'Years Exp',    value: settings.yearsExp, icon: TrendingUp },
    { label: 'Projects',     value: settings.projects,  icon: FolderOpen },
    { label: 'Clients',      value: settings.clients,   icon: Users },
    { label: 'Rating',       value: '5★',               icon: Star },
  ];

  const recent = messages.slice(0, 5);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {settings.ownerName}</p>
        </div>
        <div className="admin-time">
          <Clock size={14} />
          <span>{new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</span>
        </div>
      </div>

      {/* stat cards */}
      <div className="admin-cards-grid">
        {cards.map(({ label, value, icon: Icon, to, color, badge }) => (
          <Link to={to} key={label} className="admin-stat-card" style={{ '--card-color': color } as React.CSSProperties}>
            <div className="admin-stat-icon"><Icon size={22} /></div>
            <div className="admin-stat-body">
              <div className="admin-stat-value">{value}{badge ? <span className="admin-badge">{badge} new</span> : null}</div>
              <div className="admin-stat-label">{label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* portfolio stats */}
      <div className="admin-section-title">Portfolio Stats</div>
      <div className="admin-cards-grid">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="admin-stat-card admin-stat-card--plain">
            <div className="admin-stat-icon"><Icon size={20} /></div>
            <div className="admin-stat-body">
              <div className="admin-stat-value">{value}</div>
              <div className="admin-stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* recent messages */}
      <div className="admin-section-title">Recent Messages</div>
      {recent.length === 0 ? (
        <div className="admin-empty">No messages yet.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Subject</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {recent.map(m => (
                <tr key={m.id} className={!m.read ? 'admin-row-unread' : ''}>
                  <td>{m.name}</td>
                  <td>{m.subject}</td>
                  <td>{m.date}</td>
                  <td><span className={`admin-pill ${m.read ? 'admin-pill--grey' : 'admin-pill--blue'}`}>{m.read ? 'Read' : 'New'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {recent.length > 0 && <Link to="/admin/messages" className="admin-link-more">View all messages →</Link>}
    </div>
  );
}
