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
        <div className="bg-[#0C1712] border border-emerald-700/60 rounded-2xl p-3 text-xs space-y-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Mensagem de Orçamento Pronta para Envio:</span>
          </div>
          <div className="bg-[#060A08] rounded-xl p-2.5 text-[11.5px] text-emerald-200 leading-relaxed font-mono border border-emerald-900/80 max-h-28 overflow-y-auto break-words [overflow-wrap:anywhere]">
            {messageToSend}
          </div>
        </div>
      )}

      {/* WhatsApp 1 */}
      <div className="bg-gradient-to-b from-[#1F202A] to-[#14151C] rounded-[24px] p-3.5 sm:p-4 border border-neutral-700/80 shadow-[0_8px_24px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.18)] hover:border-emerald-500/50 hover:shadow-[0_12px_28px_rgba(16,185,129,0.2)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-[0_4px_14px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(255,255,255,0.4)]">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-white/20" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-neutral-900 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-emerald-400 tracking-wider">
                🟢 WHATSAPP 1
              </span>
              <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 px-2 py-0.5 rounded-full font-bold">
                Online
              </span>
            </div>
            <div className="text-base sm:text-lg font-black text-white font-['Outfit',sans-serif] truncate drop-shadow-sm">
              {EMPRESA.whatsapp1Formatado}
            </div>
            <p className="text-[11px] text-neutral-300 font-normal">Atendimento rápido e cotações</p>
          </div>
        </div>

        <a
          id="btn-whatsapp-card-1"
          href={link1}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playTap()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-[0_6px_18px_rgba(16,185,129,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] active:scale-95 transition-all text-center shrink-0 cursor-pointer"
        >
          <span>ENVIAR NO WHATSAPP</span>
          <ExternalLink className="w-4 h-4 shrink-0" />
        </a>
      </div>

      {/* WhatsApp 2 */}
      <div className="bg-gradient-to-b from-[#1F202A] to-[#14151C] rounded-[24px] p-3.5 sm:p-4 border border-neutral-700/80 shadow-[0_8px_24px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.18)] hover:border-emerald-500/50 hover:shadow-[0_12px_28px_rgba(16,185,129,0.2)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-[0_4px_14px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(255,255,255,0.4)]">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-white/20" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-neutral-900 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-emerald-400 tracking-wider">
                🟢 WHATSAPP 2
              </span>
              <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 px-2 py-0.5 rounded-full font-bold">
                Online
              </span>
            </div>
            <div className="text-base sm:text-lg font-black text-white font-['Outfit',sans-serif] truncate drop-shadow-sm">
              {EMPRESA.whatsapp2Formatado}
            </div>
            <p className="text-[11px] text-neutral-300 font-normal">Atendimento direto da equipe</p>
          </div>
        </div>

        <a
          id="btn-whatsapp-card-2"
          href={link2}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playTap()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-[0_6px_18px_rgba(16,185,129,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] active:scale-95 transition-all text-center shrink-0 cursor-pointer"
        >
          <span>ENVIAR NO WHATSAPP</span>
          <ExternalLink className="w-4 h-4 shrink-0" />
        </a>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-neutral-400 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="font-medium">Ao tocar, a mensagem abre já preenchida no seu WhatsApp.</span>
      </div>
    </div>
  );
};
