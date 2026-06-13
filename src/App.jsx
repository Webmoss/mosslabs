import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppShell from '@/AppShell';
import Home from './pages/Home';
import PageNotFound from './lib/PageNotFound';

// Route-level code splitting: the blog page pulls in react-markdown/remark-gfm,
// so it stays out of the initial (home) bundle.
const BlogPost = lazy(() => import('./pages/BlogPost'));

function App() {
  return (
    <AppShell>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </AppShell>
  );
}

export default App;
