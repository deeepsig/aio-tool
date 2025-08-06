'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnalysisResult } from '@/utils/process-helpers';

export type ViewType = 'home' | 'recommendations';

interface AnalysisContextType {
  // View state
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;

  // Analysis state
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  hasAnalysisResult: boolean;

  // URL state (if you want to share it)
  url: string;
  setUrl: (url: string) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined
);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [url, setUrl] = useState('');

  const hasAnalysisResult = analysisResult !== null && !analysisResult?.isEmpty;

  const value: AnalysisContextType = {
    currentView,
    setCurrentView,
    analysisResult,
    setAnalysisResult,
    hasAnalysisResult,
    url,
    setUrl,
  };

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
