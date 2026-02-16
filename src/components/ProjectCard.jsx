import React from 'react';

function ProjectCard({ project }) {
  const safeProject = project ?? {};

  return (
    <article className="card project-card">
      <p className="meta">{safeProject.stack ?? 'Project'}</p>
      <h3>{safeProject.name ?? 'Untitled Project'}</h3>
      <p>{safeProject.summary ?? 'Details coming soon.'}</p>
      <div className="link-row">
        <a href={safeProject.github ?? '#'} target="_blank" rel="noreferrer">
          GitHub
        </a>
        {safeProject.live ? (
          <a href={safeProject.live} target="_blank" rel="noreferrer">
            Live site
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default ProjectCard;
