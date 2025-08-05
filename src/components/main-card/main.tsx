'use client';
import React, { useState, useCallback } from 'react';
import ActionBar from '../action-bar/action-bar';
import ProcessPanel from '../process/process-panel';
import UrlInput from '../url/url-input';
import { isValidUrl } from '@/utils/validation';
import { fetchRobotsTxt, RobotsTxtResult } from '@/utils/robots';
import { useProcessSteps } from '@/hooks/useProcessSteps';
import { analyzeRobotsTxt } from '@/utils/process-helpers';

export default function Main() {
  const [url, setUrl] = useState('');
  const [touched, setTouched] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const {
    steps,
    updateStep,
    resetSteps,
    startFetchStep,
    updateFromRobotsResult,
  } = useProcessSteps();

  const valid = isValidUrl(url);
  const errorMessage =
    touched && !valid
      ? 'Please enter a valid URL (e.g. https://reddit.com).'
      : undefined;

  const handleCancel = () => {
    setUrl('');
    setTouched(false);
    setIsAnalyzing(false);
    resetSteps();
  };

  const handleStartAnalysis = async () => {
    if (!valid) return;

    setIsAnalyzing(true);

    // Start the first step
    startFetchStep();

    try {
      // Use the fetchRobotsTxt function
      const result: RobotsTxtResult = await fetchRobotsTxt(url);

      // Update first step and potentially add second step based on result
      updateFromRobotsResult(result);

      if (result.success) {
        // Complete analysis using the parser
        const analysis = analyzeRobotsTxt(result);
        updateStep('analyze-robots', {
          status: 'completed',
          content: analysis,
        });
      }
    } catch (error) {
      console.error('Failed to fetch robots.txt:', error);
      updateStep('fetch-robots', {
        status: 'error',
        error: 'Unexpected error occurred',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBlur = useCallback(() => setTouched(true), []);

  return (
    <div className="inner-box space-y-[14px]">
      <UrlInput
        url={url}
        onChange={setUrl}
        onBlur={handleBlur}
        error={errorMessage}
      />

      <ProcessPanel steps={steps} />

      <div className="flex justify-end">
        <ActionBar
          onCancel={handleCancel}
          onStartAnalysis={handleStartAnalysis}
          startDisabled={!valid || isAnalyzing}
        />
      </div>
    </div>
  );
}
