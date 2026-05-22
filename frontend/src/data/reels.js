const reels = [
  {
    id: 'who-are-you',
    kind: 'reel',
    canonicalUrl: '/reels/who-are-you',
    content: {
      question: 'Who are you?',
      kicker: 'Identity',
      title: 'Aditya Prasad',
      summary: 'I build data systems for the physical world.',
      footerCaption: 'Building data systems at the hardware-software boundary.',
      points: ['Battery Intelligence @ Ola Electric', 'Hardware-software boundary'],
    },
    engagement: {
      comments: [
        { name: 'Maya', text: 'oh cool, this is actually clean' },
        { name: 'Arjun', text: 'battery intelligence sounds terrifyingly serious. respect.' },
        { name: 'Nihal', text: 'Oh this is nice, insta in web' },
      ],
    },
    links: [],
    theme: {
      accent: '#f59e0b',
      background:
        'radial-gradient(circle at top, rgba(245, 158, 11, 0.24) 0%, rgba(245, 158, 11, 0) 42%), linear-gradient(160deg, #050505 0%, #101010 100%)',
    },
  },
  {
    id: 'what-do-you-do',
    kind: 'reel',
    canonicalUrl: '/reels/what-do-you-do',
    content: {
      question: 'What do you do?',
      kicker: 'Work',
      title: 'I turn messy data into usable systems.',
      summary: 'Fast internal tools, reliable pipelines, and workflows people can trust.',
      footerCaption: 'Fast tools, reliable pipelines, clear workflows.',
      points: ['Django and Celery orchestration', 'Pandas and Parquet pipelines', 'Process-lineage data models'],
    },
    engagement: {
      comments: [
        { name: 'Sana', text: 'oh nice, finally someone who fears broken pipelines' },
        { name: 'Ishaan', text: 'this is weirdly satisfying' },
        { name: 'Nihal', text: 'wait how do i get out of this comment section' },
      ],
    },
    links: [],
    theme: {
      accent: '#38bdf8',
      background:
        'radial-gradient(circle at top, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 44%), linear-gradient(160deg, #050505 0%, #111827 100%)',
    },
  },
  {
    id: 'are-you-good',
    kind: 'reel',
    canonicalUrl: '/reels/are-you-good',
    content: {
      question: 'Are you good at it?',
      kicker: 'Proof',
      title: 'Yes. I ship in real teams.',
      summary: 'The signal is in the work: internal tools, enterprise automation, and a database engine from scratch.',
      footerCaption: 'Proof is in the work that ships.',
      points: ['Ola Electric battery intelligence systems', 'Accenture enterprise workflow work', 'AtlasDB and other deep technical side projects'],
    },
    engagement: {
      comments: [
        { name: 'Kabir', text: 'oh wow, actual shipping receipts' },
        { name: 'Tara', text: 'you can tell this person has been in the trenches' },
        { name: 'Nihal', text: 'help I am TRAPPED HERE' },
      ],
    },
    links: [],
    theme: {
      accent: '#22c55e',
      background:
        'radial-gradient(circle at top, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0) 44%), linear-gradient(160deg, #050505 0%, #0f172a 100%)',
    },
  },
  {
    id: 'what-built',
    kind: 'reel',
    canonicalUrl: '/reels/what-built',
    content: {
      question: 'What have you built?',
      kicker: 'Projects',
      title: 'Databases, interview tools, and browser apps.',
      summary: 'I like building systems that are technically sharp and easy to use.',
      footerCaption: 'A database engine, a mock interview tool, and a browser IDE.',
      points: ['AtlasDB: relational DB with B+ trees and WAL', 'InteReview.ai: mock interview chatbot', 'CSES IDE: in-browser coding environment'],
    },
    engagement: {
      comments: [
        { name: 'Owen', text: 'okay atlasdb is actually cool' },
        { name: 'Pallavi', text: 'browser IDEs are either genius or cursed. this seems both.' },
        { name: 'Mira', text: 'He was talking too much' },
      ],
    },
    links: [],
    theme: {
      accent: '#f97316',
      background:
        'radial-gradient(circle at top, rgba(249, 115, 22, 0.22) 0%, rgba(249, 115, 22, 0) 42%), linear-gradient(160deg, #050505 0%, #18181b 100%)',
    },
  },
  {
    id: 'contact',
    kind: 'reel',
    canonicalUrl: '/reels/contact',
    content: {
      question: 'How do I reach you?',
      kicker: 'Contact',
      title: 'Say hi.',
      summary: 'Email is the fastest route. Links are here if you want more context.',
      linkPrompt: 'Linked below.',
      footerCaption: 'Email is fastest. Links are here if you need context.',
      points: ['Email: adityanprasad275@gmail.com', 'GitHub, LinkedIn, Twitter, Resume'],
    },
    engagement: {
      comments: [
        { name: 'Ari', text: 'email is still undefeated tbh' },
        { name: 'Dev', text: 'links in bio energy but less annoying' },
        { name: 'Nihal', text: 'THEY ARE REMOVING MY EXISTENCE HELP' },
      ],
    },
    links: [
      { label: 'Email', href: 'mailto:adityanprasad275@gmail.com', external: false, icon: 'mail' },
      { label: 'GitHub', href: 'https://github.com/AdityaPrasad275', external: true, icon: 'github' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adityanpd/', external: true, icon: 'linkedin' },
      { label: 'Twitter', href: 'https://x.com/adityanprasad74', external: true, icon: 'twitter' },
      { label: 'Resume', href: 'https://adityaprasad275.github.io/aditya-prasad-resume.pdf', external: true, icon: 'resume' },
    ],
    theme: {
      accent: '#38bdf8',
      background:
        'radial-gradient(circle at top, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 44%), linear-gradient(160deg, #050505 0%, #020617 100%)',
    },
  },
]

export default reels
