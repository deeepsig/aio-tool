// src/components/process/collapsible-content.tsx
import React from 'react';
import RobotsTxtDisplay from './robots-txt-display';
import AiBotAnalysisDisplay from './ai-bot-analysis-display';
import { AnalysisResult } from '@/utils/process-helpers';

interface CollapsibleContentProps {
  id?: string;
  isExpanded: boolean;
  content: string;
  error?: string;
  stepId?: string; // Add stepId to identify the step type
  className?: string;
  analysisResult?: AnalysisResult; // Add analysis result for AI bot analysis
}

export default function CollapsibleContent({
  id,
  isExpanded,
  content,
  error,
  stepId,
  className = '',
  analysisResult,
}: CollapsibleContentProps) {
  const displayContent = error || content;
  // Check if this is the robots.txt fetch step and we have successful content
  const isRobotsTxtStep = stepId === 'fetch-robots';
  const shouldShowRobotsDisplay = isRobotsTxtStep && !error && content;
  // Check if this is the AI bot analysis step and we have results
  const isAnalysisStep = stepId === 'analyze-robots';
  const shouldShowAnalysisDisplay = isAnalysisStep && !error && analysisResult;

  return (
    <div
      id={id}
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      } ${className}`}
      aria-hidden={!isExpanded}
    >
      <div
        className="px-4 pb-3 pt-3"
        style={{ borderTop: '1px solid #1a1a1a' }}
      >
        {shouldShowRobotsDisplay ? (
          <RobotsTxtDisplay content={content} />
        ) : shouldShowAnalysisDisplay ? (
          <AiBotAnalysisDisplay analysis={analysisResult} />
        ) : (
          // content-display: Only for the cases when we have an error, empty robot file process card displays
          <div
            className={`content-display text-sm font-sans ${error ? 'text-[#F87171]' : ''}`}
            role={error ? 'alert' : 'status'}
            aria-live={error ? 'assertive' : 'polite'}
          >
            {displayContent}
          </div>
        )}
      </div>
    </div>
  );
}
