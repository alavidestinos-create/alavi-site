import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { blogPosts } from "@/content/blog";

export function BlogPreview() {
  const latest = blogPosts.slice(0, 3);

  return (
    <section className="py-20 sm:py-28">
      <div className="container-alavi">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow="Guia do Viajante"
              title="Guia do Viajante"
              description="Conteúdos exclusivos para ajudar você a planejar cada detalhe da sua viagem."
            />
            <Button href="/guia-do-viajante" variant="ghost" size="sm" className="shrink-0">
              Ver todos os artigos
            </Button>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 80}>
              <ArticleCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
