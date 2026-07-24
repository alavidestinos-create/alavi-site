import Link from "next/link";
import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-50 to-white">
      <div className="container-alavi grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
            Agência de viagens
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl lg:text-5xl">
            Planejamento de viagens com cuidado, do primeiro contato ao seu retorno.
          </h1>
          <p className="mt-5 max-w-lg text-base text-navy-700 sm:text-lg">
            A ALAVI cuida das passagens, hospedagens e roteiros para que você
            só precise se preocupar em aproveitar a viagem. Atendimento
            próximo, com planejamento claro do início ao fim.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton
              message={siteConfig.whatsappMessages.hero}
              label="Falar no WhatsApp"
              size="lg"
              source="hero"
            />
            <Link
              href="/orcamento"
              className="inline-flex items-center justify-center rounded-full border border-navy-300 px-6 py-3.5 text-base font-semibold text-navy-800 transition-colors hover:bg-navy-50"
            >
              Solicitar orçamento
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-navy-700 via-navy-600 to-teal-500 p-8 text-white shadow-soft">
            <p className="text-sm font-medium text-white/70">Imagem principal — pendente</p>
            <p className="mt-2 text-sm text-white/70">
              Espaço reservado para foto de destino/experiência a ser fornecida pela agência.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
