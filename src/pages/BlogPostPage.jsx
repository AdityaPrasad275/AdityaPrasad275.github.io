import React, { useEffect, useMemo, useState } from 'react';
import { blogs } from '../data/content';
import { markdownToHtml } from '../lib/markdown';

function BlogPostPage({ slug }) {
  const post = useMemo(() => blogs.find((item) => item.slug === slug), [slug]);
  const [markdown, setMarkdown] = useState('');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!post?.source) {
      setStatus('not_found');
      return;
    }

    let active = true;

    fetch(post.source)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not load markdown file.');
        }
        return res.text();
      })
      .then((text) => {
        if (!active) {
          return;
        }
        setMarkdown(text);
        setStatus('ready');
      })
      .catch(() => {
        if (!active) {
          return;
        }
        setStatus('error');
      });

    return () => {
      active = false;
    };
  }, [post]);

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="page-shell">
        <header className="site-header blog-header">
          <p className="brand">ANP</p>
          <nav aria-label="Blog navigation">
            <a href="/">Home</a>
            <a href="/#blogs">All posts</a>
          </nav>
        </header>

        <main className="blog-main" id="main-content">
          {status === 'not_found' ? <p>Post not found.</p> : null}
          {status === 'error' ? <p>Could not load post content.</p> : null}
          {status === 'loading' ? <p>Loading post...</p> : null}

          {status === 'ready' && post ? (
            <article className="blog-article" aria-labelledby="blog-title">
              <p className="eyebrow">Blog</p>
              <h1 id="blog-title">{post.title}</h1>
              <p className="blog-meta">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              </p>
              <div className="markdown-content" dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }} />
            </article>
          ) : null}
        </main>
      </div>
    </>
  );
}

export default BlogPostPage;
