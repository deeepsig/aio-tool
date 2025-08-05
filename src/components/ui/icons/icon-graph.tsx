import React from 'react';
import { IconProps } from '@/types/icons';

export default function IconGraph({
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
      <path d="M244,128a12,12,0,0,1-12,12H207.41l-35.67,71.35A12,12,0,0,1,160,220h-.6a12,12,0,0,1-10.62-7.71L94.03,66.14,65.42,129.47A12,12,0,0,1,56,136H24a12,12,0,0,1,0-24H48.77L83.58,40.53a12,12,0,0,1,22.14.69l54.25,142.64,28.44-56.86A12,12,0,0,1,200,120h32A12,12,0,0,1,244,128Z" />
    </svg>
  );
}
