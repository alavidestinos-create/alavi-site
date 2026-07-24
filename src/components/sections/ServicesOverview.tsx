import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/content/services";

export function ServicesOverview() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-alavi">
        <SectionTitle
          eyebrow="O que fazemos"
          title="Serviços para cada etapa da sua viagem"
          description="Da passagem ao roteiro completo, organizamos os detalhes para que a sua viagem saia como planejado."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
