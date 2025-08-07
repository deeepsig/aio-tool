// NavButtons.tsx
import { ViewType } from '@/contexts/analysis-context';
import React from 'react';
import NavButton from '../ui/buttons/button-nav';

interface NavButtonsProps {
  className?: string;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  hasAnalysisResult: boolean;
}

export default function NavButtons({
  className = '',
  currentView,
  onViewChange,
  hasAnalysisResult,
}: NavButtonsProps) {
  return (
    <nav
      className={`flex gap-4 ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <NavButton
        onClick={() => onViewChange('home')}
        active={currentView === 'home'}
      >
        Home
      </NavButton>
      <NavButton
        onClick={() => onViewChange('recommendations')}
        disabled={!hasAnalysisResult}
        active={currentView === 'recommendations'}
        aria-label={
          !hasAnalysisResult
            ? 'Recommendations (requires completed analysis)'
            : undefined
        }
      >
        Recommendations
      </NavButton>
    </nav>
  );
}
