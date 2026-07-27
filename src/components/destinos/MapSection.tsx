import { Reveal } from "@/components/ui/Reveal";

interface MapSectionProps {
  query: string;
  name: string;
}

/**
 * Mapa da região via iframe público do Google Maps (sem chave de API,
 * sem dependência extra) — leve e suficiente para dar contexto geográfico.
 */
export function MapSection({ query, name }: MapSectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-alavi">
        <Reveal>
          <h3 className="font-display text-xl font-medium text-navy-900">Onde fica {name}</h3>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-sand-200">
            <iframe
              title={`Mapa de ${name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
              className="h-[380px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
