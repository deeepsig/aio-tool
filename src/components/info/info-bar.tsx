import React from 'react';
import MenuButton from '../ui/buttons/button-menu';
import ViewCount from './viewcount';

interface InfoProps {
  className?: string;
}

export default function InfoBar({ className = '' }: InfoProps) {
  return (
    <header
      className={`flex items-center justify-between w-full px-4 ${className}`}
    >
      <ViewCount />
      <MenuButton />
    </header>
  );
}
