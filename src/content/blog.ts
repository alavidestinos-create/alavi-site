import { images, type ImageKey } from "@/content/images";
import articlesData from "@/data/articles.json";

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

export function getBlogCategories(): string[] {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
}
