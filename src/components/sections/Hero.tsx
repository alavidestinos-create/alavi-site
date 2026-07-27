import Image from "next/image";
import { siteConfig } from "@/config/site";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";

const trustItems = [
  { label: "Atendimento personalizado", stars: true },
  { label: "Planejamento exclusivo", stars: false },
  { label: "Suporte antes, durante e depois da viagem", stars: false },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-navy-950 sm:min-h-[92vh]">
      <Image
        src={images.hero}
        alt="Casal observando o pôr do sol durante uma viagem"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/10" />

      <div className="container-alavi relative z-10 pb-16 pt-40 sm:pb-24 sm:pt-56">
        <p className="eyebrow text-white/70">Agência de viagens · Passo Fundo, RS</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          Sua próxima história começa aqui.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
          Planejamos viagens que unem conforto, experiências e momentos inesquecíveis.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/orcamento" variant="secondary" size="lg">
            Planejar minha viagem
          </Button>
          <Button href="/destinos" variant="outline-light" size="lg">
            Conhecer destinos
          </Button>
        </div>
        <a
          href={buildWhatsAppUrl(siteConfig.whatsappMessages.hero)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block text-sm text-white/70 underline-offset-4 hover:text-white hover:underline"
        >
          ou fale agora pelo WhatsApp →
        </a>

        <Reveal delay={200}>
          <div
            className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 sm:mt-14 sm:flex-row sm:items-center sm:gap-0 sm:pt-7"
            aria-label="Diferenciais da ALAVI"
          >
            {trustItems.map((item, index) => (
              <div key={item.label} className="flex items-center">
                {index > 0 && (
                  <span aria-hidden="true" className="mx-6 hidden h-4 w-px bg-white/25 sm:block" />
                )}
                <p className="text-sm font-medium tracking-wide text-white/90">
                  {item.stars && (
                    <span aria-hidden="true" className="mr-2 tracking-tight text-white/90">
                      ★★★★★
                    </span>
                  )}
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
