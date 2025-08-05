// src/components/process/ai-bot-analysis-display.tsx
import React from 'react';
import { AnalysisResult } from '@/utils/process-helpers';

interface AiBotAnalysisDisplayProps {
  analysis: AnalysisResult;
  className?: string;
}

function EmptyState({ message }: { message?: string }) {
  return (
    <div className="text-center py-8 text-[#666]">
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
    <div className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
      <div className="text-[#F87171] font-mono text-sm font-semibold mb-3">
        BLOCKED AI BOTS ({bots.length}):
      </div>
      <div className="grid grid-cols-1 gap-1">
        {bots.map((bot, index) => (
          <div key={index} className="text-[#888] font-mono text-xs pl-4">
            <span className="text-[#F87171]">•</span> {bot}
          </div>
        ))}
      </div>
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
    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
        <div className="text-[#F87171] font-mono text-lg font-bold">
          {blockedCount}
        </div>
        <div className="text-[#888] font-mono text-xs">
          Blocked ({blockPercentage}%)
        </div>
      </div>
      <div className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
        <div className="text-[#01D7A1] font-mono text-lg font-bold">
          {allowedCount}
        </div>
        <div className="text-[#888] font-mono text-xs">
          Allowed ({100 - blockPercentage}%)
        </div>
      </div>
      {hasWildcardBlock && (
        <div className="col-span-2 p-2 bg-[#2A3441] border border-[#3A4451] rounded-lg">
          <div className="text-[#60A5FA] font-mono text-xs text-center">
            ⚠️ Wildcard (*) blocking detected - affects all unlisted bots
          </div>
        </div>
      )}
    </div>
  );
}

function NoBlocksFound({ totalBots }: { totalBots: number }) {
  return (
    <div className="p-4 bg-[#293733] border border-[#3a4a43] rounded-lg text-center">
      <div className="text-[#01D7A1] font-mono text-sm font-semibold mb-2">
        ✅ No AI Bots Blocked
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
      <div className={`ai-bot-analysis-display ${className}`}>
        <EmptyState message={analysis.message} />
      </div>
    );
  }

  const hasBlockedBots = analysis.blockedBots.length > 0;

  return (
    <div
      className={`ai-bot-analysis-display max-h-[400px] overflow-y-auto ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2a2a2a]">
        <div className="text-[#D9D9D9] font-mono text-sm font-semibold">
          AI Bot Analysis
        </div>
        <div className="text-[#888] text-xs">
          {analysis.totalBots} bots checked
        </div>
      </div>

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
