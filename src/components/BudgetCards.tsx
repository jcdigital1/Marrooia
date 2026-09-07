import React, { useState, useRef } from 'react';
import { Camera, Check, ArrowRight, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { BudgetData } from '../types';
import { soundManager } from '../utils/sound';

interface BudgetInlineFormProps {
  step: 'service' | 'name' | 'city' | 'description' | 'photo' | 'phone';
  onSubmit: (field: keyof BudgetData, value: string, extra?: { fotoNome?: string }) => void;
  onSkipPhoto?: () => void;
  currentData: BudgetData;
}

export const BudgetInlineForm: React.FC<BudgetInlineFormProps> = ({
  step,
  onSubmit,
  onSkipPhoto,
  currentData,
}) => {
  const [val, setVal] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotoPreview(reader.result);
          soundManager.playTap();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!val.trim()) return;
    soundManager.playSend();

    if (step === 'name') onSubmit('nome', val.trim());
    if (step === 'city') onSubmit('cidade', val.trim());
    if (step === 'description') onSubmit('descricao', val.trim());
    if (step === 'phone') onSubmit('telefone', val.trim());
  };

  if (step === 'name') {
    return (
      <form onSubmit={handleTextSubmit} className="mt-2.5 bg-white/95 backdrop-blur-md p-4 rounded-[22px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-2.5 max-w-full overflow-hidden">
        <label className="text-xs font-bold text-neutral-800 block">
          Digite seu nome completo:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            required
            autoFocus
            placeholder="Ex: João da Silva"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="flex-1 min-w-0 bg-neutral-100/90 focus:bg-white border border-neutral-200/90 rounded-2xl px-3.5 py-2.5 text-[16px] text-neutral-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
          />
          <button
            type="submit"
            className="bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 active:scale-95 shadow-[0_4px_12px_rgba(220,38,38,0.35)] transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Avançar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    );
  }

  if (step === 'city') {
    return (
      <form onSubmit={handleTextSubmit} className="mt-2.5 bg-white/95 backdrop-blur-md p-4 rounded-[22px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-2.5 max-w-full overflow-hidden">
        <label className="text-xs font-bold text-neutral-800 block">
          Em qual cidade será realizado o serviço?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            required
            autoFocus
            placeholder="Ex: Gurupi, Palmas, Paraíso..."
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="flex-1 min-w-0 bg-neutral-100/90 focus:bg-white border border-neutral-200/90 rounded-2xl px-3.5 py-2.5 text-[16px] text-neutral-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
          />
          <button
            type="submit"
            className="bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 active:scale-95 shadow-[0_4px_12px_rgba(220,38,38,0.35)] transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Avançar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    );
  }

  if (step === 'description') {
    return (
      <form onSubmit={handleTextSubmit} className="mt-2.5 bg-white/95 backdrop-blur-md p-4 rounded-[22px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-2.5 max-w-full overflow-hidden">
        <label className="text-xs font-bold text-neutral-800 block">
          Conte brevemente o que você precisa:
        </label>
        <textarea
          rows={3}
          required
          autoFocus
          placeholder="Ex: Pintura externa da casa, retoque de paredes e teto da sala..."
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full bg-neutral-100/90 focus:bg-white border border-neutral-200/90 rounded-2xl px-3.5 py-2.5 text-[16px] text-neutral-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] resize-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold active:scale-95 shadow-[0_4px_12px_rgba(220,38,38,0.35)] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Continuar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    );
  }

  if (step === 'photo') {
    return (
      <div className="mt-2.5 bg-white/95 backdrop-blur-md p-4 rounded-[22px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-3">
        <div className="text-xs font-bold text-neutral-800">
          Deseja enviar uma foto do local?
        </div>
        <p className="text-[11px] text-neutral-500 leading-tight">
          A foto ajuda nossa equipe a avaliar os detalhes com maior precisão e rapidez.
        </p>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          capture="environment"
          onChange={handlePhotoSelect}
          className="hidden"
        />

        {photoPreview ? (
          <div className="space-y-2.5">
            <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 shadow-inner">
              <img
                src={photoPreview}
                alt="Foto do local"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-neutral-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                Foto anexada
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  fileInputRef.current?.click();
                }}
                className="text-xs text-neutral-600 hover:text-red-600 underline font-medium"
              >
                Trocar foto
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onSubmit('fotoUrl', photoPreview, { fotoNome: photoName || 'foto-local.jpg' });
                }}
                className="bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 text-white px-4 py-2 rounded-2xl text-xs font-bold active:scale-95 shadow-[0_3px_10px_rgba(16,185,129,0.35)] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirmar Foto</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              id="btn-upload-photo"
              onClick={() => {
                soundManager.playTap();
                fileInputRef.current?.click();
              }}
              className="flex-1 bg-red-50 hover:bg-red-100 border border-red-200/90 text-red-700 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 shadow-2xs transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4 text-red-600" />
              <span>📷 Enviar foto</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onSkipPhoto && onSkipPhoto();
              }}
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-3 rounded-2xl text-xs font-bold active:scale-95 transition-all text-center cursor-pointer"
            >
              Pular esta etapa
            </button>
          </div>
        )}
      </div>
    );
  }

  if (step === 'phone') {
    return (
      <form onSubmit={handleTextSubmit} className="mt-2.5 bg-white/95 backdrop-blur-md p-4 rounded-[22px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-2.5 max-w-full overflow-hidden">
        <label className="text-xs font-bold text-neutral-800 block">
          Qual número de WhatsApp podemos usar para contato?
        </label>
        <div className="flex gap-2">
          <input
            type="tel"
            required
            autoFocus
            placeholder="Ex: (63) 99999-9999"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="flex-1 min-w-0 bg-neutral-100/90 focus:bg-white border border-neutral-200/90 rounded-2xl px-3.5 py-2.5 text-[16px] text-neutral-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
          />
          <button
            type="submit"
            className="bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 active:scale-95 shadow-[0_4px_12px_rgba(220,38,38,0.35)] transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Finalizar</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    );
  }

  return null;
};

export const BudgetSummaryCard: React.FC<{
  data: BudgetData;
  onConfirm: () => void;
}> = ({ data, onConfirm }) => {
  return (
    <div className="mt-2 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 text-white p-4.5 rounded-[28px] shadow-[0_12px_36px_rgba(0,0,0,0.35)] border border-neutral-800/80 space-y-3.5 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          <span className="text-sm font-black tracking-wider text-red-400 font-['Outfit',sans-serif]">
            RESUMO DO ORÇAMENTO
          </span>
        </div>
        <span className="text-[10px] font-black bg-red-500/20 text-red-300 border border-red-500/40 px-2.5 py-0.5 rounded-full tracking-wider uppercase">
          Pronto para envio
        </span>
      </div>

      <div className="space-y-2 text-xs divide-y divide-neutral-800/80">
        <div className="flex justify-between pt-1">
          <span className="text-neutral-400">Nome:</span>
          <span className="font-semibold text-neutral-100 text-right">{data.nome || "Não informado"}</span>
        </div>
        <div className="flex justify-between pt-1.5">
          <span className="text-neutral-400">Serviço:</span>
          <span className="font-semibold text-neutral-100 text-right">{data.servico || "Pinturas em Geral"}</span>
        </div>
        <div className="flex justify-between pt-1.5">
          <span className="text-neutral-400">Cidade:</span>
          <span className="font-semibold text-neutral-100 text-right">{data.cidade || "Não informado"}</span>
        </div>
        <div className="flex flex-col pt-1.5">
          <span className="text-neutral-400 mb-0.5">Descrição:</span>
          <span className="font-medium text-neutral-200 bg-neutral-950/70 p-2.5 rounded-xl border border-neutral-800">
            {data.descricao || "Sem detalhes adicionais"}
          </span>
        </div>
        {data.fotoUrl && (
          <div className="flex items-center justify-between pt-1.5">
            <span className="text-neutral-400">Foto anexa:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5" />
              {data.fotoNome || "Foto selecionada"}
            </span>
          </div>
        )}
        <div className="flex justify-between pt-1.5">
          <span className="text-neutral-400">Telefone WhatsApp:</span>
          <span className="font-semibold text-emerald-400 text-right">{data.telefone || "Não informado"}</span>
        </div>
      </div>

      <button
        id="btn-confirmar-orcamento"
        onClick={() => {
          soundManager.playTap();
          onConfirm();
        }}
        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-2xl shadow-[0_6px_20px_rgba(16,185,129,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] active:scale-98 transition-all flex items-center justify-center gap-2 tracking-wide cursor-pointer"
      >
        <CheckCircle2 className="w-5 h-5 text-white" />
        <span>✅ CONFIRMAR ORÇAMENTO</span>
      </button>
    </div>
  );
};
