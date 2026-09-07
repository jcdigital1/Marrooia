import React from 'react';
import { X, CheckCircle2, MessageSquare, Phone, MapPin, Award, Sparkles, ExternalLink } from 'lucide-react';
import { EMPRESA, SERVICES_INFO, buildWhatsAppLink } from '../config';
import { Avatar } from './Avatar';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="profile-modal-card"
        className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/60 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Top Nav Handle & Close Button */}
        <div className="relative p-4 pb-0 flex items-center justify-between z-10">
          <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
          <div className="text-xs font-bold text-neutral-400 tracking-wider uppercase">
            Perfil do Contato
          </div>
          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-neutral-200/80 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big Avatar & Header Showcase */}
        <div className="px-6 pt-4 pb-5 flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-gradient-to-tr from-red-600 via-neutral-900 to-red-500 shadow-[0_12px_28px_rgba(220,38,38,0.35)] ring-4 ring-white">
              <img
                src={EMPRESA.logo}
                alt={EMPRESA.nome}
                className="w-full h-full object-cover rounded-full bg-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-3 border-white rounded-full flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight font-['Outfit',sans-serif]">
              {EMPRESA.nome}
            </h2>
            <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Oficial
            </span>
          </div>
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide mt-0.5">
            {EMPRESA.descricao}
          </p>
          <p className="text-xs text-neutral-600 font-medium max-w-xs mt-1.5 leading-snug">
            {EMPRESA.slogan}
          </p>
        </div>

        {/* Scrollable iOS Content */}
        <div className="px-5 pb-6 overflow-y-auto space-y-4">
          {/* Direct WhatsApp Callouts (iOS 3D Cards) */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-1">
              Canais Oficiais no WhatsApp
            </div>

            {/* WhatsApp 1 */}
            <a
              href={buildWhatsAppLink(EMPRESA.whatsapp1, "Olá! Vim pelo site da MARROOOIA.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTap()}
              className="flex items-center justify-between p-3.5 bg-gradient-to-r from-emerald-50 to-white rounded-2xl border border-emerald-200/80 shadow-[0_2px_8px_rgba(16,185,129,0.08)] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                    WhatsApp 1
                  </div>
                  <div className="text-sm font-extrabold text-neutral-900 font-['Outfit',sans-serif]">
                    {EMPRESA.whatsapp1Formatado}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Conversar
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* WhatsApp 2 */}
            <a
              href={buildWhatsAppLink(EMPRESA.whatsapp2, "Olá! Vim pelo site da MARROOOIA.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTap()}
              className="flex items-center justify-between p-3.5 bg-gradient-to-r from-emerald-50 to-white rounded-2xl border border-emerald-200/80 shadow-[0_2px_8px_rgba(16,185,129,0.08)] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                    WhatsApp 2
                  </div>
                  <div className="text-sm font-extrabold text-neutral-900 font-['Outfit',sans-serif]">
                    {EMPRESA.whatsapp2Formatado}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
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
                  className="bg-neutral-50/80 p-3 rounded-2xl border border-neutral-200/70"
                >
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="text-xs font-bold text-neutral-900 font-['Outfit',sans-serif]">
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
            className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-extrabold text-sm py-3 px-4 rounded-2xl shadow-[0_6px_20px_rgba(220,38,38,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>SOLICITAR ORÇAMENTO PELO CHAT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
