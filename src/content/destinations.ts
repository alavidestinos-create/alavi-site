import { images } from "@/content/images";

export interface Destination {
  slug: string;
  name: string;
  region: string;
  category: "neve" | "internacional" | "nacional" | "romantico" | "familia";
  shortDescription: string;
  description: string;
  image: string;
}

/**
 * Seleção enxuta de destinos em destaque (curadoria, não catálogo completo).
 * Fotos: banco gratuito Unsplash — ver src/content/images.ts e
 * DECISOES-TECNICAS.md. Substituir por fotografia autoral da ALAVI quando
 * disponível.
 */
export const destinations: Destination[] = [
  {
    slug: "orlando",
    name: "Orlando & Disney",
    region: "Estados Unidos",
    category: "familia",
    shortDescription: "Parques, magia e compras para viajar em família ou a dois.",
    description:
      "Disney, Universal, compras e a energia única da Flórida — organizamos cada detalhe do roteiro, dos ingressos aos passeios, para que a viagem seja só aproveitar.",
    image: images.destinoOrlando,
  },
  {
    slug: "bariloche",
    name: "Bariloche",
    region: "Argentina",
    category: "neve",
    shortDescription: "Neve, montanhas e lagos na Patagônia andina.",
    description:
      "Um dos destinos de neve mais desejados pelos brasileiros, com estrutura para família, casais e grupos — paisagens de tirar o fôlego a poucas horas de voo.",
    image: images.destinoBariloche,
  },
  {
    slug: "caribe",
    name: "Caribe",
    region: "Caribe",
    category: "romantico",
    shortDescription: "Águas turquesa e resorts pensados para casais.",
    description:
      "Praias de areia branca, resorts all inclusive e o cenário perfeito para lua de mel, aniversário ou simplesmente parar o tempo por alguns dias.",
    image: images.destinoCaribe,
  },
  {
    slug: "europa",
    name: "Europa",
    region: "Europa",
    category: "internacional",
    shortDescription: "História, gastronomia e cenários de cinema.",
    description:
      "Roteiros que combinam cidades históricas, boa gastronomia e paisagens icônicas — sob medida para a primeira vez ou para quem já é apaixonado pelo continente.",
    image: images.destinoEuropa,
  },
  {
    slug: "buenos-aires",
    name: "Buenos Aires",
    region: "Argentina",
    category: "internacional",
    shortDescription: "Cultura, gastronomia e vida urbana a poucas horas do Brasil.",
    description:
      "Cidade de forte vida cultural e boa gastronomia, com fácil acesso a partir de diversas capitais brasileiras — ideal para viagens curtas ou combinadas com outros destinos.",
    image: images.destinoBuenosAires,
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((destination) => destination.slug === slug);
}
