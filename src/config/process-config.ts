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
  },
  analyzing: {
    icon: IconSpinner,
    label: 'Analyzing',
    badge: { bg: '#2A3441', text: '#60A5FA' },
    iconColor: '#60A5FA',
  },
  completed: {
    icon: IconCheck,
    label: 'Completed',
    badge: { bg: '#293733', text: '#01D7A1' },
    iconColor: '#01D7A1',
  },
  error: {
    icon: IconXCircle,
    label: 'Error',
    badge: { bg: '#3D2A2A', text: '#F87171' },
    iconColor: '#F87171',
  },
} as const;
