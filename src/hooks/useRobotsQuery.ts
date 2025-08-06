// src/hooks/useRobotsQuery.ts
import { useQuery } from '@tanstack/react-query';
import { fetchRobotsTxt, RobotsTxtResult } from '@/utils/robots';
import { isValidUrl } from '@/utils/validation';

export function useRobotsQuery(url: string) {
  return useQuery<RobotsTxtResult>({
    queryKey: ['robots', url],
    queryFn: () => fetchRobotsTxt(url),
    // Only run query if URL is valid
    enabled: false, // We'll trigger this manually
    // Additional options for robots.txt specific needs
    retry: (failureCount, error) => {
      // Don't retry if it's a 404 (robots.txt doesn't exist)
      if (error && typeof error === 'object' && 'message' in error) {
        if (error.message.includes('404')) return false;
      }
      return failureCount < 2;
    },
    // Consider robots.txt data fresh for 10 minutes
    staleTime: 10 * 60 * 1000,
  });
}

export function useRobotsAnalysis(url: string) {
  const query = useRobotsQuery(url);

  const canAnalyze = isValidUrl(url);

  const startAnalysis = () => {
    if (canAnalyze) {
      query.refetch();
    }
  };

  return {
    ...query,
    canAnalyze,
    startAnalysis,
    isAnalyzing: query.isFetching,
  };
}
