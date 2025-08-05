import React from 'react';
import { ProcessStatus } from '@/types/process';
import { STATUS_CONFIG } from '@/config/process-config';

interface StatusBadgeProps {
  status: ProcessStatus;
  className?: string;
}

export default function StatusBadge({
  status,
  className = '',
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}
      style={{
        backgroundColor: config.badge.bg,
        color: config.badge.text,
      }}
    >
      {config.label}
    </span>
  );
}
