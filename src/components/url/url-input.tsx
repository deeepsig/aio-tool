import React from 'react';
import Input from '../ui/input/input';

interface UrlInputProps {
  url: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

export default function UrlInput({
  url,
  onChange,
  onBlur,
  error,
  placeholder,
  className = '',
}: UrlInputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-semibold text-base text-[#D9D9D9]">Endpoint</h3>
      <Input
        value={url}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <p className="pl-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
