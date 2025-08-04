import React from 'react';

interface IconCheckProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

export default function IconCheck({
  width = 32,
  height = 32,
  fill = '#000000',
  className = '',
}: IconCheckProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
    </svg>
  );
}
