import React, { useState } from 'react';
import { EMPRESA } from '../config';

interface AvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showOnlineDot?: boolean;
  onClick?: () => void;
  alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  className = '',
  showOnlineDot = false,
  onClick,
  alt = EMPRESA.nome,
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    hero: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  return (
    <div
      onClick={onClick}
      className={`relative shrink-0 rounded-full select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* 3D Layered Shadow & Specular Metallic Ring */}
      <div
        className={`rounded-full p-[2px] bg-gradient-to-b from-neutral-600 via-neutral-800 to-black shadow-[0_8px_20px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-transform duration-200 active:scale-95 ${sizeClasses[size]}`}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-neutral-950 flex items-center justify-center relative border border-white/10">
          {!hasError ? (
            <img
              src={EMPRESA.logo}
              alt={alt}
              onError={() => setHasError(true)}
              className="w-full h-full object-cover object-center rounded-full transform transition-transform duration-300 hover:scale-105"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          ) : (
            // Fallback mascot visual if external host blocks referrer
            <div className="w-full h-full bg-gradient-to-br from-red-600 via-neutral-900 to-black flex items-center justify-center text-white font-extrabold text-xs">
              M
            </div>
          )}

          {/* 3D iOS Gloss Highlight */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Online indicator */}
      {showOnlineDot && (
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-neutral-950 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-75" />
        </span>
      )}
    </div>
  );
};
