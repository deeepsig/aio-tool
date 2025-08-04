import React, { useState } from 'react';
import IconCaretDown from '../ui/icons/icon-caret-down';
import StatusBadge from '../ui/status/status-badge';
import CollapsibleContent from './collapsible-content';

interface CollapsibleProcessCardProps {
  status: 'processing' | 'completed' | 'error';
  text: string;
  icon: React.ReactNode;
  className?: string;
  defaultExpanded?: boolean;
  content?: string;
  title?: string;
}

export default function CollapsibleProcessCard({
  status,
  text,
  icon,
  className = '',
  defaultExpanded = false,
  content = 'Processing tool call...',
  title,
}: CollapsibleProcessCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`process-card-glow w-full ${className}`}>
      {/* Main card */}
      <div
        className="flex w-full items-center justify-between px-4 py-2 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-[#D9D9D9] text-sm font-medium">{text}</span>
          <StatusBadge status={status} />
        </div>

        <div className="flex items-center">
          <button className="flex items-center justify-center">
            <IconCaretDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="#696969"
            />
          </button>
        </div>
      </div>

      {/* Collapsible content - always present */}
      <CollapsibleContent
        isExpanded={isExpanded}
        content={content}
        title={title}
      />
    </div>
  );
}
