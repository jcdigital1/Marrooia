import React from 'react';
import { MessageSquare, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { EMPRESA, buildWhatsAppLink } from '../config';
import { Avatar } from './Avatar';
import { soundManager } from '../utils/sound';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  customMessage?: string;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  customMessage,
}) => {
  if (!isOpen) return null;

  const defaultMsg = "Olá! Vim pelo site da MARROOIA e gostaria de solicitar um orçamento.";
  const msgToSend = customMessage || defaultMsg;

  return (
    <div 
      id="whatsapp-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="whatsapp-modal-card"
        className="w-full max-w-md bg-[#13141B]/95 backdrop-blur-2xl rounded-[32px] shadow-[0_24px_70px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-neutral-700/80 overflow-hidden animate-in zoom-in-95 duration-200 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-neutral-950 via-[#191A24] to-red-950 text-white p-5 relative border-b border-neutral-800">
          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-800/80 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3.5">
            <Avatar size="lg" />
            <div>
              <h3 className="text-lg font-black font-['Outfit',sans-serif] leading-tight text-white">
                Atendimento WhatsApp
              </h3>
              <p className="text-xs text-neutral-300 font-normal">
                Escolha um canal direto da MARROOIA:
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3.5 bg-[#0F1015]">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-3.5 py-2.5 rounded-2xl shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Equipe online pronta para atender sua solicitação</span>
          </div>

          {/* WhatsApp 1 */}
          <div className="bg-gradient-to-b from-[#1F202A] to-[#14151C] p-4 rounded-[22px] border border-neutral-700/80 shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.18)] hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-[0_3px_10px_rgba(16,185,129,0.4)]">
                <MessageSquare className="w-6 h-6 fill-white/20" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                    WhatsApp 1
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-base font-black text-white font-['Outfit',sans-serif]">
                  {EMPRESA.whatsapp1Formatado}
                </div>
              </div>
            </div>

            <a
              id="btn-link-wa1"
              href={buildWhatsAppLink(EMPRESA.whatsapp1, msgToSend)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTap()}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-[0_4px_14px_rgba(16,185,129,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)] active:scale-95 transition-all text-center cursor-pointer"
            >
              <span>FALAR AGORA</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* WhatsApp 2 */}
          <div className="bg-gradient-to-b from-[#1F202A] to-[#14151C] p-4 rounded-[22px] border border-neutral-700/80 shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.18)] hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-[0_3px_10px_rgba(16,185,129,0.4)]">
                <MessageSquare className="w-6 h-6 fill-white/20" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                    WhatsApp 2
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-base font-black text-white font-['Outfit',sans-serif]">
                  {EMPRESA.whatsapp2Formatado}
                </div>
              </div>
            </div>

            <a
              id="btn-link-wa2"
              href={buildWhatsAppLink(EMPRESA.whatsapp2, msgToSend)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTap()}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-[0_4px_14px_rgba(16,185,129,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)] active:scale-95 transition-all text-center cursor-pointer"
            >
              <span>FALAR AGORA</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-2 text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Atendimento oficial direto • Mensagem pré-formatada rápida
          </div>
        </div>
      </div>
    </div>
  );
};
