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
  const inputId = 'url-input';
  const labelId = 'url-label';
  const errorId = error ? 'url-error' : undefined;

  return (
    <div className={`space-y-2 ${className}`}>
      <h3 id={labelId} className="font-medium text-base text-[#D9D9D9]">
        Endpoint
      </h3>
      <Input
        id={inputId}
        value={url}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-labelledby={labelId}
        aria-describedby={errorId}
        aria-invalid={!!error}
      />
      {error && (
        <p id={errorId} className="pl-1 text-sm text-[#F87171]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
