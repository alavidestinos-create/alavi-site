import { SectionTitle } from "@/components/ui/SectionTitle";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { Reveal } from "@/components/ui/Reveal";
import { destinations } from "@/content/destinations";

export function DestinationsHighlight() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-alavi">
        <Reveal>
          <SectionTitle
            eyebrow="Destinos"
            title="Alguns lugares que merecem estar no seu próximo roteiro"
            description="Um ponto de partida para inspirar sua viagem — o roteiro final é sempre construído sob medida para você."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {destinations.map((destination, index) => (
            <Reveal key={destination.slug} delay={index * 80}>
              <DestinationCard destination={destination} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
