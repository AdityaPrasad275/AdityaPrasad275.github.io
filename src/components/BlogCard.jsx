import React from 'react';

function BlogCard({ post }) {
  const safePost = post ?? {};
  const published = new Date(safePost.date ?? Date.now()).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <article className="card blog-card">
      <p className="meta">
        <time dateTime={safePost.date ?? ''}>{published}</time>
      </p>
      <h3>{safePost.title ?? 'Untitled Post'}</h3>
      <p>{safePost.summary ?? 'Summary coming soon.'}</p>
      <a href={safePost.href ?? '#'} className="card-link">
        Read post
      </a>
    </article>
  );
}

export default BlogCard;
