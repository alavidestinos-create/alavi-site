import { SectionTitle } from "@/components/ui/SectionTitle";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import parksData from "@/data/parks.json";
import { siteConfig } from "@/config/site";

interface Park {
  slug: string;
  name: string;
  icon: string;
  description: string;
}

const parks = parksData as Park[];

const iconPaths: Record<string, string> = {
  castle: "M4 21V10l3-2v3h2V7l3-2 3 2v4h2V8l3 2v11H4zM10 21v-5h4v5",
  coaster: "M3 18c3 0 3-6 6-6s3 6 6 6 3-8 6-8",
  sparkles: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z",
  wave: "M3 15c2-3 4-3 6 0s4 3 6 0 4-3 6 0M3 10c2-3 4-3 6 0s4 3 6 0 4-3 6 0",
  leaf: "M4 20c8-1 14-7 15-15-8 1-14 7-15 15zM4 20c2-4 5-7 9-9",
};

/**
 * "Acessos aos Parques" — não vende ingresso diretamente (sem preços),
 * direciona para cotação personalizada via WhatsApp ou formulário.
 */
export function ParkTickets() {
  return (
    <section className="bg-navy-950 py-20 sm:py-24">
      <div className="container-alavi">
        <Reveal>
          <SectionTitle
            eyebrow="Acessos aos Parques"
            title="Vai visitar os parques?"
            description="Nossa equipe ajuda você a escolher a melhor combinação de ingressos para o seu roteiro."
            className="[&_h2]:text-white [&_p]:text-navy-200"
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {parks.map((park, index) => (
            <Reveal key={park.slug} delay={index * 60}>
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-teal-300">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d={iconPaths[park.icon]} />
                  </svg>
                </span>
                <p className="text-sm font-semibold text-white">{park.name}</p>
                <p className="text-xs leading-relaxed text-navy-300">{park.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <WhatsAppButton
            message={siteConfig.whatsappMessages.parques}
            label="Cotar ingressos"
            source="park_tickets"
          />
        </div>
      </div>
    </section>
  );
}
