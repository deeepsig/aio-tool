import React from 'react';
import NavButtons from './nav-buttons';
import MenuButton from '../ui/buttons/button-menu';

interface NavbarProps {
  onMenuClick?: () => void;
  className?: string;
}

export default function Navbar({ onMenuClick, className = '' }: NavbarProps) {
  return (
    <div
      className={`flex items-center justify-between w-full px-2 ${className}`}
    >
      <NavButtons />
      <MenuButton onClick={onMenuClick} />
    </div>
  );
}
