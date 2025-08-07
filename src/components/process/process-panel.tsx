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
    <section
      className={`space-y-2 ${className}`}
      aria-labelledby="processes-heading"
    >
      <h3
        id="processes-heading"
        className="font-medium text-base text-[#D9D9D9]"
      >
        Processes
      </h3>
      <div
        className="space-y-2"
        role="list"
        aria-label="Analysis process steps"
      >
        {steps.map((step) => (
          <div key={step.id} role="listitem">
            <ProcessCard step={step} />
          </div>
        ))}
      </div>
    </section>
  );
}
