import React, { useEffect, useState } from 'react';
import BlogPostPage from './pages/BlogPostPage';
import HomePage from './pages/HomePage';

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

  if (route.startsWith('/blog/')) {
    const slug = route.replace('/blog/', '');
    return <BlogPostPage slug={slug} />;
  }

  return <HomePage />;
}

export default App;
