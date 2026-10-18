/* ─────────────────────────────────────────
   Admin Store — localStorage-backed state
   All data persists across page reloads.
───────────────────────────────────────── */

export const ADMIN_PASSWORD = 'midlajkk';

// ── Types ──────────────────────────────
export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string;
  url: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
  tools: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface SiteSettings {
  ownerName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  instagram1: string;
  instagram2: string;
  facebook: string;
  bio: string;
  yearsExp: string;
  projects: string;
  clients: string;
}

// ── Default data ────────────────────────
export const DEFAULT_PROJECTS: Project[] = [
  { id:'1', name:'AI ISLAM OFFICIAL', description:'AI-Powered Islamic Platform', tags:'React Native · Next.js · OpenAI', url:'https://aiislamofficial.vercel.app/' },
  { id:'2', name:'AI ISLAM', description:'AI Chat Experience', tags:'React · Next.js · OpenAI', url:'https://aiislam.vercel.app/' },
  { id:'3', name:'CHATSEE', description:'Where Conversations Come Alive', tags:'Conversation · Find · WordPress', url:'https://chatsee.lovable.app/' },
  { id:'4', name:'AL ZAD RESTAURANT', description:'Smart Hotel & Hospitality Platform', tags:'Next.js · MongoDB · Supabase', url:'https://alzad.vercel.app/' },
  { id:'5', name:'HIKMA CLASS UNION', description:'Educational Union Website', tags:'WordPress · Responsive · SEO', url:'https://hikmaclass.vercel.app/' },
];

export const DEFAULT_SKILLS: Skill[] = [
  { id:'1', name:'FRONTEND DEVELOPMENT', level:'90%', tools:'React · Next.js · TypeScript · HTML · CSS · Tailwind' },
  { id:'2', name:'BACKEND & APIS', level:'70%', tools:'Node.js · REST APIs · Supabase · MongoDB' },
  { id:'3', name:'MOBILE DEVELOPMENT', level:'65%', tools:'React Native · Cross-platform development' },
  { id:'4', name:'CMS & BUILDERS', level:'85%', tools:'WordPress · WooCommerce · Shopify' },
  { id:'5', name:'DATABASES & CLOUD', level:'75%', tools:'Supabase · MongoDB · Vercel' },
  { id:'6', name:'DIGITAL MARKETING', level:'88%', tools:'On-page SEO · Technical SEO · Google Ads · Meta Ads' },
  { id:'7', name:'GRAPHIC DESIGN', level:'82%', tools:'Photoshop · Illustrator · InDesign · Figma' },
  { id:'8', name:'VIDEO EDITING', level:'93%', tools:'CapCut · Premiere Pro · Motion graphics' },
  { id:'9', name:'HOSTING & SERVERS', level:'78%', tools:'SSL · Domains · Hosting · Server optimization' },
];

export const DEFAULT_SERVICES: Service[] = [
  { id:'1', name:'WEB DEVELOPMENT', description:'Custom websites and web apps built with React, Next.js, and modern technologies. Fast, responsive, and built to convert.' },
  { id:'2', name:'E-COMMERCE', description:'Complete online stores with payment integration, inventory management, and seamless shopping experiences.' },
  { id:'3', name:'SEO OPTIMIZATION', description:'Proven SEO strategies to improve search rankings, drive organic traffic, and grow your online visibility.' },
  { id:'4', name:'DIGITAL MARKETING', description:'Strategic campaigns across social media, email, and content to grow your brand and reach your audience.' },
  { id:'5', name:'GRAPHIC DESIGN', description:'Creative visual solutions — branding, logos, social media design, and print materials that make an impact.' },
  { id:'6', name:'SERVER MANAGEMENT', description:'Reliable hosting, SSL setup, domain management, and server optimization for peak performance.' },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  ownerName: 'MUHAMMED MIDLAJ KK',
  tagline: 'Web Designer & Developer',
  email: 'muhammedmidlaj032@gmail.com',
  phone: '+91 9947277646',
  whatsapp: '919947277646',
  location: 'Malappuram, Kerala, India',
  instagram1: 'mhd.mid_laj',
  instagram2: 'midl4j.kk',
  facebook: 'https://facebook.com/',
  bio: "I'm MUHAMMED MIDLAJ KK — a Web Designer & Developer from Malappuram, Kerala. I build fast, visually sharp digital experiences that help brands grow.",
  yearsExp: '1+',
  projects: '20+',
  clients: '30+',
};

// ── Helpers ─────────────────────────────
function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}
function set<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

// ── Auth ────────────────────────────────
export const auth = {
  isLoggedIn: () => sessionStorage.getItem('admin-auth') === '1',
  login: (pw: string) => {
    if (pw === ADMIN_PASSWORD) { sessionStorage.setItem('admin-auth', '1'); return true; }
    return false;
  },
  logout: () => sessionStorage.removeItem('admin-auth'),
};

// ── Projects ────────────────────────────
export const projectsStore = {
  getAll: (): Project[] => get('admin-projects', DEFAULT_PROJECTS),
  save: (items: Project[]) => set('admin-projects', items),
  add: (p: Omit<Project,'id'>) => {
    const items = projectsStore.getAll();
    items.push({ ...p, id: uid() });
    projectsStore.save(items);
  },
  update: (id: string, p: Partial<Project>) => {
    const items = projectsStore.getAll().map(x => x.id === id ? { ...x, ...p } : x);
    projectsStore.save(items);
  },
  remove: (id: string) => projectsStore.save(projectsStore.getAll().filter(x => x.id !== id)),
};

// ── Skills ──────────────────────────────
export const skillsStore = {
  getAll: (): Skill[] => get('admin-skills', DEFAULT_SKILLS),
  save: (items: Skill[]) => set('admin-skills', items),
  add: (s: Omit<Skill,'id'>) => {
    const items = skillsStore.getAll();
    items.push({ ...s, id: uid() });
    skillsStore.save(items);
  },
  update: (id: string, s: Partial<Skill>) => {
    const items = skillsStore.getAll().map(x => x.id === id ? { ...x, ...s } : x);
    skillsStore.save(items);
  },
  remove: (id: string) => skillsStore.save(skillsStore.getAll().filter(x => x.id !== id)),
};

// ── Services ────────────────────────────
export const servicesStore = {
  getAll: (): Service[] => get('admin-services', DEFAULT_SERVICES),
  save: (items: Service[]) => set('admin-services', items),
  add: (s: Omit<Service,'id'>) => {
    const items = servicesStore.getAll();
    items.push({ ...s, id: uid() });
    servicesStore.save(items);
  },
  update: (id: string, s: Partial<Service>) => {
    const items = servicesStore.getAll().map(x => x.id === id ? { ...x, ...s } : x);
    servicesStore.save(items);
  },
  remove: (id: string) => servicesStore.save(servicesStore.getAll().filter(x => x.id !== id)),
};

// ── Messages ────────────────────────────
export const messagesStore = {
  getAll: (): Message[] => get('admin-messages', []),
  save: (items: Message[]) => set('admin-messages', items),
  add: (m: Omit<Message,'id'|'date'|'read'>) => {
    const items = messagesStore.getAll();
    items.unshift({ ...m, id: uid(), date: new Date().toLocaleString(), read: false });
    messagesStore.save(items);
  },
  markRead: (id: string) => {
    const items = messagesStore.getAll().map(x => x.id === id ? { ...x, read: true } : x);
    messagesStore.save(items);
  },
  remove: (id: string) => messagesStore.save(messagesStore.getAll().filter(x => x.id !== id)),
  unreadCount: () => messagesStore.getAll().filter(x => !x.read).length,
};

// ── Settings ────────────────────────────
export const settingsStore = {
  get: (): SiteSettings => get('admin-settings', DEFAULT_SETTINGS),
  save: (s: SiteSettings) => set('admin-settings', s),
};
