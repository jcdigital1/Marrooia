import React from 'react';
import { X, CheckCircle, Phone, Sparkles, Paintbrush, Sun, Building2, Home } from 'lucide-react';
import { EMPRESA, SERVICES_INFO, buildWhatsAppLink } from '../config';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBudget: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  onStartBudget,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      id="info-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="info-modal-card"
        className="w-full max-w-lg max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full p-1 bg-white shrink-0 shadow-lg ring-2 ring-red-500/40">
              <img
                src={EMPRESA.logo}
                alt={EMPRESA.nome}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/30 text-red-300 text-xs font-semibold mb-1">
                <Sparkles className="w-3 h-3" />
                Excelência e Qualidade
              </div>
              <h2 className="text-2xl font-extrabold font-['Outfit',sans-serif] tracking-tight">
                {EMPRESA.nome}
              </h2>
              <p className="text-sm text-neutral-300 font-medium mt-0.5">
                {EMPRESA.slogan}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-neutral-800">
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Sobre nós
            </h4>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Somos a <strong className="text-neutral-950">MARROOOIA</strong>, especializada em pinturas em geral, serviços residenciais e comerciais e limpeza de placas solares. Nosso compromisso é entregar acabamento profissional de alto padrão, durabilidade e atendimento ágil.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
              Nossos Serviços Especializados
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SERVICES_INFO.map((serv) => (
                <div 
                  key={serv.id}
                  className="bg-neutral-50 p-3 rounded-xl border border-neutral-200/80 hover:border-red-400/40 transition-colors"
                >
                  <div className="text-xl mb-1">{serv.icon}</div>
                  <div className="text-xs font-bold text-neutral-900 font-['Outfit',sans-serif]">
                    {serv.title}
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-tight mt-1">
                    {serv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50/70 border border-red-200/80 p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-red-900 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-red-600" />
              Contatos Oficiais
            </h4>
            <div className="space-y-1.5 mt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-600 font-medium">WhatsApp 1:</span>
                <span className="font-bold text-neutral-900">{EMPRESA.whatsapp1Formatado}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-600 font-medium">WhatsApp 2:</span>
                <span className="font-bold text-neutral-900">{EMPRESA.whatsapp2Formatado}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 shrink-0 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900"
          >
            Fechar
          </button>
          <button
            onClick={() => {
              onClose();
              onStartBudget();
            }}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 transition-all"
          >
            Solicitar Orçamento
          </button>
        </div>
      </div>
    </div>
  );
};
