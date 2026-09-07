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
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // High performance cascade: local WebP (33KB) -> local PNG (161KB) -> external CDN
  const sources = [
    EMPRESA.logo,
    EMPRESA.logoPng || '/logo.png',
    EMPRESA.logoExternal || 'https://i.postimg.cc/g2w8yCnJ/file-00000000ab18820eb8ad6adc6b70f20c.png',
  ].filter(Boolean);

  const handleError = () => {
    if (currentSrcIndex < sources.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    }
  };

  const currentSrc = sources[currentSrcIndex] || EMPRESA.logo;

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
        <div className="w-full h-full rounded-full overflow-hidden bg-[#101117] flex items-center justify-center relative border border-white/10">
          {/* Instant placeholder background so it never flashes white or blank */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black flex items-center justify-center text-red-500/80 font-black text-xs">
              <span>M</span>
            </div>
          )}

          <img
            src={currentSrc}
            alt={alt}
            onError={handleError}
            onLoad={() => setIsLoaded(true)}
            decoding="async"
            loading="eager"
            className={`w-full h-full object-cover object-center rounded-full transform transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-90'}`}
            referrerPolicy="no-referrer"
          />

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
