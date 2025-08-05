// src/hooks/useProcessSteps.ts
import { useState, useCallback } from 'react';
import { ProcessStep } from '@/types/process';
import { PROCESS_STEPS } from '@/config/process-config';
import { RobotsTxtResult } from '@/utils/robots';

export function useProcessSteps() {
  // Start with only the first step
  const [steps, setSteps] = useState<ProcessStep[]>([]);

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

  const addStep = useCallback((stepConfig: ProcessStep) => {
    setSteps((prev) => [...prev, stepConfig]);
  }, []);

  const resetSteps = useCallback(() => {
    setSteps([]);
  }, []);

  const startFetchStep = useCallback(() => {
    setSteps([{ ...PROCESS_STEPS.FETCH_ROBOTS, status: 'fetching' }]);
  }, []);

  const updateFromRobotsResult = useCallback(
    (result: RobotsTxtResult) => {
      if (result.success) {
        updateStep('fetch-robots', {
          status: 'completed',
          content: result.content || 'No content available',
        });
        // Add the analysis step only after successful fetch
        addStep({ ...PROCESS_STEPS.ANALYZE_ROBOTS, status: 'analyzing' });
      } else {
        updateStep('fetch-robots', {
          status: 'error',
          error: `Error: ${result.error}\n\nTried to fetch from: ${result.url}`,
        });
      }
    },
    [updateStep, addStep]
  );

  return {
    steps,
    updateStep,
    resetSteps,
    startFetchStep,
    updateFromRobotsResult,
  };
}
