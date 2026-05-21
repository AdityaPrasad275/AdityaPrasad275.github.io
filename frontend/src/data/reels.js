const reels = [
  {
    id: 'who-are-you',
    question: 'Who are you?',
    kicker: 'Identity',
    title: 'Aditya Prasad',
    summary: 'I build data systems for the physical world.',
    footerCaption: 'Building data systems at the hardware-software boundary.',
    points: ['Battery Intelligence @ Ola Electric', 'Hardware-software boundary'],
    comments: [
      { name: 'Maya', handle: '@mayasays', text: 'oh cool, this is actually clean' },
      { name: 'Arjun', handle: '@arjuns', text: 'battery intelligence sounds terrifyingly serious. respect.' },
      { name: 'Nihal', handle: '@neha.exe', text: 'Oh this is nice, insta in web' },
    ],
    chips: ['Software Engineer', 'IIT Bombay'],
    accent: '#f59e0b',
    background:
      'radial-gradient(circle at top, rgba(245, 158, 11, 0.24) 0%, rgba(245, 158, 11, 0) 42%), linear-gradient(160deg, #050505 0%, #101010 100%)',
  },
  {
    id: 'what-do-you-do',
    question: 'What do you do?',
    kicker: 'Work',
    title: 'I turn messy data into usable systems.',
    summary: 'Fast internal tools, reliable pipelines, and workflows people can trust.',
    footerCaption: 'Fast tools, reliable pipelines, clear workflows.',
    points: ['Django and Celery orchestration', 'Pandas and Parquet pipelines', 'Process-lineage data models'],
    comments: [
      { name: 'Sana', handle: '@sanawrites', text: 'oh nice, finally someone who fears broken pipelines' },
      { name: 'Ishaan', handle: '@ishaan.dev', text: 'this is weirdly satisfying' },
      { name: 'Nihal', handle: '@neha.exe', text: 'wait how do i get out of this comment section' },
    ],
    chips: ['Exploration', 'Analytics', 'Infrastructure'],
    accent: '#38bdf8',
    background:
      'radial-gradient(circle at top, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 44%), linear-gradient(160deg, #050505 0%, #111827 100%)',
  },
  {
    id: 'are-you-good',
    question: 'Are you good at it?',
    kicker: 'Proof',
    title: 'Yes. I ship in real teams.',
    summary: 'The signal is in the work: internal tools, enterprise automation, and a database engine from scratch.',
    footerCaption: 'Proof is in the work that ships.',
    points: ['Ola Electric battery intelligence systems', 'Accenture enterprise workflow work', 'AtlasDB and other deep technical side projects'],
    comments: [
      { name: 'Kabir', handle: '@kabirbuilds', text: 'oh wow, actual shipping receipts' },
      { name: 'Tara', handle: '@taratypes', text: 'you can tell this person has been in the trenches' },
      { name: 'Nihal', handle: '@neha.exe', text: 'help I am TRAPPED HERE' },
    ],
    chips: ['Execution', 'Ownership', 'Depth'],
    accent: '#22c55e',
    background:
      'radial-gradient(circle at top, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0) 44%), linear-gradient(160deg, #050505 0%, #0f172a 100%)',
  },
  {
    id: 'what-built',
    question: 'What have you built?',
    kicker: 'Projects',
    title: 'Databases, interview tools, and browser apps.',
    summary: 'I like building systems that are technically sharp and easy to use.',
    footerCaption: 'A database engine, a mock interview tool, and a browser IDE.',
    points: ['AtlasDB: relational DB with B+ trees and WAL', 'InteReview.ai: mock interview chatbot', 'CSES IDE: in-browser coding environment'],
    comments: [
      { name: 'Owen', handle: '@owen.codes', text: 'okay atlasdb is actually cool' },
      { name: 'Pallavi', handle: '@pallavi.dev', text: 'browser IDEs are either genius or cursed. this seems both.' },
      { name: 'Mira', handle: '@mira.loop', text: 'He was talking too much' },
    ],
    chips: ['C++', 'React', 'Express'],
    accent: '#f97316',
    background:
      'radial-gradient(circle at top, rgba(249, 115, 22, 0.22) 0%, rgba(249, 115, 22, 0) 42%), linear-gradient(160deg, #050505 0%, #18181b 100%)',
  },
  {
    id: 'contact',
    question: 'How do I reach you?',
    kicker: 'Contact',
    title: 'Say hi.',
    summary: 'Email is the fastest route. Links are here if you want more context.',
    linkPrompt: 'Linked below.',
    footerCaption: 'Email is fastest. Links are here if you need context.',
    points: ['Email: adityanprasad275@gmail.com', 'GitHub, LinkedIn, Twitter, Resume'],
    comments: [
      { name: 'Ari', handle: '@ari.mail', text: 'email is still undefeated tbh' },
      { name: 'Dev', handle: '@devdotdev', text: 'links in bio energy but less annoying' },
      { name: 'Nihal', handle: '@neha.exe', text: 'THEY ARE REMOVING MY EXISTENCE HELP' },
    ],
    links: [
      { label: 'Email', href: 'mailto:adityanprasad275@gmail.com', external: false, icon: 'mail' },
      { label: 'GitHub', href: 'https://github.com/AdityaPrasad275', external: true, icon: 'github' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adityanpd/', external: true, icon: 'linkedin' },
      { label: 'Twitter', href: 'https://x.com/adityanprasad74', external: true, icon: 'twitter' },
      { label: 'Resume', href: 'https://adityaprasad275.github.io/aditya-prasad-resume.pdf', external: true, icon: 'resume' },
    ],
    accent: '#38bdf8',
    background:
      'radial-gradient(circle at top, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 44%), linear-gradient(160deg, #050505 0%, #020617 100%)',
  },
]

export default reels
