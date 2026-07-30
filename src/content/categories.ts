export interface Category {
  slug: string;
  label: string;
  icon: string;
}

/**
 * Taxonomia de categorias do Guia do Viajante. Os artigos referenciam a
 * categoria pelo `slug` (src/data/articles.json), e essa lista resolve o
 * rótulo/ícone exibidos e define a ordem de exibição nos filtros.
 */
export const categories: Category[] = [
  { slug: "destinos", label: "Destinos", icon: "🌍" },
  { slug: "classe-executiva", label: "Classe Executiva", icon: "✈️" },
  { slug: "milhas-e-pontos", label: "Milhas e Pontos", icon: "💳" },
  { slug: "disney-e-orlando", label: "Disney & Orlando", icon: "🏰" },
  { slug: "neve", label: "Neve", icon: "❄️" },
  { slug: "praias", label: "Praias", icon: "🏖️" },
  { slug: "viagem-corporativa", label: "Viagem Corporativa", icon: "💼" },
  { slug: "vistos-e-documentacao", label: "Vistos e Documentação", icon: "📄" },
  { slug: "seguro-viagem", label: "Seguro Viagem", icon: "🛡️" },
  { slug: "economia-em-viagens", label: "Economia em Viagens", icon: "💰" },
  { slug: "dicas-de-viagem", label: "Dicas de Viagem", icon: "🧳" },
];

const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug);
}

export function getCategoryLabel(slug: string): string {
  return categoryBySlug.get(slug)?.label ?? slug;
}
