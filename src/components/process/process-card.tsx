import React, { useState } from 'react';
import { ProcessStep } from '@/types/process';
import { STATUS_CONFIG } from '@/config/process-config';
import IconCaretDown from '@/components/ui/icons/icon-caret-down';
import StatusBadge from '@/components/ui/status/status-badge';
import CollapsibleContent from './collapsible-content';

interface ProcessCardProps {
  step: ProcessStep;
  className?: string;
}

export default function ProcessCard({
  step,
  className = '',
}: ProcessCardProps) {
  const [isExpanded, setIsExpanded] = useState(step.defaultExpanded || false);
  const statusConfig = STATUS_CONFIG[step.status];
  const IconComponent = statusConfig.icon;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Auto-expand on error
  React.useEffect(() => {
    if (step.status === 'error') {
      setIsExpanded(true);
    }
  }, [step.status]);

  // Get fallback content based on status
  const getFallbackContent = () => {
    switch (step.status) {
      case 'fetching':
        return 'Fetching...';
      case 'analyzing':
        return 'Analyzing...';
      default:
        return 'deeeps needs moneyy..and friends';
    }
  };

  return (
    <div className={`process-card-glow w-full ${className}`}>
      <div
        className="flex w-full items-center justify-between px-4 py-2 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-3">
          <IconComponent className="w-5 h-5" fill={statusConfig.iconColor} />
          <span className="text-[#D9D9D9] text-sm font-medium">
            {step.title}
          </span>
          <StatusBadge status={step.status} />
        </div>
        <div className="flex items-center">
          <button className="flex items-center justify-center">
            <IconCaretDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="#696969"
            />
          </button>
        </div>
      </div>

      <CollapsibleContent
        isExpanded={isExpanded}
        content={step.content || getFallbackContent()}
        error={step.error}
      />
    </div>
  );
}
