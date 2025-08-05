import React from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
}

export default function Input({
  value,
  onChange,
  onBlur,
  placeholder = 'http://tryprofound.com',
  className = '',
}: InputProps) {
  return (
    <input
      type="url"
      pattern="https?://.*"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`input ${className}`}
    />
  );
}
