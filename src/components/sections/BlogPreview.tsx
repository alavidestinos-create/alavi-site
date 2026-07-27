import { SectionTitle } from "@/components/ui/SectionTitle";
import { BlogCard } from "@/components/ui/BlogCard";
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
            <SectionTitle eyebrow="Blog" title="Inspiração para a sua próxima viagem" />
            <Button href="/blog" variant="ghost" size="sm" className="shrink-0">
              Ver todos os artigos
            </Button>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 80}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
