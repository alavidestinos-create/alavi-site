export interface Destination {
  slug: string;
  name: string;
  region: string;
  category: "neve" | "internacional" | "nacional" | "romantico" | "familia";
  shortDescription: string;
  description: string;
  imagePlaceholder: string;
}

export const destinations: Destination[] = [
  {
    slug: "bariloche",
    name: "Bariloche",
    region: "Argentina",
    category: "neve",
    shortDescription: "Neve, montanhas e lagos na Patagônia argentina.",
    description:
      "Um dos destinos de neve mais procurados por brasileiros, com estrutura para família, casais e grupos, além de passeios pela região dos lagos andinos.",
    imagePlaceholder: "/images/destinos/bariloche.jpg",
  },
  {
    slug: "buenos-aires",
    name: "Buenos Aires",
    region: "Argentina",
    category: "internacional",
    shortDescription: "Cultura, gastronomia e vida urbana a poucas horas do Brasil.",
    description:
      "Cidade com forte vida cultural, boa gastronomia e fácil acesso a partir de diversas capitais brasileiras — indicada tanto para viagens curtas quanto para roteiros combinados com outros destinos.",
    imagePlaceholder: "/images/destinos/buenos-aires.jpg",
  },
  {
    slug: "cancun",
    name: "Cancún",
    region: "México",
    category: "familia",
    shortDescription: "Praias, resorts e estrutura para todas as idades.",
    description:
      "Destino consolidado para viagens em família e lua de mel, com ampla oferta de resorts all inclusive e fácil logística de deslocamento.",
    imagePlaceholder: "/images/destinos/cancun.jpg",
  },
  {
    slug: "caribe",
    name: "Caribe",
    region: "Caribe",
    category: "romantico",
    shortDescription: "Praias, resorts e experiências pensadas para casais.",
    description:
      "Ilhas e resorts pelo Caribe com boa infraestrutura para viagens românticas, lua de mel e comemorações especiais.",
    imagePlaceholder: "/images/destinos/caribe.jpg",
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((destination) => destination.slug === slug);
}
