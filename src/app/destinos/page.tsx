import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CallToAction } from "@/components/ui/CallToAction";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { destinations } from "@/content/destinations";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Destinos",
  description:
    "Destinos em destaque para sua próxima viagem: Bariloche, Buenos Aires, Cancún, Caribe e outros roteiros nacionais e internacionais.",
  alternates: { canonical: "/destinos" },
};

export default function DestinosPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-alavi">
          <SectionTitle
            eyebrow="Destinos"
            title="Destinos e experiências"
            description="Uma seleção inicial de destinos para inspirar sua próxima viagem. O roteiro final é sempre construído sob medida para você."
            as="h1"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {destinations.map((destination) => (
              <div
                key={destination.slug}
                id={destination.slug}
                className="scroll-mt-24 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft"
              >
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-navy-700 to-teal-600 text-white">
                  <span className="text-sm font-medium opacity-80">
                    Imagem pendente: {destination.name}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                    {destination.region}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-navy-900">
                    {destination.name}
                  </h2>
                  <p className="mt-2 text-sm text-navy-700">{destination.description}</p>
                  <div className="mt-4">
                    <WhatsAppButton
                      message={siteConfig.whatsappMessages.destino(destination.name)}
                      label="Quero uma viagem assim"
                      variant="outline"
                      source={`destino_${destination.slug}`}
                    />
                  </div>
                </div>
              </div>
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
