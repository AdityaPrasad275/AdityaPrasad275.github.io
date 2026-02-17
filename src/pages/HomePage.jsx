import React from 'react';
import BlogCard from '../components/BlogCard';
import ExperienceCard from '../components/ExperienceCard';
import ProjectCard from '../components/ProjectCard';
import SectionTitle from '../components/SectionTitle';
import { blogs, education, experiences, profile, projects } from '../data/content';

function HomePage() {
  const safeProfile = {
    name: profile?.name ?? 'Aditya N Prasad',
    email: profile?.email ?? '',
    github: profile?.github ?? '',
    resume: profile?.resume ?? '#',
    tagline: profile?.tagline ?? '',
    intro: profile?.intro ?? ''
  };
  const safeBlogs = Array.isArray(blogs) ? blogs : [];
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
            <a href="#contact">Contact</a>
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
            <SectionTitle eyebrow="Writing" title="Latest Blog Post" id="blogs-heading" />
            <div className="card-grid card-grid-blogs">
              {safeBlogs.map((post) => (
                <BlogCard key={post.slug || post.title} post={post} />
              ))}
            </div>
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
          <p>
            Resume:{' '}
            <a href={safeProfile.resume || '#'} target="_blank" rel="noreferrer">
              {safeProfile.resume && safeProfile.resume !== '#' ? 'View resume' : 'Add resume link in src/data/content.js'}
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}

export default HomePage;
