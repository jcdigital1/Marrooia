import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { EMPRESA } from '../config';
import { Avatar } from './Avatar';

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
        title="Toque para ver o perfil completo da MARROOOIA"
      >
        <Avatar size="hero" showOnlineDot={true} />
        
        {/* Floating 3D Badge */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-neutral-900/90 backdrop-blur-md text-white border border-red-500/60 shadow-[0_4px_12px_rgba(220,38,38,0.35)] px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[10px] font-black uppercase tracking-wider whitespace-nowrap group-hover:scale-105 transition-transform">
          <Award className="w-3 h-3 text-red-500" />
          <span>Verificado</span>
        </div>
      </div>

      {/* Title and Slogan */}
      <div className="mt-3.5 space-y-0.5">
        <div className="flex items-center justify-center gap-1.5">
          <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight font-['Outfit',sans-serif]">
            {EMPRESA.nome}
          </h1>
          <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
        </div>
        <p className="text-xs font-bold text-red-600 tracking-wide uppercase">
          {EMPRESA.descricao}
        </p>
        <p className="text-[12px] text-neutral-500 max-w-xs font-medium leading-tight">
          Residencial & Comercial • Limpeza de Placas Solar
        </p>
      </div>
    </div>
  );
};

