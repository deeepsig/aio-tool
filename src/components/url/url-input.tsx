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

  // Handle label click to focus input (guideline: "Clicking the input label should focus the input field")
  const handleLabelClick = () => {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      inputElement.focus();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <h3
        id={labelId}
        className="font-medium text-base text-[#D9D9D9] cursor-pointer select-none"
        onClick={handleLabelClick}
        style={{ userSelect: 'none' }} // Disable text selection on label
      >
        Endpoint
      </h3>
      <div className="relative">
        <Input
          id={inputId}
          value={url}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-labelledby={labelId}
          aria-describedby={errorId}
          aria-invalid={!!error}
          autoComplete="off"
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
      {error && (
        <p id={errorId} className="pl-1 text-sm text-[#F87171]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
