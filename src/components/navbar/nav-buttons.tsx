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
}

function NavButton({
  children,
  onClick,
  disabled = false,
  active = false,
}: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer hover:opacity-80 transition-all duration-150 hover:bg-white/5 rounded hover:px-2 hover:py-1 hover:-mx-1 hover:-my-1 text-sm font-medium text-[#ededed] disabled:opacity-50 disabled:cursor-not-allowed ${
        active ? 'bg-white/10 px-2 py-1 -mx-1 -my-1' : ''
      }`}
      type="button"
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
    <div className={`flex gap-4 ${className}`}>
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
      >
        Recommendations
      </NavButton>
    </div>
  );
}
