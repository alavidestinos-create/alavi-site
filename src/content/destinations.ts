import { images, type ImageKey } from "@/content/images";
import type { FaqItem } from "@/content/faq";
import destinationsData from "@/data/destinations.json";

export interface DestinationItinerary {
  title: string;
  duration: string;
  description: string;
}

export interface Destination {
  slug: string;
  flag: string;
  name: string;
  country: string;
  region: string;
  shortDescription: string;
  image: string;
  summary: string;
  bestTime: string;
  climate: string;
  recommendedDuration: string;
  attractions: string[];
  whereToStay: string[];
  whereToShop: string[];
  restaurants: string[];
  tips: string[];
  suggestedItineraries: DestinationItinerary[];
  mapQuery: string;
  faq: FaqItem[];
}

interface RawDestination extends Omit<Destination, "image"> {
  imageKey: ImageKey;
}

/**
 * Destinos "Explore Destinos" — dados em src/data/destinations.json.
 *
 * Arquitetura pensada para escalar: adicionar um novo destino exige apenas
 * uma imagem verificada em src/content/images.ts + um novo objeto no JSON.
 * Nenhum componente precisa mudar. Ver PENDENCIAS.md / DECISOES-TECNICAS.md.
 *
 * Regra de conteúdo: nunca exibir preços, hotéis específicos, passagens ou
 * pacotes — a ALAVI vende consultoria personalizada, não catálogo.
 */
export const destinations: Destination[] = (destinationsData as RawDestination[]).map(
  ({ imageKey, ...destination }) => ({
    ...destination,
    image: images[imageKey],
  })
);

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((destination) => destination.slug === slug);
}

export function getAllDestinationSlugs(): string[] {
  return destinations.map((destination) => destination.slug);
}
