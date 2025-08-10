import React from 'react';
import Button from '../ui/buttons/button';

interface ActionBarProps {
  onCancel?: () => void;
  onStartAnalysis?: () => void;
  startDisabled?: boolean;
  isProcessing?: boolean; // New prop to sync with parent state
}

export default function ActionBar({
  onCancel,
  onStartAnalysis,
  startDisabled = false,
  isProcessing = false,
}: ActionBarProps) {
  const handleStartClick = () => {
    if (startDisabled || isProcessing) return;
    onStartAnalysis?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard navigation within the action bar
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const buttons = Array.from(
        (e.currentTarget as HTMLElement).querySelectorAll(
          'button:not(:disabled)'
        )
      ) as HTMLButtonElement[];

      const currentIndex = buttons.indexOf(e.target as HTMLButtonElement);
      if (currentIndex === -1) return;

      let nextIndex;
      if (e.key === 'ArrowLeft') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
      } else {
        nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
      }

      buttons[nextIndex]?.focus();
      e.preventDefault();
    }
  };

  return (
    <div
      className="flex gap-2 justify-end"
      role="group"
      aria-label="Cancel and Start Buttons"
      onKeyDown={handleKeyDown}
    >
      <Button
        variant="secondary"
        onClick={onCancel}
        style={{ userSelect: 'none' }} // Disable text selection on button content
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={handleStartClick}
        disabled={startDisabled || isProcessing}
        style={{ userSelect: 'none' }} // Disable text selection on button content
        aria-describedby={startDisabled ? 'start-button-disabled' : undefined}
      >
        {isProcessing ? 'Starting...' : 'Start Analysis'}
      </Button>
      {startDisabled && (
        <span id="start-button-disabled" className="sr-only">
          Button disabled: Please enter a valid URL first
        </span>
      )}
    </div>
  );
}
