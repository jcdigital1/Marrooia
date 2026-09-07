import React from 'react';
import { MessageSquare, Paintbrush, Calculator } from 'lucide-react';
import { EMPRESA } from '../config';
import { Avatar } from './Avatar';
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
    <div className="mt-4 mb-2 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 text-white p-5 rounded-[28px] shadow-[0_12px_36px_rgba(0,0,0,0.35)] border border-neutral-800/80 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex flex-col items-center">
        <Avatar size="lg" className="mb-2.5" />

        <h3 className="text-xl font-black tracking-tight font-['Outfit',sans-serif] text-white">
          {EMPRESA.nome}
        </h3>
        <p className="text-xs font-bold text-red-500 tracking-wider uppercase mt-0.5">
          PINTURAS EM GERAL
        </p>
        <p className="text-[12px] text-neutral-400 mt-1 max-w-xs font-medium">
          Residencial e Comercial • Limpeza de Placas Solar
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-neutral-800/80">
        <button
          id="btn-footer-whatsapp"
          type="button"
          onClick={() => {
            soundManager.playTap();
            onOpenWhatsApp();
          }}
          className="inline-flex items-center gap-1.5 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl active:scale-95 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.3)] cursor-pointer"
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
          className="inline-flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold px-4 py-2.5 rounded-2xl active:scale-95 transition-all border border-neutral-700 shadow-xs cursor-pointer"
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
          className="inline-flex items-center gap-1.5 bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl active:scale-95 transition-all shadow-[0_4px_12px_rgba(220,38,38,0.35)] cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>💰 Orçamento</span>
        </button>
      </div>
    </div>
  );
};
