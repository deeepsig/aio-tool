import React from 'react';
import IconMenu from '../icons/icon-menu';

interface MenuButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  iconSize?: number;
  iconFill?: string;
}

export default function MenuButton({
  onClick,
  disabled = false,
  className = '',
  iconSize = 24,
  iconFill = '#D9D9D9',
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer hover:opacity-80 transition-all duration-150 hover:bg-white/5 rounded hover:p-1 hover:-m-1 group ${className}`}
      type="button"
    >
      <IconMenu
        width={iconSize}
        height={iconSize}
        fill={iconFill}
        className="group-hover:fill-white"
      />
    </button>
  );
}
