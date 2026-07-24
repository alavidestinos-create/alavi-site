import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CallToAction } from "@/components/ui/CallToAction";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { services } from "@/content/services";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Passagens aéreas, hotéis, pacotes, roteiros personalizados, seguro viagem, transfer e uso de pontos e milhas com a ALAVI.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-alavi">
          <SectionTitle
            eyebrow="Serviços"
            title="Tudo que você precisa para organizar sua viagem"
            description="Cada serviço pode ser contratado isoladamente ou combinado em um pacote, conforme a sua necessidade."
            as="h1"
          />
          <div className="mt-10 space-y-6">
            {services.map((service) => (
              <div
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 rounded-2xl border border-navy-100 bg-white p-6 shadow-soft sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-navy-900">{service.name}</h2>
                    <p className="mt-2 max-w-2xl text-sm text-navy-700">{service.description}</p>
                  </div>
                  <WhatsAppButton
                    message={siteConfig.whatsappMessages.servicos(service.name)}
                    label="Solicitar orçamento"
                    variant="outline"
                    source={`servico_${service.slug}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CallToAction
        title="Não encontrou o que precisa?"
        description="Fale com a gente — muitas vezes combinamos mais de um serviço em um único roteiro."
        whatsappMessage={siteConfig.whatsappMessages.default}
        source="servicos_page"
      />
    </>
  );
}
