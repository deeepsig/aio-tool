import React from 'react';
import { IconProps } from '@/types/icons';

export default function IconXCircle({
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
      <path d="M168.49,104.49,142,131l26.49,26.51a12,12,0,0,1-17,17L125,148l-26.51,26.49a12,12,0,0,1-17-17L107,131,80.49,104.49a12,12,0,0,1,17-17L124,114l26.51-26.49a12,12,0,0,1,17,17ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z" />
    </svg>
  );
}
