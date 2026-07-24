import type { Metadata } from "next";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CallToAction } from "@/components/ui/CallToAction";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sobre a ALAVI",
  description: "Conheça o propósito e o jeito de atender da ALAVI Destinos & Experiências.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-alavi grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center">
          <div className="max-w-2xl">
            <SectionTitle eyebrow="Sobre a ALAVI" title="Viagens planejadas com cuidado, do início ao fim"
            as="h1"
          />
            <div className="mt-6 space-y-4 text-base text-navy-700">
              <p>
                A ALAVI Destinos &amp; Experiências nasceu com um propósito simples:
                tornar o processo de planejar uma viagem mais tranquilo. Cuidamos
                das passagens, hospedagens e roteiros para que cada cliente possa
                focar no que realmente importa — aproveitar a experiência.
              </p>
              <p>
                Acreditamos em atendimento próximo e humano. Cada pedido de
                orçamento é analisado individualmente, considerando o tempo
                disponível, o orçamento e o tipo de viagem desejada, seja ela a
                lazer, em família, de lua de mel ou voltada a destinos de neve.
              </p>
              <p>
                Trabalhamos com transparência: apresentamos as opções
                disponíveis com clareza, sem prometer condições, preços ou
                disponibilidades que não possam ser garantidos no momento da
                consulta.
              </p>
              <p>
                Nosso compromisso é com o planejamento bem-feito — da primeira
                conversa até o retorno da viagem.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/brand/logo-badge.jpg"
              alt="Selo ALAVI Destinos & Experiências"
              width={640}
              height={640}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>
      <CallToAction
        title="Quer planejar sua próxima viagem com a ALAVI?"
        description="Fale com a gente e conte o que você tem em mente."
        whatsappMessage={siteConfig.whatsappMessages.default}
        source="sobre_page"
      />
    </>
  );
}
