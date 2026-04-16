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
