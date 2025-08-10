// src/components/process/process-card.tsx
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
        return 'Process pending...';
    }
  };

  // Get animation class based on status
  const getIconAnimationClass = () => {
    switch (step.status) {
      case 'fetching':
      case 'analyzing':
        return 'icon-spinner';
      case 'completed':
        return 'icon-check';
      case 'error':
        return 'icon-error';
      default:
        return '';
    }
  };

  // Get status description for screen readers
  const getStatusDescription = () => {
    switch (step.status) {
      case 'fetching':
        return 'In progress - fetching data';
      case 'analyzing':
        return 'In progress - analyzing data';
      case 'completed':
        return 'Completed successfully';
      case 'error':
        return 'Error occurred';
      default:
        return 'Pending';
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpanded();
    }
  };

  const contentId = `process-content-${step.id}`;

  return (
    <div
      className={`process-card-container w-full ${isExpanded ? 'process-card-expanded' : 'process-card-collapsed'} ${className}`}
    >
      {/* Clickable header area - interactive process indicator */}
      <div
        className="process-card-header flex w-full items-center justify-between px-4 py-2"
        onClick={toggleExpanded}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onKeyDown={handleKeyDown}
        aria-label={`${step.title} - ${getStatusDescription()}. Click to ${isExpanded ? 'collapse' : 'expand'} details.`}
        style={{
          userSelect: 'none', // Disable text selection on interactive header
          cursor: 'pointer',
        }}
      >
        <div className="flex items-center gap-3">
          <IconComponent
            className={`w-4 h-4 icon ${getIconAnimationClass()}`}
            fill={statusConfig.iconColor}
            aria-hidden="true"
          />
          <span
            className="text-[#D9D9D9] text-sm font-medium"
            style={{ userSelect: 'none' }} // Process title shouldn't be selectable
          >
            {step.title}
            {step.titleSecondary && (
              <span
                className="text-[#c0c0c0]/75 font-light"
                style={{ userSelect: 'none' }}
              >
                {' '}
                {step.titleSecondary}
              </span>
            )}
          </span>
          <div className="pointer-events-none">
            {/* Prevent badge from hijacking events */}
            <StatusBadge status={step.status} />
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center justify-center p-1 pointer-events-none">
            {/* Decorative caret shouldn't hijack events */}
            <IconCaretDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="#696969"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <CollapsibleContent
        id={contentId}
        isExpanded={isExpanded}
        content={step.content || getFallbackContent()}
        error={step.error}
        stepId={step.id}
        analysisResult={step.analysisResult}
      />
    </div>
  );
}
