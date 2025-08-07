// src/components/process/ai-bot-analysis-display.tsx
import React from 'react';
import { AnalysisResult } from '@/utils/process-helpers';
import {
  Section,
  EmptyState,
  DisplayContainer,
} from '../display/display-components';

interface AiBotAnalysisDisplayProps {
  analysis: AnalysisResult;
  className?: string;
}

export default function AiBotAnalysisDisplay({
  analysis,
  className = '',
}: AiBotAnalysisDisplayProps) {
  if (analysis.isEmpty) {
    return (
      <div className={className}>
        <EmptyState
          title="No AI bot analysis available"
          description="Unable to analyze robots.txt for AI bot restrictions"
        />
      </div>
    );
  }

  // Calculate allowed bots
  const allowedBots = analysis.totalBots - analysis.blockedBots.length;
  const allowedBotsArray = allowedBots > 0 ? [allowedBots.toString()] : [];

  return (
    <div className={className}>
      <DisplayContainer>
        <Section
          label="Blocked"
          value={
            analysis.blockedBots.length > 0 ? analysis.blockedBots : undefined
          }
          displayMode="grid"
        />
        <Section
          label="Allowed"
          value={allowedBotsArray}
          count={allowedBots}
          displayMode="grid"
        />
      </DisplayContainer>
    </div>
  );
}
