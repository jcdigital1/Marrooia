import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatBackground } from './components/ChatBackground';
import { Header } from './components/Header';
import { MessageItem } from './components/MessageItem';
import { TypingIndicator } from './components/TypingIndicator';
import { ChatInput } from './components/ChatInput';
import { WhatsAppModal } from './components/WhatsAppModal';
import { ProfileModal } from './components/ProfileModal';
import { ProfileHeroCard } from './components/ProfileHeroCard';
import { ChatMessage, QuickOption, BudgetData } from './types';
import { EMPRESA, generateBudgetMessage } from './config';
import { soundManager } from './utils/sound';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Budget state
  const [budgetData, setBudgetData] = useState<BudgetData>({
    servico: '',
    nome: '',
    cidade: '',
    descricao: '',
    telefone: '',
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef<boolean>(false);

  const [showScrollBottomButton, setShowScrollBottomButton] = useState(false);

  // Smooth & deterministic scroll to latest messages
  const scrollToBottom = useCallback((smooth = true) => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight + 1500,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end',
      });
    }
    // Also scroll window in case of mobile browser address bar reflow
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  }, []);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    setShowScrollBottomButton(distanceToBottom > 160);
  };

  // Multi-frame scroll trigger to ensure dynamic layouts, cards and options are in full view
  const triggerAutoScroll = useCallback((smooth = true) => {
    scrollToBottom(smooth);
    requestAnimationFrame(() => scrollToBottom(smooth));
    setTimeout(() => scrollToBottom(smooth), 60);
    setTimeout(() => scrollToBottom(smooth), 180);
    setTimeout(() => scrollToBottom(smooth), 350);
  }, [scrollToBottom]);

  // Auto-scroll on messages and typing changes
  useEffect(() => {
    triggerAutoScroll(true);
  }, [messages, isTyping, triggerAutoScroll]);

  // MutationObserver on the chat container to scroll whenever DOM content expands
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      triggerAutoScroll(true);
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [triggerAutoScroll]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Helper to add bot message with typing indicator
  const sendBotMessageWithDelay = async (
    msg: Omit<ChatMessage, 'id' | 'sender' | 'timestamp'>,
    delayMs = 700
  ) => {
    setIsTyping(true);
    triggerAutoScroll(true);
    await new Promise((r) => setTimeout(r, delayMs));
    setIsTyping(false);

    soundManager.playReceive();

    const newMsg: ChatMessage = {
      ...msg,
      id: `bot-${Date.now()}-${Math.random()}`,
      sender: 'bot',
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, newMsg]);
    triggerAutoScroll(true);
    return newMsg;
  };

  // Opening dynamic conversation sequence (as required)
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const startConversation = async () => {
      await new Promise((r) => setTimeout(r, 450));

      // 1. Welcome Greeting
      await sendBotMessageWithDelay({
        text: 'Olá! 👋 Seja bem-vindo à MARROOOIA!',
      }, 500);

      // 2. Specialized services intro
      await sendBotMessageWithDelay({
        text: 'Somos especializados em pinturas em geral, serviços residenciais e comerciais e limpeza profissional de placas solares.',
      }, 650);

      // 3. Quick options
      await sendBotMessageWithDelay({
        text: 'Como podemos ajudar você hoje?',
        type: 'quick_replies',
        options: [
          { label: 'Pintura Residencial', icon: '🎨', action: 'flow_residencial' },
          { label: 'Pintura Comercial', icon: '🏢', action: 'flow_comercial' },
          { label: 'Limpeza de Placas Solar', icon: '☀️', action: 'flow_solar' },
          { label: 'Solicitar Orçamento', icon: '💰', action: 'flow_orcamento' },
          { label: 'Conhecer nossos serviços', icon: '📋', action: 'flow_servicos' },
          { label: 'Conhecer a empresa', icon: '📍', action: 'flow_empresa' },
        ],
      }, 550);
    };

    startConversation();
  }, []);

  const addUserMessage = (text: string, image?: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      image,
      timestamp: getCurrentTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    return userMsg;
  };

  // Handle message reactions (iOS tapback)
  const handleReactToMessage = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, reaction: emoji } : m))
    );
  };

  // Flow controllers
  const handleAction = async (action: string, label?: string, payload?: any) => {
    if (label) {
      addUserMessage(label);
    }

    if (action === 'flow_inicio') {
      await sendBotMessageWithDelay({
        text: 'Como podemos ajudar você hoje?',
        type: 'quick_replies',
        options: [
          { label: 'Pintura Residencial', icon: '🎨', action: 'flow_residencial' },
          { label: 'Pintura Comercial', icon: '🏢', action: 'flow_comercial' },
          { label: 'Limpeza de Placas Solar', icon: '☀️', action: 'flow_solar' },
          { label: 'Solicitar Orçamento', icon: '💰', action: 'flow_orcamento' },
          { label: 'Conhecer nossos serviços', icon: '📋', action: 'flow_servicos' },
          { label: 'Conhecer a empresa', icon: '📍', action: 'flow_empresa' },
        ],
      }, 500);
      return;
    }

    // Section 6: Pintura Residencial
    if (action === 'flow_residencial') {
      await sendBotMessageWithDelay({
        text: 'Ótima escolha! 🎨 Trabalhamos com pintura residencial e acabamento de ambientes.',
      }, 600);

      await sendBotMessageWithDelay({
        text: 'Qual serviço você procura?',
        type: 'quick_replies',
        options: [
          { label: 'Pintura interna', icon: '🏠', action: 'res_interna' },
          { label: 'Pintura externa', icon: '🏡', action: 'res_externa' },
          { label: 'Pintura de paredes', icon: '🎨', action: 'res_paredes' },
          { label: 'Pintura de fachada', icon: '🧱', action: 'res_fachada' },
          { label: 'Outro serviço', icon: '🔧', action: 'res_outro' },
        ],
      }, 700);
      return;
    }

    if (action.startsWith('res_')) {
      const serviceName = label?.replace(/^[^\s]+\s/, '') || 'Pintura Residencial';
      setBudgetData((prev) => ({ ...prev, servico: `Pintura Residencial (${serviceName})` }));

      await sendBotMessageWithDelay({
        text: 'Quer solicitar um orçamento?',
        type: 'quick_replies',
        options: [
          { label: 'Sim, solicitar orçamento', icon: '💰', action: 'flow_orcamento_start_name' },
          { label: 'Voltar ao início', icon: '⬅️', action: 'flow_inicio' },
        ],
      }, 600);
      return;
    }

    // Section 7: Pintura Comercial
    if (action === 'flow_comercial') {
      await sendBotMessageWithDelay({
        text: 'Também realizamos pinturas para estabelecimentos comerciais, lojas, empresas, fachadas e outros espaços.',
      }, 650);

      await sendBotMessageWithDelay({
        text: 'Que tipo de serviço você precisa?',
        type: 'quick_replies',
        options: [
          { label: 'Pintura comercial', icon: '🏢', action: 'com_comercial' },
          { label: 'Fachada', icon: '🎨', action: 'com_fachada' },
          { label: 'Loja', icon: '🏬', action: 'com_loja' },
          { label: 'Empresa', icon: '🏭', action: 'com_empresa' },
          { label: 'Outro', icon: '🔧', action: 'com_outro' },
        ],
      }, 700);
      return;
    }

    if (action.startsWith('com_')) {
      const serviceName = label?.replace(/^[^\s]+\s/, '') || 'Pintura Comercial';
      setBudgetData((prev) => ({ ...prev, servico: `Pintura Comercial (${serviceName})` }));

      await sendBotMessageWithDelay({
        text: 'Quer solicitar um orçamento?',
        type: 'quick_replies',
        options: [
          { label: 'Solicitar orçamento', icon: '💰', action: 'flow_orcamento_start_name' },
          { label: 'Voltar ao início', icon: '⬅️', action: 'flow_inicio' },
        ],
      }, 600);
      return;
    }

    // Section 8: Limpeza de Placas Solar
    if (action === 'flow_solar') {
      await sendBotMessageWithDelay({
        text: 'Realizamos limpeza profissional de placas solares, ajudando a manter os painéis livres de sujeira e resíduos.',
      }, 650);

      await sendBotMessageWithDelay({
        text: 'Seu sistema é:',
        type: 'quick_replies',
        options: [
          { label: 'Residencial', icon: '🏠', action: 'solar_residencial' },
          { label: 'Comercial', icon: '🏢', action: 'solar_comercial' },
        ],
      }, 650);
      return;
    }

    if (action.startsWith('solar_')) {
      const systemType = label?.replace(/^[^\s]+\s/, '') || 'Solar';
      setBudgetData((prev) => ({ ...prev, servico: `Limpeza de Placas Solar (${systemType})` }));

      await sendBotMessageWithDelay({
        text: 'Gostaria de solicitar um orçamento?',
        type: 'quick_replies',
        options: [
          { label: 'Solicitar orçamento', icon: '☀️', action: 'flow_orcamento_start_name' },
          { label: 'Voltar', icon: '⬅️', action: 'flow_inicio' },
        ],
      }, 600);
      return;
    }

    // Section 9: Serviços
    if (action === 'flow_servicos') {
      await sendBotMessageWithDelay({
        text: 'Apresentamos nossos serviços de excelência:',
        type: 'service_cards',
      }, 600);

      await sendBotMessageWithDelay({
        text: 'Qual desses serviços você gostaria de conhecer melhor?',
        type: 'quick_replies',
        options: [
          { label: 'Pinturas em Geral', icon: '🎨', action: 'servico_geral' },
          { label: 'Pintura Residencial', icon: '🏠', action: 'flow_residencial' },
          { label: 'Pintura Comercial', icon: '🏢', action: 'flow_comercial' },
          { label: 'Limpeza de Placas Solar', icon: '☀️', action: 'flow_solar' },
          { label: 'Solicitar Orçamento', icon: '💰', action: 'flow_orcamento' },
        ],
      }, 650);
      return;
    }

    if (action === 'servico_geral') {
      await sendBotMessageWithDelay({
        text: '🎨 PINTURAS EM GERAL\n\nAtuamos com acabamento de alto padrão, preparação técnica de superfícies, emassamento, lixamento e tintas premium para casas, prédios e comércios.',
        type: 'quick_replies',
        options: [
          { label: 'Solicitar Orçamento', icon: '💰', action: 'flow_orcamento' },
          { label: 'Falar pelo WhatsApp', icon: '📱', action: 'flow_whatsapp_direct' },
          { label: 'Voltar ao início', icon: '⬅️', action: 'flow_inicio' },
        ],
      }, 650);
      return;
    }

    // Section 10: Conhecer a Empresa
    if (action === 'flow_empresa') {
      await sendBotMessageWithDelay({
        text: 'Somos a MARROOOIA, especializada em pinturas em geral, serviços residenciais e comerciais e limpeza de placas solares.',
      }, 650);

      await sendBotMessageWithDelay({
        text: 'Estamos prontos para receber sua solicitação e preparar seu atendimento.\n\n🎨 Pinturas em Geral\n🏠 Residencial\n🏢 Comercial\n☀️ Limpeza de Placas Solar',
      }, 750);

      await sendBotMessageWithDelay({
        text: 'Deseja falar conosco?',
        type: 'quick_replies',
        options: [
          { label: 'WhatsApp', icon: '📱', action: 'flow_whatsapp_direct' },
          { label: 'Solicitar orçamento', icon: '💰', action: 'flow_orcamento' },
          { label: 'Voltar ao início', icon: '⬅️', action: 'flow_inicio' },
        ],
      }, 600);
      return;
    }

    if (action === 'flow_whatsapp_direct') {
      await sendBotMessageWithDelay({
        text: 'Escolha um número para atendimento:',
        type: 'whatsapp_cards',
        data: {
          customText: 'Olá! Vim pelo site da MARROOOIA e gostaria de atendimento.',
        },
      }, 600);
      return;
    }

    // Section 11: Orçamento Flow
    if (action === 'flow_orcamento') {
      await sendBotMessageWithDelay({
        text: 'Perfeito! Vamos iniciar seu orçamento. 😊',
      }, 600);

      await sendBotMessageWithDelay({
        text: 'Qual serviço você deseja realizar?',
        type: 'quick_replies',
        options: [
          { label: 'Pintura Residencial', icon: '🎨', action: 'orc_serv_residencial' },
          { label: 'Pintura Comercial', icon: '🏢', action: 'orc_serv_comercial' },
          { label: 'Limpeza de Placas Solar', icon: '☀️', action: 'orc_serv_solar' },
          { label: 'Outro serviço', icon: '🔧', action: 'orc_serv_outro' },
        ],
      }, 650);
      return;
    }

    if (action.startsWith('orc_serv_')) {
      const selectedServ = label?.replace(/^[^\s]+\s/, '') || 'Pinturas em Geral';
      setBudgetData((prev) => ({ ...prev, servico: selectedServ }));
      await promptForName();
      return;
    }

    if (action === 'flow_orcamento_start_name') {
      await promptForName();
      return;
    }
  };

  const promptForName = async () => {
    await sendBotMessageWithDelay({
      text: 'Qual é o seu nome?',
      type: 'budget_step_name',
    }, 600);
  };

  const promptForCity = async () => {
    await sendBotMessageWithDelay({
      text: 'Em qual cidade será realizado o serviço?',
      type: 'budget_step_city',
    }, 600);
  };

  const promptForDescription = async () => {
    await sendBotMessageWithDelay({
      text: 'Conte brevemente o que você precisa.',
      type: 'budget_step_description',
    }, 600);
  };

  const promptForPhoto = async () => {
    await sendBotMessageWithDelay({
      text: 'Se quiser, você também pode enviar uma foto do local.',
      type: 'budget_step_photo',
    }, 600);
  };

  const promptForPhone = async () => {
    await sendBotMessageWithDelay({
      text: 'Qual número de WhatsApp podemos usar para entrar em contato?',
      type: 'budget_step_phone',
    }, 600);
  };

  const promptForSummary = async (updatedData: BudgetData) => {
    await sendBotMessageWithDelay({
      text: 'Confira as informações do seu orçamento:',
      type: 'budget_summary',
    }, 600);
  };

  const handleBudgetSubmit = async (
    field: keyof BudgetData,
    value: string,
    extra?: { fotoNome?: string }
  ) => {
    const updated: BudgetData = {
      ...budgetData,
      [field]: value,
      ...(extra?.fotoNome ? { fotoNome: extra.fotoNome } : {}),
    };
    setBudgetData(updated);

    if (field === 'nome') {
      addUserMessage(`Meu nome é ${value}`);
      await promptForCity();
    } else if (field === 'cidade') {
      addUserMessage(`Cidade: ${value}`);
      await promptForDescription();
    } else if (field === 'descricao') {
      addUserMessage(value);
      await promptForPhoto();
    } else if (field === 'fotoUrl') {
      addUserMessage('📷 Foto anexada com sucesso!', value);
      await promptForPhone();
    } else if (field === 'telefone') {
      addUserMessage(`Meu WhatsApp é: ${value}`);
      await promptForSummary(updated);
    }
  };

  const handleBudgetSkipPhoto = async () => {
    addUserMessage('Pular foto');
    await promptForPhone();
  };

  const handleBudgetConfirm = async () => {
    addUserMessage('✅ CONFIRMAR ORÇAMENTO');

    await sendBotMessageWithDelay({
      text: 'Tudo certo! 🎉',
    }, 600);

    await sendBotMessageWithDelay({
      text: 'Agora escolha um dos nossos números para continuar o atendimento pelo WhatsApp.',
      type: 'whatsapp_cards',
      data: {
        budgetData,
      },
    }, 700);

    await sendBotMessageWithDelay({
      type: 'footer',
    }, 800);
  };

  // Free text input keywords handler
  const handleUserTextMessage = async (text: string, image?: string) => {
    addUserMessage(text, image);

    const lower = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (lower.includes('orcamento') || lower.includes('cotar') || lower.includes('cotacao')) {
      await sendBotMessageWithDelay({
        text: 'Claro! Vamos preparar o seu orçamento agora mesmo.',
      }, 500);
      await handleAction('flow_orcamento');
      return;
    }

    if (lower.includes('preco') || lower.includes('valor') || lower.includes('quanto custa')) {
      await sendBotMessageWithDelay({
        text: 'Os valores são personalizados de acordo com o tamanho da área e acabamento. Podemos montar uma cotação sob medida agora!',
        type: 'quick_replies',
        options: [
          { label: 'Solicitar Orçamento', icon: '💰', action: 'flow_orcamento' },
          { label: 'Falar pelo WhatsApp', icon: '📱', action: 'flow_whatsapp_direct' },
        ],
      }, 600);
      return;
    }

    if (lower.includes('residencial') || lower.includes('casa') || lower.includes('apartamento')) {
      await handleAction('flow_residencial');
      return;
    }

    if (lower.includes('comercial') || lower.includes('loja') || lower.includes('empresa') || lower.includes('galpao')) {
      await handleAction('flow_comercial');
      return;
    }

    if (lower.includes('solar') || lower.includes('placa') || lower.includes('painel')) {
      await handleAction('flow_solar');
      return;
    }

    if (lower.includes('pintura') || lower.includes('pintar')) {
      await sendBotMessageWithDelay({
        text: 'Claro! 🎨 Trabalhamos com pinturas residenciais e comerciais. Posso te ajudar a solicitar um orçamento.',
        type: 'quick_replies',
        options: [
          { label: 'Pintura Residencial', icon: '🎨', action: 'flow_residencial' },
          { label: 'Pintura Comercial', icon: '🏢', action: 'flow_comercial' },
          { label: 'Solicitar Orçamento', icon: '💰', action: 'flow_orcamento' },
        ],
      }, 600);
      return;
    }

    if (
      lower.includes('whatsapp') ||
      lower.includes('contato') ||
      lower.includes('telefone') ||
      lower.includes('numero') ||
      lower.includes('zap') ||
      lower.includes('ligar')
    ) {
      await handleAction('flow_whatsapp_direct');
      return;
    }

    if (lower.includes('servico') || lower.includes('trabalho')) {
      await handleAction('flow_servicos');
      return;
    }

    if (
      lower.includes('cidade') ||
      lower.includes('onde') ||
      lower.includes('local') ||
      lower.includes('atende') ||
      lower.includes('regiao')
    ) {
      await sendBotMessageWithDelay({
        text: 'A MARROOOIA atende com excelência serviços residenciais, comerciais e limpeza de placas solares. Em qual cidade você precisa?',
        type: 'quick_replies',
        options: [
          { label: 'Solicitar Orçamento', icon: '💰', action: 'flow_orcamento' },
          { label: 'Falar pelo WhatsApp', icon: '📱', action: 'flow_whatsapp_direct' },
        ],
      }, 600);
      return;
    }

    if (
      lower.includes('oi') ||
      lower.includes('ola') ||
      lower.includes('bom dia') ||
      lower.includes('boa tarde') ||
      lower.includes('boa noite')
    ) {
      await sendBotMessageWithDelay({
        text: 'Olá! Como a MARROOOIA pode te ajudar hoje?',
        type: 'quick_replies',
        options: [
          { label: 'Pintura Residencial', icon: '🎨', action: 'flow_residencial' },
          { label: 'Pintura Comercial', icon: '🏢', action: 'flow_comercial' },
          { label: 'Limpeza de Placas Solar', icon: '☀️', action: 'flow_solar' },
          { label: 'Solicitar Orçamento', icon: '💰', action: 'flow_orcamento' },
        ],
      }, 600);
      return;
    }

    await sendBotMessageWithDelay({
      text: 'Entendido! Como posso te ajudar melhor com sua solicitação?',
      type: 'quick_replies',
      options: [
        { label: 'Pintura Residencial', icon: '🎨', action: 'flow_residencial' },
        { label: 'Pintura Comercial', icon: '🏢', action: 'flow_comercial' },
        { label: 'Limpeza de Placas Solar', icon: '☀️', action: 'flow_solar' },
        { label: 'Solicitar Orçamento', icon: '💰', action: 'flow_orcamento' },
        { label: 'Falar pelo WhatsApp', icon: '📱', action: 'flow_whatsapp_direct' },
      ],
    }, 600);
  };

  return (
    <div className="w-full h-screen h-[100dvh] bg-neutral-950 flex justify-center selection:bg-red-500 selection:text-white overflow-hidden">
      {/* Desktop iOS frame container with glass shadow */}
      <div className="w-full max-w-[500px] h-full h-[100dvh] bg-[#E8E2D8] flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.6)] relative border-x border-neutral-400/20 overflow-hidden">
        <ChatBackground>
          {/* iOS Translucent Blur Header */}
          <Header
            onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onNavigate={(nav) => {
              if (nav === 'inicio') handleAction('flow_inicio');
              if (nav === 'servicos') handleAction('flow_servicos');
              if (nav === 'orcamento') handleAction('flow_orcamento');
            }}
            isBotTyping={isTyping}
          />

          {/* Central Scrollable Chat Area */}
          <main
            id="chat-messages-container"
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-1 scroll-smooth relative"
          >
            {/* Top iOS Profile Hero Contact Showcase with Prominent Mascot Avatar */}
            <ProfileHeroCard
              onOpenProfileModal={() => setIsProfileModalOpen(true)}
            />

            {/* Date Tag */}
            <div className="flex justify-center my-2">
              <span className="bg-white/70 backdrop-blur-md text-neutral-500 text-[11px] font-semibold px-3 py-0.5 rounded-full shadow-2xs border border-neutral-200/50">
                Hoje
              </span>
            </div>

            {/* Conversation Messages with Grouping Hierarchy */}
            {messages.map((msg, index) => {
              const prevMsg = messages[index - 1];
              const nextMsg = messages[index + 1];
              const isFirstInGroup = !prevMsg || prevMsg.sender !== msg.sender;
              const isLastInGroup = !nextMsg || nextMsg.sender !== msg.sender;

              return (
                <MessageItem
                  key={msg.id}
                  message={msg}
                  isFirstInGroup={isFirstInGroup}
                  isLastInGroup={isLastInGroup}
                  onOptionClick={(opt) => handleAction(opt.action, opt.label, opt.payload)}
                  onBudgetSubmit={handleBudgetSubmit}
                  onBudgetSkipPhoto={handleBudgetSkipPhoto}
                  onBudgetConfirm={handleBudgetConfirm}
                  onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
                  onSelectServicos={() => handleAction('flow_servicos', '📋 Conhecer serviços')}
                  onStartOrcamento={() => handleAction('flow_orcamento', '💰 Solicitar Orçamento')}
                  onOpenProfile={() => setIsProfileModalOpen(true)}
                  budgetData={budgetData}
                  onReactToMessage={handleReactToMessage}
                />
              );
            })}

            {/* Live Typing Indicator */}
            {isTyping && <TypingIndicator />}

            {/* Bottom Anchor for Auto-scroll */}
            <div ref={messagesEndRef} className="h-4 shrink-0 pointer-events-none" />
          </main>

          {/* Floating Jump to Bottom Button if user scrolled up */}
          {showScrollBottomButton && (
            <button
              type="button"
              onClick={() => triggerAutoScroll(true)}
              className="absolute bottom-16 right-4 z-40 bg-neutral-900/90 hover:bg-neutral-900 active:scale-95 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg border border-neutral-700/60 backdrop-blur-md flex items-center gap-1.5 transition-all animate-in fade-in zoom-in-95 cursor-pointer"
            >
              <span>↓ Novas mensagens</span>
            </button>
          )}

          {/* iOS Bottom Message Input Capsule */}
          <ChatInput
            onSendMessage={handleUserTextMessage}
            disabled={isTyping}
          />
        </ChatBackground>
      </div>

      {/* WhatsApp Modal with 3D iOS Cards */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        customMessage={budgetData.nome ? generateBudgetMessage(budgetData) : undefined}
      />

      {/* Full iOS Profile Modal with High-Res Photo & Contact Sheet */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onStartBudget={() => handleAction('flow_orcamento')}
      />
    </div>
  );
}
