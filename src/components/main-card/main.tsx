'use client';

import React, { useState } from 'react';
import UrlInput from '../url/url-input';
import ActionBar from '../action-bar/action-bar';
import ProcessPanel from '../process/process-panel';

export default function Main() {
  const [url, setUrl] = useState('');

  const handleCancel = () => {
    setUrl('');
  };

  const handleStartAnalysis = () => {
    console.log('Starting analysis for:', url);
  };

  return (
    <div className="inner-box space-y-[14px]">
      <UrlInput url={url} onChange={setUrl} />
      <ProcessPanel />
      <div className="flex justify-end">
        <ActionBar
          onCancel={handleCancel}
          onStartAnalysis={handleStartAnalysis}
        />
      </div>
    </div>
  );
}
