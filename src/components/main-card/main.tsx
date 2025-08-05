'use client';

import React, { useState, useCallback } from 'react';
import ActionBar from '../action-bar/action-bar';
import ProcessPanel from '../process/process-panel';
import UrlInput from '../url/url-input';
import { isValidUrl } from '@/utils/validation';
import { fetchRobotsTxt, RobotsTxtResult } from '@/utils/robots';

export default function Main() {
  const [url, setUrl] = useState('');
  const [touched, setTouched] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasStartedAnalysis, setHasStartedAnalysis] = useState(false);
  const [robotsResult, setRobotsResult] = useState<RobotsTxtResult | null>(
    null
  );

  const valid = isValidUrl(url);
  const errorMessage =
    touched && !valid
      ? 'Please enter a valid URL (e.g. https://reddit.com).'
      : undefined;

  const handleCancel = () => {
    setUrl('');
    setTouched(false);
    setIsAnalyzing(false);
    setHasStartedAnalysis(false);
    setRobotsResult(null);
  };

  const handleStartAnalysis = async () => {
    if (!valid) return;

    setIsAnalyzing(true);
    setHasStartedAnalysis(true);
    setRobotsResult(null);

    console.log('Starting analysis for:', url);

    try {
      const result = await fetchRobotsTxt(url);
      setRobotsResult(result);
      console.log('Robots.txt result:', result);
    } catch (error) {
      console.error('Failed to fetch robots.txt:', error);
      setRobotsResult({
        success: false,
        error: 'Unexpected error occurred',
        url: url,
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

      {hasStartedAnalysis && (
        <ProcessPanel isAnalyzing={isAnalyzing} robotsResult={robotsResult} />
      )}

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
