export const profile = {
  name: 'Aditya N Prasad',
  email: 'adityanprasad275@gmail.com',
  github: 'https://github.com/AdityaPrasad275',
  resume: 'https://drive.google.com/file/d/191-21Px7R8ZN9N_8Xb33KRAfOm2sCGmA/view?usp=sharing',
  tagline: 'I build high-velocity web products and data systems.',
  intro:
    'Engineer focused on fast experimentation, practical AI tooling, and data-heavy products that are useful in the real world.'
};

export const blogs = [
  {
    slug: 'speed-dating',
    title: 'I Tried Launching Speed Dating 48 Hours Before Valentine’s',
    summary: 'Build, distribution, waitlist reality, and what this experiment taught me about trust and quality.',
    date: '2026-02-12',
    href: '/#/blog/speed-dating',
    source: '/speed_dating.md'
  }
];

export const projects = [
  {
    name: 'InteReview.ai',
    stack: 'React, Express, LLM workflows',
    summary: 'Mock interview chatbot with reviewer loop and retrieval-augmented prompts.',
    github: 'https://github.com/AdityaPrasad275/mock-interview-ai'
  },
  {
    name: 'In-Browser IDE for CSES',
    stack: 'TypeScript, React, Monaco',
    summary: 'LeetCode-style browser IDE with persisted code and sandboxed execution.',
    github: 'https://github.com/AdityaPrasad275/cses-ide'
  }
];

export const experiences = [
  {
    company: 'Ola Electric',
    role: 'Graduate Engineer Trainee',
    period: 'June 2025 - Present',
    logo: '/logos/ola-electric.png',
    logoMode: 'trim',
    highlights: [
      'Engineered a full-stack data exploration platform (React + Python microservices + Arrow IPC) for low-latency display of 600k+ time-series points and 50+ experiment parameters.',
      'Built a high-volume Polars + Parquet processing pipeline for 2000+ battery cells per batch, reducing runtime from 20+ minutes to about 3 minutes.',
      'Designed a Django + DRF data model for cross-process lineage tracking across 12 battery manufacturing steps with 100+ dynamic JSON parameters.',
      'Developed automated batch analytics on Linux VM (rclone + Uvicorn) to continuously generate plots and KPI dashboards for faster decision-making.'
    ]
  },
  {
    company: 'Accenture',
    role: 'Advanced Application Engineering Intern',
    period: 'May 2024 - July 2024',
    logo: '/logos/accenture.png',
    highlights: [
      'Integrated GenAI solutions into Oracle Fusion Cloud to reduce manual effort and improve HR operational efficiency.',
      'Automated HR workflows for a US client with a $5M budget, reducing 120+ personnel hours of manual workload.',
      'Streamlined payroll, hiring, and absence management across 20+ departments supporting 30,000+ employees.'
    ]
  }
];

export const education = {
  institute: 'Indian Institute of Technology Bombay',
  logo: '/logos/iitb.png',
  degree: 'B.Tech in Chemical Engineering',
  minor: 'Minor in Computer Science',
  graduation: 'May 2025'
};
