import Link from "next/link";
import type { Destination } from "@/content/destinations";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      href={`/destinos#${destination.slug}`}
      className="group overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft transition-shadow hover:shadow-lg"
    >
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-navy-700 to-teal-600 text-white">
        <span className="text-sm font-medium opacity-80">Imagem pendente: {destination.name}</span>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
          {destination.region}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold text-navy-900">
          {destination.name}
        </h3>
        <p className="mt-2 text-sm text-navy-700">{destination.shortDescription}</p>
      </div>
    </Link>
  );
}
