import { images, type ImageKey } from "@/content/images";
import { categories, type Category } from "@/content/categories";
import articlesData from "@/data/articles.json";

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Slug da categoria — ver src/content/categories.ts para o rótulo/ícone. */
  category: string;
  coverImage: string;
  readingTime: string;
  publishedAt: string; // ISO date
  content: string[];
  /** Opcional: nem todo artigo (principalmente os mais antigos) tem FAQ ainda. */
  faq?: BlogFaqItem[];
  /**
   * Opcional: ativa os botões "Compartilhe esta dica" (WhatsApp + Copiar
   * link) no final do artigo. Mantido fora do padrão visual já existente —
   * só aparece nos artigos que optarem por isso explicitamente.
   */
  shareCta?: boolean;
  /**
   * Opcional: tabela comparativa renderizada após o corpo do artigo (ex.:
   * "o que pode/não pode levar"). Só aparece nos artigos que a definirem —
   * não afeta o layout dos demais artigos.
   */
  table?: {
    headers: string[];
    rows: string[][];
  };
}

interface RawArticle extends Omit<BlogPost, "coverImage"> {
  imageKey: ImageKey;
}

/**
 * Guia do Viajante (antigo "Blog") — dados em src/data/articles.json.
 * Conteúdo editorial próprio da ALAVI, sem preços fixos (a proposta é
 * consultoria personalizada, não catálogo com valores).
 */
export const blogPosts: BlogPost[] = (articlesData as RawArticle[]).map(
  ({ imageKey, ...article }) => ({
    ...article,
    coverImage: images[imageKey],
  })
);

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Categorias presentes nos artigos atuais, na ordem definida em
 * src/content/categories.ts (não na ordem em que aparecem nos dados).
 */
export function getBlogCategories(): Category[] {
  const present = new Set(blogPosts.map((post) => post.category));
  return categories.filter((category) => present.has(category.slug));
}

/**
 * Artigos relacionados: mesma categoria, mais recentes primeiro, excluindo o
 * próprio artigo. Não depende de curadoria manual — deriva da categoria.
 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return blogPosts
    .filter((candidate) => candidate.slug !== post.slug && candidate.category === post.category)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}
