import { createFileRoute, Link, useNavigate, Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { auth, messagesStore } from '@/lib/admin-store';
import { LayoutDashboard, FolderOpen, Wrench, Zap, MessageSquare, Settings, LogOut, Shield, Eye, EyeOff } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    setAuthed(auth.isLoggedIn());
    setUnread(messagesStore.unreadCount());
  }, []);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (auth.login(pw)) {
      setAuthed(true);
      setUnread(messagesStore.unreadCount());
      navigate({ to: '/admin/dashboard' });
    } else {
      setError('Incorrect password. Try again.');
      setPw('');
    }
  }

  function logout() {
    auth.logout();
    setAuthed(false);
    navigate({ to: '/' });
  }

  if (!authed) {  
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="admin-login-icon"><Shield size={32} /></div>
          <h1>Admin Panel</h1>
          <p>Enter your password to continue</p>
          <form onSubmit={login} className="admin-login-form">
            <div className="admin-input-wrap">
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={e => { setPw(e.target.value); setError(''); }}
                placeholder="Password"
                autoFocus
                required
              />
              <button type="button" className="admin-eye" onClick={() => setShow(s => !s)}>
                {show ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="admin-btn-primary">Login</button>
          </form>
          <Link to="/" className="admin-back-link">← Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  const navLinks = [
    { to: '/admin/dashboard', label: 'Dashboard',  icon: LayoutDashboard },
    { to: '/admin/projects',  label: 'Projects',   icon: FolderOpen },
    { to: '/admin/skills',    label: 'Skills',     icon: Zap },
    { to: '/admin/services',  label: 'Services',   icon: Wrench },
    { to: '/admin/messages',  label: 'Messages',   icon: MessageSquare, badge: unread },
    { to: '/admin/settings',  label: 'Settings',   icon: Settings },
  ] as const;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <div className="admin-logo">
            <Shield size={20} />
            <span>ADMIN</span>
          </div>
          <nav className="admin-nav">
            {navLinks.map(({ to, label, icon: Icon, badge }) => (
              <Link key={to} to={to} className="admin-nav-link" activeProps={{ className: 'admin-nav-link active' }}>
                <Icon size={17} />
                <span>{label}</span>
                {badge ? <span className="admin-badge">{badge}</span> : null}
              </Link>
            ))}
          </nav>
        </div>
        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-nav-link"><Eye size={17}/><span>View Site</span></Link>
          <button className="admin-nav-link admin-logout" onClick={logout}><LogOut size={17}/><span>Logout</span></button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
