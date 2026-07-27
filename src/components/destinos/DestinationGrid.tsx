import { DestinationCard } from "@/components/ui/DestinationCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Destination } from "@/content/destinations";

interface DestinationGridProps {
  destinations: Destination[];
  priorityFirst?: boolean;
}

/**
 * Grade responsiva de destinos: 3 colunas no desktop, 2 no tablet, 1 no
 * mobile. Reutilizada na seção "Explore Destinos" da Home e na página
 * /destinos — escalável para qualquer quantidade de destinos.
 */
export function DestinationGrid({ destinations, priorityFirst }: DestinationGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination, index) => (
        <Reveal key={destination.slug} delay={index * 60}>
          <DestinationCard destination={destination} priority={priorityFirst && index === 0} />
        </Reveal>
      ))}
    </div>
  );
}
