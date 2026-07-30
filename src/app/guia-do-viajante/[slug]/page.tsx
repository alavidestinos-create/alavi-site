import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallToAction } from "@/components/ui/CallToAction";
import { blogPosts, getBlogPostBySlug } from "@/content/blog";
import { siteConfig } from "@/config/site";

interface ArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return { title: "Artigo não encontrado" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/guia-do-viajante/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/guia-do-viajante/${post.slug}`,
      images: [{ url: post.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: siteConfig.brand.fullName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brand.fullName,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/brand/logo-nova.png` },
    },
    mainEntityOfPage: `${siteConfig.url}/guia-do-viajante/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Guia do Viajante", item: `${siteConfig.url}/guia-do-viajante` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.url}/guia-do-viajante/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="py-16 sm:py-24">
        <div className="container-alavi max-w-3xl">
          <Link href="/guia-do-viajante" className="text-sm font-semibold text-teal-700 hover:underline">
            ← Voltar para o Guia do Viajante
          </Link>
          <p className="eyebrow mt-6">{post.category}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-navy-500">{post.readingTime}</p>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl shadow-premium">
            <Image src={post.coverImage} alt={post.title} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" priority />
          </div>

          <div className="prose-alavi mt-10 space-y-5">
            {post.content.map((paragraph, index) =>
              index === 0 ? (
                <p key={index} className="font-display text-xl italic leading-relaxed text-navy-700 sm:text-2xl">
                  {paragraph}
                </p>
              ) : (
                <p key={index} className="text-base leading-relaxed text-navy-800">
                  {paragraph}
                </p>
              )
            )}
          </div>
        </div>
      </article>
      <CallToAction
        title="Bora transformar essa leitura em viagem?"
        description="Conte para a gente o que você tem em mente e receba um orçamento sem compromisso."
        whatsappMessage={siteConfig.whatsappMessages.default}
        source={`guia_${post.slug}`}
      />
    </>
  );
}
