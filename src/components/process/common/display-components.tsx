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
}

export function DisplayContainer({
  children,
  className = '',
}: DisplayContainerProps) {
  return (
    <div
      className={`p-3 bg-[#161616] border border-[#242424] rounded max-h-[200px] overflow-y-auto shadow-sm ${className}`}
    >
      <div className="space-y-0">{children}</div>
    </div>
  );
}
