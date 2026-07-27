import type { Metadata } from "next";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CallToAction } from "@/components/ui/CallToAction";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/content/images";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sobre a ALAVI",
  description: "Conheça o propósito e o jeito de atender da ALAVI Destinos & Experiências.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-navy-950">
        <Image src={images.sobre} alt="" fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/10" />
        <div className="container-alavi relative z-10 pb-16 pt-28">
          <SectionTitle
            eyebrow="Sobre a ALAVI"
            title="Viagens que começam antes da mala ser fechada"
            as="h1"
            className="[&_h1]:text-white"
          />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-alavi max-w-2xl">
          <Reveal className="space-y-6 text-base leading-relaxed text-navy-700">
            <p>
              A ALAVI nasceu de uma ideia simples: viajar deveria ser um dos
              momentos mais leves da vida — não um dos mais estressantes. Por
              isso, cuidamos de cada detalhe do planejamento para que você
              possa focar no que realmente importa, aproveitar a experiência.
            </p>
            <p>
              Acreditamos em atendimento próximo e humano. Cada pedido é
              analisado individualmente, considerando tempo, orçamento e o
              tipo de viagem que você tem em mente — a lazer, em família, de
              lua de mel ou rumo à neve.
            </p>
            <p>
              Trabalhamos com transparência: apresentamos as opções
              disponíveis com clareza, sem prometer condições que não podem
              ser garantidas. Nosso compromisso é com o planejamento bem
              feito, da primeira conversa até o seu retorno para casa.
            </p>
          </Reveal>
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
