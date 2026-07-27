import type { Metadata } from "next";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CallToAction } from "@/components/ui/CallToAction";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/content/images";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Disney & Orlando",
  description:
    "Roteiros para Orlando: parques Disney e Universal, compras, Miami e hospedagem, planejados em cada detalhe pela ALAVI Destinos & Experiências.",
  alternates: { canonical: "/disney-orlando" },
};

const topics = [
  {
    title: "Parques Disney",
    description:
      "Escolha de ingressos, otimização de dias de parque e dicas para aproveitar cada atração com menos tempo de fila.",
    image: images.orlandoParque,
  },
  {
    title: "Universal Orlando",
    description:
      "Roteiro pelos parques da Universal, combinando os dias com o restante da viagem em família ou a dois.",
    image: images.orlandoNoturno,
  },
  {
    title: "Compras & Miami",
    description:
      "Extensão para Miami e roteiro de compras nos outlets mais procurados por brasileiros na Flórida.",
    image: images.orlandoMiami,
  },
  {
    title: "Família & Casais",
    description:
      "Hospedagem e ritmo de viagem pensados para o seu grupo — dias mais tranquilos para famílias com crianças pequenas ou intensos para quem quer aproveitar tudo.",
    image: images.orlandoFamilia,
  },
  {
    title: "Resorts & Hotéis",
    description:
      "Opções dentro e fora dos complexos dos parques, avaliando localização, transporte e custo-benefício.",
    image: images.orlandoResort,
  },
];

export default function DisneyOrlandoPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-navy-950">
        <Image
          src={images.orlandoParque}
          alt="Parque temático em Orlando"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/10" />
        <div className="container-alavi relative z-10 pb-16 pt-32">
          <SectionTitle
            eyebrow="Disney & Orlando"
            title="Orlando do seu jeito, do primeiro parque à última mala"
            description="Uma viagem cheia de magia pede planejamento à altura. Cuidamos dos ingressos, hospedagem e roteiro para que sua família viva cada momento sem imprevistos."
            as="h1"
            className="[&_h1]:text-white [&_p]:text-navy-100"
          />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-alavi grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <Reveal key={topic.title} delay={index * 80}>
              <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-lg font-medium text-navy-900">{topic.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700">{topic.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CallToAction
        title="Vamos planejar sua viagem para Orlando?"
        description="Conte para a gente quem vai viajar e o que não pode faltar no roteiro."
        whatsappMessage={siteConfig.whatsappMessages.destino("Orlando")}
        source="disney_orlando_page"
      />
    </>
  );
}
