// src/components/recommendations/recommendations-panel.tsx
import React from 'react';
import { AnalysisResult } from '@/utils/process-helpers';
import RecommendationsDisplay from './recommendations-display';

interface RecommendationsPanelProps {
  analysisResult?: AnalysisResult | null;
  className?: string;
}

export default function RecommendationsPanel({
  analysisResult,
  className = '',
}: RecommendationsPanelProps) {
  // Only show panel if we have analysis results
  if (!analysisResult || analysisResult.isEmpty) {
    return (
      <section
        className={`space-y-2 ${className}`}
        aria-labelledby="recommendations-heading"
      >
        <h3
          id="recommendations-heading"
          className="font-semibold text-base text-[#D9D9D9]"
        >
          Recommendations
        </h3>
        <div
          className="text-sm text-gray-400 p-4 text-center border border-gray-700 rounded-lg"
          role="status"
          aria-live="polite"
        >
          No analysis results available. Please run an analysis first.
        </div>
      </section>
    );
  }

  return (
    <section
      className={`space-y-2 ${className}`}
      aria-labelledby="recommendations-heading"
    >
      <h3
        id="recommendations-heading"
        className="font-medium text-base text-[#D9D9D9]"
      >
        Recommendations
      </h3>
      <RecommendationsDisplay analysis={analysisResult} />
    </section>
  );
}
