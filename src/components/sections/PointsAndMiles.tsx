import { siteConfig } from "@/config/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

const items = [
  "Análise dos pontos e milhas que você já possui",
  "Planejamento de transferências entre programas",
  "Busca de oportunidades de emissão",
  "Organização dos seus programas de fidelidade",
  "Atendimento personalizado, sem promessas de disponibilidade garantida",
];

export function PointsAndMiles() {
  return (
    <section className="bg-navy-900 py-16 text-white sm:py-20">
      <div className="container-alavi grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionTitle
            eyebrow="Pontos e Milhas"
            title="Aproveite melhor os pontos e milhas que você já tem"
            description="Ajudamos a organizar e planejar o uso de pontos e milhas na sua próxima viagem, com transparência sobre disponibilidade e prazos."
            className="text-white [&_p]:text-navy-200 [&_h2]:text-white"
          />
          <div className="mt-6">
            <WhatsAppButton
              message={siteConfig.whatsappMessages.pontosMilhas}
              label="Falar sobre meus pontos"
              source="points_and_miles"
            />
          </div>
        </div>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-navy-100">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
