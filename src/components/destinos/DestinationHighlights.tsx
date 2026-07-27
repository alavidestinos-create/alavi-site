import { Reveal } from "@/components/ui/Reveal";
import type { Destination } from "@/content/destinations";

interface DestinationHighlightsProps {
  destination: Destination;
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-6">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-navy-700">{value}</p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-display text-xl font-medium text-navy-900">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-navy-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DestinationHighlights({ destination }: DestinationHighlightsProps) {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-alavi grid gap-4 sm:grid-cols-3">
          <Reveal>
            <InfoCard label="Melhor época" value={destination.bestTime} />
          </Reveal>
          <Reveal delay={80}>
            <InfoCard label="Clima" value={destination.climate} />
          </Reveal>
          <Reveal delay={160}>
            <InfoCard label="Tempo recomendado" value={destination.recommendedDuration} />
          </Reveal>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="container-alavi grid gap-10 lg:grid-cols-2">
          <Reveal>
            <ListBlock title="Principais atrações" items={destination.attractions} />
          </Reveal>
          <Reveal delay={80}>
            <ListBlock title="Onde se hospedar" items={destination.whereToStay} />
          </Reveal>
          <Reveal delay={120}>
            <ListBlock title="Onde fazer compras" items={destination.whereToShop} />
          </Reveal>
          <Reveal delay={160}>
            <ListBlock title="Restaurantes recomendados" items={destination.restaurants} />
          </Reveal>
        </div>
      </section>

      <section className="bg-sand-50 py-16 sm:py-20">
        <div className="container-alavi">
          <Reveal>
            <h3 className="font-display text-xl font-medium text-navy-900">Dicas importantes</h3>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {destination.tips.map((tip, index) => (
              <Reveal key={tip} delay={index * 60}>
                <p className="rounded-2xl border border-sand-200 bg-white p-5 text-sm leading-relaxed text-navy-700">
                  {tip}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-alavi">
          <Reveal>
            <h3 className="font-display text-xl font-medium text-navy-900">Roteiros sugeridos</h3>
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {destination.suggestedItineraries.map((itinerary, index) => (
              <Reveal key={itinerary.title} delay={index * 80}>
                <div className="rounded-2xl border border-sand-200 bg-white p-6">
                  <p className="eyebrow">{itinerary.duration}</p>
                  <h4 className="mt-1 font-display text-lg font-medium text-navy-900">{itinerary.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700">{itinerary.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
