const profile = {
  identity: {
    name: 'Aditya Prasad',
    bio:
      'I build data systems, internal tools, and product surfaces that make complex work feel simple.',
    avatar: {
      type: 'initials',
      value: 'AP',
    },
  },
  socialProof: [
    { label: 'Followers', value: 'a gazillion' },
    { label: 'Following', value: '1' },
    { label: 'Posts', value: '4' },
  ],
  highlights: [
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:adityanprasad275@gmail.com',
      icon: 'mail',
      kind: 'contact',
    },
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/AdityaPrasad275',
      icon: 'github',
      kind: 'social',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/adityanpd/',
      icon: 'linkedin',
      kind: 'social',
    },
    {
      id: 'resume',
      label: 'Resume',
      href: 'https://adityaprasad275.github.io/aditya-prasad-resume.pdf',
      icon: 'resume',
      kind: 'document',
    },
  ],
  posts: [
    {
      id: 'post-1',
      slug: 'data-systems-that-stick',
      title: 'Data systems that stick',
      summary: 'Building tools that stay understandable after the first demo.',
      grid: {
        eyebrow: 'Systems',
        thumbnailText: 'Clear pipelines, clean handoffs, fewer surprises.',
        accent: '#38bdf8',
        background:
          'radial-gradient(circle at top, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 48%), linear-gradient(160deg, #050505 0%, #111827 100%)',
      },
      detail: {
        format: 'carousel',
        slides: [
          {
            type: 'text',
            title: 'Make the pipeline boring.',
            body: 'Reliable systems are usually the least dramatic ones. The win is not complexity, it is repeatability.',
          },
          {
            type: 'text',
            title: 'Make handoffs obvious.',
            body: 'If a teammate can debug the flow without asking you twice, the structure is doing its job.',
          },
          {
            type: 'text',
            title: 'Make the result visible.',
            body: 'Good tooling shows progress, ownership, and next steps without extra explanation.',
          },
        ],
        links: [{ label: 'Read more', href: '/blog/data-systems-that-stick' }],
      },
    },
    {
      id: 'post-2',
      slug: 'internal-tools',
      title: 'Internal tools people actually use',
      summary: 'Small interfaces that save time every day are often the highest leverage work.',
      grid: {
        eyebrow: 'Tools',
        thumbnailText: 'Small UI, big time savings.',
        accent: '#f59e0b',
        background:
          'radial-gradient(circle at top, rgba(245, 158, 11, 0.24) 0%, rgba(245, 158, 11, 0) 46%), linear-gradient(160deg, #050505 0%, #18181b 100%)',
      },
      detail: {
        format: 'article',
        sections: [
          {
            heading: 'What it is',
            body: 'A short note on building internal tools that remove repeated manual work and reduce context switching.',
          },
          {
            heading: 'Why it matters',
            body: 'The value compounds when the same tool is used daily by the same team.',
          },
        ],
        links: [{ label: 'Read more', href: '/blog/internal-tools' }],
      },
    },
    {
      id: 'post-3',
      slug: 'atlasdb',
      title: 'AtlasDB',
      summary: 'A database project exploring storage, indexing, and transaction design.',
      grid: {
        eyebrow: 'Project',
        thumbnailText: 'B+ trees, WAL, and the rest.',
        accent: '#22c55e',
        background:
          'radial-gradient(circle at top, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0) 46%), linear-gradient(160deg, #050505 0%, #0f172a 100%)',
      },
      detail: {
        format: 'carousel',
        slides: [
          {
            type: 'text',
            title: 'Storage first.',
            body: 'The engine begins by deciding how data lives on disk and how it comes back fast.',
          },
          {
            type: 'text',
            title: 'Indexing second.',
            body: 'A B+ tree gives the database a way to find rows without reading everything.',
          },
          {
            type: 'text',
            title: 'Durability matters.',
            body: 'Write-ahead logging keeps the system honest when it restarts.',
          },
        ],
        links: [{ label: 'Open project', href: 'https://github.com/AdityaPrasad275/AtlasDB', external: true }],
      },
    },
    {
      id: 'post-4',
      slug: 'interview-tools',
      title: 'Interview tools',
      summary: 'Making prep feel more like practice and less like panic.',
      grid: {
        eyebrow: 'Product',
        thumbnailText: 'Practice that feels useful.',
        accent: '#f97316',
        background:
          'radial-gradient(circle at top, rgba(249, 115, 22, 0.22) 0%, rgba(249, 115, 22, 0) 46%), linear-gradient(160deg, #050505 0%, #1c1917 100%)',
      },
      detail: {
        format: 'article',
        sections: [
          {
            heading: 'The problem',
            body: 'A lot of interview prep tools are too static or too generic to feel real.',
          },
          {
            heading: 'The angle',
            body: 'Make the flow conversational, focused, and easy to revisit.',
          },
        ],
        links: [{ label: 'Open project', href: 'https://interreview.ai', external: true }],
      },
    },
  ],
}

export default profile
