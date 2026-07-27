import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <section className="bg-sand-50 py-20 sm:py-28">
      <div className="container-alavi">
        <Reveal>
          <SectionTitle eyebrow="Depoimentos" title="O que dizem os viajantes ALAVI" align="center" className="mx-auto" />
          <p className="mx-auto mt-2 max-w-xl text-center text-xs text-navy-400">
            Seção preparada para depoimentos reais de clientes. Os textos abaixo são
            espaços reservados até que depoimentos autorizados sejam fornecidos.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={index * 80}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
