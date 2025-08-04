import React from 'react';
import ProcessCard from './process-card';
import IconCheck from '../ui/icons/icon-check';

interface ProcessPanelProps {
  className?: string;
}

export default function ProcessPanel({ className = '' }: ProcessPanelProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-semibold text-base text-[#D9D9D9]">Processes</h3>
      <ProcessCard
        status="completed"
        text="Parsed robots.txt"
        icon={<IconCheck className="w-5 h-5" fill="#01D7A1" />}
      />
    </div>
  );
}
