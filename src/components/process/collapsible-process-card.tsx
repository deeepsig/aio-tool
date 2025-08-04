import React, { useState } from 'react';
import IconCaretDown from '../ui/icons/icon-caret-down';
import StatusBadge from '../ui/status/status-badge';

interface CollapsibleProcessCardProps {
  status: 'processing' | 'completed' | 'error';
  text: string;
  icon: React.ReactNode;
  className?: string;
  defaultExpanded?: boolean;
  content: string;
}

export default function CollapsibleProcessCard({
  status,
  text,
  icon,
  className = '',
  defaultExpanded = false,
  content,
}: CollapsibleProcessCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    if (hasContent) {
      setIsExpanded(!isExpanded);
    }
  };

  const renderContent = () => {
    return <div className="content-display text-sm font-mono">{content}</div>;
  };

  // Don't render collapsible section if no content
  const hasContent = content && content.length > 0;

  return (
    <div
      className={`process-card-glow w-full ${!hasContent ? 'no-hover' : ''} ${className}`}
    >
      {/* Main card */}
      <div
        className={`flex w-full items-center justify-between px-4 py-2 ${
          hasContent ? 'cursor-pointer' : 'cursor-default'
        }`}
        onClick={hasContent ? toggleExpanded : undefined}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-[#D9D9D9] text-sm font-medium">{text}</span>
          <StatusBadge status={status} />
        </div>

        {hasContent && (
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
        )}
      </div>

      {/* Collapsible content */}
      {hasContent && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className="px-4 pb-4 pt-2 space-y-2"
            style={{ borderTop: '1px solid #171717' }}
          >
            <h4 className="font-regular text-sm text-[#D9D9D9]">Output</h4>
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
}
