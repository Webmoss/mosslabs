import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';

/** Shared provider wrapper used by both the client entry and the prerender entry. */
export default function AppShell({ children, helmetContext }) {
  return (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClientInstance}>
        {children}
      </QueryClientProvider>
    </HelmetProvider>
  );
}
