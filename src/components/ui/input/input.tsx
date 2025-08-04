import React from 'react';

interface InputProps {
  url: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Input({
  url,
  onChange,
  placeholder = 'https://reddit.com',
  className = '',
}: InputProps) {
  return (
    <input
      type="url"
      value={url}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`input ${className}`}
    />
  );
}
