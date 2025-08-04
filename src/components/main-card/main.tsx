'use client';

import React, { useState } from 'react';
import UrlInput from '../url/url-input';

export default function Main() {
  const [url, setUrl] = useState('');

  return (
    <div className="inner-box space-y-[14px]">
      <UrlInput url={url} onChange={setUrl} />
    </div>
  );
}
