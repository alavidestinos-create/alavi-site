import { images } from "@/content/images";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readingTime: string;
  publishedAt: string; // ISO date
  content: string[];
}

/**
 * Artigos editoriais de exemplo para validar a estrutura do blog (listagem,
 * categoria, busca, página de artigo, SEO). São conteúdo genérico de viagem,
 * não afirmações factuais específicas sobre a ALAVI — devem ser revisados e
 * complementados pela equipe de conteúdo antes da publicação definitiva.
 * Ver PENDENCIAS.md.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "melhor-epoca-disney-orlando",
    title: "Qual a melhor época para viajar para a Disney e Orlando",
    excerpt:
      "Clima, filas, preços e temporada de férias: o que considerar antes de escolher as datas da sua viagem para os parques.",
    category: "Disney & Orlando",
    coverImage: images.orlandoParque,
    readingTime: "6 min de leitura",
    publishedAt: "2026-06-02",
    content: [
      "Escolher a data certa muda completamente a experiência nos parques de Orlando. Períodos de férias escolares — como janeiro, julho e o fim do ano — costumam ter mais movimento e filas mais longas, enquanto meses como maio, setembro e início de dezembro tendem a ser mais tranquilos.",
      "O clima também pesa na decisão: o verão americano (junho a agosto) traz calor intenso e chuvas rápidas no fim da tarde, comuns na Flórida. Já o outono e o início da primavera costumam ter temperaturas mais amenas e dias mais confortáveis para caminhar pelos parques.",
      "Vale lembrar que preços de passagens aéreas e hospedagem variam bastante conforme a temporada. Viajar fora dos períodos de pico costuma significar economia, além de mais tranquilidade para aproveitar as atrações sem tanta espera.",
      "Um roteiro bem planejado leva em conta o perfil de quem viaja: famílias com crianças pequenas costumam se beneficiar de dias mais curtos e ritmo mais leve, enquanto grupos de adultos podem aproveitar dias mais cheios, com mais atrações por jornada.",
    ],
  },
  {
    slug: "lua-de-mel-caribe-guia",
    title: "Como planejar uma lua de mel inesquecível no Caribe",
    excerpt:
      "Resorts all inclusive, praias e o momento certo para viajar: um guia prático para começar a organizar a viagem.",
    category: "Lua de Mel",
    coverImage: images.luaDeMel,
    readingTime: "5 min de leitura",
    publishedAt: "2026-05-18",
    content: [
      "O Caribe é um dos destinos mais procurados para lua de mel por reunir praias de água clara, boa estrutura hoteleira e voos relativamente diretos a partir de várias cidades do Brasil.",
      "Resorts all inclusive costumam ser a escolha mais prática para casais: refeições, bebidas e boa parte das atividades já estão incluídas na diária, o que simplifica o planejamento financeiro da viagem.",
      "Vale considerar a época do ano: entre junho e novembro é a temporada de furacões na região, o que pode significar mais instabilidade no clima. Já os meses entre dezembro e abril costumam ter tempo mais seco e estável.",
      "Pequenos detalhes fazem diferença em uma lua de mel — reservar o quarto com antecedência para garantir categorias com vista, verificar se o resort oferece jantares românticos ou passeios a dois, e alinhar o ritmo da viagem entre descanso e passeios.",
    ],
  },
  {
    slug: "primeira-viagem-europa-guia-rapido",
    title: "Primeira viagem à Europa: guia rápido para não errar",
    excerpt:
      "Documentação, época do ano e como montar um roteiro que combine cidades sem transformar a viagem numa maratona.",
    category: "Europa",
    coverImage: images.destinoEuropa,
    readingTime: "7 min de leitura",
    publishedAt: "2026-04-27",
    content: [
      "Antes de tudo, vale confirmar os documentos necessários para o destino — validade do passaporte, exigência de visto (quando aplicável) e eventuais seguros obrigatórios variam conforme os países do roteiro.",
      "A época do ano influencia bastante a experiência: o verão europeu (junho a agosto) tem dias mais longos e clima agradável, mas também mais turistas e preços mais altos. Primavera e início do outono costumam equilibrar bom clima com menos movimento.",
      "Um erro comum de quem viaja pela primeira vez é tentar visitar cidades demais em pouco tempo. Roteiros mais enxutos, com tempo real para caminhar e conhecer cada lugar, costumam render uma experiência mais agradável do que passar horas em deslocamento entre cidades.",
      "Vale pensar também na logística entre os países: trens de alta velocidade costumam ser práticos para distâncias médias, enquanto voos de baixo custo podem valer a pena em trajetos mais longos — o equilíbrio certo depende do roteiro e do tempo disponível.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
}
