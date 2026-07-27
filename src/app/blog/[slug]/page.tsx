import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallToAction } from "@/components/ui/CallToAction";
import { blogPosts, getBlogPostBySlug } from "@/content/blog";
import { siteConfig } from "@/config/site";

interface BlogArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogArticlePageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return { title: "Artigo não encontrado" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="py-16 sm:py-24">
        <div className="container-alavi max-w-3xl">
          <Link href="/blog" className="text-sm font-semibold text-teal-700 hover:underline">
            ← Voltar para o blog
          </Link>
          <p className="eyebrow mt-6">{post.category}</p>
          <h1 className="mt-2 font-display text-3xl font-medium leading-tight text-navy-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-navy-500">{post.readingTime}</p>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={post.coverImage} alt={post.title} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" priority />
          </div>

          <div className="prose-alavi mt-10 space-y-5">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-navy-800">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
      <CallToAction
        title="Bora transformar essa leitura em viagem?"
        description="Conte para a gente o que você tem em mente e receba um orçamento sem compromisso."
        whatsappMessage={siteConfig.whatsappMessages.default}
        source={`blog_${post.slug}`}
      />
    </>
  );
}
