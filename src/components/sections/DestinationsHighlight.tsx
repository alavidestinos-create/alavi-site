import { SectionTitle } from "@/components/ui/SectionTitle";
import { DestinationGrid } from "@/components/destinos/DestinationGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { destinations } from "@/content/destinations";

export function DestinationsHighlight() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-alavi">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow="Explore Destinos"
              title="Explore Destinos"
              description="Descubra destinos incríveis, dicas exclusivas e experiências selecionadas para ajudar você a planejar uma viagem inesquecível."
            />
            <Button href="/destinos" variant="ghost" size="sm" className="shrink-0">
              Ver todos os destinos
            </Button>
          </div>
        </Reveal>
        <div className="mt-12">
          <DestinationGrid destinations={destinations} priorityFirst />
        </div>
      </div>
    </section>
  );
}
