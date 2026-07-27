import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";

export function ServicesOverview() {
  return (
    <section className="bg-sand-50 py-20 sm:py-28">
      <div className="container-alavi">
        <Reveal>
          <SectionTitle
            eyebrow="O que fazemos"
            title="Cada etapa da sua viagem, cuidada com atenção"
            description="Da passagem ao roteiro completo, organizamos os detalhes para que a sua viagem saia como planejado."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, index) => (
            <Reveal key={service.slug} delay={index * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
