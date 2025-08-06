import React from 'react';

interface NavButtonsProps {
  className?: string;
}

interface NavButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function NavButton({ children, onClick, disabled = false }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer hover:opacity-80 transition-all duration-150 hover:bg-white/5 rounded hover:px-2 hover:py-1 hover:-mx-1 hover:-my-1 text-sm font-medium text-[#ededed] disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
    >
      {children}
    </button>
  );
}

export default function NavButtons({ className = '' }: NavButtonsProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <NavButton>Home</NavButton>
      <NavButton>Recommendations</NavButton>
    </div>
  );
}
