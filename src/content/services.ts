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
    | "snow"
    | "seat"
    | "shield"
    | "transfer"
    | "sim"
    | "experience"
    | "miles";
}

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
    slug: "hoteis-hospedagens",
    name: "Hotéis e Hospedagens",
    shortDescription: "Seleção de hospedagens de acordo com o estilo e o orçamento da sua viagem.",
    description:
      "Indicamos hotéis, resorts e pousadas alinhados ao perfil da viagem — desde opções econômicas até hospedagens de alto padrão — sempre considerando localização e custo-benefício.",
    icon: "hotel",
  },
  {
    slug: "pacotes-de-viagem",
    name: "Pacotes de Viagem",
    shortDescription: "Passagem, hospedagem e serviços organizados em um único pacote.",
    description:
      "Montamos pacotes combinando passagens, hospedagem, transfer e passeios, simplificando o planejamento e facilitando a organização financeira da viagem.",
    icon: "package",
  },
  {
    slug: "roteiros-personalizados",
    name: "Roteiros Personalizados",
    shortDescription: "Viagens desenhadas conforme o tempo, o orçamento e o estilo do viajante.",
    description:
      "Cada viagem é diferente. Construímos roteiros sob medida, considerando o tempo disponível, o orçamento, o número de viajantes e o tipo de experiência que você procura.",
    icon: "route",
  },
  {
    slug: "viagens-de-neve",
    name: "Viagens de Neve",
    shortDescription: "Destinos de neve na América do Sul e no mundo, com planejamento completo.",
    description:
      "Organizamos viagens para destinos de neve como Bariloche e outros pontos da América do Sul e do mundo, incluindo passagens, hospedagem e orientações sobre a temporada.",
    icon: "snow",
  },
  {
    slug: "classe-executiva",
    name: "Classe Executiva",
    shortDescription: "Emissão em classe executiva, com ou sem uso de pontos e milhas.",
    description:
      "Auxiliamos na busca por passagens em classe executiva, avaliando compra direta ou emissão com pontos e milhas, conforme a disponibilidade em cada caso.",
    icon: "seat",
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
    slug: "transfer",
    name: "Transfer",
    shortDescription: "Deslocamentos entre aeroporto, hotel e passeios organizados previamente.",
    description:
      "Organizamos o transfer entre aeroporto e hospedagem — e entre pontos do roteiro, quando aplicável — para reduzir a logística durante a viagem.",
    icon: "transfer",
  },
  {
    slug: "chip-internacional",
    name: "Chip Internacional",
    shortDescription: "Orientação sobre conectividade para você viajar conectado.",
    description:
      "Indicamos opções de chip ou e-SIM internacional para você manter conexão durante a viagem, conforme o destino escolhido.",
    icon: "sim",
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
    slug: "pontos-e-milhas",
    name: "Pontos e Milhas",
    shortDescription: "Planejamento e uso estratégico de pontos e milhas na emissão de passagens.",
    description:
      "Analisamos seus pontos e milhas disponíveis, orientamos sobre transferências entre programas e buscamos oportunidades de emissão, sempre de forma transparente quanto à disponibilidade.",
    icon: "miles",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
