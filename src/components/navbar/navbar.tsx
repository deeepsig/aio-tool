// src/components/navbar/navbar.tsx
import React from 'react';
import NavButtons from './nav-buttons';
import MenuButton from '../ui/buttons/button-menu';
import { useAnalysis } from '@/contexts/analysis-context';

interface NavbarProps {
  onMenuClick?: () => void;
  className?: string;
}

export default function Navbar({ onMenuClick, className = '' }: NavbarProps) {
  const { currentView, setCurrentView, hasAnalysisResult } = useAnalysis();

  return (
    <div
      className={`flex items-center justify-between w-full px-2 ${className}`}
    >
      <NavButtons
        currentView={currentView}
        onViewChange={setCurrentView}
        hasAnalysisResult={hasAnalysisResult}
      />
      <MenuButton onClick={onMenuClick} />
    </div>
  );
}
