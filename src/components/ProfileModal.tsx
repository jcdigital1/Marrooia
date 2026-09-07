import React from 'react';
import { X, CheckCircle2, MessageSquare, Sparkles, ExternalLink } from 'lucide-react';
import { EMPRESA, SERVICES_INFO, buildWhatsAppLink } from '../config';
import { VerifiedBadge } from './VerifiedBadge';
import { soundManager } from '../utils/sound';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBudget: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onStartBudget,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="profile-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="profile-modal-card"
        className="w-full max-w-md bg-[#13141B]/95 backdrop-blur-2xl rounded-[32px] shadow-[0_24px_70px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-neutral-700/80 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Top Nav Handle & Close Button */}
        <div className="relative p-4 pb-0 flex items-center justify-between z-10">
          <div className="w-10 h-1 bg-neutral-700 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
          <div className="text-xs font-bold text-neutral-400 tracking-wider uppercase">
            Perfil Oficial
          </div>
          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big Avatar & Header Showcase */}
        <div className="px-6 pt-4 pb-5 flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-gradient-to-tr from-red-600 via-neutral-700 to-sky-500 shadow-[0_12px_32px_rgba(0,0,0,0.8)] ring-2 ring-white/20">
              <img
                src={EMPRESA.logo}
                alt={EMPRESA.nome}
                className="w-full h-full object-cover rounded-full bg-neutral-950"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-7 h-7 bg-emerald-500 border-2 border-[#13141B] rounded-full flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl font-black text-white tracking-tight font-['Outfit',sans-serif] drop-shadow-sm">
              {EMPRESA.nome}
            </h2>
            <VerifiedBadge size="md" />
            <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-[9.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Oficial
            </span>
          </div>
          <p className="text-xs font-bold text-red-400 uppercase tracking-wide mt-1">
            {EMPRESA.descricao}
          </p>
          <p className="text-xs text-neutral-300 font-normal max-w-xs mt-1.5 leading-relaxed">
            {EMPRESA.slogan}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="px-5 pb-6 overflow-y-auto space-y-4">
          {/* Direct WhatsApp Callouts (3D Dark Cards) */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-1">
              Canais Oficiais no WhatsApp
            </div>

            {/* WhatsApp 1 */}
            <a
              href={buildWhatsAppLink(EMPRESA.whatsapp1, "Olá! Vim pelo site da MARROOIA.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTap()}
              className="flex items-center justify-between p-3.5 bg-gradient-to-r from-[#1A1B24] to-[#12131A] rounded-2xl border border-neutral-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] hover:border-emerald-500/50 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                    WhatsApp 1
                  </div>
                  <div className="text-sm font-extrabold text-white font-['Outfit',sans-serif]">
                    {EMPRESA.whatsapp1Formatado}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Conversar
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* WhatsApp 2 */}
            <a
              href={buildWhatsAppLink(EMPRESA.whatsapp2, "Olá! Vim pelo site da MARROOIA.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTap()}
              className="flex items-center justify-between p-3.5 bg-gradient-to-r from-[#1A1B24] to-[#12131A] rounded-2xl border border-neutral-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] hover:border-emerald-500/50 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                    WhatsApp 2
                  </div>
                  <div className="text-sm font-extrabold text-white font-['Outfit',sans-serif]">
                    {EMPRESA.whatsapp2Formatado}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Conversar
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {/* Specializations */}
          <div>
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-1 mb-2">
              Especialidades
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SERVICES_INFO.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#191A22] p-3 rounded-2xl border border-neutral-700/70"
                >
                  <div className="text-xl mb-1 drop-shadow-xs">{item.icon}</div>
                  <div className="text-xs font-bold text-white font-['Outfit',sans-serif]">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Quote Trigger */}
          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
              onStartBudget();
            }}
            className="w-full bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-700 text-white font-black text-sm py-3.5 px-4 rounded-2xl shadow-[0_6px_20px_rgba(220,38,38,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>SOLICITAR ORÇAMENTO PELO CHAT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
