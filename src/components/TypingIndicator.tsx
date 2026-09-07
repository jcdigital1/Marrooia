import React from 'react';
import { EMPRESA } from '../config';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-2 my-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Bot Avatar */}
      <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-b from-neutral-600 via-neutral-800 to-black shrink-0 shadow-md">
        <img
          src={EMPRESA.logo}
          alt={EMPRESA.nome}
          className="w-full h-full object-cover rounded-full bg-neutral-950"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* 3D Bubble */}
      <div className="bg-[#16171E] px-3.5 py-2.5 rounded-2xl rounded-bl-xs shadow-[0_6px_20px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.18)] border border-neutral-700/80 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce" />
        </div>
        <span className="text-xs text-neutral-300 font-medium tracking-tight">
          digitando...
        </span>
      </div>
    </div>
  );
};
