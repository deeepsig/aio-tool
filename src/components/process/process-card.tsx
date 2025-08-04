import React from 'react';
import IconCaretDown from '../ui/icons/icon-caret-down';
import StatusBadge from '../ui/status/status-badge';

interface ProcessCardProps {
  status: 'processing' | 'completed' | 'error';
  text: string;
  icon: React.ReactNode;
  className?: string;
}

export default function ProcessCard({
  status,
  text,
  icon,
  className = '',
}: ProcessCardProps) {
  return (
    <div
      className={`flex w-full items-center justify-between px-4 py-2 rounded-lg ${className}`}
      style={{ backgroundColor: '#232323' }}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[#D9D9D9] text-sm font-medium">{text}</span>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center">
        <button className="flex items-center justify-center">
          <IconCaretDown className="w-4 h-4" fill="#696969" />
        </button>
      </div>
    </div>
  );
}
