import React from 'react';

function ExperienceCard({ experience }) {
  const safeExperience = experience ?? {};
  const highlights = Array.isArray(safeExperience.highlights) ? safeExperience.highlights : [];

  return (
    <article className="card experience-card">
      <div className="experience-head">
        {safeExperience.logo ? (
          <div className="experience-logo-wrap">
            <img
              src={safeExperience.logo}
              alt={`${safeExperience.company ?? 'Company'} logo`}
              className={`experience-logo ${safeExperience.logoMode === 'trim' ? 'experience-logo-trim' : ''}`.trim()}
              loading="lazy"
            />
          </div>
        ) : null}
        <div>
          <h3>{safeExperience.company ?? 'Company'}</h3>
          <p className="meta">{safeExperience.role ?? 'Role'}</p>
        </div>
      </div>
      <p className="experience-period">{safeExperience.period ?? ''}</p>
      {highlights.length > 0 ? (
        <ul className="experience-points">
          {highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default ExperienceCard;
