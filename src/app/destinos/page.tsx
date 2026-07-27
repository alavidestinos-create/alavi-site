import type { Metadata } from "next";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CallToAction } from "@/components/ui/CallToAction";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { destinations } from "@/content/destinations";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Destinos",
  description:
    "Destinos em destaque para sua próxima viagem: Orlando, Bariloche, Caribe, Europa, Buenos Aires e outros roteiros nacionais e internacionais.",
  alternates: { canonical: "/destinos" },
};

export default function DestinosPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="container-alavi">
          <SectionTitle
            eyebrow="Destinos"
            title="Destinos e experiências"
            description="Uma seleção de destinos para inspirar sua próxima viagem. O roteiro final é sempre construído sob medida para você."
            as="h1"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {destinations.map((destination, index) => (
              <Reveal key={destination.slug} delay={index * 60}>
                <div
                  id={destination.slug}
                  className="scroll-mt-24 overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-soft"
                >
                  <div className="relative h-56">
                    <Image
                      src={destination.image}
                      alt={`Viagem para ${destination.name}`}
                      fill
                      sizes="(min-width: 640px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-7">
                    <p className="eyebrow">{destination.region}</p>
                    <h2 className="mt-1 font-display text-xl font-medium text-navy-900">
                      {destination.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-navy-700">{destination.description}</p>
                    <div className="mt-5">
                      <WhatsAppButton
                        message={siteConfig.whatsappMessages.destino(destination.name)}
                        label="Quero uma viagem assim"
                        variant="outline"
                        source={`destino_${destination.slug}`}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CallToAction
        title="Tem outro destino em mente?"
        description="Montamos roteiros para diversos destinos nacionais e internacionais além dos listados aqui."
        whatsappMessage={siteConfig.whatsappMessages.default}
        source="destinos_page"
      />
    </>
  );
}
