import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { settingsStore, type SiteSettings } from '@/lib/admin-store';
import { Save, Check } from 'lucide-react';

export const Route = createFileRoute('/admin/settings')({ component: AdminSettings });

function AdminSettings() {
  const [form, setForm] = useState<SiteSettings>(() => settingsStore.get());
  const [saved, setSaved] = useState(false);

  function save() {
    settingsStore.save(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const f = (k: keyof SiteSettings, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const sections: { title: string; fields: { key: keyof SiteSettings; label: string; placeholder: string; type?: string }[] }[] = [
    {
      title: 'Personal Info',
      fields: [
        { key:'ownerName',  label:'Full Name',    placeholder:'MUHAMMED MIDLAJ KK' },
        { key:'tagline',    label:'Tagline',      placeholder:'Web Designer & Developer' },
        { key:'location',   label:'Location',     placeholder:'Malappuram, Kerala, India' },
        { key:'bio',        label:'Short Bio',    placeholder:'Tell your story...' },
      ],
    },
    {
      title: 'Contact Details',
      fields: [
        { key:'email',    label:'Email',    placeholder:'you@email.com', type:'email' },
        { key:'phone',    label:'Phone',    placeholder:'+91 9XXXXXXXXX' },
        { key:'whatsapp', label:'WhatsApp Number (with country code, no +)', placeholder:'919947277646' },
      ],
    },
    {
      title: 'Social Links',
      fields: [
        { key:'instagram1', label:'Instagram Handle 1', placeholder:'mhd.mid_laj' },
        { key:'instagram2', label:'Instagram Handle 2', placeholder:'midl4j.kk' },
        { key:'facebook',   label:'Facebook URL',       placeholder:'https://facebook.com/...' },
      ],
    },
    {
      title: 'Portfolio Stats',
      fields: [
        { key:'yearsExp',  label:'Years Experience', placeholder:'1+' },
        { key:'projects',  label:'Projects Count',   placeholder:'20+' },
        { key:'clients',   label:'Clients Count',    placeholder:'30+' },
      ],
    },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div><h1>Settings</h1><p>Update your portfolio info and contact details</p></div>
        <button className="admin-btn-primary" onClick={save}>
          {saved ? <><Check size={14}/> Saved!</> : <><Save size={14}/> Save Changes</>}
        </button>
      </div>

      {saved && <div className="admin-toast">✓ Settings saved successfully</div>}

      {sections.map(sec => (
        <div key={sec.title} className="admin-form-card">
          <h3>{sec.title}</h3>
          <div className="admin-form-grid">
            {sec.fields.map(({ key, label, placeholder, type }) => (
              <label key={key} className={`admin-label ${key === 'bio' ? 'admin-label--full' : ''}`}>
                {label}
                {key === 'bio'
                  ? <textarea className="admin-input admin-textarea" value={form[key]} onChange={e => f(key, e.target.value)} placeholder={placeholder} rows={3}/>
                  : <input className="admin-input" type={type || 'text'} value={form[key]} onChange={e => f(key, e.target.value)} placeholder={placeholder}/>
                }
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="admin-settings-note">
        <strong>Note:</strong> Settings are saved in your browser's localStorage. To apply changes to the live site, update the values in <code>src/components/portfolio.tsx</code> and <code>src/routes/</code> files accordingly.
      </div>
    </div>
  );
}
