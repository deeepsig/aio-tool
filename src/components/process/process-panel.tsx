import React from 'react';
import CollapsibleProcessCard from './collapsible-process-card';
import IconCheck from '../ui/icons/icon-check';
import { RobotsTxtResult } from '@/utils/robots';

interface ProcessPanelProps {
  className?: string;
  isAnalyzing?: boolean;
  robotsResult?: RobotsTxtResult | null;
}

export default function ProcessPanel({
  className = '',
  isAnalyzing = false,
  robotsResult = null,
}: ProcessPanelProps) {
  // Determine the status and content based on current state
  const getProcessStatus = () => {
    if (isAnalyzing) {
      return {
        status: 'processing' as const,
        text: 'Fetching robots.txt...',
        content: 'Requesting robots.txt file from the specified domain...',
        defaultExpanded: false,
      };
    }

    if (robotsResult) {
      if (robotsResult.success) {
        return {
          status: 'completed' as const,
          text: 'Parsed robots.txt',
          content: robotsResult.content || 'No content available',
          defaultExpanded: false,
        };
      } else {
        return {
          status: 'error' as const,
          text: 'Failed to fetch robots.txt',
          content: `Error: ${robotsResult.error}\n\nTried to fetch from: ${robotsResult.url}`,
          defaultExpanded: true,
        };
      }
    }

    // This should never happen since ProcessPanel only renders after analysis starts
    return {
      status: 'processing' as const,
      text: 'Starting analysis...',
      content: 'Initializing...',
      defaultExpanded: true,
    };
  };

  const processState = getProcessStatus();

  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-semibold text-base text-[#D9D9D9]">Processes</h3>
      <CollapsibleProcessCard
        status={processState.status}
        text={processState.text}
        icon={<IconCheck className="w-5 h-5" fill="#01D7A1" />}
        content={processState.content}
        defaultExpanded={processState.defaultExpanded}
        title={robotsResult?.success ? `Output` : undefined}
      />
    </div>
  );
}
