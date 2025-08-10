// src/components/main-card/main.tsx
'use client';
import React, { useState, useCallback, useEffect } from 'react';
import ActionBar from '../action-bar/action-bar';
import ProcessPanel from '../process/process-panel';
import RecommendationsPanel from '../recommendations/recommendations-panel';
import UrlInput from '../url/url-input';
import { isValidUrl } from '@/utils/validation';
import { useProcessSteps } from '@/hooks/useProcessSteps';
import { useAnalysis } from '@/contexts/analysis-context';
import { useRobotsAnalysis } from '@/hooks/useRobotsQuery';

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
  const { steps, resetSteps, startFetchStep, updateFromRobotsResult } =
    useProcessSteps();

  // TanStack Query hook for robots.txt fetching
  const {
    data: robotsResult,
    error: robotsError,
    isAnalyzing,
    canAnalyze,
    startAnalysis,
  } = useRobotsAnalysis(url);

  const valid = isValidUrl(url);
  const errorMessage =
    touched && !valid
      ? 'Please enter a valid URL (e.g. https://tryprofound.com).'
      : undefined;

  // Handle robots.txt query results
  useEffect(() => {
    if (robotsResult) {
      updateFromRobotsResult(robotsResult);
    }
  }, [robotsResult, updateFromRobotsResult]);

  // Handle query errors
  useEffect(() => {
    if (robotsError) {
      console.error('Failed to fetch robots.txt:', robotsError);
      setAnalysisResult(null);
    }
  }, [robotsError, setAnalysisResult]);

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
    setAnalysisResult(null);
    resetSteps();
    setCurrentView('home');
  };

  const handleStartAnalysis = async () => {
    if (!canAnalyze) return;

    // Clear previous analysis result when starting new analysis
    setAnalysisResult(null);
    startFetchStep();

    // Trigger the query
    startAnalysis();
  };

  const handleBlur = useCallback(() => setTouched(true), []);

  // Handle form submission (enables Enter key submission)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canAnalyze && !isAnalyzing) {
      handleStartAnalysis();
    }
  };

  // Screen reader announcement for status changes
  const getStatusAnnouncement = () => {
    if (isAnalyzing) return 'Analysis in progress';
    if (robotsError) return 'Analysis failed';
    if (analysisResult) return 'Analysis completed';
    return '';
  };

  const renderHomeView = () => (
    <div className="space-y-[14px]">
      {/* URL Input Form Section */}
      <form onSubmit={handleFormSubmit}>
        <UrlInput
          url={url}
          onChange={setUrl}
          onBlur={handleBlur}
          error={
            errorMessage ||
            (robotsError
              ? 'Failed to fetch robots.txt. Please try again.'
              : undefined)
          }
        />
      </form>

      {/* Process Panel (Visually in center, semantically separate) */}
      <ProcessPanel steps={steps} />

      {/* Action Bar (Visually at bottom, functionally linked to form) */}
      <div className="flex justify-end">
        <ActionBar
          onCancel={handleCancel}
          onStartAnalysis={handleStartAnalysis}
          startDisabled={!canAnalyze || isAnalyzing}
          isProcessing={isAnalyzing}
        />
      </div>
    </div>
  );

  const renderRecommendationsView = () => (
    <RecommendationsPanel analysisResult={analysisResult} />
  );

  return (
    <div className="inner-box space-y-[14px]">
      {/* Screen reader only status announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {getStatusAnnouncement()}
      </div>

      {currentView === 'home' && renderHomeView()}
      {currentView === 'recommendations' && renderRecommendationsView()}
    </div>
  );
}
