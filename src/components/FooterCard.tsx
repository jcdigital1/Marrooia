import React from 'react';
import { MessageSquare, Paintbrush, Calculator } from 'lucide-react';
import { EMPRESA } from '../config';
import { Avatar } from './Avatar';
import { VerifiedBadge } from './VerifiedBadge';
import { soundManager } from '../utils/sound';

interface FooterCardProps {
  onOpenWhatsApp: () => void;
  onSelectServicos: () => void;
  onStartOrcamento: () => void;
}

export const FooterCard: React.FC<FooterCardProps> = ({
  onOpenWhatsApp,
  onSelectServicos,
  onStartOrcamento,
}) => {
  return (
    <div className="mt-4 mb-2 bg-gradient-to-b from-[#1E202A] to-[#101117] text-white p-5 rounded-[28px] shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.18)] border border-neutral-700/90 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex flex-col items-center">
        <Avatar size="lg" className="mb-2.5" />

        <div className="flex items-center justify-center gap-2">
          <h3 className="text-xl font-black tracking-tight font-['Outfit',sans-serif] text-white drop-shadow-sm">
            {EMPRESA.nome}
          </h3>
          <VerifiedBadge size="sm" />
        </div>
        
        <p className="text-xs font-bold text-red-400 tracking-wider uppercase mt-0.5">
          PINTURAS EM GERAL
        </p>
        <p className="text-[12px] text-neutral-300 mt-1 max-w-xs font-normal">
          Residencial e Comercial • Limpeza de Placas Solar
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-neutral-800">
        <button
          id="btn-footer-whatsapp"
          type="button"
          onClick={() => {
            soundManager.playTap();
            onOpenWhatsApp();
          }}
          className="inline-flex items-center gap-1.5 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl active:scale-95 transition-all shadow-[0_4px_14px_rgba(16,185,129,0.35),inset_0_1px_0_rgba(255,255,255,0.3)] cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>📱 WhatsApp</span>
        </button>

        <button
          id="btn-footer-servicos"
          type="button"
          onClick={() => {
            soundManager.playTap();
            onSelectServicos();
          }}
          className="inline-flex items-center gap-1.5 bg-gradient-to-b from-neutral-800 to-neutral-900 hover:from-neutral-750 text-neutral-100 text-xs font-bold px-4 py-2.5 rounded-2xl active:scale-95 transition-all border border-neutral-700/80 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] cursor-pointer"
        >
          <Paintbrush className="w-3.5 h-3.5 text-red-400" />
          <span>🎨 Serviços</span>
        </button>

        <button
          id="btn-footer-orcamento"
          type="button"
          onClick={() => {
            soundManager.playTap();
            onStartOrcamento();
          }}
          className="inline-flex items-center gap-1.5 bg-gradient-to-b from-red-500 via-red-600 to-rose-700 hover:from-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl active:scale-95 transition-all shadow-[0_4px_14px_rgba(220,38,38,0.45),inset_0_1px_1px_rgba(255,255,255,0.35)] cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>💰 Orçamento</span>
        </button>
      </div>
    </div>
  );
};
