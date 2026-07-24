import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function PersonalizedTrips() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-alavi grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionTitle
            eyebrow="Roteiros personalizados"
            title="Cada viagem é diferente — o roteiro também deveria ser"
            description="Em vez de pacotes fechados, construímos o roteiro em torno do que importa para você: tempo disponível, orçamento, número de viajantes e tipo de experiência buscada, seja lazer, lua de mel ou viagem em família."
          />
          <div className="mt-6">
            <WhatsAppButton
              message={siteConfig.whatsappMessages.default}
              label="Montar meu roteiro"
              source="personalized_trips"
            />
          </div>
        </div>
        <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-teal-500 to-navy-700 p-8 text-white shadow-soft">
          <p className="text-sm font-medium text-white/70">Imagem — pendente</p>
        </div>
      </div>
    </section>
  );
}
