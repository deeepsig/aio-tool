// src/components/main-card/main.tsx
'use client';
import React, { useState, useCallback, useEffect } from 'react';
import ActionBar from '../action-bar/action-bar';
import ProcessPanel from '../process/process-panel';
import RecommendationsPanel from '../recommendations/recommendations-panel';
import UrlInput from '../url/url-input';
import { isValidUrl } from '@/utils/validation';
import { fetchRobotsTxt, RobotsTxtResult } from '@/utils/robots';
import { useProcessSteps } from '@/hooks/useProcessSteps';
import { useAnalysis } from '@/contexts/analysis-context';

export default function Main() {
  const {
    currentView,
    setCurrentView,
    url,
    setUrl,
    analysisResult,
    setAnalysisResult,
  } = useAnalysis();

  const [touched, setTouched] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { steps, resetSteps, startFetchStep, updateFromRobotsResult } =
    useProcessSteps();

  const valid = isValidUrl(url);
  const errorMessage =
    touched && !valid
      ? 'Please enter a valid URL (e.g. https://tryprofound.com).'
      : undefined;

  // Update context when analysis completes
  useEffect(() => {
    const analysisStep = steps.find(
      (step) => step.id === 'analyze-robots' && step.status === 'completed'
    );
    if (analysisStep?.analysisResult) {
      setAnalysisResult(analysisStep.analysisResult);
    }
  }, [steps, setAnalysisResult]);

  const handleCancel = () => {
    setUrl('');
    setTouched(false);
    setIsAnalyzing(false);
    setAnalysisResult(null);
    resetSteps();
    setCurrentView('home');
  };

  const handleStartAnalysis = async () => {
    if (!valid) return;

    setIsAnalyzing(true);
    // Clear previous analysis result when starting new analysis
    setAnalysisResult(null);
    startFetchStep();

    try {
      const result: RobotsTxtResult = await fetchRobotsTxt(url);
      updateFromRobotsResult(result);
    } catch (error) {
      console.error('Failed to fetch robots.txt:', error);
      // Clear analysis result on error to prevent showing stale data
      setAnalysisResult(null);
      // Optionally, you could set an error state in your steps or context
      // to show a proper error message to the user
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBlur = useCallback(() => setTouched(true), []);

  const renderHomeView = () => (
    <>
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
    </>
  );

  const renderRecommendationsView = () => (
    <RecommendationsPanel analysisResult={analysisResult} />
  );

  return (
    <div className="inner-box space-y-[14px]">
      {currentView === 'home' && renderHomeView()}
      {currentView === 'recommendations' && renderRecommendationsView()}
    </div>
  );
}
