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
      className={`
        w-full
        px-4 py-2 
        bg-[#171717] 
        border border-[#222222] 
        text-base 
        text-[#444444]
        rounded-lg
        focus:ring-2 
        focus:ring-[#666666]
        ${className}
      `}
    />
  );
}
