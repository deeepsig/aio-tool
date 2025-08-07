// src/components/recommendations/recommendations-display.tsx
import React from 'react';
import { AnalysisResult } from '@/utils/process-helpers';
import {
  DisplayContainer,
  ScoreDisplay,
  RecommendationSection,
  RecommendationItem,
} from '../display/display-components';

interface RecommendationsDisplayProps {
  analysis: AnalysisResult;
  className?: string;
}

interface Recommendation {
  id: string;
  text: string;
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
      text: 'Consider allowing specific beneficial AI bots',
      code: 'User-agent: GPTBot\nAllow: /\n\nUser-agent: GoogleOther\nAllow: /',
    });
  }
  // Warning: Many bots blocked
  else if (analysis.blockedBots.length > analysis.totalBots * 0.5) {
    recommendations.push({
      id: 'many-blocked',
      text: 'Review and selectively allow trusted AI crawlers',
      code: 'User-agent: GPTBot\nAllow: /\n\nUser-agent: Claude-Web\nAllow: /',
    });
  }
  // Warning: Wildcard blocking with some exceptions
  else if (analysis.hasWildcardBlock && analysis.blockedBots.length > 0) {
    recommendations.push({
      id: 'wildcard-with-exceptions',
      text: 'Use specific User-agent rules instead of wildcards',
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
      text: 'Regularly review blocked bots list',
    });
  }
  // Success: No bots blocked or very few
  else if (analysis.blockedBots.length === 0) {
    recommendations.push({
      id: 'open-access',
      text: 'Monitor for unwanted crawlers and add specific blocks if needed',
    });
  }

  // Always add general recommendations
  recommendations.push({
    id: 'sitemap-recommendation',
    text: 'Ensure your robots.txt includes sitemap references to help AI crawlers discover your content efficiently.',
    code: 'Sitemap: https://yoursite.com/sitemap.xml\nSitemap: https://yoursite.com/sitemap-images.xml',
  });

  // Add crawl delay recommendation if many bots are allowed
  if (analysis.blockedBots.length < analysis.totalBots * 0.5) {
    recommendations.push({
      id: 'crawl-delay',
      text: 'Consider adding crawl delays for AI bots to manage server load while maintaining accessibility.',
      code: 'User-agent: *\nCrawl-delay: 1\n\nUser-agent: GPTBot\nCrawl-delay: 2',
    });
  }

  return recommendations;
}

export default function RecommendationsDisplay({
  analysis,
  className = '',
}: RecommendationsDisplayProps) {
  const blockedPercentage = Math.round(
    (analysis.blockedBots.length / analysis.totalBots) * 100
  );
  const accessibilityScore = 100 - blockedPercentage;
  const recommendations = getRecommendations(analysis);

  return (
    <div className={`font-sans font-light ${className}`}>
      <DisplayContainer maxHeight="lg">
        {/* AI Accessibility Score */}
        <ScoreDisplay
          label="AI Accessibility Score"
          score={accessibilityScore}
          description="This is calculated by examining how many of the bots mentioned in ai-robot-list have been specifically blocked by the robots.txt file."
        />

        {/* Recommended Next Steps */}
        <RecommendationSection title="Recommended Next Steps">
          {recommendations.map((recommendation) => (
            <RecommendationItem
              key={recommendation.id}
              text={recommendation.text}
              code={recommendation.code}
            />
          ))}
        </RecommendationSection>
      </DisplayContainer>
    </div>
  );
}
