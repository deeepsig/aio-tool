import React from 'react';

interface StatusBadgeProps {
  status: 'processing' | 'completed' | 'error';
  className?: string;
}

export default function StatusBadge({
  status,
  className = '',
}: StatusBadgeProps) {
  const baseClasses =
    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium';

  const variants = {
    processing: {
      bg: '#2A3441',
      text: '#60A5FA',
    },
    completed: {
      bg: '#293733',
      text: '#01D7A1',
    },
    error: {
      bg: '#3D2A2A',
      text: '#F87171',
    },
  };

  const statusLabels = {
    processing: 'Processing',
    completed: 'Completed',
    error: 'Error',
  };

  const variant = variants[status];
  const label = statusLabels[status];

  return (
    <span
      className={`${baseClasses} ${className}`}
      style={{
        backgroundColor: variant.bg,
        color: variant.text,
      }}
    >
      {label}
    </span>
  );
}
