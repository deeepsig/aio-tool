// src/hooks/useProcessSteps.ts
import { useState, useCallback } from 'react';
import { ProcessStep } from '@/types/process';
import { PROCESS_STEPS } from '@/config/process-config';
import { RobotsTxtResult } from '@/utils/robots';

export function useProcessSteps() {
  const [steps, setSteps] = useState<ProcessStep[]>([
    { ...PROCESS_STEPS.FETCH_ROBOTS, status: 'idle' },
    { ...PROCESS_STEPS.ANALYZE_ROBOTS, status: 'idle' },
  ]);

  const updateStep = useCallback(
    (stepId: string, updates: Partial<ProcessStep>) => {
      setSteps((prev) =>
        prev.map((step) =>
          step.id === stepId ? { ...step, ...updates } : step
        )
      );
    },
    []
  );

  const resetSteps = useCallback(() => {
    setSteps([
      { ...PROCESS_STEPS.FETCH_ROBOTS, status: 'idle' },
      { ...PROCESS_STEPS.ANALYZE_ROBOTS, status: 'idle' },
    ]);
  }, []);

  const updateFromRobotsResult = useCallback(
    (result: RobotsTxtResult) => {
      if (result.success) {
        updateStep('fetch-robots', {
          status: 'completed',
          content: result.content || 'No content available',
        });
      } else {
        updateStep('fetch-robots', {
          status: 'error',
          error: `Error: ${result.error}\n\nTried to fetch from: ${result.url}`,
        });
      }
    },
    [updateStep]
  );

  return { steps, updateStep, resetSteps, updateFromRobotsResult };
}
