// src/components/providers/query-provider.tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Don't refetch on window focus for this app
            refetchOnWindowFocus: false,
            // Cache robots.txt results for 10 minutes
            staleTime: 10 * 60 * 1000,
            // Keep data for 15 minutes
            gcTime: 15 * 60 * 1000,
            // Retry failed requests 2 times
            retry: 2,
            // Retry delay: 1s, then 2s
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
