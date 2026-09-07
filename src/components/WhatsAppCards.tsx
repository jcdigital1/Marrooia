import React from 'react';
import { MessageSquare, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { EMPRESA, buildWhatsAppLink, generateBudgetMessage } from '../config';
import { BudgetData } from '../types';
import { soundManager } from '../utils/sound';

interface WhatsAppCardsProps {
  budgetData?: BudgetData;
  customText?: string;
}

export const WhatsAppCards: React.FC<WhatsAppCardsProps> = ({
  budgetData,
  customText,
}) => {
  const messageToSend = budgetData
    ? generateBudgetMessage(budgetData)
    : customText || "Olá! Vim pelo site da MARROOIA e gostaria de mais informações.";

  const link1 = buildWhatsAppLink(EMPRESA.whatsapp1, messageToSend);
  const link2 = buildWhatsAppLink(EMPRESA.whatsapp2, messageToSend);

  return (
    <div className="space-y-3 my-2.5 max-w-full overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-250">
      {budgetData && (
        <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-3 text-xs space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Mensagem de Orçamento Pronta para Envio:</span>
          </div>
          <div className="bg-white/90 rounded-xl p-2.5 text-[11.5px] text-neutral-700 leading-relaxed font-mono border border-emerald-100/90 max-h-24 overflow-y-auto break-words [overflow-wrap:anywhere]">
            {messageToSend}
          </div>
        </div>
      )}

      {/* WhatsApp 1 */}
      <div className="bg-white/95 backdrop-blur-xl rounded-[24px] p-3.5 sm:p-4 border border-white/80 shadow-[0_6px_20px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.15)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.35),inset_0_1px_0_rgba(255,255,255,0.4)]">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-white/20" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-emerald-700 tracking-wider">
                🟢 WHATSAPP 1
              </span>
              <span className="text-[10px] bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Online
              </span>
            </div>
            <div className="text-base sm:text-lg font-black text-neutral-900 font-['Outfit',sans-serif] truncate">
              {EMPRESA.whatsapp1Formatado}
            </div>
            <p className="text-[11px] text-neutral-500 font-medium">Atendimento rápido e cotações</p>
          </div>
        </div>

        <a
          id="btn-whatsapp-card-1"
          href={link1}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playTap()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:from-emerald-700 text-white font-extrabold text-sm px-5 py-3 rounded-2xl shadow-[0_4px_14px_rgba(16,185,129,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] active:scale-95 transition-all text-center shrink-0 cursor-pointer"
        >
          <span>ENVIAR NO WHATSAPP</span>
          <ExternalLink className="w-4 h-4 shrink-0" />
        </a>
      </div>

      {/* WhatsApp 2 */}
      <div className="bg-white/95 backdrop-blur-xl rounded-[24px] p-3.5 sm:p-4 border border-white/80 shadow-[0_6px_20px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.15)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.35),inset_0_1px_0_rgba(255,255,255,0.4)]">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-white/20" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-emerald-700 tracking-wider">
                🟢 WHATSAPP 2
              </span>
              <span className="text-[10px] bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Online
              </span>
            </div>
            <div className="text-base sm:text-lg font-black text-neutral-900 font-['Outfit',sans-serif] truncate">
              {EMPRESA.whatsapp2Formatado}
            </div>
            <p className="text-[11px] text-neutral-500 font-medium">Atendimento direto da equipe</p>
          </div>
        </div>

        <a
          id="btn-whatsapp-card-2"
          href={link2}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playTap()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:from-emerald-700 text-white font-extrabold text-sm px-5 py-3 rounded-2xl shadow-[0_4px_14px_rgba(16,185,129,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] active:scale-95 transition-all text-center shrink-0 cursor-pointer"
        >
          <span>ENVIAR NO WHATSAPP</span>
          <ExternalLink className="w-4 h-4 shrink-0" />
        </a>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-600 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="font-medium">Ao tocar, a mensagem abre já preenchida no seu WhatsApp.</span>
      </div>
    </div>
  );
};
