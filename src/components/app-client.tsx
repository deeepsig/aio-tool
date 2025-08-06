'use client';
import React from 'react';
import Main from './main-card/main';
import Navbar from './navbar/navbar';
import { AnalysisProvider } from '@/contexts/analysis-context';

export default function AppClient() {
  return (
    <AnalysisProvider>
      <Main />
      <Navbar />
    </AnalysisProvider>
  );
}
