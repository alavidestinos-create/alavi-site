import Image from "next/image";
import { siteConfig } from "@/config/site";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

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
      </div>
    </section>
  );
}
