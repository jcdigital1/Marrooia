import React, { useState } from 'react';
import { Phone, Info, MoreVertical } from 'lucide-react';
import { EMPRESA } from '../config';
import { Avatar } from './Avatar';
import { VerifiedBadge } from './VerifiedBadge';

interface HeaderProps {
  onOpenWhatsApp: () => void;
  onOpenProfile: () => void;
  onNavigate: (action: string) => void;
  isBotTyping?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWhatsApp,
  onOpenProfile,
  onNavigate,
  isBotTyping = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      id="chat-header"
      className="sticky top-0 z-40 w-full bg-neutral-950/85 backdrop-blur-2xl border-b border-neutral-800/80 shadow-[0_4px_24px_rgba(0,0,0,0.7),inset_0_-1px_0_rgba(255,255,255,0.06)] transition-all"
    >
      <div className="max-w-xl mx-auto px-3 py-2.5 flex items-center justify-between gap-2">
        {/* Left: 3D Avatar & iOS Contact Info */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group flex-1 min-w-0"
          onClick={onOpenProfile}
          title="Toque para ver perfil oficial"
        >
          <Avatar
            size="md"
            showOnlineDot={!isBotTyping}
            className="group-hover:scale-105 transition-transform"
          />

          <div className="flex flex-col text-left overflow-hidden min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white text-[15px] sm:text-base tracking-tight font-['Outfit',sans-serif] leading-tight truncate group-hover:text-sky-400 transition-colors drop-shadow-sm">
                {EMPRESA.nome}
              </span>
              <VerifiedBadge size="sm" />
              <span className="shrink-0 inline-flex items-center text-[9px] font-black text-white bg-gradient-to-r from-red-600 to-rose-600 px-1.5 py-0.5 rounded-full shadow-[0_1px_6px_rgba(220,38,38,0.5)]">
                OFICIAL
              </span>
            </div>
            
            {/* Live iOS Status */}
            <div className="flex items-center gap-1.5">
              {isBotTyping ? (
                <span className="text-[11px] font-bold text-red-400 animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  digitando...
                </span>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span className="text-[11px] font-medium text-emerald-400">
                    Atendimento online
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: iOS Actions with 3D tactile feel */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Phone Call / WhatsApp direct modal trigger */}
          <button
            id="btn-header-whatsapp"
            type="button"
            onClick={onOpenWhatsApp}
            title="Falar no WhatsApp"
            className="w-9 h-9 flex items-center justify-center rounded-full text-emerald-400 bg-neutral-900/90 hover:bg-neutral-850 active:scale-95 border border-emerald-500/40 shadow-[0_2px_10px_rgba(16,185,129,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4" />
          </button>

          {/* Info Modal trigger */}
          <button
            id="btn-header-info"
            type="button"
            onClick={onOpenProfile}
            title="Perfil da MARROOIA"
            className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-300 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 active:scale-95 border border-neutral-700/60 shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all cursor-pointer"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Menu Dropdown */}
          <div className="relative">
            <button
              id="btn-header-menu"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Menu"
              className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-300 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 active:scale-95 border border-neutral-700/60 shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div
                  id="dropdown-menu"
                  className="absolute right-0 mt-2 w-52 bg-neutral-900/95 backdrop-blur-2xl rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.15)] border border-neutral-700/80 py-1.5 z-50 text-neutral-100 animate-in fade-in zoom-in-95 duration-150"
                >
                  <button
                    id="menu-item-inicio"
                    onClick={() => {
                      onNavigate('inicio');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-neutral-800/80 flex items-center gap-2.5 transition-colors cursor-pointer text-neutral-200 hover:text-white"
                  >
                    <span>🏠</span> Início
                  </button>
                  <button
                    id="menu-item-servicos"
                    onClick={() => {
                      onNavigate('servicos');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-neutral-800/80 flex items-center gap-2.5 transition-colors cursor-pointer text-neutral-200 hover:text-white"
                  >
                    <span>🎨</span> Serviços
                  </button>
                  <button
                    id="menu-item-orcamento"
                    onClick={() => {
                      onNavigate('orcamento');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-neutral-800/80 flex items-center gap-2.5 transition-colors cursor-pointer text-neutral-200 hover:text-white"
                  >
                    <span>💰</span> Orçamento
                  </button>
                  <button
                    id="menu-item-whatsapp"
                    onClick={() => {
                      onOpenWhatsApp();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-semibold text-emerald-400 hover:bg-emerald-950/40 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <span>📱</span> WhatsApp
                  </button>
                  <div className="h-px bg-neutral-800 my-1" />
                  <button
                    id="menu-item-sobre"
                    onClick={() => {
                      onOpenProfile();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-neutral-800/80 flex items-center gap-2.5 transition-colors cursor-pointer text-neutral-200 hover:text-white"
                  >
                    <span>ℹ️</span> Perfil da empresa
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
