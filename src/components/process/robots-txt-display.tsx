// src/components/process/robots-txt-display.tsx
import React from 'react';
import { parseRobotsTxt, ParsedRobots } from '@/utils/robots';

interface RobotsTxtDisplayProps {
  content: string;
  className?: string;
}

interface RouteListProps {
  routes: string[];
}

function RouteList({ routes }: RouteListProps) {
  return (
    <div className="flex-1 min-w-0">
      <div className="grid grid-cols-2 gap-x-0 gap-y-0">
        {routes.map((route, index) => (
          <div key={index} className="text-[#D9D9D9] font-sans text-sm">
            {route || '<empty>'}
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
          <RouteList routes={value} />
        ) : (
          <div className="flex-1">
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
      <div className="text-sm font-sans">No robots.txt rules found</div>
      <div className="text-xs mt-1">
        The file appears to be empty or contains no valid directives
      </div>
    </div>
  );
}

export default function RobotsTxtDisplay({
  content,
  className = '',
}: RobotsTxtDisplayProps) {
  const parsed: ParsedRobots = parseRobotsTxt(content);

  if (parsed.userAgents.length === 0 && parsed.sitemaps.length === 0) {
    return (
      <div className={`robots-txt-display ${className}`}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div
      className={`robots-txt-display max-h-[400px] overflow-y-auto ${className}`}
    >
      <div className="space-y-0">
        {/* Render each user agent block */}
        {parsed.userAgents.map((ua, index) => (
          <div key={index} className="mb-2 last:mb-0">
            <Section label="User Agent" value={ua.userAgent} />
            <Section label="Disallow" value={ua.disallows} />
            <Section label="Allow" value={ua.allows} />
          </div>
        ))}
      </div>
    </div>
  );
}
