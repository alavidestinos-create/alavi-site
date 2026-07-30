import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { DestinationsHighlight } from "@/components/sections/DestinationsHighlight";
import { Experiences } from "@/components/sections/Experiences";
import { OrlandoSection } from "@/components/sections/OrlandoSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyAlavi } from "@/components/sections/WhyAlavi";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { homeFaq } from "@/content/faq";
import { siteConfig } from "@/config/site";

// Sem "title" aqui de proposito: a Home deve usar o title.default definido
// no layout raiz (identico a siteConfig.seo.defaultTitle), sem o
// title.template ser aplicado por cima (evita um <title> duplicado tipo
// "ALAVI ... | ALAVI Destinos & Experiências").
export const metadata: Metadata = {
  description: siteConfig.seo.defaultDescription,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <DestinationsHighlight />
      <Experiences />
      <OrlandoSection />
      <ServicesOverview />
      <HowItWorks />
      <WhyAlavi />
      <BlogPreview />
      {/* Depoimentos removidos por enquanto (sem depoimentos reais de clientes ainda).
          Componente e conteúdo mantidos em src/components/sections/Testimonials.tsx
          e src/content/testimonials.ts para reativar quando houver depoimentos reais. */}
      <Faq items={homeFaq} />
      <FinalCta />
    </>
  );
}
