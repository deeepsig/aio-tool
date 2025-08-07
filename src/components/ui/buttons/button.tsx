import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
export default function Button({
  variant = 'primary',
  children,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseClasses =
    'px-2 py-1 font-medium text-sm rounded transition-all duration-150 ease-in-out';
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
  };
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
