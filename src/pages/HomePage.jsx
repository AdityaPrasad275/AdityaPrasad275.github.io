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
