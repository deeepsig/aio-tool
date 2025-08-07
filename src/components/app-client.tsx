// src/components/app-client.tsx
'use client';
import React from 'react';
import Main from './main-card/main';
import Navbar from './navbar/navbar';
import { AnalysisProvider } from '@/contexts/analysis-context';
import QueryProvider from '../providers/query-provider';
import InfoBar from './info/info-bar';

export default function AppClient() {
  return (
    <QueryProvider>
      <AnalysisProvider>
        <Navbar />
        <Main />
        <InfoBar />
      </AnalysisProvider>
    </QueryProvider>
  );
}
