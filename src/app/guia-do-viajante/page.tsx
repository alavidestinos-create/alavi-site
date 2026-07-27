import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArticleListing } from "@/app/guia-do-viajante/ArticleListing";
import { blogPosts, getBlogCategories } from "@/content/blog";

export const metadata: Metadata = {
  title: "Guia do Viajante",
  description: "Conteúdos exclusivos para ajudar você a planejar cada detalhe da sua viagem, pela ALAVI Destinos & Experiências.",
  alternates: { canonical: "/guia-do-viajante" },
};

export default function GuiaDoViajantePage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-alavi">
        <SectionTitle
          eyebrow="Guia do Viajante"
          title="Guia do Viajante"
          description="Conteúdos exclusivos para ajudar você a planejar cada detalhe da sua viagem."
          as="h1"
        />
        <div className="mt-12">
          <ArticleListing posts={blogPosts} categories={getBlogCategories()} />
        </div>
      </div>
    </section>
  );
}
