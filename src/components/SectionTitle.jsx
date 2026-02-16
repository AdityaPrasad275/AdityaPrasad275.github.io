import React from 'react';

function SectionTitle({ eyebrow, title, id }) {
  return (
    <header className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </header>
  );
}

export default SectionTitle;
