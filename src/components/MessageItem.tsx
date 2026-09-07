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
          className={`absolute -top-9 z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-xl px-2.5 py-1 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.18)] border border-neutral-200/80 animate-in zoom-in-95 duration-150 ${
            isUser ? 'right-2' : 'left-10'
          }`}
        >
          {['❤️', '👍', '🎨', '🔥', '👏'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              className="text-base hover:scale-125 active:scale-95 transition-transform p-0.5"
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
              className="mb-0.5 cursor-pointer hover:scale-110 transition-transform shrink-0 shadow-xs"
            />
          ) : (
            <div className="w-8 shrink-0 select-none pointer-events-none" />
          )
        )}

        {/* Bubble */}
        <div
          onClick={() => setShowReactionPicker(!showReactionPicker)}
          className={`relative px-3.5 sm:px-4 py-2.5 cursor-pointer select-none transition-all duration-150 active:scale-[0.99] max-w-full min-w-0 break-words [overflow-wrap:anywhere] ${getBubbleRadius()} ${
            isUser
              ? 'bg-gradient-to-b from-red-600 via-red-600 to-rose-700 text-white shadow-[0_4px_14px_rgba(220,38,38,0.22),inset_0_1px_1px_rgba(255,255,255,0.35)] border-t border-white/20'
              : 'bg-white text-neutral-900 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-neutral-200/75'
          }`}
        >
          {/* Text content with preserved line breaks */}
          {message.text && (
            <div className="text-[14.5px] leading-relaxed font-normal whitespace-pre-line tracking-tight break-words [overflow-wrap:anywhere]">
              {message.text}
            </div>
          )}

          {/* Attached image preview */}
          {message.image && (
            <div className="mt-2.5 rounded-2xl overflow-hidden border border-black/10 shadow-sm max-h-52">
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
              isUser ? 'text-white/80' : 'text-neutral-400'
            }`}
          >
            <span>{message.timestamp}</span>
            {isUser && <CheckCheck className="w-3.5 h-3.5 text-white/90" />}
          </div>

          {/* Attached Reaction Pill */}
          {message.reaction && (
            <div
              className={`absolute -bottom-2.5 ${
                isUser ? 'left-3' : 'right-3'
              } bg-white rounded-full px-2 py-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-neutral-200/80 text-xs flex items-center animate-in zoom-in-75 duration-150`}
            >
              <span>{message.reaction}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3D iOS Quick Reply Options - Organized Grid / Wrap */}
      {!isUser && message.options && message.options.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 pl-8 sm:pl-10 pr-1 w-full max-w-full box-border">
          {message.options.map((opt, idx) => (
            <button
              key={`${message.id}-opt-${idx}`}
              type="button"
              onClick={() => onOptionClick(opt)}
              className="group bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-800 hover:text-red-600 border border-neutral-200/90 hover:border-red-500/40 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer max-w-full"
            >
              {opt.icon && <span className="text-sm shrink-0">{opt.icon}</span>}
              <span className="font-medium tracking-tight truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
