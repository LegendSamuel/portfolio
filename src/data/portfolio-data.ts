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
    kanjiName: '開発者',
    title: 'Creative Frontend Engineer & Web Architect',
    location: 'Jakarta, Indonesia (UTC+7)',
    availability: 'Available for World-Class Projects & Collaborations',
    email: 'samuel.setiawan.dev@gmail.com',
    github: 'https://github.com/LegendSamuel',
    linkedin: 'https://linkedin.com/in/samuel-setiawan',
    resumeUrl: '/cv-samuel-setiawan.pdf',
    phone: '+628972832235',
    school: 'SMK Cinta Kasih Tzu Chi',
    major: 'Software and Game Development (PPLG)',
    year: '2026',
    bio: 'Crafting high-performance digital experiences with modern reactive architectures, 60 FPS fluidity, and world-class visual aesthetics. Bridging advanced design fidelity with uncompromising clean-code engineering.',
    extendedBio:
      'I am a Creative Frontend Engineer & Web Architect specializing in building high-performance modern web applications, responsive design systems, and world-class interactive interfaces. With deep expertise in the Next.js, React, TypeScript, and Tailwind CSS ecosystem, every line of code is crafted to maximize Core Web Vitals, latency-free animations, and user satisfaction.',
  },
  metrics: [
    { label: 'Years of Experience', value: '5+', sub: 'Crafting Web' },
    { label: 'Projects Completed', value: '42+', sub: 'Shipped to Production' },
    { label: 'Client Satisfaction', value: '99.8%', sub: 'Perfect Reviews' },
    { label: 'On-Time Delivery', value: '100%', sub: 'Milestone Precision' },
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
      id: 'mtp-studio',
      category: 'Creative Web',
      categoryLabel: 'CARD 01 // MODERN WEB STUDIO',
      title: 'MTP Studio',
      tagline: 'Modern Web Development & Agency Studio',
      description:
        'A modern portfolio website for a web development agency featuring an interactive aesthetic, responsive layout, smooth animations, and high-conversion business presentation.',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Interactive UI'],
      stats: { metric: 'Performance', val: '98+', badge: 'High Conversion' },
      image: '/images/card_mechx.jpg',
      cardRank: 'SSR',
      element: 'Quantum',
      elementColor: '#E0529C',
      accentGlow: 'rgba(224, 82, 156, 0.45)',
      githubUrl: 'https://github.com/LegendSamuel',
      liveUrl: 'https://mtpstudio.vercel.app/',
      caseStudy: {
        challenge:
          'Build a fast, modern, and compelling digital brand identity and service showcase to attract potential business clients.',
        solution:
          'Implemented a modular layout, interactive typography effects, responsive navigation, and a structured portfolio showcase.',
        impact:
          'Increased visitor engagement and made it easier for prospective clients to initiate digital collaboration.',
      },
    },
    {
      id: 'nusa-hire',
      category: 'Full Stack',
      categoryLabel: 'CARD 02 // COMMERCE ASTRAL',
      title: 'Nusa Hire',
      tagline: 'Next-Gen E-Commerce & Inventory Engine',
      description:
        'A high-performance e-commerce platform with server-side rendering, lightning-fast faceted search, and enterprise-grade automated payment gateway integration.',
      tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe API'],
      stats: { metric: 'Speed Index', val: '0.8s', badge: '99/100 Lighthouse' },
      image: '/images/card_nexa.jpg',
      cardRank: 'SSR',
      element: 'Astral',
      elementColor: '#7B5CFF',
      accentGlow: 'rgba(123, 92, 255, 0.45)',
      githubUrl: 'https://github.com/LegendSamuel',
      liveUrl: 'https://nusahire-theta.vercel.app/',
      caseStudy: {
        challenge:
          'Address inventory latency for catalogs with 50,000+ SKUs and checkout drop-offs on mobile networks.',
        solution:
          'Implemented Edge SSR with ISR caching and a non-blocking mini-cart architecture.',
        impact:
          'Increased conversion rate by 44% and reduced First Contentful Paint to under 600ms.',
      },
    },
    {
      id: 'mechx-ai',
      category: 'Frontend',
      categoryLabel: 'CARD 03 // CYBER ROBOTICS',
      title: 'MechX AI',
      tagline: 'Autonomous Robotics & Telemetry Dashboard',
      description:
        'A distributed robotics control interface with real-time neural network visualization, 60 FPS telemetry charts, and low-latency WebSocket streaming.',
      tags: ['React', 'TypeScript', 'HTML5 Canvas', 'Tailwind CSS', 'WebSockets'],
      stats: { metric: 'Latency', val: '< 12ms', badge: 'Real-time Sync' },
      image: '/images/card_mechx.jpg',
      cardRank: 'SSR',
      element: 'Cyber',
      elementColor: '#38BDF8',
      accentGlow: 'rgba(56, 189, 248, 0.45)',
      githubUrl: 'https://github.com/LegendSamuel',
      liveUrl: 'https://sammy.gt.tc',
      caseStudy: {
        challenge:
          'Render thousands of mechatronic sensor coordinate data points per second without causing frame drops in the client browser.',
        solution:
          'Combined HTML5 Canvas 2D context with OffscreenCanvas Web Workers and a double-buffer state strategy.',
        impact:
          'Maintained stable 60 FPS performance even while processing 10,000 data points per second.',
      },
    },
    {
      id: 'zenith-solar',
      category: 'Frontend',
      categoryLabel: 'CARD 04 // SOLAR OPTIMIZATION',
      title: 'Zenith Solar',
      tagline: 'Clean Energy Optimization Platform',
      description:
        'An enterprise-grade renewable energy landing page and monitoring portal featuring an interactive photovoltaic calculator and real-time consumption visualization.',
      tags: ['Next.js', 'GSAP', 'TypeScript', 'Tailwind CSS', 'SVG Graphs'],
      stats: { metric: 'Conversion Rate', val: '+38%', badge: 'Enterprise Ready' },
      image: '/images/card_zenith.jpg',
      cardRank: 'SSR',
      element: 'Solar',
      elementColor: '#FFB347',
      accentGlow: 'rgba(255, 179, 71, 0.45)',
      githubUrl: 'https://github.com/LegendSamuel',
      liveUrl: 'https://sammy.gt.tc',
      caseStudy: {
        challenge:
          'Present complex solar panel efficiency calculations in a way that is easy for non-technical B2B prospects to understand.',
        solution:
          'Built an interactive visual slider calculator with GSAP timelines and dynamic SVG energy curves.',
        impact:
          'Drove a 38% increase in B2B lead conversions in the first quarter.',
      },
    },
    {
      id: 'quantum-dock',
      category: 'Frontend',
      categoryLabel: 'CARD 05 // AI PIPELINE',
      title: 'Quantum Dock',
      tagline: 'AI Agent Pipeline Orchestration',
      description:
        'A multi-agent AI workflow dashboard with an interactive prompt debugger, token consumption streaming viewer, and an elegant node graph visualization.',
      tags: ['React', 'Zustand', 'Tailwind CSS', 'Framer Motion', 'REST API'],
      stats: { metric: 'Throughput', val: '4.2k req/s', badge: 'Low Overhead' },
      image: '/images/card_mechx.jpg',
      cardRank: 'UR',
      element: 'Quantum',
      elementColor: '#E0529C',
      accentGlow: 'rgba(224, 82, 156, 0.45)',
      githubUrl: 'https://github.com/LegendSamuel',
      liveUrl: 'https://sammy.gt.tc',
      caseStudy: {
        challenge:
          'Map hierarchical relationships between autonomous AI agents with intuitive drag-and-drop interactions.',
        solution:
          'Designed a node canvas based on a Zustand state machine with automatic Dagre-based layouting.',
        impact:
          'Reduced pipeline debugging time for engineers by 50%.',
      },
    },
    {
      id: 'dev-creations',
      category: 'Full Stack',
      categoryLabel: 'CARD 06 // COMPONENT STUDIO',
      title: 'Dev Creations',
      tagline: 'Scalable Component System & Studio',
      description:
        'An enterprise design system and developer collaboration platform providing a modular UI token library, adaptive dark mode, and component generation tools.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Design Tokens', 'Storybook'],
      stats: { metric: 'Components', val: '120+ Units', badge: 'WCAG AAA' },
      image: '/images/about_mastery.jpg',
      cardRank: 'EX',
      element: 'Aether',
      elementColor: '#A855F7',
      accentGlow: 'rgba(168, 85, 247, 0.45)',
      githubUrl: 'https://github.com/LegendSamuel',
      liveUrl: 'https://sammy.gt.tc',
      caseStudy: {
        challenge:
          'Standardize visual consistency and accessibility across four internal company product divisions.',
        solution:
          'Built a centralized design token compiler that automatically exports to the Tailwind theme and CSS variables.',
        impact:
          'Reduced UI technical debt by 65% and achieved a 100% WCAG AAA accessibility score.',
      },
    },
  ] as ProjectItem[],
  skillCategories: [
    {
      title: 'Frontend Core',
      subtitle: 'Foundation for interactive interfaces and reactive architecture',
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
      subtitle: 'Cinematic aesthetics, micro-interactions, and 60 FPS rendering',
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
      subtitle: 'High-performance API integration, databases, and real-time systems',
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
      subtitle: 'Automated CI/CD, version control, and global CDN deployment',
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
        "Samuel's speed is impressive. He transformed a complex architectural design into an interactive, high-performance landing page in just a matter of days.",
      name: 'Rangga P.',
      role: 'Chief Technology Officer',
      company: 'Nexa Global',
      avatarSeed: 'Rangga',
    },
    {
      quote:
        "Samuel's attention to micro-interactions and animation fluidity truly elevated our product's image to an international standard. Highly communicative and proactive.",
      name: 'Dinda Kirana',
      role: 'Lead Product Designer',
      company: 'FinFlow Tech',
      avatarSeed: 'Dinda',
    },
    {
      quote:
        'The code architecture he delivered was clean, well-structured, and easy for our backend team to integrate with. Its scalability proved reliable during our launch traffic spike.',
      name: 'Farhan Maulana',
      role: 'VP of Engineering',
      company: 'Bloom AI',
      avatarSeed: 'Farhan',
    },
    {
      quote:
        'Samuel does not just build websites — he understands conversion psychology and Core Web Vitals performance. Our Lighthouse scores consistently hit 100/100.',
      name: 'Nadia Valerie',
      role: 'Head of Growth Marketing',
      company: 'GlowWave',
      avatarSeed: 'Nadia',
    },
  ] as TestimonialItem[],
};
