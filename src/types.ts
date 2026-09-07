export type SenderType = 'bot' | 'user';

export type MessageType =
  | 'text'
  | 'quick_replies'
  | 'service_cards'
  | 'budget_step_service'
  | 'budget_step_name'
  | 'budget_step_city'
  | 'budget_step_description'
  | 'budget_step_photo'
  | 'budget_step_phone'
  | 'budget_summary'
  | 'whatsapp_cards'
  | 'company_info'
  | 'audio_note'
  | 'footer';

export interface QuickOption {
  label: string;
  action: string;
  icon?: string;
  payload?: any;
}

export interface ChatMessage {
  id: string;
  sender: SenderType;
  text?: string;
  timestamp: string;
  type?: MessageType;
  options?: QuickOption[];
  data?: any;
  image?: string;
  reaction?: string;
  isAudioNote?: boolean;
  audioDuration?: string;
}

export interface BudgetData {
  servico: string;
  nome: string;
  cidade: string;
  descricao: string;
  fotoUrl?: string;
  fotoNome?: string;
  telefone: string;
}
