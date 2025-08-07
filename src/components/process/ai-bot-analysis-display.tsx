// src/components/process/ai-bot-analysis-display.tsx
import React from 'react';
import { AnalysisResult } from '@/utils/process-helpers';

interface AiBotAnalysisDisplayProps {
  analysis: AnalysisResult;
  className?: string;
}

interface BotListProps {
  bots: string[];
}

function BotList({ bots }: BotListProps) {
  return (
    <div className="flex-1 min-w-0">
      <div className="grid grid-cols-2 gap-x-0 gap-y-0">
        {bots.map((bot, index) => (
          <div key={index} className="text-[#D9D9D9] font-sans text-sm">
            {bot}
          </div>
        ))}
      </div>
    </div>
  );
}

interface SectionProps {
  label: string;
  value?: string | string[];
  count?: number;
}

function Section({ label, value, count }: SectionProps) {
  // Don't render if no value or empty array
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  const displayCount =
    count ?? (Array.isArray(value) ? value.length : undefined);

  return (
    <div className="border-b border-[#2a2a2a] py-1 last:border-b-0">
      <div className="flex">
        <div className="w-28 flex-shrink-0">
          <div className="text-[#98979A] font-sans text-sm">
            {label}
            {displayCount !== undefined && ` (${displayCount})`}
          </div>
        </div>

        {Array.isArray(value) ? (
          <BotList bots={value} />
        ) : (
          <div className="flex-1 min-w-0">
            <div className="text-[#D9D9D9] font-sans text-sm">{value}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center text-[#666]">
      <div className="text-sm font-sans">No AI bot analysis available</div>
      <div className="text-xs mt-1">
        Unable to analyze robots.txt for AI bot restrictions
      </div>
    </div>
  );
}

export default function AiBotAnalysisDisplay({
  analysis,
  className = '',
}: AiBotAnalysisDisplayProps) {
  if (analysis.isEmpty) {
    return (
      <div className={`ai-bot-analysis-display ${className}`}>
        <EmptyState />
      </div>
    );
  }

  // Calculate allowed bots
  const allowedBots = analysis.totalBots - analysis.blockedBots.length;
  const allowedBotsArray = allowedBots > 0 ? [allowedBots.toString()] : [];

  return (
    <div
      className={`ai-bot-analysis-display max-h-[400px] overflow-y-auto ${className}`}
    >
      <div className="space-y-0">
        <Section
          label="Blocked"
          value={
            analysis.blockedBots.length > 0 ? analysis.blockedBots : undefined
          }
        />
        <Section label="Allowed" value={allowedBotsArray} count={allowedBots} />
      </div>
    </div>
  );
}
