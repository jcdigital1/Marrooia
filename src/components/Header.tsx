import React, { useState } from 'react';
import { Phone, Info, MoreVertical } from 'lucide-react';
import { EMPRESA } from '../config';
import { Avatar } from './Avatar';

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
      className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-2xl border-b border-neutral-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.03)] transition-all"
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
              <span className="font-extrabold text-neutral-900 text-[15px] sm:text-base tracking-tight font-['Outfit',sans-serif] leading-tight truncate group-hover:text-red-600 transition-colors">
                {EMPRESA.nome}
              </span>
              <span className="shrink-0 inline-flex items-center text-[9px] font-black text-white bg-gradient-to-r from-red-600 to-rose-600 px-1.5 py-0.5 rounded-full shadow-[0_1px_4px_rgba(220,38,38,0.4)]">
                OFICIAL
              </span>
            </div>
            
            {/* Live iOS Status */}
            <div className="flex items-center gap-1.5">
              {isBotTyping ? (
                <span className="text-[11px] font-bold text-red-600 animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                  digitando...
                </span>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-medium text-emerald-600">
                    Atendimento online
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: iOS Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Phone Call / WhatsApp direct modal trigger */}
          <button
            id="btn-header-whatsapp"
            type="button"
            onClick={onOpenWhatsApp}
            title="Falar no WhatsApp"
            className="w-9 h-9 flex items-center justify-center rounded-full text-emerald-700 bg-emerald-50 hover:bg-emerald-100 active:scale-95 shadow-[0_2px_6px_rgba(16,185,129,0.15)] transition-all"
          >
            <Phone className="w-4 h-4" />
          </button>

          {/* Info Modal trigger */}
          <button
            id="btn-header-info"
            type="button"
            onClick={onOpenProfile}
            title="Perfil da MARROOOIA"
            className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-700 hover:text-red-600 hover:bg-neutral-100 active:scale-95 transition-all"
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
              className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 active:scale-95 transition-all"
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
                  className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-white/60 py-1.5 z-50 text-neutral-800 animate-in fade-in zoom-in-95 duration-150"
                >
                  <button
                    id="menu-item-inicio"
                    onClick={() => {
                      onNavigate('inicio');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-neutral-50 flex items-center gap-2.5 transition-colors"
                  >
                    <span>🏠</span> Início
                  </button>
                  <button
                    id="menu-item-servicos"
                    onClick={() => {
                      onNavigate('servicos');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-neutral-50 flex items-center gap-2.5 transition-colors"
                  >
                    <span>🎨</span> Serviços
                  </button>
                  <button
                    id="menu-item-orcamento"
                    onClick={() => {
                      onNavigate('orcamento');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-neutral-50 flex items-center gap-2.5 transition-colors"
                  >
                    <span>💰</span> Orçamento
                  </button>
                  <button
                    id="menu-item-whatsapp"
                    onClick={() => {
                      onOpenWhatsApp();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 flex items-center gap-2.5 transition-colors"
                  >
                    <span>📱</span> WhatsApp
                  </button>
                  <div className="h-px bg-neutral-100 my-1" />
                  <button
                    id="menu-item-sobre"
                    onClick={() => {
                      onOpenProfile();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-neutral-50 flex items-center gap-2.5 transition-colors"
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
