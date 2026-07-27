import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/content/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{post.category}</p>
        <h3 className="mt-2 font-display text-lg font-medium leading-snug text-navy-900">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-700">{post.excerpt}</p>
        <p className="mt-4 text-xs text-navy-500">{post.readingTime}</p>
      </div>
    </Link>
  );
}
