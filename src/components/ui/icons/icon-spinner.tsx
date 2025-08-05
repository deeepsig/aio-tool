import React from 'react';
import { IconProps } from '@/types/icons';

export default function IconSpinner({
  width = 32,
  height = 32,
  fill = '#000000',
  className = '',
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M236,128a108,108,0,0,1-216,0c0-42.52,24.73-81.34,63-98.87a12,12,0,1,1,10,21.82C67.15,63.19,44,94.15,44,128a84,84,0,0,0,168,0c0-33.85-23.15-64.81-49-77.05a12,12,0,1,1,10-21.82C211.27,46.66,236,85.48,236,128Z" />
    </svg>
  );
}
