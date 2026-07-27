import Link from "next/link";
import Image from "next/image";
import type { Destination } from "@/content/destinations";

interface DestinationCardProps {
  destination: Destination;
  priority?: boolean;
}

export function DestinationCard({ destination, priority }: DestinationCardProps) {
  return (
    <Link
      href={`/destinos/${destination.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-premium"
    >
      <Image
        src={destination.image}
        alt={`Viagem para ${destination.name}`}
        fill
        loading={priority ? undefined : "lazy"}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="eyebrow text-white/70">
          {destination.flag} {destination.country}
        </p>
        <h3 className="mt-1 font-display text-2xl font-medium text-white">{destination.name}</h3>
        <p className="mt-2 text-sm text-white/80">{destination.shortDescription}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
          Conhecer destino →
        </span>
      </div>
    </Link>
  );
}
