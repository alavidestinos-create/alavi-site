import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CallToAction } from "@/components/ui/CallToAction";
import { DestinationGrid } from "@/components/destinos/DestinationGrid";
import { ParkTickets } from "@/components/destinos/ParkTickets";
import { destinations } from "@/content/destinations";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Explore Destinos",
  description:
    "Descubra destinos incríveis nos Estados Unidos — Orlando, Miami, Nova York, Califórnia, Las Vegas e Havaí — com dicas exclusivas e roteiros sob medida da ALAVI.",
  alternates: { canonical: "/destinos" },
};

export default function DestinosPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="container-alavi">
          <SectionTitle
            eyebrow="Explore Destinos"
            title="Explore Destinos"
            description="Descubra destinos incríveis, dicas exclusivas e experiências selecionadas para ajudar você a planejar uma viagem inesquecível."
            as="h1"
          />
          <div className="mt-12">
            <DestinationGrid destinations={destinations} priorityFirst />
          </div>
        </div>
      </section>

      <ParkTickets />

      <CallToAction
        title="Tem outro destino em mente?"
        description="Montamos roteiros para diversos destinos nacionais e internacionais além dos listados aqui."
        whatsappMessage={siteConfig.whatsappMessages.default}
        source="destinos_page"
      />
    </>
  );
}
