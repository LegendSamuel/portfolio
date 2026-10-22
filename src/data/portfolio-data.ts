export interface ProjectItem {
  id: string;
  category: 'Full Stack' | 'Frontend' | 'Creative Web';
  categoryLabel: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  stats: { metric: string; val: string; badge: string };
  image: string;
  cardRank: 'SSR' | 'EX' | 'UR';
  element: 'Astral' | 'Cyber' | 'Solar' | 'Quantum' | 'Aether';
  elementColor: string;
  accentGlow: string;
  githubUrl: string;
  liveUrl: string;
  caseStudy: {
    challenge: string;
    solution: string;
    impact: string;
  };
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  skills: { name: string; level: number; rank: string }[];
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarSeed: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Samuel Setiawan',
    nickname: 'Sammy',
    kanjiName: '塞缪尔 / 匠',
    title: 'Creative Frontend Engineer & Web Architect',
    location: 'Jakarta, Indonesia (UTC+7)',
    availability: 'Available for World-Class Projects & Quests',
    email: 'samuel.setiawan.dev@gmail.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    year: '2026',
    bio: 'Crafting high-performance digital realms with modern reactive architectures, 60 FPS fluidity, and world-class visual aesthetics. Bridging advanced design fidelity with uncompromising clean-code engineering.',
    extendedBio:
      'Saya adalah seorang Creative Frontend Engineer & Web Architect yang berspesialisasi dalam membangun aplikasi web modern berkinerja tinggi, sistem desain responsif, dan antarmuka interaktif kelas dunia. Dengan keahlian mendalam pada ekosistem Next.js, React, TypeScript, dan Tailwind CSS, setiap baris kode dirancang untuk memaksimalkan Core Web Vitals, animasi tanpa latensi, dan kepuasan pengguna.',
  },
  metrics: [
    { label: 'Tahun Pengalaman', value: '5+', sub: 'Crafting Web' },
    { label: 'Proyek Selesai', value: '42+', sub: 'Shipped to Prod' },
    { label: 'Kepuasan Klien', value: '99.8%', sub: 'Perfect Reviews' },
    { label: 'Tepat Waktu', value: '100%', sub: 'Milestone Precision' },
  ],
  techStack: [
    { name: 'Next.js 14/15', role: 'Full-Stack React Framework' },
    { name: 'React 19', role: 'Reactive UI Engine' },
    { name: 'TypeScript', role: 'Strict Type Safety' },
    { name: 'Tailwind CSS', role: 'Utility Design System' },
    { name: 'GSAP / Motion', role: 'Cinematic 60 FPS' },
    { name: 'HTML5 Canvas', role: 'Generative Visuals' },
    { name: 'Node.js', role: 'Backend Services' },
    { name: 'PostgreSQL', role: 'Relational Database' },
  ],
  projects: [
    {
      id: 'nexa-store',
      category: 'Full Stack',
      categoryLabel: 'CARD 01 // COMMERCE ASTRAL',
      title: 'Nexa Store',
      tagline: 'Next-Gen E-Commerce & Inventory Engine',
      description:
        'Platform e-commerce performa tinggi dengan server-side rendering, faceted search secepat kilat, dan integrasi payment gateway otomatis bertaraf enterprise.',
      tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe API'],
      stats: { metric: 'Speed Index', val: '0.8s', badge: '99/100 Lighthouse' },
      image: '/images/card_nexa.jpg',
      cardRank: 'SSR',
      element: 'Astral',
      elementColor: '#7B5CFF',
      accentGlow: 'rgba(123, 92, 255, 0.45)',
      githubUrl: 'https://github.com',
      liveUrl: 'https://sammy.gt.tc',
      caseStudy: {
        challenge:
          'Mengatasi latensi inventaris katalog 50.000+ SKU dan checkout drops pada jaringan mobile.',
        solution:
          'Mengimplementasikan Edge SSR dengan ISR caching dan arsitektur mini-cart tanpa blocking render.',
        impact: 'Meningkatkan rasio konversi sebesar +44% dan memangkas First Contentful Paint di bawah 600ms.',
      },
    },
    {
      id: 'mechx-ai',
      category: 'Frontend',
      categoryLabel: 'CARD 02 // CYBER ROBOTICS',
      title: 'MechX AI',
      tagline: 'Autonomous Robotics & Telemetry Dashboard',
      description:
        'Antarmuka kontrol robotik terdistribusi dengan visualisasi neural network real-time, grafik telemetry 60 FPS, dan streaming WebSockets tanpa latensi.',
      tags: ['React', 'TypeScript', 'HTML5 Canvas', 'Tailwind CSS', 'WebSockets'],
      stats: { metric: 'Latency', val: '< 12ms', badge: 'Real-time Sync' },
      image: '/images/card_mechx.jpg',
      cardRank: 'SSR',
      element: 'Cyber',
      elementColor: '#38BDF8',
      accentGlow: 'rgba(56, 189, 248, 0.45)',
      githubUrl: 'https://github.com',
      liveUrl: 'https://sammy.gt.tc',
      caseStudy: {
        challenge:
          'Merender ribuan data titik koordinat sensor mekatronika per detik tanpa menyebabkan frame drops di browser klien.',
        solution:
          'Menggabungkan HTML5 Canvas 2D context dengan OffscreenCanvas Web Worker dan state buffer ganda.',
        impact: 'Menjaga kestabilan 60 FPS bahkan saat memproses 10.000 data point per detik.',
      },
    },
    {
      id: 'zenith-solar',
      category: 'Frontend',
      categoryLabel: 'CARD 03 // SOLAR OPTIMIZATION',
      title: 'Zenith Solar',
      tagline: 'Clean Energy Optimization Platform',
      description:
        'Landing page dan portal monitoring energi terbarukan kelas enterprise. Dilengkapi kalkulator fotovoltaik interaktif dan visualisasi konsumsi real-time.',
      tags: ['Next.js', 'GSAP', 'TypeScript', 'Tailwind CSS', 'SVG Graphs'],
      stats: { metric: 'Conversion Rate', val: '+38%', badge: 'Enterprise Ready' },
      image: '/images/card_zenith.jpg',
      cardRank: 'SSR',
      element: 'Solar',
      elementColor: '#FFB347',
      accentGlow: 'rgba(255, 179, 71, 0.45)',
      githubUrl: 'https://github.com',
      liveUrl: 'https://sammy.gt.tc',
      caseStudy: {
        challenge:
          'Mempresentasikan data kalkulasi efisiensi panel surya yang rumit agar mudah dipahami prospek B2B non-teknis.',
        solution:
          'Membangun interactive visual slider kalkulator dengan GSAP timeline dan dynamic SVG energy curves.',
        impact: 'Mendorong kenaikan conversion leads B2B sebesar 38% dalam kuartal pertama.',
      },
    },
    {
      id: 'quantum-dock',
      category: 'Frontend',
      categoryLabel: 'CARD 04 // AI PIPELINE',
      title: 'Quantum Dock',
      tagline: 'AI Agent Pipeline Orchestration',
      description:
        'Dashboard alur kerja multi-agent AI dengan debugger prompt interaktif, token consumption streaming viewer, dan visual node graph yang elegan.',
      tags: ['React', 'Zustand', 'Tailwind CSS', 'Framer Motion', 'REST API'],
      stats: { metric: 'Throughput', val: '4.2k req/s', badge: 'Low Overhead' },
      image: '/images/card_mechx.jpg', // fallback image
      cardRank: 'UR',
      element: 'Quantum',
      elementColor: '#E0529C',
      accentGlow: 'rgba(224, 82, 156, 0.45)',
      githubUrl: 'https://github.com',
      liveUrl: 'https://sammy.gt.tc',
      caseStudy: {
        challenge:
          'Memetakan relasi hierarkis antar autonomous AI agent dengan interaksi drag-and-drop yang intuitif.',
        solution:
          'Mendesain node canvas berbasis Zustand state machine dengan layouting otomatis berbasis dagre.',
        impact: 'Memangkas waktu debugging pipeline engineer hingga 50%.',
      },
    },
    {
      id: 'dev-creations',
      category: 'Full Stack',
      categoryLabel: 'CARD 05 // COMPONENT STUDIO',
      title: 'Dev Creations',
      tagline: 'Scalable Component System & Studio',
      description:
        'Design system enterprise dan platform kolaborasi developer yang menyediakan pustaka token UI modular, dark mode adaptif, dan generator komponen.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Design Tokens', 'Storybook'],
      stats: { metric: 'Components', val: '120+ Units', badge: 'WCAG AAA' },
      image: '/images/about_mastery.jpg', // fallback image
      cardRank: 'EX',
      element: 'Aether',
      elementColor: '#A855F7',
      accentGlow: 'rgba(168, 85, 247, 0.45)',
      githubUrl: 'https://github.com',
      liveUrl: 'https://sammy.gt.tc',
      caseStudy: {
        challenge:
          'Standardisasi konsistensi visual dan aksesibilitas lintas 4 divisi produk internal perusahaan.',
        solution:
          'Menyusun centralized design token compiler yang mengekspor otomatis ke Tailwind theme dan CSS variables.',
        impact: 'Mengurangi technical debt UI hingga 65% dan mencapai skor aksesibilitas WCAG AAA 100%.',
      },
    },
  ] as ProjectItem[],
  skillCategories: [
    {
      title: 'Frontend Core',
      subtitle: 'Pondasi antarmuka interaktif dan arsitektur reaktif',
      iconName: 'Code',
      color: '#7B5CFF',
      skills: [
        { name: 'Next.js 14/15 App Router', level: 98, rank: 'SSR' },
        { name: 'React 19 & Hooks Architecture', level: 98, rank: 'SSR' },
        { name: 'TypeScript (Strict Mode)', level: 95, rank: 'SSR' },
        { name: 'Zustand & Redux Toolkit', level: 92, rank: 'S' },
        { name: 'Modern JavaScript (ES2024)', level: 98, rank: 'SSR' },
      ],
    },
    {
      title: 'Styling & Motion',
      subtitle: 'Estetika sinematik, micro-interactions, dan 60 FPS render',
      iconName: 'Sparkles',
      color: '#E0529C',
      skills: [
        { name: 'Tailwind CSS v4 Engine', level: 99, rank: 'SSR' },
        { name: 'GSAP Animations & ScrollTrigger', level: 94, rank: 'SSR' },
        { name: 'Framer Motion Orchestration', level: 93, rank: 'S' },
        { name: 'HTML5 Canvas 2D & Particle Effects', level: 88, rank: 'S' },
        { name: 'Adaptive Responsive Design', level: 98, rank: 'SSR' },
      ],
    },
    {
      title: 'Backend & Data',
      subtitle: 'Integrasi API performa tinggi, basis data, dan real-time',
      iconName: 'Database',
      color: '#FFB347',
      skills: [
        { name: 'Node.js & Express REST', level: 90, rank: 'S' },
        { name: 'PostgreSQL & Prisma ORM', level: 88, rank: 'S' },
        { name: 'Supabase & Firebase Services', level: 92, rank: 'S' },
        { name: 'WebSockets & Server-Sent Events', level: 91, rank: 'S' },
        { name: 'GraphQL & Apollo Integration', level: 86, rank: 'A' },
      ],
    },
    {
      title: 'DevOps & Tooling',
      subtitle: 'CI/CD otomatis, kontrol versi, dan deployment CDN global',
      iconName: 'Cpu',
      color: '#38BDF8',
      skills: [
        { name: 'Git & GitHub Actions CI/CD', level: 95, rank: 'SSR' },
        { name: 'Vercel & Cloudflare Edge CDN', level: 96, rank: 'SSR' },
        { name: 'Vite, Turbopack, Webpack', level: 92, rank: 'S' },
        { name: 'Lighthouse Performance Audit 100/100', level: 98, rank: 'SSR' },
        { name: 'Vitest & Jest Unit Testing', level: 88, rank: 'S' },
      ],
    },
  ] as SkillCategory[],
  testimonials: [
    {
      quote:
        'Kecepatan kerja Samuel sangat mengagumkan. Ia berhasil mengubah rancangan arsitektur kompleks menjadi landing page interaktif dengan performa optimal dalam hitungan hari.',
      name: 'Rangga P.',
      role: 'Chief Technology Officer',
      company: 'Nexa Global',
      avatarSeed: 'Rangga',
    },
    {
      quote:
        'Perhatian Samuel pada detail micro-interaction dan fluiditas animasi benar-benar mengangkat citra produk kami ke standar internasional. Sangat komunikatif dan proaktif.',
      name: 'Dinda Kirana',
      role: 'Lead Product Designer',
      company: 'FinFlow Tech',
      avatarSeed: 'Dinda',
    },
    {
      quote:
        'Arsitektur kode yang ditulis sangat bersih, rapi, dan mudah diintegrasikan dengan tim backend kami. Skalabilitasnya terbukti andal saat lonjakan traffic peluncuran.',
      name: 'Farhan Maulana',
      role: 'VP of Engineering',
      company: 'Bloom AI',
      avatarSeed: 'Farhan',
    },
    {
      quote:
        'Samuel tidak hanya sekadar membuat website, tetapi juga memahami psikologi konversi dan performa Core Web Vitals. Hasil skor Lighthouse kami selalu 100/100.',
      name: 'Nadia Valerie',
      role: 'Head of Growth Marketing',
      company: 'GlowWave',
      avatarSeed: 'Nadia',
    },
  ] as TestimonialItem[],
};
