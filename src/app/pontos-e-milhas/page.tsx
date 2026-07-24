import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CallToAction } from "@/components/ui/CallToAction";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Pontos e Milhas",
  description:
    "Planejamento e uso estratégico de pontos e milhas para emissão de passagens, com a ALAVI Destinos & Experiências.",
  alternates: { canonical: "/pontos-e-milhas" },
};

const topics = [
  {
    title: "Análise dos pontos disponíveis",
    description: "Levantamos os pontos e milhas que você já tem em cada programa de fidelidade.",
  },
  {
    title: "Planejamento de transferências",
    description: "Avaliamos transferências entre programas bancários e aéreos, quando fazem sentido para o seu caso.",
  },
  {
    title: "Busca de oportunidades",
    description: "Acompanhamos a disponibilidade de assentos para emissão com pontos e milhas no período desejado.",
  },
  {
    title: "Emissão de passagens",
    description: "Cuidamos da emissão, sempre que a disponibilidade e as regras do programa permitirem.",
  },
  {
    title: "Redução de desperdício",
    description: "Ajudamos a organizar o uso dos pontos para evitar que expirem sem aproveitamento.",
  },
  {
    title: "Atendimento personalizado",
    description: "Cada estratégia de uso de pontos é pensada de acordo com o seu perfil de viagem.",
  },
];

export default function PontosEMilhasPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-alavi max-w-3xl">
          <SectionTitle
            eyebrow="Pontos e Milhas"
            title="Use seus pontos e milhas de forma estratégica"
            description="Ajudamos você a entender o que já tem acumulado e como aproveitar melhor essas milhas na próxima viagem."
            as="h1"
          />
          <p className="mt-4 text-sm text-navy-500">
            A disponibilidade de assentos para emissão com pontos e milhas
            depende de cada programa de fidelidade e companhia aérea, e pode
            variar ou não estar garantida no momento da consulta. Não
            garantimos economia fixa nem disponibilidade de emissão — o que
            garantimos é transparência e dedicação na busca pela melhor opção.
          </p>
        </div>
      </section>
      <section className="bg-navy-50/60 py-16 sm:py-20">
        <div className="container-alavi grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <div key={topic.title} className="rounded-2xl bg-white p-6 shadow-soft">
              <h2 className="font-display text-base font-semibold text-navy-900">{topic.title}</h2>
              <p className="mt-2 text-sm text-navy-700">{topic.description}</p>
            </div>
          ))}
        </div>
      </section>
      <CallToAction
        title="Quer saber o que dá para fazer com seus pontos?"
        description="Conte quais programas você usa e vamos analisar as opções disponíveis."
        whatsappMessage={siteConfig.whatsappMessages.pontosMilhas}
        source="pontos_milhas_page"
      />
    </>
  );
}
