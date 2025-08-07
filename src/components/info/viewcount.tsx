import React from 'react';
import IconGraph from '../ui/icons/icon-graph';

interface ViewCountProps {
  text?: string;
  count?: number;
  className?: string;
}

export default function ViewCount({
  text = 'Total Sites Analyzed',
  count = 35958,
  className = '',
}: ViewCountProps) {
  return (
    <div
      className={`flex items-center gap-2 text-base px-2 py-1 -mx-2 -my-1 ${className}`}
    >
      <IconGraph width={20} height={20} fill="#696969" />
      <span className="text-[#696969] font-medium">{text}</span>
      <data value={count} className="text-[#D9D9D9] font-bold">
        {count.toLocaleString()}
      </data>
    </div>
  );
}
