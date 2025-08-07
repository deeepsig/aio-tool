import React from 'react';
import NavButtons from './nav-buttons';
// import MenuButton from '../ui/buttons/button-menu';
import { useAnalysis } from '@/contexts/analysis-context';

interface NavbarProps {
  onMenuClick?: () => void;
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  const { currentView, setCurrentView, hasAnalysisResult } = useAnalysis();

  return (
    <header
      className={`flex items-center justify-between w-full px-4 ${className}`}
    >
      <NavButtons
        currentView={currentView}
        onViewChange={setCurrentView}
        hasAnalysisResult={hasAnalysisResult}
      />
      {/* <MenuButton onClick={onMenuClick} /> */}
    </header>
  );
}
