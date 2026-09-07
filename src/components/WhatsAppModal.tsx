import React from 'react';
import { MessageSquare, X, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
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

  const defaultMsg = "Olá! Vim pelo site da MARROOOIA e gostaria de solicitar um atendimento.";
  const msgToSend = customMessage || defaultMsg;

  return (
    <div 
      id="whatsapp-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="whatsapp-modal-card"
        className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-white/60 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Header */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-red-950 text-white p-5 relative border-b border-white/10">
          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3.5">
            <Avatar size="lg" />
            <div>
              <h3 className="text-lg font-black font-['Outfit',sans-serif] leading-tight">
                Atendimento WhatsApp
              </h3>
              <p className="text-xs text-neutral-300 font-medium">
                Escolha um canal direto da MARROOOIA:
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3.5 bg-neutral-50/70">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3.5 py-2.5 rounded-2xl shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Equipe online pronta para atender sua solicitação</span>
          </div>

          {/* WhatsApp 1 */}
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-[22px] border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-[0_3px_10px_rgba(16,185,129,0.3)]">
                <MessageSquare className="w-6 h-6 fill-white/20" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-wide">
                    WhatsApp 1
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-base font-black text-neutral-900 font-['Outfit',sans-serif]">
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
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 text-white font-extrabold text-sm px-4 py-2.5 rounded-2xl shadow-[0_3px_10px_rgba(16,185,129,0.3)] active:scale-95 transition-all text-center"
            >
              <span>FALAR AGORA</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* WhatsApp 2 */}
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-[22px] border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-[0_3px_10px_rgba(16,185,129,0.3)]">
                <MessageSquare className="w-6 h-6 fill-white/20" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-wide">
                    WhatsApp 2
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-base font-black text-neutral-900 font-['Outfit',sans-serif]">
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
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 text-white font-extrabold text-sm px-4 py-2.5 rounded-2xl shadow-[0_3px_10px_rgba(16,185,129,0.3)] active:scale-95 transition-all text-center"
            >
              <span>FALAR AGORA</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-2 text-center text-[11px] text-neutral-500 flex items-center justify-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Atendimento oficial direto • Mensagem pré-formatada rápida
          </div>
        </div>
      </div>
    </div>
  );
};
