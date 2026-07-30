import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/content/blog";
import { getCategoryLabel } from "@/content/categories";

interface ArticleCardProps {
  post: BlogPost;
}

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Link
      href={`/guia-do-viajante/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{getCategoryLabel(post.category)}</p>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-navy-900">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-700">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-navy-500">{post.readingTime}</p>
          <span className="text-sm font-semibold text-teal-700 group-hover:underline">Ler artigo →</span>
        </div>
      </div>
    </Link>
  );
}
