export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaq: FaqItem[] = [
  {
    question: "Como funciona o atendimento da ALAVI?",
    answer:
      "Você envia seu pedido de orçamento pelo site ou pelo WhatsApp, contando o que precisa (destino, datas, número de viajantes). A partir disso, montamos alternativas de passagens, hospedagem e roteiro para você avaliar antes de decidir.",
  },
  {
    question: "A ALAVI trabalha com passagens usando pontos ou milhas?",
    answer:
      "Sim. Analisamos os pontos e milhas que você já possui, orientamos sobre transferências entre programas e buscamos oportunidades de emissão. A disponibilidade de assentos com pontos varia conforme o programa e a data, e isso é informado com transparência durante o atendimento.",
  },
  {
    question: "É possível montar um roteiro totalmente personalizado?",
    answer:
      "Sim. Além de pacotes prontos, montamos roteiros sob medida considerando tempo disponível, orçamento e o estilo de viagem que você procura, seja a lazer, em família ou para lua de mel.",
  },
  {
    question: "Quais formas de contato estão disponíveis?",
    answer:
      "Você pode falar com a ALAVI pelo formulário de orçamento do site ou diretamente pelo WhatsApp, disponível em botões ao longo de todas as páginas.",
  },
  {
    question: "O orçamento tem algum custo?",
    answer:
      "Não. Solicitar um orçamento é gratuito e sem compromisso — você recebe as opções disponíveis e decide se quer avançar.",
  },
];
