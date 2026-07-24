import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-alavi">
        <SectionTitle eyebrow="Depoimentos" title="O que dizem os viajantes ALAVI" />
        <p className="mt-2 max-w-xl text-xs text-navy-400">
          Seção preparada para depoimentos reais de clientes. Os textos abaixo são
          espaços reservados até que depoimentos autorizados sejam fornecidos.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
