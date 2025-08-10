import { ProcessStep } from '@/types/process';
import IconCheck from '@/components/ui/icons/icon-check';
import IconSpinner from '@/components/ui/icons/icon-spinner';
import IconXCircle from '@/components/ui/icons/icon-x-circle';

export const PROCESS_STEPS: Record<
  string,
  Omit<ProcessStep, 'status' | 'content'>
> = {
  FETCH_ROBOTS: {
    id: 'fetch-robots',
    title: 'Fetch',
    titleSecondary: 'robots.txt',
    defaultExpanded: false,
  },
  ANALYZE_ROBOTS: {
    id: 'analyze-robots',
    title: 'Analyze',
    titleSecondary: 'blocked bots',
    defaultExpanded: false,
  },
};

export const STATUS_CONFIG = {
  fetching: {
    icon: IconSpinner,
    label: 'Fetching',
    badge: { bg: '#2A3441', text: '#60A5FA' },
    iconColor: '#60A5FA',
    // Additional properties for better UX
    ariaLabel: 'Fetching data in progress',
    description: 'Currently retrieving robots.txt file',
  },
  analyzing: {
    icon: IconSpinner,
    label: 'Analyzing',
    badge: { bg: '#2A3441', text: '#60A5FA' },
    iconColor: '#60A5FA',
    ariaLabel: 'Analysis in progress',
    description: 'Currently analyzing robots.txt content',
  },
  completed: {
    icon: IconCheck,
    label: 'Completed',
    badge: { bg: '#293733', text: '#01D7A1' },
    iconColor: '#01D7A1',
    ariaLabel: 'Process completed successfully',
    description: 'Analysis has been completed',
  },
  error: {
    icon: IconXCircle,
    label: 'Error',
    badge: { bg: '#3D2A2A', text: '#F87171' },
    iconColor: '#F87171',
    ariaLabel: 'An error occurred',
    description: 'Process failed with an error',
  },
  pending: {
    icon: IconSpinner, // or a different icon for pending state
    label: 'Pending',
    badge: { bg: '#2A2A2A', text: '#888888' },
    iconColor: '#888888',
    ariaLabel: 'Process is pending',
    description: 'Waiting to start process',
  },
} as const;
