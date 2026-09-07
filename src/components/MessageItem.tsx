import React, { useState } from 'react';
import { CheckCheck } from 'lucide-react';
import { ChatMessage, QuickOption, BudgetData } from '../types';
import { Avatar } from './Avatar';
import { BudgetInlineForm, BudgetSummaryCard } from './BudgetCards';
import { ServiceCards } from './ServiceCards';
import { WhatsAppCards } from './WhatsAppCards';
import { FooterCard } from './FooterCard';

interface MessageItemProps {
  message: ChatMessage;
  onOptionClick: (option: QuickOption) => void;
  onBudgetSubmit: (field: keyof BudgetData, value: string, extra?: { fotoNome?: string }) => void;
  onBudgetSkipPhoto: () => void;
  onBudgetConfirm: () => void;
  onOpenWhatsApp: () => void;
  onSelectServicos: () => void;
  onStartOrcamento: () => void;
  onOpenProfile: () => void;
  budgetData: BudgetData;
  onReactToMessage?: (messageId: string, emoji: string) => void;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onOptionClick,
  onBudgetSubmit,
  onBudgetSkipPhoto,
  onBudgetConfirm,
  onOpenWhatsApp,
  onSelectServicos,
  onStartOrcamento,
  onOpenProfile,
  budgetData,
  onReactToMessage,
  isFirstInGroup = true,
  isLastInGroup = true,
}) => {
  const isUser = message.sender === 'user';
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  const handleReaction = (emoji: string) => {
    if (onReactToMessage) {
      onReactToMessage(message.id, emoji);
    }
    setShowReactionPicker(false);
  };

  // Modern dynamic bubble corner grouping
  const getBubbleRadius = () => {
    if (isUser) {
      const tr = isFirstInGroup ? 'rounded-tr-2xl' : 'rounded-tr-md';
      const br = isLastInGroup ? 'rounded-br-xs' : 'rounded-br-md';
      return `rounded-2xl ${tr} ${br}`;
    } else {
      const tl = isFirstInGroup ? 'rounded-tl-2xl' : 'rounded-tl-md';
      const bl = isLastInGroup ? 'rounded-bl-xs' : 'rounded-bl-md';
      return `rounded-2xl ${tl} ${bl}`;
    }
  };

  return (
    <div
      className={`relative flex flex-col transition-all duration-200 group ${
        isFirstInGroup ? 'mt-3 mb-0.5' : 'mt-1 mb-0.5'
      } ${isUser ? 'items-end' : 'items-start'}`}
    >
      {/* iOS Floating Reaction Picker */}
      {showReactionPicker && (
        <div
          className={`absolute -top-9 z-30 flex items-center gap-1.5 bg-neutral-900/95 backdrop-blur-xl px-2.5 py-1 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] border border-neutral-700 animate-in zoom-in-95 duration-150 ${
            isUser ? 'right-2' : 'left-10'
          }`}
        >
          {['❤️', '👍', '🎨', '🔥', '👏'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              className="text-base hover:scale-125 active:scale-95 transition-transform p-0.5 cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <div className={`flex items-end gap-1.5 sm:gap-2 max-w-[95%] sm:max-w-[88%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Bot Avatar: only show on the last message of the group for clean visual hierarchy */}
        {!isUser && (
          isLastInGroup ? (
            <Avatar
              size="sm"
              onClick={onOpenProfile}
              className="mb-0.5 cursor-pointer hover:scale-110 transition-transform shrink-0 shadow-md"
            />
          ) : (
            <div className="w-8 shrink-0 select-none pointer-events-none" />
          )
        )}

        {/* 3D Bubble */}
        <div
          onClick={() => setShowReactionPicker(!showReactionPicker)}
          className={`relative px-3.5 sm:px-4 py-2.5 cursor-pointer select-none transition-all duration-150 active:scale-[0.99] max-w-full min-w-0 break-words [overflow-wrap:anywhere] ${getBubbleRadius()} ${
            isUser
              ? 'bg-gradient-to-b from-red-600 via-red-600 to-rose-700 text-white shadow-[0_8px_20px_rgba(220,38,38,0.35),0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.45)] border-t border-white/30'
              : 'bg-[#16171E] text-white shadow-[0_10px_28px_rgba(0,0,0,0.7),0_2px_6px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.18)] border border-neutral-700/80 hover:border-neutral-600'
          }`}
        >
          {/* Text content with preserved line breaks and pure white typography */}
          {message.text && (
            <div className="text-[14.5px] sm:text-[15px] leading-relaxed font-normal whitespace-pre-line tracking-tight break-words [overflow-wrap:anywhere] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              {message.text}
            </div>
          )}

          {/* Attached image preview */}
          {message.image && (
            <div className="mt-2.5 rounded-2xl overflow-hidden border border-neutral-700 shadow-md max-h-52 bg-black">
              <img src={message.image} alt="Foto anexada" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Service Cards */}
          {message.type === 'service_cards' && (
            <ServiceCards
              onSelectService={(key, title) => {
                onOptionClick({
                  label: `Conhecer ${title}`,
                  action: `servico_${key}`,
                  payload: key,
                });
              }}
            />
          )}

          {/* Budget Forms */}
          {message.type === 'budget_step_name' && (
            <BudgetInlineForm step="name" onSubmit={onBudgetSubmit} currentData={budgetData} />
          )}

          {message.type === 'budget_step_city' && (
            <BudgetInlineForm step="city" onSubmit={onBudgetSubmit} currentData={budgetData} />
          )}

          {message.type === 'budget_step_description' && (
            <BudgetInlineForm step="description" onSubmit={onBudgetSubmit} currentData={budgetData} />
          )}

          {message.type === 'budget_step_photo' && (
            <BudgetInlineForm step="photo" onSubmit={onBudgetSubmit} onSkipPhoto={onBudgetSkipPhoto} currentData={budgetData} />
          )}

          {message.type === 'budget_step_phone' && (
            <BudgetInlineForm step="phone" onSubmit={onBudgetSubmit} currentData={budgetData} />
          )}

          {message.type === 'budget_summary' && (
            <BudgetSummaryCard data={budgetData} onConfirm={onBudgetConfirm} />
          )}

          {message.type === 'whatsapp_cards' && (
            <WhatsAppCards
              budgetData={message.data?.budgetData || (budgetData.nome ? budgetData : undefined)}
              customText={message.data?.customText}
            />
          )}

          {message.type === 'footer' && (
            <FooterCard
              onOpenWhatsApp={onOpenWhatsApp}
              onSelectServicos={onSelectServicos}
              onStartOrcamento={onStartOrcamento}
            />
          )}

          {/* Timestamp and Delivery Marks */}
          <div
            className={`flex items-center justify-end gap-1 mt-1 text-[10px] font-medium select-none ${
              isUser ? 'text-white/85' : 'text-neutral-400'
            }`}
          >
            <span>{message.timestamp}</span>
            {isUser && <CheckCheck className="w-3.5 h-3.5 text-white/95" />}
          </div>

          {/* Attached Reaction Pill */}
          {message.reaction && (
            <div
              className={`absolute -bottom-2.5 ${
                isUser ? 'left-3' : 'right-3'
              } bg-[#1D1E26] rounded-full px-2 py-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.6)] border border-neutral-700 text-xs flex items-center animate-in zoom-in-75 duration-150`}
            >
              <span>{message.reaction}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3D iOS Quick Reply Options - Tactile Raised Buttons */}
      {!isUser && message.options && message.options.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2.5 pl-8 sm:pl-10 pr-1 w-full max-w-full box-border">
          {message.options.map((opt, idx) => (
            <button
              key={`${message.id}-opt-${idx}`}
              type="button"
              onClick={() => onOptionClick(opt)}
              className="group bg-gradient-to-b from-[#22242E] to-[#16171E] hover:from-[#2C2E3B] hover:to-[#1E1F28] active:from-[#14151B] active:to-[#101115] text-white hover:text-sky-300 border border-neutral-700/90 hover:border-sky-500/50 px-3.5 py-2.5 rounded-2xl text-xs font-bold shadow-[0_4px_14px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.18)] active:translate-y-0.5 active:shadow-[0_1px_3px_rgba(0,0,0,0.7)] transition-all flex items-center gap-2 cursor-pointer max-w-full"
            >
              {opt.icon && <span className="text-sm shrink-0 drop-shadow-xs">{opt.icon}</span>}
              <span className="font-semibold tracking-tight truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
