// src/components/process/robots-txt-display.tsx
import React from 'react';
import { parseRobotsTxt, ParsedRobots } from '@/utils/robots';
import {
  Section,
  EmptyState,
  DisplayContainer,
} from '../display/display-components';

interface RobotsTxtDisplayProps {
  content: string;
  className?: string;
}

export default function RobotsTxtDisplay({
  content,
  className = '',
}: RobotsTxtDisplayProps) {
  const parsed: ParsedRobots = parseRobotsTxt(content);

  if (parsed.userAgents.length === 0 && parsed.sitemaps.length === 0) {
    return (
      <div className={className}>
        <EmptyState
          title="No robots.txt rules found"
          description="The file appears to be empty or contains no valid directives"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <DisplayContainer>
        {/* Render each user agent block */}
        {parsed.userAgents.map((ua, index) => (
          <div key={index} className="mb-2 last:mb-0">
            <Section label="User Agent" value={ua.userAgent} />
            <Section label="Disallow" value={ua.disallows} displayMode="grid" />
            <Section label="Allow" value={ua.allows} displayMode="grid" />
          </div>
        ))}

        {/* Render sitemaps if they exist */}
        {parsed.sitemaps.length > 0 && (
          <div className="mt-2">
            <Section
              label="Sitemap"
              value={parsed.sitemaps}
              displayMode="list"
            />
          </div>
        )}
      </DisplayContainer>
    </div>
  );
}
