'use client';

import React, { useState } from 'react';
import UrlInput from '../url-input/url-input';

export default function Main() {
  const [url, setUrl] = useState('');

  return (
    <div className="inner-box">
      <div className="">
        <UrlInput url={url} onChange={setUrl} />
      </div>
    </div>
  );
}
