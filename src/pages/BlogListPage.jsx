import React from 'react';
import BlogCard from '../components/BlogCard';
import { blogs } from '../data/content';

function BlogListPage() {
  const safeBlogs = Array.isArray(blogs) ? blogs : [];
  const sortedBlogs = [...safeBlogs].sort((first, second) => new Date(second.date ?? 0) - new Date(first.date ?? 0));

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="noise" aria-hidden="true" />
      <header className="site-header blog-header">
        <div className="header-inner">
          <p className="brand">AP</p>
          <nav aria-label="Blog navigation">
            <a href="/#/">Home</a>
          </nav>
        </div>
      </header>

      <div className="page-shell">
        <main className="blog-list-main" id="main-content">
          <section className="blog-list-hero" aria-labelledby="blog-list-heading">
            <p className="eyebrow">Writing</p>
            <h1 id="blog-list-heading">All Blog Posts</h1>
            <p>Notes on database internals, product experiments, and engineering work.</p>
          </section>

          <section aria-label="Blog posts" className="blog-list-section">
            {sortedBlogs.length > 0 ? (
              <div className="card-grid card-grid-blogs blog-list-grid">
                {sortedBlogs.map((post) => (
                  <BlogCard key={post.slug || post.title} post={post} />
                ))}
              </div>
            ) : (
              <p className="section-note">No posts published yet.</p>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default BlogListPage;
