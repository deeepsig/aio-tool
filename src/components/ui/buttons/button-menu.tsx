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
  className = 'cursor-pointer hover:opacity-80',
  iconSize = 24,
  iconFill = '#D9D9D9',
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className}`}
      type="button"
    >
      <IconMenu width={iconSize} height={iconSize} fill={iconFill} />
    </button>
  );
}
