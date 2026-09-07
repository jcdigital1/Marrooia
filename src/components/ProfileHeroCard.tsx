import React from 'react';
import { Sparkles } from 'lucide-react';
import { EMPRESA } from '../config';
import { Avatar } from './Avatar';
import { VerifiedBadge } from './VerifiedBadge';

interface ProfileHeroCardProps {
  onOpenProfileModal: () => void;
}

export const ProfileHeroCard: React.FC<ProfileHeroCardProps> = ({
  onOpenProfileModal,
}) => {
  return (
    <div className="mb-4 pt-2 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
      {/* 3D Circular Avatar Hero */}
      <div 
        onClick={onOpenProfileModal}
        className="group relative cursor-pointer"
        title="Toque para ver o perfil oficial da MARROOIA"
      >
        <Avatar size="hero" showOnlineDot={true} />
        
        {/* Floating 3D Blue Verified Badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-neutral-900/95 backdrop-blur-md text-sky-400 border border-sky-500/50 shadow-[0_4px_16px_rgba(29,161,242,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] px-3 py-0.5 rounded-full flex items-center gap-1.5 text-[10.5px] font-black uppercase tracking-wider whitespace-nowrap group-hover:scale-105 transition-transform">
          <VerifiedBadge size="xs" />
          <span>Verificado Oficial</span>
        </div>
      </div>

      {/* Title with Blue Verified Badge and White Typography */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Outfit',sans-serif] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            {EMPRESA.nome}
          </h1>
          <VerifiedBadge size="md" />
        </div>
        <p className="text-xs font-extrabold text-red-400 tracking-wider uppercase flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-red-400" />
          <span>{EMPRESA.descricao}</span>
        </p>
        <p className="text-[12.5px] text-neutral-300 max-w-xs font-medium leading-tight">
          Residencial & Comercial • Limpeza de Placas Solar
        </p>
      </div>
    </div>
  );
};

