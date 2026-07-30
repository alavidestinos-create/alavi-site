import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Você conta o que sonha viver",
    description: "Envie seu pedido pelo formulário ou pelo WhatsApp, com destino, datas e quem viaja com você.",
  },
  {
    number: "02",
    title: "Montamos as opções",
    description: "Buscamos alternativas de passagens, hospedagem e roteiro dentro do combinado.",
  },
  {
    number: "03",
    title: "Você decide com calma",
    description: "Apresentamos as opções encontradas para você comparar e decidir sem pressa.",
  },
  {
    number: "04",
    title: "Acompanhamos a viagem",
    description: "Ficamos disponíveis para dúvidas e ajustes antes e durante a viagem.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-alavi">
        <Reveal>
          <SectionTitle eyebrow="Como funciona" title="Um processo simples, do orçamento à viagem" />
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 100}>
              <span className="font-display text-3xl font-medium text-teal-700">{step.number}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
