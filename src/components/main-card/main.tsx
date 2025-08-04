'use client';

import { isValidUrl } from '@/utils/validation';
import React, { useState, useCallback } from 'react';
import ActionBar from '../action-bar/action-bar';
import ProcessPanel from '../process/process-panel';
import UrlInput from '../url/url-input';

export default function Main() {
  const [url, setUrl] = useState('');
  const [touched, setTouched] = useState(false);

  const valid = isValidUrl(url);
  const errorMessage =
    touched && !valid
      ? 'Please enter a valid URL (e.g. https://reddit.com).'
      : undefined;

  const handleCancel = () => {
    setUrl('');
    setTouched(false);
  };

  const handleStartAnalysis = () => {
    console.log('Starting analysis for:', url);
  };

  const handleBlur = useCallback(() => setTouched(true), []);

  return (
    <div className="inner-box space-y-[14px]">
      <UrlInput
        url={url}
        onChange={setUrl}
        onBlur={handleBlur}
        error={errorMessage}
      />

      <ProcessPanel />

      <div className="flex justify-end">
        <ActionBar
          onCancel={handleCancel}
          onStartAnalysis={handleStartAnalysis}
          startDisabled={!valid}
        />
      </div>
    </div>
  );
}
