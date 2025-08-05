// src/types/process.ts
export interface ProcessStep {
  id: string;
  title: string;
  status: 'fetching' | 'analyzing' | 'completed' | 'error';
  content?: string;
  error?: string;
  defaultExpanded?: boolean;
}

export type ProcessStatus = ProcessStep['status'];
