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
        { name: 'Truman', text: 'Oh this is nice, insta in web' },
      ],
    },
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
        { name: 'Truman', text: 'wait.... wait am i real?' },
      ],
    },
    theme: {
      accent: '#38bdf8',
      background:
        'radial-gradient(circle at top, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 44%), linear-gradient(160deg, #050505 0%, #111827 100%)',
    },
  },
  {
    id: 'are-you-good',
    kind: 'reel',
    archetype: 'statement',
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
        { name: 'Truman', text: 'wait, am i just a figment of the authors imagination?' },
      ],
    },
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
        { name: 'Viewer', text: 'where did that truman guy go?' },
      ],
    },
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
      summary: 'Email is the fastest route. Links are in the profile',
      linkPrompt: 'Linked below.',
      footerCaption: 'Email is fastest',
      points: ['adityanprasad275@gmail.com', 'linkedin.com/in/adityanprasad', 'github.com/adityanprasad'],
    },
    engagement: {
      comments: [
        { name: 'Ari', text: 'email is still undefeated tbh' },
        { name: 'Dev', text: 'links in bio energy but less annoying' },
        { name: 'Mira', text: 'He was talking too much' },
      ],
    },
    theme: {
      accent: '#38bdf8',
      background:
        'radial-gradient(circle at top, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 44%), linear-gradient(160deg, #050505 0%, #020617 100%)',
    }, 
  },
  {
    id: 'blog-posts-start',
    kind: 'reel',
    canonicalUrl: '/reels/blog-posts-start',
    content: {
      question: 'Do you write?',
      kicker: 'Blog Posts',
      title: 'Blog Posts from here on out!',
      summary: 'I like writing about the systems I build and the problems I care about.',
      footerCaption: 'Reels from here on out are link to blog posts!'
    },
    engagement: {
      comments: [

      ],
    },
    theme: {
      accent: '#125f80',
      background:
        'radial-gradient(circle at top, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 44%), linear-gradient(160deg, #050505 0%, #020617 100%)',
    }, 
  },
  {
    id: 'database-indexes',
    kind: 'reel',
    canonicalUrl: '/reels/database-indexes',
    content: {
      question: 'Index vs Heaps',
      kicker: 'Database Series',
      title: 'Indexes and Benchmarking',
      summary: 'Final chapter, benchmarking AtlasDB, a 7000x speedup on indexed queries vs heap scans.',
      points: ['B+ trees'],
      footerCaption: 'Finally we measure our DB',
      link: 'https://medium.com/@adityanprasad275/benchmarking-atlasdb-heap-scan-vs-b-tree-index-6db61ed47c59'
    },
    engagement: {
      comments: [
        { name: 'McQueen', text: 'speed, I am speed' },
        { name: 'Dev', text: 'A speedup of over 7000!!!!' },
        { name: 'Viewer', text: 'Hey come on show us some truman' },
      ],
    },
    theme: {
      accent: '#36b11a',
      background:
        'radial-gradient(circle at top, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 44%), linear-gradient(160deg, #050505 0%, #020617 100%)',
    }, 
  },
  {
    id: 'db-table-with-index',
    kind: 'reel',
    canonicalUrl: '/reels/db-table-with-index',
    content: {
      question: 'Query Layer Design',
      kicker: 'Database Series',
      title: 'TableWithIndex',
      summary: 'Composing heap tables and B+ trees into a cohesive query layer with honest indexed vs scan access paths.',
      footerCaption: 'Heap tables meet B+ tree indexes',
      link: 'https://medium.com/@adityanprasad275/building-a-database-from-scratch-tablewithindex-8d846bb4f74f'
    },
    engagement: {
      comments: [
        { name: 'Dev', text: 'honest access paths, i like it' },
        { name: 'Truman', text: 'How do I get out of this place' },
      ],
    },
    theme: {
      accent: '#06b6d4',
      background:
        'radial-gradient(circle at top, rgba(6, 182, 212, 0.22) 0%, rgba(6, 182, 212, 0) 44%), linear-gradient(160deg, #050505 0%, #020617 100%)',
    },
  },
  {
    id: 'db-b-plus-tree',
    kind: 'reel',
    canonicalUrl: '/reels/db-b-plus-tree',
    content: {
      question: 'Index Design',
      kicker: 'Database Series',
      title: 'B+ Tree Implementation',
      summary: 'Designing a B+ tree index for fast key lookups and efficient range scans with ordered leaf traversal.',
      footerCaption: 'Fast lookups, efficient ranges',
      link: 'https://medium.com/@adityanprasad275/building-a-database-from-scratch-b-plus-tree'
    },
    engagement: {
      comments: [
        { name: 'Alex', text: 'b+ trees are elegant' },
        { name: 'Ed Harris', text: 'He\'s trying to get into blogposts now, put 10 blog posts that have never been written by a human'}
      ],
    },
    theme: {
      accent: '#8b5cf6',
      background:
        'radial-gradient(circle at top, rgba(139, 92, 246, 0.22) 0%, rgba(139, 92, 246, 0) 44%), linear-gradient(160deg, #050505 0%, #020617 100%)',
    },
  },
  {
    id: 'db-storing-records',
    kind: 'reel',
    canonicalUrl: '/reels/db-storing-records',
    content: {
      question: 'Storage Format',
      kicker: 'Database Series',
      title: 'Storing Records',
      summary: 'Designing a simple record storage format with efficient read/write and crash consistency.',
      footerCaption: 'Records with durability',
      link: 'https://medium.com/@adityanprasad275/building-a-database-from-scratch-storing-records'
    },
    engagement: {
      comments: [
        { name: 'Sam', text: 'crash consistency matters' },
        { name: 'Truman', text: '113∴1284∴21' },
      ],
    },
    theme: {
      accent: '#ec4899',
      background:
        'radial-gradient(circle at top, rgba(236, 72, 153, 0.22) 0%, rgba(236, 72, 153, 0) 44%), linear-gradient(160deg, #050505 0%, #020617 100%)',
    },
  },
  {
    id: 'db-pages',
    kind: 'reel',
    canonicalUrl: '/reels/db-pages',
    content: {
      question: 'Page-Based Storage',
      kicker: 'Database Series',
      title: 'Pages and Storage Engines',
      summary: 'Designing a simple page-based storage engine with efficient read/write and crash consistency.',
      footerCaption: 'Pages as the atomic unit',
      link: 'https://medium.com/@adityanprasad275/building-a-database-from-scratch-pages'
    },
    engagement: {
      comments: [
        { name: 'Jordan', text: 'pages are the foundation' },
        { name: 'Viewer', text: 'Woah what was that' },
      ],
    },
    theme: {
      accent: '#f59e0b',
      background:
        'radial-gradient(circle at top, rgba(245, 158, 11, 0.22) 0%, rgba(245, 158, 11, 0) 44%), linear-gradient(160deg, #050505 0%, #020617 100%)',
    },
  },
  {
    id: 'db-kv-store',
    kind: 'reel',
    canonicalUrl: '/reels/db-kv-store',
    content: {
      question: 'Database Fundamentals',
      kicker: 'Database Series',
      title: 'Building a KV Store',
      summary: 'Exploring the fundamentals of database design by building a simple persistent key-value store from scratch.',
      footerCaption: 'The foundation: key-value persistence',
      link: 'https://medium.com/@adityanprasad275/building-a-database-from-scratch-step-0-kv-store-d3282b554505'
    },
    engagement: {
      comments: [
        { name: 'Casey', text: 'start at the fundamentals' },
        { name: 'Mira', text: 'How the hell did he do that, enable kill switch'}
      ],
    },
    theme: {
      accent: '#10b981',
      background:
        'radial-gradient(circle at top, rgba(16, 185, 129, 0.22) 0%, rgba(16, 185, 129, 0) 44%), linear-gradient(160deg, #050505 0%, #020617 100%)',
    },
  },
]

export default reels
