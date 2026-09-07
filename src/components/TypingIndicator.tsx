import React from 'react';
import { EMPRESA } from '../config';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-2 my-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Bot Avatar */}
      <div className="w-8 h-8 rounded-full p-0.5 bg-neutral-900 shrink-0 shadow-xs">
        <img
          src={EMPRESA.logo}
          alt={EMPRESA.nome}
          className="w-full h-full object-cover rounded-full bg-white"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Bubble */}
      <div className="bg-white px-3.5 py-2 rounded-2xl rounded-bl-xs shadow-xs border border-neutral-200/70 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-neutral-700 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
        </div>
        <span className="text-xs text-neutral-500 font-medium tracking-tight">
          digitando...
        </span>
      </div>
    </div>
  );
};
