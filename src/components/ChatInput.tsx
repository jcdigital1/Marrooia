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
      className="sticky bottom-0 z-30 w-full bg-white/90 backdrop-blur-2xl border-t border-neutral-200/80 shadow-[0_-4px_24px_rgba(0,0,0,0.03)] px-3 py-2.5 transition-all"
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

        {/* Plus / Camera Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Enviar foto ou documento"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-600 active:scale-90 transition-all shrink-0 shadow-xs"
        >
          <Camera className="w-4.5 h-4.5" />
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
              placeholder="Mensagem..."
              className="w-full bg-neutral-100/90 focus:bg-white text-neutral-900 placeholder:text-neutral-400 text-[16px] px-4 py-2 rounded-full border border-neutral-200/90 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition-all focus:outline-none"
            />
          </div>

          {/* 3D iOS Send Button */}
          <button
            id="btn-send-message"
            type="submit"
            disabled={!text.trim() || disabled}
            title="Enviar mensagem"
            className={`w-9 h-9 flex items-center justify-center rounded-full shrink-0 shadow-md transition-all active:scale-90 ${
              text.trim() && !disabled
                ? 'bg-gradient-to-b from-red-500 to-red-600 text-white shadow-[0_4px_12px_rgba(220,38,38,0.35)] cursor-pointer'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4 translate-x-px" />
          </button>
        </form>
      </div>
    </div>
  );
};

