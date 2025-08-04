import React from 'react';
import Button from '../ui/buttons/button';

interface ActionBarProps {
  onCancel?: () => void;
  onStartAnalysis?: () => void;
  startDisabled?: boolean;
}

export default function ActionBar({
  onCancel,
  onStartAnalysis,
  startDisabled = false,
}: ActionBarProps) {
  return (
    <div className="flex gap-2 justify-end">
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={onStartAnalysis}
        disabled={startDisabled}
      >
        Start Analysis
      </Button>
    </div>
  );
}
