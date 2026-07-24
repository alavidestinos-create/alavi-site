import { SectionTitle } from "@/components/ui/SectionTitle";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { destinations } from "@/content/destinations";

export function DestinationsHighlight() {
  return (
    <section className="bg-navy-50/60 py-16 sm:py-20">
      <div className="container-alavi">
        <SectionTitle
          eyebrow="Destinos"
          title="Destinos e experiências em destaque"
          description="Um ponto de partida para pensar sua próxima viagem — o roteiro final é sempre montado sob medida."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}
