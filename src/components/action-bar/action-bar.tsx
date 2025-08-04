import React from 'react';
import Button from '../ui/buttons/button';

interface ActionBarProps {
  onCancel?: () => void;
  onStartAnalysis?: () => void;
  className?: string;
}

export default function ActionBar({
  onCancel,
  onStartAnalysis,
  className = '',
}: ActionBarProps) {
  return (
    <div className={`flex gap-2 justify-end ${className}`}>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onStartAnalysis} disabled={false}>
        Start Analysis
      </Button>
    </div>
  );
}
