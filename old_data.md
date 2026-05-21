# content.js
```js
export const profile = {
  name: 'Aditya Prasad',
  email: 'adityanprasad275@gmail.com',
  github: 'https://github.com/AdityaPrasad275',
  linkedin: 'https://www.linkedin.com/in/adityanpd/',
  twitter: 'https://x.com/adityanprasad74',
  resume: 'https://adityaprasad275.github.io/aditya-prasad-resume.pdf',
  tagline: 'I build data systems for the physical world.',
  intro:
    "I spent the last year at Ola Electric''s Battery Intelligence team building data infrastructure  for the gigafactory — test orchestration (Django/Celery), telemetry pipelines (Pandas/Parquet), and a process-lineage data model. Side projects in C++ database internals and LLM tooling. Currently exploring teams working at the hardware-software boundary."
};

export const blogs = [
  {
    slug: 'database_btree_vs_heap_benchmark',
    title: 'Benchmarking AtlasDB: Heap Scan vs B+ Tree Index',
    summary: 'Fair comparison of scan-based queries vs indexed lookups, showing how B+ trees transform query performance.',
    date: '2026-03-28',
    href: '/#/blog/database_btree_vs_heap_benchmark',
    source: '/database_btree_vs_heap_benchmark.md'
  },
  {
    slug: 'database_TableWithIndex',
    title: 'Building a Database from Scratch - TableWithIndex',
    summary: 'Composing heap tables and B+ trees into a cohesive query layer with honest indexed vs scan access paths.',
    date: '2026-03-27',
    href: '/#/blog/database_TableWithIndex',
    source: '/database_TableWithIndex.md'
  },
  {
    slug: 'database_b_plus_tree',
    title: 'Building a Database from Scratch - B+ Tree',
    summary: 'Designing a B+ tree index for fast key lookups and efficient range scans with ordered leaf traversal.',
    date: '2026-03-26',
    href: '/#/blog/database_b_plus_tree',
    source: '/database_B_ plus_tree.md'
  },
  {
    slug: 'database_storing_records',
    title: 'Building a Database from Scratch - Storing Records',
    summary: 'Designing a simple record storage format with efficient read/write and crash consistency.',
    date: '2026-03-26',
    href: '/#/blog/database_storing_records',
    source: '/database_storing_records.md'
  },
  {
    slug: 'database_pages',
    title: 'Building a Database from Scratch - Pages',
    summary: 'Designing a simple page-based storage engine with efficient read/write and crash consistency.',
    date: '2026-03-25',
    href: '/#/blog/database_pages',
    source: '/database_pages.md'
  },
  {
    slug: 'database_step0',
    title: 'Building a Database from Scratch Step 0 - KV store',
    summary: 'Exploring the fundamentals of database design by building a simple persistent key-value store from scratch.',
    date: '2026-03-10',
    href: '/#/blog/database_step0',
    source: '/database_step0.md'
  },
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
    name: 'AtlasDB',
    stack: 'C++, B+ Tree',
    summary:
      'Relational DB engine with page-based storage, SELECT/JOIN/GROUP BY support, B+ tree indexing, LRU buffer pool, and ARIES-style WAL recovery.',
    github: 'https://github.com/AdityaPrasad275/AtlasDB'
  },
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
    role: 'Software Engineer - Battery Intelligence Team',
    period: 'June 2025 - Present',
    logo: '/logos/ola-electric.png',
    logoMode: 'trim',
    summary:
      'Building data-heavy internal tools for battery intelligence, with a focus on fast exploration, analytics pipelines, and reliable experiment workflows.'
  },
  {
    company: 'Accenture',
    role: 'Advanced Application Engineering Intern',
    period: 'May 2024 - July 2024',
    logo: '/logos/accenture.png',
    summary:
      'Worked on enterprise HR automation and GenAI-assisted Oracle Fusion Cloud workflows for a large US client.'
  }
];

export const education = {
  institute: 'Indian Institute of Technology Bombay',
  logo: '/logos/iitb.png',
  degree: 'B.Tech in Chemical Engineering',
  minor: 'Minor in Computer Science',
  graduation: 'May 2025'
};
```

# App.jsx
```js
import React, { useEffect, useState } from 'react';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import HomePage from './pages/HomePage';
import 'highlight.js/styles/github-dark.css';

function getRouteFromHash() {
  const raw = window.location.hash.replace(/^#/, '');
  return raw || '/';
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (route === '/blog' || route.startsWith('/blog/')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [route]);

  if (route.startsWith('/blog/')) {
    const slug = route.replace('/blog/', '');
    return <BlogPostPage slug={slug} />;
  }

  if (route === '/blog') {
    return <BlogListPage />;
  }

  return <HomePage />;
}

export default App;
```

# HomePage.jsx
```js
import React from 'react';
import BlogCard from '../components/BlogCard';
import ExperienceCard from '../components/ExperienceCard';
import ProjectCard from '../components/ProjectCard';
import SectionTitle from '../components/SectionTitle';
import { blogs, education, experiences, profile, projects } from '../data/content';

function SocialIcon({ type }) {
  if (type === 'mail') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16v12H4V6Zm8 6.1L5.9 7.5H18.1L12 12.1Zm-1 1.5L5.5 9.5v6.9h13V9.5L13 13.6a1.7 1.7 0 0 1-2 0Z" />
      </svg>
    );
  }

  if (type === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 7 8.7c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.5 9.5 0 0 1 5.2 0c2-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1.1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.8 1 .8 2v2.6c0 .3.2.6.8.5A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (type === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.1 8.9h3.1V19H5.1V8.9Zm1.5-4.8a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Zm3.6 4.8h3v1.4h.1c.4-.8 1.5-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.9V19H17v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6v5h-3.1V8.9Z" />
      </svg>
    );
  }

  if (type === 'twitter') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 10.6 20.4 3h-1.5l-5.6 6.6L8.9 3H3.8l6.7 9.8L3.8 21h1.5l5.9-7 4.8 7h5.1L14 10.6Zm-2.1 2.5-.7-1L5.8 4.2h2.4l4.4 6.4.7 1 5.7 8.3h-2.4l-4.7-6.8Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2h8l4 4v16H6V2Zm7 1.8V7h3.2L13 3.8ZM8 9v1.6h8V9H8Zm0 4v1.6h8V13H8Zm0 4v1.6h5V17H8Z" />
    </svg>
  );
}

function HomePage() {
  const safeProfile = {
    name: profile?.name ?? 'Aditya N Prasad',
    email: profile?.email ?? '',
    github: profile?.github ?? '',
    linkedin: profile?.linkedin ?? '',
    twitter: profile?.twitter ?? '',
    resume: profile?.resume ?? '#',
    tagline: profile?.tagline ?? '',
    intro: profile?.intro ?? ''
  };
  const contactLinks = [
    safeProfile.email ? { label: 'Email', href: `mailto:${safeProfile.email}`, icon: 'mail' } : null,
    safeProfile.github ? { label: 'GitHub', href: safeProfile.github, icon: 'github', external: true } : null,
    safeProfile.linkedin ? { label: 'LinkedIn', href: safeProfile.linkedin, icon: 'linkedin', external: true } : null,
    safeProfile.twitter ? { label: 'Twitter', href: safeProfile.twitter, icon: 'twitter', external: true } : null,
    safeProfile.resume && safeProfile.resume !== '#'
      ? { label: 'Resume', href: safeProfile.resume, icon: 'resume', external: true }
      : null
  ].filter(Boolean);
  const safeBlogs = Array.isArray(blogs) ? blogs : [];
  const latestBlogs = [...safeBlogs]
    .sort((first, second) => new Date(second.date ?? 0) - new Date(first.date ?? 0))
    .slice(0, 2);
  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeExperiences = Array.isArray(experiences) ? experiences : [];
  const safeEducation = {
    institute: education?.institute ?? '',
    logo: education?.logo ?? '',
    degree: education?.degree ?? '',
    minor: education?.minor ?? '',
    graduation: education?.graduation ?? ''
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="noise" aria-hidden="true" />
      <header className="site-header">
        <div className="header-inner">
          <p className="brand">AP</p>
          <nav aria-label="Primary">
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#projects">Projects</a>
            <a href="#blogs">Blogs</a>
          </nav>
        </div>
      </header>

      <div className="page-shell">
        <main id="main-content">
          <section className="hero" aria-labelledby="hero-title">
            <p className="eyebrow">Portfolio + Blog</p>
            <h1 id="hero-title">{safeProfile.name}</h1>
            <p className="hero-tagline">{safeProfile.tagline}</p>
            <p className="hero-intro">{safeProfile.intro}</p>
            {contactLinks.length > 0 ? (
              <nav className="hero-contact-links" aria-label="Contact links">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hero-icon-link"
                    aria-label={link.label}
                    title={link.label}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                  >
                    <SocialIcon type={link.icon} />
                  </a>
                ))}
              </nav>
            ) : null}
          </section>

          <section id="experience" aria-labelledby="experience-heading" className="section-block">
            <SectionTitle eyebrow="Work Experience" title="Experience" id="experience-heading" />
            <div className="card-grid card-grid-experience">
              {safeExperiences.map((item) => (
                <ExperienceCard key={`${item.company}-${item.period}`} experience={item} />
              ))}
            </div>
          </section>

          <section id="education" aria-labelledby="education-heading" className="section-block">
            <SectionTitle eyebrow="Education" title="Academic Background" id="education-heading" />
            <article className="card education-card">
              <div className="education-top">
                {safeEducation.logo ? (
                  <div className="education-logo-wrap">
                    <img src={safeEducation.logo} alt={`${safeEducation.institute} logo`} className="education-logo" loading="lazy" />
                  </div>
                ) : null}
                <div className="education-title">
                  <p className="meta">{safeEducation.graduation}</p>
                  <h3>{safeEducation.institute}</h3>
                </div>
              </div>
              <div className="education-details">
                <p className="education-degree">{safeEducation.degree}</p>
                <p className="education-minor">{safeEducation.minor}</p>
              </div>
            </article>
          </section>

          <section id="projects" aria-labelledby="projects-heading" className="section-block">
            <SectionTitle eyebrow="Builds" title="Selected Projects" id="projects-heading" />
            <div className="card-grid card-grid-projects">
              {safeProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </section>

          <section id="blogs" aria-labelledby="blogs-heading" className="section-block">
            <div className="section-header-row">
              <SectionTitle eyebrow="Writing" title="Latest Blog Posts" id="blogs-heading" />
              {safeBlogs.length > latestBlogs.length ? (
                <a href="/#/blog" className="section-action">
                  Read more posts
                </a>
              ) : null}
            </div>
            <div className="card-grid card-grid-blogs">
              {latestBlogs.map((post) => (
                <BlogCard key={post.slug || post.title} post={post} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default HomePage;
```


# and theres blopost page and bloglist page and what not