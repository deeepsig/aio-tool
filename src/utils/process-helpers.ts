// src/utils/process-helpers.ts
import { RobotsTxtResult, parseRobotsTxt } from '@/utils/robots';

export function analyzeRobotsTxt(robotsResult: RobotsTxtResult): string {
  if (!robotsResult.success || !robotsResult.content) {
    return 'No robots.txt content to analyze';
  }

  // Use your existing parser
  const parsed = parseRobotsTxt(robotsResult.content);

  let analysis = '';

  if (parsed.userAgents.length === 0) {
    analysis = 'No user-agent rules found in robots.txt';
  } else {
    analysis += 'BOT RESTRICTIONS:\n\n';

    parsed.userAgents.forEach((ua) => {
      analysis += `User-Agent: ${ua.userAgent}\n`;

      if (ua.disallows.length > 0) {
        analysis += '  Blocked paths:\n';
        ua.disallows.forEach((path) => {
          analysis += `    • ${path}\n`;
        });
      }

      if (ua.allows.length > 0) {
        analysis += '  Allowed paths:\n';
        ua.allows.forEach((path) => {
          analysis += `    • ${path}\n`;
        });
      }

      analysis += '\n';
    });
  }

  if (parsed.sitemaps.length > 0) {
    analysis += 'SITEMAPS:\n';
    parsed.sitemaps.forEach((sitemap) => {
      analysis += `• ${sitemap}\n`;
    });
  }

  return analysis.trim();
}
