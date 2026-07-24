import { SectionTitle } from "@/components/ui/SectionTitle";

const reasons = [
  {
    title: "Atendimento humano",
    description: "Você fala com uma pessoa real, que acompanha o planejamento da sua viagem do início ao fim.",
  },
  {
    title: "Planejamento cuidadoso",
    description: "Organizamos passagens, hospedagem e roteiro considerando tempo, orçamento e prioridades.",
  },
  {
    title: "Transparência",
    description: "Apresentamos as opções disponíveis com clareza, sem prometer o que não pode ser garantido.",
  },
  {
    title: "Uso estratégico de pontos e milhas",
    description: "Analisamos suas milhas e pontos para buscar as melhores oportunidades de emissão.",
  },
];

export function WhyAlavi() {
  return (
    <section className="bg-navy-50/60 py-16 sm:py-20">
      <div className="container-alavi">
        <SectionTitle eyebrow="Por que a ALAVI" title="Uma agência pensada para dar tranquilidade à sua viagem" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="rounded-2xl bg-white p-6 shadow-soft">
              <h3 className="font-display text-base font-semibold text-navy-900">{reason.title}</h3>
              <p className="mt-2 text-sm text-navy-700">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
