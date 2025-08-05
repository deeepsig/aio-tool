// src/components/process/robots-txt-display.tsx
import React from 'react';
import { parseRobotsTxt, ParsedRobots } from '@/utils/robots';

interface RobotsTxtDisplayProps {
  content: string;
  className?: string;
}

interface UserAgentSectionProps {
  userAgent: string;
  disallows: string[];
  allows: string[];
}

function UserAgentSection({
  userAgent,
  disallows,
  allows,
}: UserAgentSectionProps) {
  return (
    <div className="mb-4 p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
      <div className="flex items-center mb-2">
        <span className="text-[#60A5FA] font-mono text-sm font-semibold">
          User-agent:
        </span>
        <span className="ml-2 text-[#D9D9D9] font-mono text-sm bg-[#2a2a2a] px-2 py-1 rounded">
          {userAgent}
        </span>
      </div>

      {disallows.length > 0 && (
        <div className="mb-2">
          <div className="text-[#F87171] font-mono text-xs font-semibold mb-1">
            DISALLOW ({disallows.length}):
          </div>
          <div className="space-y-1">
            {disallows.map((path, index) => (
              <div key={index} className="text-[#888] font-mono text-xs pl-4">
                <span className="text-[#F87171]">•</span> {path || '<empty>'}
              </div>
            ))}
          </div>
        </div>
      )}

      {allows.length > 0 && (
        <div>
          <div className="text-[#01D7A1] font-mono text-xs font-semibold mb-1">
            ALLOW ({allows.length}):
          </div>
          <div className="space-y-1">
            {allows.map((path, index) => (
              <div key={index} className="text-[#888] font-mono text-xs pl-4">
                <span className="text-[#01D7A1]">•</span> {path || '<empty>'}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SitemapSection({ sitemaps }: { sitemaps: string[] }) {
  if (sitemaps.length === 0) return null;

  return (
    <div className="mt-4 p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
      <div className="text-[#A855F7] font-mono text-sm font-semibold mb-2">
        SITEMAPS ({sitemaps.length}):
      </div>
      <div className="space-y-1">
        {sitemaps.map((sitemap, index) => (
          <div
            key={index}
            className="text-[#888] font-mono text-xs pl-4 break-all"
          >
            <span className="text-[#A855F7]">•</span>{' '}
            <a
              href={sitemap}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#60A5FA] hover:text-[#93C5FD] underline"
            >
              {sitemap}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-8 text-[#666]">
      <div className="text-sm font-mono">No robots.txt rules found</div>
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
      {/* Header with stats */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2a2a2a]">
        <div className="text-[#D9D9D9] font-mono text-sm font-semibold">
          robots.txt Content
        </div>
        <div className="flex gap-3 text-xs">
          {parsed.userAgents.length > 0 && (
            <span className="text-[#888]">
              {parsed.userAgents.length} user-agent
              {parsed.userAgents.length !== 1 ? 's' : ''}
            </span>
          )}
          {parsed.sitemaps.length > 0 && (
            <span className="text-[#888]">
              {parsed.sitemaps.length} sitemap
              {parsed.sitemaps.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* User-agent sections */}
      {parsed.userAgents.map((ua, index) => (
        <UserAgentSection
          key={index}
          userAgent={ua.userAgent}
          disallows={ua.disallows}
          allows={ua.allows}
        />
      ))}

      {/* Sitemaps section */}
      <SitemapSection sitemaps={parsed.sitemaps} />
    </div>
  );
}
