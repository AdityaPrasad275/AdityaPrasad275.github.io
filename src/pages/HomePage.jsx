import React from 'react';
import BlogCard from '../components/BlogCard';
import ProjectCard from '../components/ProjectCard';
import SectionTitle from '../components/SectionTitle';
import { blogs, experienceHighlights, profile, projects } from '../data/content';

function HomePage() {
  const safeProfile = {
    name: profile?.name ?? 'Aditya N Prasad',
    email: profile?.email ?? '',
    github: profile?.github ?? '',
    tagline: profile?.tagline ?? '',
    intro: profile?.intro ?? ''
  };
  const safeBlogs = Array.isArray(blogs) ? blogs : [];
  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeHighlights = Array.isArray(experienceHighlights) ? experienceHighlights : [];

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="noise" aria-hidden="true" />
      <div className="page-shell">
        <header className="site-header">
          <p className="brand">ANP</p>
          <nav aria-label="Primary">
            <a href="#blogs">Blogs</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main id="main-content">
          <section className="hero" aria-labelledby="hero-title">
            <p className="eyebrow">Portfolio + Blog</p>
            <h1 id="hero-title">{safeProfile.name}</h1>
            <p className="hero-tagline">{safeProfile.tagline}</p>
            <p className="hero-intro">{safeProfile.intro}</p>
            <div className="hero-actions">
              <a href="#blogs" className="btn btn-primary">
                Read blog
              </a>
              <a href={safeProfile.github || '#'} target="_blank" rel="noreferrer" className="btn btn-secondary">
                GitHub
              </a>
            </div>
          </section>

          <section id="blogs" aria-labelledby="blogs-heading" className="section-block">
            <SectionTitle eyebrow="Main Focus" title="Latest Writing" id="blogs-heading" />
            <div className="card-grid card-grid-blogs">
              {safeBlogs.map((post) => (
                <BlogCard key={post.slug || post.title} post={post} />
              ))}
            </div>
          </section>

          <section id="projects" aria-labelledby="projects-heading" className="section-block">
            <SectionTitle eyebrow="Builds" title="Selected Projects" id="projects-heading" />
            <div className="card-grid card-grid-projects">
              {safeProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </section>

          <section id="experience" aria-labelledby="experience-heading" className="section-block">
            <SectionTitle eyebrow="Work" title="Experience Snapshot" id="experience-heading" />
            <ul className="highlight-list">
              {safeHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </main>

        <footer id="contact" className="site-footer" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Contact</h2>
          <p>
            Email: <a href={`mailto:${safeProfile.email}`}>{safeProfile.email}</a>
          </p>
          <p>
            GitHub:{' '}
            <a href={safeProfile.github || '#'}>{safeProfile.github ? safeProfile.github.replace('https://', '') : 'N/A'}</a>
          </p>
        </footer>
      </div>
    </>
  );
}

export default HomePage;
