// NavButtons.tsx
import { ViewType } from '@/contexts/analysis-context';
import React from 'react';

interface NavButtonsProps {
  className?: string;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  hasAnalysisResult: boolean;
}

interface NavButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  'aria-label'?: string;
}

function NavButton({
  children,
  onClick,
  disabled = false,
  active = false,
  'aria-label': ariaLabel,
}: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        cursor-pointer 
        transition-all duration-100 ease-in-out
        rounded 
        text-sm 
        disabled:opacity-40 
        disabled:cursor-not-allowed 
        hover:opacity-80 
        hover:bg-white/8
        hover:px-2 hover:py-1
        hover:-mx-2 hover:-my-1
        ${active ? 'font-medium text-[#ededed]' : 'font-light text-[#ededed]/80'}
      `}
      type="button"
      aria-current={active ? 'page' : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
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
