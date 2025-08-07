// src/components/process/common/display-components.tsx
import React from 'react';

interface ItemListProps {
  items: string[];
  columns?: 1 | 2;
  emptyText?: string;
}

export function ItemList({
  items,
  columns = 2,
  emptyText = '<empty>',
}: ItemListProps) {
  const gridClass = columns === 1 ? '' : 'grid grid-cols-2 gap-x-0 gap-y-0';

  return (
    <div className="flex-1 min-w-0">
      <div className={gridClass}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`text-[#D9D9D9] font-sans text-sm ${columns === 1 ? 'truncate' : ''}`}
          >
            {item || emptyText}
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
  displayMode?: 'grid' | 'list';
  emptyText?: string;
}

export function Section({
  label,
  value,
  count,
  displayMode = 'grid',
  emptyText = '<empty>',
}: SectionProps) {
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
          <ItemList
            items={value}
            columns={displayMode === 'list' ? 1 : 2}
            emptyText={emptyText}
          />
        ) : (
          <div className="flex-1 min-w-0">
            <div className="text-[#D9D9D9] font-sans text-sm truncate">
              {value}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="text-center text-[#666]">
      <div className="text-sm font-sans">{title}</div>
      <div className="text-xs mt-1">{description}</div>
    </div>
  );
}

interface DisplayContainerProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: 'sm' | 'md' | 'lg';
}

export function DisplayContainer({
  children,
  className = '',
  maxHeight = 'sm',
}: DisplayContainerProps) {
  const heightClass = {
    sm: 'max-h-[200px]',
    md: 'max-h-[300px]',
    lg: 'max-h-[400px]',
  }[maxHeight];

  return (
    <div
      className={`p-3 bg-[#161616] border border-[#242424] rounded ${heightClass} overflow-y-auto shadow-sm scrollbar-thin scrollbar-thumb-[#404040] scrollbar-track-transparent hover:scrollbar-thumb-[#505050] ${className}`}
    >
      <div className="space-y-0">{children}</div>
    </div>
  );
}

interface ScoreDisplayProps {
  label: string;
  score: number;
  unit?: string;
  description?: string;
  scoreColor?: string;
}

export function ScoreDisplay({
  label,
  score,
  unit = '%',
  description,
  scoreColor = '#01D7A1',
}: ScoreDisplayProps) {
  return (
    <div className="border-b border-[#2a2a2a] py-2">
      <div className="flex justify-between items-center">
        <div className="text-[#98979A] text-base">{label}</div>
        <div className="text-base font-semibold" style={{ color: scoreColor }}>
          {score}
          {unit}
        </div>
      </div>
      {description && (
        <div className="text-[#D9D9D9] text-sm my-1">{description}</div>
      )}
    </div>
  );
}

interface RecommendationItemProps {
  text: string;
  code?: string;
}

export function RecommendationItem({ text, code }: RecommendationItemProps) {
  return (
    <div className="flex">
      {/* 4px dash line */}
      <div
        className="w-6 bg-[#444444] mr-3 mt-2 flex-shrink-0"
        style={{ height: '1px' }}
      ></div>

      <div className="flex-1">
        <div className="text-[#D9D9D9] text-sm">{text}</div>
        {code && (
          <div className="mt-1 mb-1">
            <div className="text-[#98979A] text-sm pb-1">example-</div>
            <pre className="bg-[#1a1a1a] p-2 text-[#98979A] font-mono text-sm whitespace-pre-wrap">
              {code}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

interface RecommendationSectionProps {
  title: string;
  children: React.ReactNode;
}

export function RecommendationSection({
  title,
  children,
}: RecommendationSectionProps) {
  return (
    <div className="py-2">
      <div className="text-[#98979A] text-base mb-1">{title}</div>
      <div className="space-y-1 pl-2 pt-1">{children}</div>
    </div>
  );
}
