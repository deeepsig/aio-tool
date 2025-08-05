// src/utils/process-helpers.ts
import { RobotsTxtResult, parseRobotsTxt } from '@/utils/robots';
import { AI_BOTS } from '@/data/ai-bots';

export interface AnalysisResult {
  blockedBots: string[];
  totalBots: number;
  hasWildcardBlock: boolean;
  isEmpty: boolean;
  message?: string;
}

/**
 * Get all AI bots that match a given user agent string
 */
function getMatchingAIBots(userAgent: string): string[] {
  const lowerUserAgent = userAgent.toLowerCase();
  return AI_BOTS.filter((bot) => lowerUserAgent.includes(bot.toLowerCase()));
}

export function analyzeRobotsTxt(
  robotsResult: RobotsTxtResult
): AnalysisResult {
  if (!robotsResult.success || !robotsResult.content) {
    return {
      blockedBots: [],
      totalBots: AI_BOTS.length,
      hasWildcardBlock: false,
      isEmpty: true,
      message: 'No robots.txt content to analyze',
    };
  }

  // Use your existing parser
  const parsed = parseRobotsTxt(robotsResult.content);

  if (parsed.userAgents.length === 0) {
    return {
      blockedBots: [],
      totalBots: AI_BOTS.length,
      hasWildcardBlock: false,
      isEmpty: true,
      message: 'No user-agent rules found in robots.txt',
    };
  }

  const blockedBots = new Set<string>();
  let hasWildcardBlock = false;

  // Check each user-agent rule
  parsed.userAgents.forEach((ua) => {
    const userAgent = ua.userAgent.toLowerCase();

    // Check if this user-agent has blocking rules that affect AI bots
    const hasRootDisallow = ua.disallows.some(
      (path) => path === '/' || path === ''
    );
    const hasSignificantBlocking = ua.disallows.length > 0 && hasRootDisallow;

    if (userAgent === '*') {
      // Wildcard - only block if there's a root disallow
      if (hasSignificantBlocking) {
        hasWildcardBlock = true;
        AI_BOTS.forEach((bot) => {
          // Check if this bot is specifically allowed elsewhere
          const isSpecificallyAllowed = parsed.userAgents.some(
            (otherUa) =>
              otherUa.userAgent.toLowerCase() === bot.toLowerCase() &&
              otherUa.allows.length > 0 &&
              otherUa.disallows.length === 0
          );
          if (!isSpecificallyAllowed) {
            blockedBots.add(bot);
          }
        });
      }
    } else {
      // Specific user-agent - check if it matches any AI bot and has blocking rules
      const matchingBots = getMatchingAIBots(userAgent);
      const exactMatch = AI_BOTS.find((bot) => userAgent === bot.toLowerCase());

      if ((matchingBots.length > 0 || exactMatch) && ua.disallows.length > 0) {
        // Add matching bots if they have any disallow rules
        matchingBots.forEach((bot) => blockedBots.add(bot));
        if (exactMatch) blockedBots.add(exactMatch);
      }
    }
  });

  // Convert to sorted array for consistent output
  const sortedBlockedBots = Array.from(blockedBots).sort();

  return {
    blockedBots: sortedBlockedBots,
    totalBots: AI_BOTS.length,
    hasWildcardBlock,
    isEmpty: false,
  };
}
