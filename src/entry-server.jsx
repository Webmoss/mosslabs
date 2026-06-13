import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Route, Routes } from 'react-router-dom';
import AppShell from '@/AppShell';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import PageNotFound from './lib/PageNotFound';

/**
 * Build-time prerender entry. Routes are imported eagerly (no React.lazy) so
 * renderToString produces complete static markup for crawlers.
 */
export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <AppShell helmetContext={helmetContext}>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </StaticRouter>
    </AppShell>
  );
  return { html, helmet: helmetContext.helmet };
}
