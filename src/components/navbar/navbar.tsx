import React from 'react';
import ViewCount from './viewcount';
import MenuButton from '../ui/buttons/button-menu';

interface NavbarProps {
  text?: string;
  count?: number;
  onMenuClick?: () => void;
  className?: string;
}

export default function Navbar({
  text,
  count,
  onMenuClick,
  className = '',
}: NavbarProps) {
  return (
    <div
      className={`flex items-center justify-between w-full px-2 ${className}`}
    >
      <ViewCount text={text} count={count} />
      <MenuButton onClick={onMenuClick} />
    </div>
  );
}
