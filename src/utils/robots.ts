// src/utils/robots.ts

export interface RobotsTxtResult {
  success: boolean;
  content?: string;
  error?: string;
  url: string;
}

/**
 * Fetches robots.txt from a given domain using our API route
 * @param domain - The domain to fetch robots.txt from (e.g., "https://reddit.com" or "reddit.com")
 * @returns Promise with the robots.txt content or error
 */
export async function fetchRobotsTxt(domain: string): Promise<RobotsTxtResult> {
  try {
    console.log(`Fetching robots.txt for: ${domain}`);

    // Call our API route instead of fetching directly
    const response = await fetch(
      `/api/robots?url=${encodeURIComponent(domain)}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: `API Error: ${response.status} ${response.statusText}`,
        url: domain,
      };
    }

    // Our API route returns JSON with our RobotsTxtResult structure
    const result: RobotsTxtResult = await response.json();
    return result;
  } catch (error) {
    console.error('Error calling robots API:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      url: domain,
    };
  }
}

/**
 * Basic robots.txt parser - extracts key information
 * @param content - Raw robots.txt content
 * @returns Parsed robots.txt data
 */
export interface ParsedRobots {
  userAgents: Array<{
    userAgent: string;
    disallows: string[];
    allows: string[];
  }>;
  sitemaps: string[];
  rawContent: string;
}

export function parseRobotsTxt(content: string): ParsedRobots {
  const lines = content.split('\n').map((line) => line.trim());
  const result: ParsedRobots = {
    userAgents: [],
    sitemaps: [],
    rawContent: content,
  };

  let currentUserAgent: {
    userAgent: string;
    disallows: string[];
    allows: string[];
  } | null = null;

  for (const line of lines) {
    // Skip empty lines and comments
    if (!line || line.startsWith('#')) continue;

    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();

    if (!key || !value) continue;

    const normalizedKey = key.toLowerCase().trim();

    switch (normalizedKey) {
      case 'user-agent':
        // Save previous user-agent block if exists
        if (currentUserAgent) {
          result.userAgents.push(currentUserAgent);
        }
        // Start new user-agent block
        currentUserAgent = {
          userAgent: value,
          disallows: [],
          allows: [],
        };
        break;

      case 'disallow':
        if (currentUserAgent) {
          currentUserAgent.disallows.push(value);
        }
        break;

      case 'allow':
        if (currentUserAgent) {
          currentUserAgent.allows.push(value);
        }
        break;

      case 'sitemap':
        result.sitemaps.push(value);
        break;
    }
  }

  // Don't forget the last user-agent block
  if (currentUserAgent) {
    result.userAgents.push(currentUserAgent);
  }

  return result;
}
