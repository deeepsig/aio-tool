// src/components/recommendations/recommendations-display.tsx
import React from 'react';
import { AnalysisResult } from '@/utils/process-helpers';
import IconCheck from '@/components/ui/icons/icon-check';
import IconXCircle from '@/components/ui/icons/icon-x-circle';
import IconAlertTriangle from '@/components/ui/icons/icon-alert-triangle';
import IconInfo from '@/components/ui/icons/icon-info';
import IconLightbulb from '@/components/ui/icons/icon-lightbulb';

interface RecommendationsDisplayProps {
  analysis: AnalysisResult;
  className?: string;
}

interface Recommendation {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  action?: string;
  code?: string;
}

function getRecommendations(analysis: AnalysisResult): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Critical: All bots blocked with wildcard
  if (
    analysis.hasWildcardBlock &&
    analysis.blockedBots.length === analysis.totalBots
  ) {
    recommendations.push({
      id: 'wildcard-block-all',
      type: 'critical',
      title: 'All AI Bots Blocked by Wildcard Rule',
      description:
        'Your robots.txt contains a wildcard (*) rule that blocks all AI crawlers. This prevents AI search engines and assistants from accessing your content.',
      action: 'Consider allowing specific beneficial AI bots',
      code: 'User-agent: GPTBot\nAllow: /\n\nUser-agent: GoogleOther\nAllow: /',
    });
  }

  // Warning: Many bots blocked
  else if (analysis.blockedBots.length > analysis.totalBots * 0.5) {
    recommendations.push({
      id: 'many-blocked',
      type: 'warning',
      title: `High AI Bot Blocking (${Math.round((analysis.blockedBots.length / analysis.totalBots) * 100)}%)`,
      description: `${analysis.blockedBots.length} out of ${analysis.totalBots} AI bots are currently blocked. This may limit your content's visibility in AI-powered search and assistance tools.`,
      action: 'Review and selectively allow trusted AI crawlers',
      code: 'User-agent: GPTBot\nAllow: /\n\nUser-agent: Claude-Web\nAllow: /',
    });
  }

  // Warning: Wildcard blocking with some exceptions
  else if (analysis.hasWildcardBlock && analysis.blockedBots.length > 0) {
    recommendations.push({
      id: 'wildcard-with-exceptions',
      type: 'warning',
      title: 'Wildcard Blocking with Partial Exceptions',
      description:
        'You have a wildcard (*) rule that blocks most bots, but some AI crawlers have specific allow rules. Consider a more explicit approach.',
      action: 'Use specific User-agent rules instead of wildcards',
      code: 'User-agent: unwanted-bot\nDisallow: /\n\nUser-agent: GPTBot\nAllow: /',
    });
  }

  // Info: Some specific bots blocked
  else if (
    analysis.blockedBots.length > 0 &&
    analysis.blockedBots.length <= analysis.totalBots * 0.3
  ) {
    recommendations.push({
      id: 'some-blocked',
      type: 'info',
      title: `Selective AI Bot Blocking (${analysis.blockedBots.length} blocked)`,
      description:
        'You have blocked some specific AI bots. This is a balanced approach that allows most AI crawlers while restricting certain ones.',
      action: 'Regularly review blocked bots list',
      code:
        '# Review these blocked bots:\n' +
        analysis.blockedBots.map((bot) => `# ${bot}`).join('\n'),
    });
  }

  // Success: No bots blocked or very few
  else if (analysis.blockedBots.length === 0) {
    recommendations.push({
      id: 'open-access',
      type: 'success',
      title: 'Full AI Accessibility',
      description:
        "All known AI bots can access your website. This maximizes your content's visibility in AI-powered search engines and assistants.",
      action: 'Monitor for unwanted crawlers and add specific blocks if needed',
    });
  }

  // Always add general recommendations
  recommendations.push({
    id: 'sitemap-recommendation',
    type: 'info',
    title: 'Sitemap Optimization',
    description:
      'Ensure your robots.txt includes sitemap references to help AI crawlers discover your content efficiently.',
    code: 'Sitemap: https://yoursite.com/sitemap.xml\nSitemap: https://yoursite.com/sitemap-images.xml',
  });

  // Add crawl delay recommendation if many bots are allowed
  if (analysis.blockedBots.length < analysis.totalBots * 0.5) {
    recommendations.push({
      id: 'crawl-delay',
      type: 'info',
      title: 'Crawl Rate Management',
      description:
        'Consider adding crawl delays for AI bots to manage server load while maintaining accessibility.',
      code: 'User-agent: *\nCrawl-delay: 1\n\nUser-agent: GPTBot\nCrawl-delay: 2',
    });
  }

  return recommendations;
}

function RecommendationCard({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  const typeConfig = {
    critical: {
      border: 'border-[#3D2A2A]',
      bg: 'bg-[#1A1010]',
      icon: IconXCircle,
      iconColor: '#F87171',
      titleColor: 'text-[#F87171]',
    },
    warning: {
      border: 'border-[#3A2F1A]',
      bg: 'bg-[#1A1610]',
      icon: IconAlertTriangle,
      iconColor: '#FCD34D',
      titleColor: 'text-[#FCD34D]',
    },
    info: {
      border: 'border-[#2A3441]',
      bg: 'bg-[#10172A]',
      icon: IconInfo,
      iconColor: '#60A5FA',
      titleColor: 'text-[#60A5FA]',
    },
    success: {
      border: 'border-[#293733]',
      bg: 'bg-[#102A20]',
      icon: IconCheck,
      iconColor: '#01D7A1',
      titleColor: 'text-[#01D7A1]',
    },
  };

  const config = typeConfig[recommendation.type];
  const IconComponent = config.icon;

  return (
    <div className={`p-4 ${config.bg} border ${config.border} rounded-lg mb-3`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <IconComponent width={16} height={16} fill={config.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`font-mono text-sm font-semibold mb-2 ${config.titleColor}`}
          >
            {recommendation.title}
          </div>
          <div className="text-[#888] font-mono text-xs mb-3 leading-relaxed">
            {recommendation.description}
          </div>

          {recommendation.action && (
            <div className="mb-3">
              <div className="text-[#D9D9D9] font-mono text-xs font-semibold mb-1">
                RECOMMENDED ACTION:
              </div>
              <div className="text-[#888] font-mono text-xs">
                {recommendation.action}
              </div>
            </div>
          )}

          {recommendation.code && (
            <div>
              <div className="text-[#D9D9D9] font-mono text-xs font-semibold mb-1">
                EXAMPLE CODE:
              </div>
              <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded p-2 font-mono text-xs text-[#888] whitespace-pre-wrap overflow-x-auto">
                {recommendation.code}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryHeader({ analysis }: { analysis: AnalysisResult }) {
  const blockedPercentage = Math.round(
    (analysis.blockedBots.length / analysis.totalBots) * 100
  );
  const accessibilityScore = 100 - blockedPercentage;

  let scoreColor = 'text-[#01D7A1]'; // Good (green)
  let scoreLabel = 'Excellent';
  let scoreBg = 'bg-[#293733]';
  let scoreBorder = 'border-[#293733]';

  if (accessibilityScore < 30) {
    scoreColor = 'text-[#F87171]'; // Bad (red)
    scoreLabel = 'Poor';
    scoreBg = 'bg-[#3D2A2A]';
    scoreBorder = 'border-[#3D2A2A]';
  } else if (accessibilityScore < 70) {
    scoreColor = 'text-[#FCD34D]'; // Warning (yellow)
    scoreLabel = 'Needs Improvement';
    scoreBg = 'bg-[#3A2F1A]';
    scoreBorder = 'border-[#3A2F1A]';
  } else if (accessibilityScore < 90) {
    scoreColor = 'text-[#60A5FA]'; // Info (blue)
    scoreLabel = 'Good';
    scoreBg = 'bg-[#2A3441]';
    scoreBorder = 'border-[#2A3441]';
  }

  return (
    <div className={`p-4 ${scoreBg} border ${scoreBorder} rounded-lg mb-4`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[#D9D9D9] font-mono text-sm font-semibold">
            AI Accessibility Score
          </div>
          <div className="text-[#888] font-mono text-xs mt-1">
            Based on crawler access permissions
          </div>
        </div>
        <div className="text-right">
          <div className={`font-mono text-2xl font-bold ${scoreColor}`}>
            {accessibilityScore}%
          </div>
          <div className={`font-mono text-xs ${scoreColor}`}>{scoreLabel}</div>
        </div>
      </div>
    </div>
  );
}

export default function RecommendationsDisplay({
  analysis,
  className = '',
}: RecommendationsDisplayProps) {
  const recommendations = getRecommendations(analysis);

  return (
    <div
      className={`recommendations-display max-h-[400px] overflow-y-auto ${className}`}
    >
      {/* Accessibility Score Summary */}
      <SummaryHeader analysis={analysis} />

      {/* Recommendations */}
      <div className="space-y-0">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-4 p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
        <div className="flex items-center justify-center gap-2 text-[#888] font-mono text-xs">
          <IconLightbulb width={14} height={14} fill="#888" />
          Always test robots.txt changes and monitor crawl patterns after
          implementation
        </div>
      </div>
    </div>
  );
}
