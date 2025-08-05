// src/components/process/collapsible-content.tsx
import React from 'react';

interface CollapsibleContentProps {
  isExpanded: boolean;
  content: string;
  error?: string;
  className?: string;
}

export default function CollapsibleContent({
  isExpanded,
  content,
  error,
  className = '',
}: CollapsibleContentProps) {
  const displayContent = error || content;

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      } ${className}`}
    >
      <div
        className="px-4 pb-4 pt-2"
        style={{ borderTop: '1px solid #222222' }}
      >
        <div
          className={`content-display text-xs font-mono ${error ? 'text-red-400' : ''}`}
        >
          {displayContent}
        </div>
      </div>
    </div>
  );
}
