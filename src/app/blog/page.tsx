import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BlogListing } from "@/app/blog/BlogListing";
import { blogPosts, getBlogCategories } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Dicas, guias e inspiração para planejar sua próxima viagem, pela ALAVI Destinos & Experiências.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-alavi">
        <SectionTitle
          eyebrow="Blog"
          title="Inspiração e guias para planejar bem a sua viagem"
          as="h1"
        />
        <div className="mt-12">
          <BlogListing posts={blogPosts} categories={getBlogCategories()} />
        </div>
      </div>
    </section>
  );
}
