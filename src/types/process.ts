// src/types/process.ts
import { AnalysisResult } from '@/utils/process-helpers';

export interface ProcessStep {
  id: string;
  title: string;
  status: 'fetching' | 'analyzing' | 'completed' | 'error';
  content?: string;
  error?: string;
  defaultExpanded?: boolean;
  analysisResult?: AnalysisResult;
}

export type ProcessStatus = ProcessStep['status'];
