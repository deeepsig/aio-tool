import React from 'react';

interface InputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  autoComplete?: string;
  spellCheck?: boolean;
  autoCorrect?: string;
  autoCapitalize?: string;
}

export default function Input({
  id,
  value,
  onChange,
  onBlur,
  placeholder = 'https://tryprofound.com',
  className = '',
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  autoComplete = 'off',
  spellCheck = false,
  autoCorrect = 'off',
  autoCapitalize = 'off',
}: InputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enable form submission by pressing Enter (when wrapped in a form)
    if (e.key === 'Enter') {
      const form = (e.target as HTMLInputElement).form;
      if (form) {
        form.dispatchEvent(
          new Event('submit', { bubbles: true, cancelable: true })
        );
      }
    }
  };

  return (
    <input
      id={id}
      type="url"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={`input ${className}`}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-invalid={ariaInvalid}
      autoComplete={autoComplete}
      spellCheck={spellCheck}
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
      style={{
        WebkitTextSizeAdjust: '100%', // Prevent text resizing on iOS landscape
      }}
    />
  );
}
