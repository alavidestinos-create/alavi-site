import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Destination } from "@/content/destinations";

interface HeroDestinationProps {
  destination: Destination;
}

export function HeroDestination({ destination }: HeroDestinationProps) {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-navy-950">
      <Image
        src={destination.image}
        alt={`Viagem para ${destination.name}`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/10" />
      <div className="container-alavi relative z-10 pb-16 pt-32">
        <SectionTitle
          eyebrow={`${destination.flag} ${destination.country}`}
          title={destination.name}
          description={destination.summary}
          as="h1"
          className="[&_h1]:text-white [&_p]:max-w-2xl [&_p]:text-navy-100"
        />
      </div>
    </section>
  );
}
