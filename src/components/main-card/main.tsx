'use client';
import React, { useState, useCallback } from 'react';
import ActionBar from '../action-bar/action-bar';
import ProcessPanel from '../process/process-panel';
import UrlInput from '../url/url-input';
import { isValidUrl } from '@/utils/validation';
import { fetchRobotsTxt, RobotsTxtResult } from '@/utils/robots';
import { useProcessSteps } from '@/hooks/useProcessSteps';

export default function Main() {
  const [url, setUrl] = useState('');
  const [touched, setTouched] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { steps, resetSteps, startFetchStep, updateFromRobotsResult } =
    useProcessSteps();

  const valid = isValidUrl(url);
  const errorMessage =
    touched && !valid
      ? 'Please enter a valid URL (e.g. https://tryprofound.com).'
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

      // The hook will handle both updating the fetch step and running the analysis
      updateFromRobotsResult(result);
    } catch (error) {
      console.error('Failed to fetch robots.txt:', error);
      // Handle unexpected errors here if needed
      // The updateFromRobotsResult already handles fetch errors
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
