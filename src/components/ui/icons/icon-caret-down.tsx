import React from 'react';
import { IconProps } from '@/types/icons';

export default function IconCaretDown({
  width = 32,
  height = 32,
  fill = '#D9D9D9',
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
      <path d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z" />
    </svg>
  );
}
