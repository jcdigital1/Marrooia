import React from 'react';

interface VerifiedBadgeProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const checkSizeMap = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-[#0084FF] via-[#1DA1F2] to-[#38BDF8] text-white shadow-[0_0_12px_rgba(29,161,242,0.7),inset_0_1px_1.5px_rgba(255,255,255,0.7)] shrink-0 select-none transform hover:scale-110 transition-transform ${sizeMap[size]} ${className}`}
      title="Empresa Verificada Oficial - MARROOIA"
    >
      <svg
        className={`${checkSizeMap[size]} fill-none stroke-white stroke-[3.2] stroke-linecap-round stroke-linejoin-round drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]`}
        viewBox="0 0 24 24"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
};
