export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon:
    | "plane"
    | "hotel"
    | "package"
    | "route"
    | "castle"
    | "coaster"
    | "shield"
    | "transfer"
    | "experience"
    | "concierge"
    | "executive";
}

/**
 * Lista enxuta de serviços (decisão de simplificação do redesign premium —
 * ver DECISOES-TECNICAS.md). "Pontos e Milhas" deixou de ser um serviço em
 * destaque no menu/grade principal.
 */
export const services: Service[] = [
  {
    slug: "passagens-aereas",
    name: "Passagens Aéreas",
    shortDescription: "Voos nacionais e internacionais com a melhor relação entre itinerário e custo.",
    description:
      "Buscamos as melhores opções de voos nacionais e internacionais para o seu roteiro, considerando conexões, horários e companhias aéreas. Você recebe alternativas comparadas antes de decidir.",
    icon: "plane",
  },
  {
    slug: "classe-executiva",
    name: "Classe Executiva",
    shortDescription: "Mais conforto em voos longos, com uso estratégico de pontos e milhas.",
    description:
      "Avaliamos a disponibilidade de assentos em classe executiva com pontos e milhas, orientamos sobre transferências entre programas e buscamos as melhores oportunidades de emissão para o seu roteiro.",
    icon: "executive",
  },
  {
    slug: "hospedagens",
    name: "Hospedagens",
    shortDescription: "Hotéis, resorts e pousadas alinhados ao estilo da sua viagem.",
    description:
      "Indicamos hospedagens alinhadas ao perfil da viagem — de opções econômicas a hospedagens de alto padrão — sempre considerando localização e custo-benefício.",
    icon: "hotel",
  },
  {
    slug: "pacotes",
    name: "Pacotes",
    shortDescription: "Passagem, hospedagem e serviços organizados em um único pacote.",
    description:
      "Montamos pacotes combinando passagens, hospedagem, transfer e passeios, simplificando o planejamento e a organização financeira da viagem.",
    icon: "package",
  },
  {
    slug: "roteiros",
    name: "Roteiros",
    shortDescription: "Viagens desenhadas conforme o tempo, o orçamento e o estilo do viajante.",
    description:
      "Cada viagem é diferente. Construímos roteiros sob medida, considerando tempo disponível, orçamento, número de viajantes e o tipo de experiência que você procura.",
    icon: "route",
  },
  {
    slug: "disney",
    name: "Disney",
    shortDescription: "Parques, ingressos e logística pensados nos mínimos detalhes.",
    description:
      "Planejamento completo para os parques Disney: escolha de ingressos, otimização de dias de parque, hospedagem e dicas para aproveitar cada momento com a família.",
    icon: "castle",
  },
  {
    slug: "universal",
    name: "Universal",
    shortDescription: "Roteiros para os parques da Universal Orlando sem perder tempo em filas.",
    description:
      "Organizamos a visita aos parques da Universal Orlando com planejamento de ingressos e logística para aproveitar melhor cada dia de parque.",
    icon: "coaster",
  },
  {
    slug: "seguro-viagem",
    name: "Seguro Viagem",
    shortDescription: "Orientação para escolher a cobertura adequada ao seu roteiro.",
    description:
      "Ajudamos a entender as opções de seguro viagem disponíveis para o seu destino, para que você viaje com mais tranquilidade em caso de imprevistos.",
    icon: "shield",
  },
  {
    slug: "transfers",
    name: "Transfers",
    shortDescription: "Deslocamentos entre aeroporto, hotel e passeios organizados previamente.",
    description:
      "Organizamos o transfer entre aeroporto e hospedagem — e entre pontos do roteiro, quando aplicável — para reduzir a logística durante a viagem.",
    icon: "transfer",
  },
  {
    slug: "experiencias",
    name: "Experiências",
    shortDescription: "Passeios e atividades que tornam a viagem mais marcante.",
    description:
      "Sugerimos passeios, atrações e atividades que enriquecem o roteiro, de acordo com o perfil e os interesses de cada viajante.",
    icon: "experience",
  },
  {
    slug: "consultoria-personalizada",
    name: "Consultoria Personalizada",
    shortDescription: "Um especialista dedicado a pensar a sua viagem do início ao fim.",
    description:
      "Atendimento próximo e consultivo, para quem quer uma viagem pensada nos detalhes — do primeiro contato ao seu retorno para casa.",
    icon: "concierge",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
