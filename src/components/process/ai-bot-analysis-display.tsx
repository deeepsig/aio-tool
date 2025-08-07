// src/components/process/ai-bot-analysis-display.tsx
import React from 'react';
import { AnalysisResult } from '@/utils/process-helpers';
import IconCheck from '@/components/ui/icons/icon-check';
import IconXCircle from '@/components/ui/icons/icon-x-circle';
import IconAlertTriangle from '@/components/ui/icons/icon-alert-triangle';
import IconInfo from '@/components/ui/icons/icon-info';

interface AiBotAnalysisDisplayProps {
  analysis: AnalysisResult;
  className?: string;
}

function EmptyState({ message }: { message?: string }) {
  return (
    <div className="text-center py-8 text-[#666]" role="status">
      <div className="text-sm font-mono">
        {message || 'No AI bot analysis available'}
      </div>
      <div className="text-xs mt-1">
        Unable to analyze robots.txt for AI bot restrictions
      </div>
    </div>
  );
}

function BlockedBotsSection({ bots }: { bots: string[] }) {
  return (
    <div className="p-3 bg-[#3D2A2A] border border-[#3D2A2A] rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <IconXCircle width={16} height={16} fill="#F87171" aria-hidden="true" />
        <div className="text-[#F87171] font-mono text-sm font-semibold">
          BLOCKED AI BOTS ({bots.length})
        </div>
      </div>
      <ul
        className="grid grid-cols-1 gap-1"
        role="list"
        aria-label={`${bots.length} blocked AI bots`}
      >
        {bots.map((bot, index) => (
          <li key={index} className="text-[#888] font-mono text-xs pl-4">
            <span className="text-[#F87171]" aria-hidden="true">
              •
            </span>{' '}
            {bot}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SummaryStats({
  blockedCount,
  totalBots,
  hasWildcardBlock,
}: {
  blockedCount: number;
  totalBots: number;
  hasWildcardBlock: boolean;
}) {
  const allowedCount = totalBots - blockedCount;
  const blockPercentage = Math.round((blockedCount / totalBots) * 100);

  return (
    <div
      className="grid grid-cols-2 gap-3 mb-4"
      role="region"
      aria-label="Bot access summary"
    >
      <div className="p-3 bg-[#3D2A2A] border border-[#3D2A2A] rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <IconXCircle
            width={14}
            height={14}
            fill="#F87171"
            aria-hidden="true"
          />
          <div className="text-[#F87171] font-mono text-lg font-bold">
            {blockedCount}
          </div>
        </div>
        <div className="text-[#888] font-mono text-xs">
          Blocked ({blockPercentage}%)
        </div>
      </div>
      <div className="p-3 bg-[#293733] border border-[#293733] rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <IconCheck width={14} height={14} fill="#01D7A1" aria-hidden="true" />
          <div className="text-[#01D7A1] font-mono text-lg font-bold">
            {allowedCount}
          </div>
        </div>
        <div className="text-[#888] font-mono text-xs">
          Allowed ({100 - blockPercentage}%)
        </div>
      </div>
      {hasWildcardBlock && (
        <div
          className="col-span-2 p-2 bg-[#2A3441] border border-[#2A3441] rounded-lg"
          role="alert"
        >
          <div className="flex items-center justify-center gap-2 text-[#60A5FA] font-mono text-xs">
            <IconAlertTriangle
              width={14}
              height={14}
              fill="#60A5FA"
              aria-hidden="true"
            />
            Wildcard (*) blocking detected - affects all unlisted bots
          </div>
        </div>
      )}
    </div>
  );
}

function NoBlocksFound({ totalBots }: { totalBots: number }) {
  return (
    <div
      className="p-4 bg-[#293733] border border-[#293733] rounded-lg text-center"
      role="status"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <IconCheck width={16} height={16} fill="#01D7A1" aria-hidden="true" />
        <div className="text-[#01D7A1] font-mono text-sm font-semibold">
          No AI Bots Blocked
        </div>
      </div>
      <div className="text-[#888] font-mono text-xs">
        All {totalBots} known AI bots can access this website
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
      <div
        className={`ai-bot-analysis-display ${className}`}
        role="region"
        aria-label="AI bot analysis results"
      >
        <EmptyState message={analysis.message} />
      </div>
    );
  }

  const hasBlockedBots = analysis.blockedBots.length > 0;

  return (
    <div
      className={`ai-bot-analysis-display max-h-[400px] overflow-y-auto ${className}`}
      role="region"
      aria-label="AI bot analysis results"
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-4 pb-2 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <IconInfo width={16} height={16} fill="#D9D9D9" aria-hidden="true" />
          <h4 className="text-[#D9D9D9] font-mono text-sm font-semibold">
            AI Bot Analysis
          </h4>
        </div>
        <div
          className="text-[#888] text-xs"
          aria-label={`Analysis checked ${analysis.totalBots} bots`}
        >
          {analysis.totalBots} bots checked
        </div>
      </header>

      {/* Summary Stats */}
      <SummaryStats
        blockedCount={analysis.blockedBots.length}
        totalBots={analysis.totalBots}
        hasWildcardBlock={analysis.hasWildcardBlock}
      />

      {/* Results */}
      {hasBlockedBots ? (
        <BlockedBotsSection bots={analysis.blockedBots} />
      ) : (
        <NoBlocksFound totalBots={analysis.totalBots} />
      )}
    </div>
  );
}
