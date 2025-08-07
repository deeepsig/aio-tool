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
  const sectionId = `user-agent-${userAgent.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <section
      className="mb-4 p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg"
      aria-labelledby={`${sectionId}-header`}
    >
      <div className="flex items-center gap-2 mb-3" id={`${sectionId}-header`}>
        <IconUser width={14} height={14} fill="#60A5FA" aria-hidden="true" />
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
            <IconXCircle
              width={14}
              height={14}
              fill="#F87171"
              aria-hidden="true"
            />
            <h5 className="text-[#F87171] font-mono text-xs font-semibold">
              DISALLOW ({disallows.length})
            </h5>
          </div>
          <ul
            className="space-y-1"
            role="list"
            aria-label={`${disallows.length} disallowed paths`}
          >
            {disallows.map((path, index) => (
              <li key={index} className="text-[#888] font-mono text-xs pl-6">
                <span className="text-[#F87171]" aria-hidden="true">
                  •
                </span>{' '}
                {path || '<empty>'}
              </li>
            ))}
          </ul>
        </div>
      )}

      {allows.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <IconCheck
              width={14}
              height={14}
              fill="#01D7A1"
              aria-hidden="true"
            />
            <h5 className="text-[#01D7A1] font-mono text-xs font-semibold">
              ALLOW ({allows.length})
            </h5>
          </div>
          <ul
            className="space-y-1"
            role="list"
            aria-label={`${allows.length} allowed paths`}
          >
            {allows.map((path, index) => (
              <li key={index} className="text-[#888] font-mono text-xs pl-6">
                <span className="text-[#01D7A1]" aria-hidden="true">
                  •
                </span>{' '}
                {path || '<empty>'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function SitemapSection({ sitemaps }: { sitemaps: string[] }) {
  if (sitemaps.length === 0) return null;

  return (
    <section
      className="mt-4 p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg"
      aria-labelledby="sitemaps-header"
    >
      <div className="flex items-center gap-2 mb-3" id="sitemaps-header">
        <IconLink width={14} height={14} fill="#A855F7" aria-hidden="true" />
        <h4 className="text-[#A855F7] font-mono text-sm font-semibold">
          SITEMAPS ({sitemaps.length})
        </h4>
      </div>
      <ul
        className="space-y-2"
        role="list"
        aria-label={`${sitemaps.length} sitemap links`}
      >
        {sitemaps.map((sitemap, index) => (
          <li
            key={index}
            className="text-[#888] font-mono text-xs pl-6 break-all"
          >
            <span className="text-[#A855F7]" aria-hidden="true">
              •
            </span>{' '}
            <a
              href={sitemap}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#60A5FA] hover:text-[#93C5FD] underline transition-fills"
              aria-label={`Open sitemap: ${sitemap}`}
            >
              {sitemap}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-8 text-[#666]" role="status">
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
      <div
        className={`robots-txt-display ${className}`}
        role="region"
        aria-label="Robots.txt content"
      >
        <EmptyState />
      </div>
    );
  }

  return (
    <div
      className={`robots-txt-display max-h-[400px] overflow-y-auto ${className}`}
      role="region"
      aria-label="Robots.txt content"
    >
      {/* Header with stats */}
      <header className="flex items-center justify-between mb-4 pb-2 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <IconFileText
            width={16}
            height={16}
            fill="#D9D9D9"
            aria-hidden="true"
          />
          <h3 className="text-[#D9D9D9] font-mono text-sm font-semibold">
            robots.txt Content
          </h3>
        </div>
        <div
          className="flex gap-3 text-xs"
          role="status"
          aria-label="Content summary"
        >
          {parsed.userAgents.length > 0 && (
            <div className="flex items-center gap-1">
              <IconUser width={12} height={12} fill="#888" aria-hidden="true" />
              <span className="text-[#888]">
                {parsed.userAgents.length} user-agent
                {parsed.userAgents.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
          {parsed.sitemaps.length > 0 && (
            <div className="flex items-center gap-1">
              <IconLink width={12} height={12} fill="#888" aria-hidden="true" />
              <span className="text-[#888]">
                {parsed.sitemaps.length} sitemap
                {parsed.sitemaps.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </header>

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
