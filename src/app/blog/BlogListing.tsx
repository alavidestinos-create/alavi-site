"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "@/components/ui/BlogCard";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/content/blog";
import type { Category } from "@/content/categories";

interface BlogListingProps {
  posts: BlogPost[];
  categories: Category[];
}

export function BlogListing({ posts, categories }: BlogListingProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category ? post.category === category : true;
      const matchesQuery = query.trim().length
        ? `${post.title} ${post.excerpt}`.toLowerCase().includes(query.trim().toLowerCase())
        : true;
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  return (
    <div>
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
              key={item.slug}
              type="button"
              onClick={() => setCategory(item.slug)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                category === item.slug
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-sand-300 text-navy-700 hover:border-navy-400"
              )}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <label htmlFor="blog-search" className="sr-only">
            Buscar artigos
          </label>
          <input
            id="blog-search"
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
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
