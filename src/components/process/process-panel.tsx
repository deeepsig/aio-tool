import React from 'react';
import CollapsibleProcessCard from './collapsible-process-card'; // Updated import
import IconCheck from '../ui/icons/icon-check';

interface ProcessPanelProps {
  className?: string;
}

export default function ProcessPanel({ className = '' }: ProcessPanelProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-semibold text-base text-[#D9D9D9]">Processes</h3>
      <CollapsibleProcessCard
        status="completed"
        text="Parsed robots.txt"
        icon={<IconCheck className="w-5 h-5" fill="#01D7A1" />}
        content="User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /public/

Sitemap: https://example.com/sitemap.xml"
        defaultExpanded={false}
      />
    </div>
  );
}
