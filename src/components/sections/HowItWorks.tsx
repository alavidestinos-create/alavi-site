import { SectionTitle } from "@/components/ui/SectionTitle";

const steps = [
  {
    number: "01",
    title: "Você conta o que precisa",
    description: "Envia seu pedido pelo formulário ou pelo WhatsApp, com destino, datas e número de viajantes.",
  },
  {
    number: "02",
    title: "Montamos as opções",
    description: "Buscamos alternativas de passagens, hospedagem e roteiro dentro do que foi combinado.",
  },
  {
    number: "03",
    title: "Você decide com clareza",
    description: "Apresentamos as opções encontradas para você comparar e decidir com calma.",
  },
  {
    number: "04",
    title: "Acompanhamos a viagem",
    description: "Ficamos disponíveis para dúvidas e ajustes antes e durante a viagem.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-alavi">
        <SectionTitle eyebrow="Como funciona" title="Um processo simples, do orçamento à viagem" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-display text-3xl font-bold text-teal-500">{step.number}</span>
              <h3 className="mt-2 font-display text-base font-semibold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-sm text-navy-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
