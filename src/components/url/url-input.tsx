import React from 'react';
import Input from '../ui/input/input';

interface UrlInputProps {
  url: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function UrlInput({
  url,
  onChange,
  placeholder,
  className = '',
}: UrlInputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-semibold text-base text-[#D9D9D9]">Endpoint</h3>
      <Input url={url} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
