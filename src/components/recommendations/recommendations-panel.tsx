// src/components/recommendations/recommendations-panel.tsx
import React from 'react';
import { AnalysisResult } from '@/utils/process-helpers';
import RecommendationsDisplay from './recommendations-display';

interface RecommendationsPanelProps {
  analysisResult?: AnalysisResult;
  className?: string;
}

export default function RecommendationsPanel({
  analysisResult,
  className = '',
}: RecommendationsPanelProps) {
  // Only show panel if we have analysis results
  if (!analysisResult || analysisResult.isEmpty) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-semibold text-base text-[#D9D9D9]">
        Recommendations
      </h3>
      <RecommendationsDisplay analysis={analysisResult} />
    </div>
  );
}
