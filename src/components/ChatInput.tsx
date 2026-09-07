import React, { useState, useRef } from 'react';
import { Send, Camera } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string, image?: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text.trim());
    setText('');
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onSendMessage('📷 [Foto enviada pelo usuário]', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      id="chat-input-bar"
      className="sticky bottom-0 z-30 w-full bg-neutral-950/90 backdrop-blur-2xl border-t border-neutral-800/90 shadow-[0_-8px_32px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] px-3 py-2.5 transition-all"
    >
      <div className="max-w-xl mx-auto flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          capture="environment"
          onChange={handlePhotoSelect}
          className="hidden"
        />

        {/* 3D Camera / Media Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Enviar foto ou documento"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-b from-[#22242E] to-[#14151B] hover:from-[#2B2D3A] hover:to-[#1A1B22] text-neutral-300 hover:text-white border border-neutral-700/90 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.18)] active:scale-90 transition-all shrink-0 cursor-pointer"
        >
          <Camera className="w-5 h-5 drop-shadow-xs" />
        </button>

        {/* Text Input Pill */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <input
              id="input-user-message"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={disabled}
              placeholder="Digite sua mensagem..."
              className="w-full bg-[#15161D] focus:bg-[#1A1B24] text-white placeholder:text-neutral-500 text-[16px] px-4 py-2.5 rounded-full border border-neutral-700/90 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.05)] transition-all focus:outline-none"
            />
          </div>

          {/* 3D iOS Send Button */}
          <button
            id="btn-send-message"
            type="submit"
            disabled={!text.trim() || disabled}
            title="Enviar mensagem"
            className={`w-10 h-10 flex items-center justify-center rounded-full shrink-0 transition-all active:scale-90 ${
              text.trim() && !disabled
                ? 'bg-gradient-to-b from-red-500 via-red-600 to-rose-700 text-white shadow-[0_4px_16px_rgba(220,38,38,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.45)] border border-red-400/40 cursor-pointer'
                : 'bg-neutral-900 text-neutral-600 border border-neutral-800 cursor-not-allowed'
            }`}
          >
            <Send className="w-4.5 h-4.5 translate-x-px" />
          </button>
        </form>
      </div>
    </div>
  );
};
