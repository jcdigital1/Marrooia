// Central configuration for MARROOIA - Pinturas em Geral
// Conforme solicitado na seção 21 do documento de requisitos

export const EMPRESA = {
  nome: "MARROOIA",
  descricao: "Pinturas em Geral",
  slogan: "Pinturas em Geral • Residencial e Comercial • Limpeza de Placas Solar",
  subtitulo: "Residencial e Comercial | Limpeza de Placas Solar",
  whatsapp1: "5563984036382",
  whatsapp2: "5563992663256",
  whatsapp1Formatado: "(63) 98403-6382",
  whatsapp2Formatado: "(63) 99266-3256",
  logo: "https://i.postimg.cc/g2w8yCnJ/file-00000000ab18820eb8ad6adc6b70f20c.png",
};

export const SERVICES_INFO = [
  {
    id: "geral",
    icon: "🎨",
    title: "PINTURAS EM GERAL",
    description: "Serviços completos de pintura e acabamento com materiais e técnicas de alta qualidade.",
    highlights: ["Preparação de superfícies", "Acabamento fino", "Durabilidade garantida"]
  },
  {
    id: "residencial",
    icon: "🏠",
    title: "RESIDENCIAL",
    description: "Pinturas para casas e ambientes residenciais, interiores, exteriores e detalhes decorativos.",
    highlights: ["Pintura interna e externa", "Tetos e paredes", "Fachadas residenciais"]
  },
  {
    id: "comercial",
    icon: "🏢",
    title: "COMERCIAL",
    description: "Pinturas para lojas, empresas, galpões e estabelecimentos comerciais com rapidez e eficiência.",
    highlights: ["Fachadas comerciais", "Lojas e escritórios", "Mínimo impacto no funcionamento"]
  },
  {
    id: "solar",
    icon: "☀️",
    title: "LIMPEZA DE PLACAS SOLAR",
    description: "Limpeza profissional de painéis solares para recuperar a eficiência máxima da sua geração de energia.",
    highlights: ["Equipamentos específicos", "Aumento da geração de energia", "Atendimento residencial e comercial"]
  }
];

export function buildWhatsAppLink(phone: string, text?: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const base = `https://wa.me/${cleanPhone}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function generateBudgetMessage(data: {
  nome: string;
  servico: string;
  cidade: string;
  descricao: string;
  telefone: string;
  fotoNome?: string;
}): string {
  const nome = data.nome?.trim() || "Não informado";
  const servico = data.servico?.trim() || "Pinturas em Geral";
  const cidade = data.cidade?.trim() || "Não informado";
  const telefone = data.telefone?.trim() || "Não informado";
  const descricao = data.descricao?.trim() || "Solicitação de orçamento e visita técnica";

  return `*SOLICITAÇÃO DE ORÇAMENTO — MARROOIA* 🎨✨

Olá equipe MARROOIA! Finalizei meu atendimento pelo site e gostaria de solicitar um orçamento formal:

👤 *Cliente:* ${nome}
🛠️ *Serviço:* ${servico}
📍 *Cidade / Local:* ${cidade}
📱 *WhatsApp de Contato:* ${telefone}

📝 *Descrição / Detalhes da Obra:*
"${descricao}"

Por gentileza, poderiam me informar os valores e a disponibilidade para atendimento ou visita técnica? Aguardo o retorno de vocês, muito obrigado! 🤝`;
}
