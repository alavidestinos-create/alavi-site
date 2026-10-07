import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallToAction } from "@/components/ui/CallToAction";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { ArticleShareButtons } from "@/components/ui/ArticleShareButtons";
import { ArticleTable } from "@/components/ui/ArticleTable";
import { Faq } from "@/components/sections/Faq";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/content/blog";
import { getCategoryLabel } from "@/content/categories";
import { siteConfig } from "@/config/site";

interface ArticlePageProps {
  params: { slug: string };
}

/**
 * Converte o array plano de parágrafos (post.content) em blocos de texto e
 * listas reais (<ul>/<ol>), em vez de manter marcadores "•"/"☐"/"1." soltos
 * dentro de <p>. Detecta sequências de parágrafos com esses prefixos e as
 * agrupa — qualquer parágrafo que não use esses prefixos continua sendo
 * renderizado exatamente como antes, então nenhum artigo existente muda.
 */
function renderArticleContent(content: string[]) {
  const blocks: JSX.Element[] = [];
  let i = 0;

  while (i < content.length) {
    const paragraph = content[i] as string;

    if (i === 0) {
      blocks.push(
        <p key={i} className="font-display text-xl italic leading-relaxed text-navy-700 sm:text-2xl">
          {paragraph}
        </p>
      );
      i += 1;
      continue;
    }

    if (paragraph.startsWith("☐ ")) {
      const items: string[] = [];
      while (i < content.length && (content[i] as string).startsWith("☐ ")) {
        items.push((content[i] as string).slice(2));
        i += 1;
      }
      blocks.push(
        <ul key={`checklist-${i}`} className="space-y-3 rounded-2xl border border-sand-200 bg-sand-50 p-5 sm:p-6">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-navy-800">
              <span className="mt-1 h-4 w-4 shrink-0 rounded border-2 border-teal-700" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (paragraph.startsWith("• ")) {
      const items: string[] = [];
      while (i < content.length && (content[i] as string).startsWith("• ")) {
        items.push((content[i] as string).slice(2));
        i += 1;
      }
      blocks.push(
        <ul key={`bullets-${i}`} className="list-disc space-y-2 pl-5 text-base leading-relaxed text-navy-800 marker:text-teal-700">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(paragraph)) {
      const items: string[] = [];
      while (i < content.length && /^\d+\.\s/.test(content[i] as string)) {
        items.push((content[i] as string).replace(/^\d+\.\s/, ""));
        i += 1;
      }
      blocks.push(
        <ol key={`numbered-${i}`} className="list-decimal space-y-3 pl-5 text-base leading-relaxed text-navy-800 marker:font-semibold marker:text-teal-700">
          {items.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    blocks.push(
      <p key={i} className="text-base leading-relaxed text-navy-800">
        {paragraph}
      </p>
    );
    i += 1;
  }

  return blocks;
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

  const faqJsonLd = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  const relatedPosts = getRelatedPosts(post);
  const articleUrl = `${siteConfig.url}/guia-do-viajante/${post.slug}`;

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <article className="py-16 sm:py-24">
        <div className="container-alavi max-w-3xl">
          <Link href="/guia-do-viajante" className="text-sm font-semibold text-teal-700 hover:underline">
            ← Voltar para o Guia do Viajante
          </Link>
          <p className="eyebrow mt-6">{getCategoryLabel(post.category)}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-navy-500">{post.readingTime}</p>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl shadow-premium">
            <Image src={post.coverImage} alt={post.title} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" priority />
          </div>

          <div className="prose-alavi mt-10 space-y-5">{renderArticleContent(post.content)}</div>

          {post.table && <ArticleTable headers={post.table.headers} rows={post.table.rows} />}

          <ArticleShareButtons title={post.title} url={articleUrl} />
        </div>
      </article>

      {post.faq && post.faq.length > 0 && (
        <Faq items={post.faq} eyebrow="Perguntas frequentes" title="Perguntas sobre este assunto" />
      )}

      {relatedPosts.length > 0 && (
        <section className="bg-sand-50 py-16 sm:py-24">
          <div className="container-alavi">
            <p className="eyebrow">Continue lendo</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
              Artigos relacionados
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <ArticleCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CallToAction
        title="Bora transformar essa leitura em viagem?"
        description="Conte para a gente o que você tem em mente e receba um orçamento sem compromisso."
        whatsappMessage={siteConfig.whatsappMessages.default}
        source={`guia_${post.slug}`}
      />
    </>
  );
}
