import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

const reasons = [
  {
    title: "Atendimento humano",
    description: "Você fala com uma pessoa real, que acompanha sua viagem do primeiro contato ao retorno para casa.",
  },
  {
    title: "Planejamento nos detalhes",
    description: "Passagens, hospedagem e roteiro pensados juntos, considerando tempo, orçamento e o que importa para você.",
  },
  {
    title: "Transparência sempre",
    description: "Mostramos as opções com clareza — sem prometer o que não pode ser garantido.",
  },
];

export function WhyAlavi() {
  return (
    <section className="bg-sand-50 py-20 sm:py-28">
      <div className="container-alavi">
        <Reveal>
          <SectionTitle
            eyebrow="Por que a ALAVI"
            title="Uma agência pensada para dar tranquilidade à sua viagem"
            align="center"
            className="mx-auto"
          />
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 100} className="text-center sm:text-left">
              <span className="font-display text-4xl font-medium text-teal-700/40">0{index + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700">{reason.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
