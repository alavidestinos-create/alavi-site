"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/content/blog";

interface ArticleListingProps {
  posts: BlogPost[];
  categories: string[];
}

export function ArticleListing({ posts, categories }: ArticleListingProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)),
    [posts]
  );
  const featured = sortedPosts[0];
  const showFeatured = !query.trim() && !category;
  const restPosts = showFeatured ? sortedPosts.slice(1) : sortedPosts;

  const filtered = useMemo(() => {
    return restPosts.filter((post) => {
      const matchesCategory = category ? post.category === category : true;
      const matchesQuery = query.trim().length
        ? `${post.title} ${post.excerpt}`.toLowerCase().includes(query.trim().toLowerCase())
        : true;
      return matchesCategory && matchesQuery;
    });
  }, [restPosts, query, category]);

  return (
    <div>
      {showFeatured && featured && (
        <Link
          href={`/guia-do-viajante/${featured.slug}`}
          className="group mb-14 grid gap-0 overflow-hidden rounded-2xl border border-sand-200 bg-white transition-all duration-300 hover:shadow-premium sm:grid-cols-2"
        >
          <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              fill
              priority
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <p className="eyebrow">Em destaque · {featured.category}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-navy-700">{featured.excerpt}</p>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-navy-500">{featured.readingTime}</p>
              <span className="text-sm font-semibold text-teal-700 group-hover:underline">Ler artigo →</span>
            </div>
          </div>
        </Link>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
              category === null
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-sand-300 text-navy-700 hover:border-navy-400"
            )}
          >
            Todos
          </button>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                category === item
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-sand-300 text-navy-700 hover:border-navy-400"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <label htmlFor="article-search" className="sr-only">
            Buscar artigos
          </label>
          <input
            id="article-search"
            type="search"
            placeholder="Buscar artigos..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-full border border-sand-300 bg-white px-4 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-sm text-navy-500">Nenhum artigo encontrado para essa busca.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
