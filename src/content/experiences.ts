import { images, type ImageKey } from "@/content/images";

export interface Experience {
  slug: string;
  label: string;
  description: string;
  imageKey: ImageKey;
}

/**
 * Seção "Experiências" da Home — recorte por tema de viagem (em vez de
 * destino), para ajudar quem ainda não sabe "para onde", mas sabe "que tipo
 * de viagem" quer. Cada card leva direto para o WhatsApp com uma mensagem
 * contextual já preenchida (ver siteConfig.whatsappMessages.experiencia).
 *
 * Escopo reduzido de propósito (8 temas, não 15) para manter o foco em
 * consultoria via WhatsApp em vez de exigir 15 páginas/mini-sites novos —
 * ver decisão registrada em DECISOES-TECNICAS.md (Fase 1 do redesign).
 */
export const experiences: Experience[] = [
  {
    slug: "lua-de-mel",
    label: "Lua de Mel",
    description: "Roteiros românticos, com detalhes pensados para celebrar o começo de uma nova fase.",
    imageKey: "luaDeMel",
  },
  {
    slug: "familia",
    label: "Família",
    description: "Viagens pensadas para todas as idades, do planejamento ao último passeio.",
    imageKey: "familiaViajando",
  },
  {
    slug: "disney-e-parques",
    label: "Disney & Parques",
    description: "Ingressos, Genie+, restaurantes e hospedagem — a magia sem nenhum detalhe deixado ao acaso.",
    imageKey: "orlandoParque",
  },
  {
    slug: "classe-executiva",
    label: "Classe Executiva",
    description: "Mais conforto em voos longos, com uso estratégico de pontos e milhas.",
    imageKey: "experienciaClasseExecutiva",
  },
  {
    slug: "praias",
    label: "Praias",
    description: "Do Caribe ao litoral brasileiro, dias de descanso em cenários de tirar o fôlego.",
    imageKey: "destinoCaribe",
  },
  {
    slug: "neve",
    label: "Neve",
    description: "Montanhas, esqui e a atmosfera aconchegante das estações de inverno.",
    imageKey: "destinoBariloche",
  },
  {
    slug: "luxo",
    label: "Luxo",
    description: "Hospedagens e experiências exclusivas para quem busca o melhor em cada detalhe.",
    imageKey: "resortLuxo",
  },
  {
    slug: "aventura",
    label: "Aventura",
    description: "Trilhas, paisagens naturais e roteiros para quem viaja em busca de adrenalina.",
    imageKey: "experienciaAventura",
  },
];

export function experienceImage(experience: Experience): string {
  return images[experience.imageKey];
}
