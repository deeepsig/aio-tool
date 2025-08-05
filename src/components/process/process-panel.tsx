// src/components/process/process-panel.tsx
import React from 'react';
import { ProcessStep } from '@/types/process';
import ProcessCard from './process-card';

interface ProcessPanelProps {
  steps: ProcessStep[];
  className?: string;
}

export default function ProcessPanel({
  steps,
  className = '',
}: ProcessPanelProps) {
  // Only show panel if there are steps to display
  if (steps.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-semibold text-base text-[#D9D9D9]">Processes</h3>
      <div className="space-y-2">
        {steps.map((step) => (
          <ProcessCard key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}
