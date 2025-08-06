// src/components/process/robots-txt-display.tsx
import React from 'react';
import { parseRobotsTxt, ParsedRobots } from '@/utils/robots';
import IconUser from '@/components/ui/icons/icon-user';
import IconXCircle from '@/components/ui/icons/icon-x-circle';
import IconCheck from '@/components/ui/icons/icon-check';
import IconLink from '@/components/ui/icons/icon-link';
import IconFileText from '@/components/ui/icons/icon-file-text';

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
      <div className="flex items-center gap-2 mb-3">
        <IconUser width={14} height={14} fill="#60A5FA" />
        <span className="text-[#60A5FA] font-mono text-sm font-semibold">
          User-agent:
        </span>
        <span className="text-[#D9D9D9] font-mono text-sm bg-[#2a2a2a] px-2 py-1 rounded">
          {userAgent}
        </span>
      </div>

      {disallows.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <IconXCircle width={14} height={14} fill="#F87171" />
            <div className="text-[#F87171] font-mono text-xs font-semibold">
              DISALLOW ({disallows.length})
            </div>
          </div>
          <div className="space-y-1">
            {disallows.map((path, index) => (
              <div key={index} className="text-[#888] font-mono text-xs pl-6">
                <span className="text-[#F87171]">•</span> {path || '<empty>'}
              </div>
            ))}
          </div>
        </div>
      )}

      {allows.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <IconCheck width={14} height={14} fill="#01D7A1" />
            <div className="text-[#01D7A1] font-mono text-xs font-semibold">
              ALLOW ({allows.length})
            </div>
          </div>
          <div className="space-y-1">
            {allows.map((path, index) => (
              <div key={index} className="text-[#888] font-mono text-xs pl-6">
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
      <div className="flex items-center gap-2 mb-3">
        <IconLink width={14} height={14} fill="#A855F7" />
        <div className="text-[#A855F7] font-mono text-sm font-semibold">
          SITEMAPS ({sitemaps.length})
        </div>
      </div>
      <div className="space-y-2">
        {sitemaps.map((sitemap, index) => (
          <div
            key={index}
            className="text-[#888] font-mono text-xs pl-6 break-all"
          >
            <span className="text-[#A855F7]">•</span>{' '}
            <a
              href={sitemap}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#60A5FA] hover:text-[#93C5FD] underline transition-fills"
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
        <div className="flex items-center gap-2">
          <IconFileText width={16} height={16} fill="#D9D9D9" />
          <div className="text-[#D9D9D9] font-mono text-sm font-semibold">
            robots.txt Content
          </div>
        </div>
        <div className="flex gap-3 text-xs">
          {parsed.userAgents.length > 0 && (
            <div className="flex items-center gap-1">
              <IconUser width={12} height={12} fill="#888" />
              <span className="text-[#888]">
                {parsed.userAgents.length} user-agent
                {parsed.userAgents.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
          {parsed.sitemaps.length > 0 && (
            <div className="flex items-center gap-1">
              <IconLink width={12} height={12} fill="#888" />
              <span className="text-[#888]">
                {parsed.sitemaps.length} sitemap
                {parsed.sitemaps.length !== 1 ? 's' : ''}
              </span>
            </div>
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
