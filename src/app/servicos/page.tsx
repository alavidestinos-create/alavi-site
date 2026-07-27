import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CallToAction } from "@/components/ui/CallToAction";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Passagens aéreas, hospedagens, pacotes, roteiros personalizados, Disney, Universal, seguro viagem, transfers e experiências com a ALAVI.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="container-alavi">
          <SectionTitle
            eyebrow="Serviços"
            title="Tudo que você precisa para organizar sua viagem"
            description="Cada serviço pode ser contratado isoladamente ou combinado em um roteiro, conforme a sua necessidade."
            as="h1"
          />
          <div className="mt-12 space-y-5">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 40}>
                <div
                  id={service.slug}
                  className="scroll-mt-24 rounded-2xl border border-sand-200 bg-white p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="font-display text-xl font-medium text-navy-900">{service.name}</h2>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-700">{service.description}</p>
                    </div>
                    <WhatsAppButton
                      message={siteConfig.whatsappMessages.servicos(service.name)}
                      label="Solicitar orçamento"
                      variant="outline"
                      source={`servico_${service.slug}`}
                    />
                  </div>
                </div>
              </Reveal>
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
