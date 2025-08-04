import React from 'react';
import Count from './count';
import MenuButton from '../ui/buttons/button-menu';

interface InfoPanelProps {
  text?: string;
  count?: number;
  onMenuClick?: () => void;
  className?: string;
}

export default function InfoPanel({
  text,
  count,
  onMenuClick,
  className = '',
}: InfoPanelProps) {
  return (
    <div
      className={`flex items-center justify-between w-full px-2 ${className}`}
    >
      <Count text={text} count={count} />
      <MenuButton onClick={onMenuClick} />
    </div>
  );
}
