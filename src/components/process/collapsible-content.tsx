import React from 'react';

interface CollapsibleContentProps {
  isExpanded: boolean;
  content: string;
  title?: string;
  className?: string;
}

export default function CollapsibleContent({
  isExpanded,
  content,
  title,
  className = '',
}: CollapsibleContentProps) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      } ${className}`}
    >
      <div
        className="px-4 pb-4 pt-2 space-y-2"
        style={{ borderTop: '1px solid #171717' }}
      >
        {title && (
          <h4 className="font-regular text-sm text-[#D9D9D9]">{title}</h4>
        )}
        <div className="content-display text-sm font-mono">{content}</div>
      </div>
    </div>
  );
}
