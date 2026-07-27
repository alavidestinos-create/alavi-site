import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/content/images";

const gallery = [
  { src: images.orlandoParque, alt: "Parque temático em Orlando" },
  { src: images.orlandoNoturno, alt: "Carrossel iluminado à noite em um parque" },
  { src: images.orlandoMiami, alt: "Vista aérea de Miami" },
  { src: images.orlandoFamilia, alt: "Família aproveitando a praia" },
  { src: images.orlandoResort, alt: "Piscina de resort ao entardecer" },
];

export function OrlandoSection() {
  return (
    <section className="bg-navy-950 py-20 sm:py-28">
      <div className="container-alavi">
        <Reveal>
          <SectionTitle
            eyebrow="Disney & Orlando"
            title="A magia da Flórida, sem nenhum detalhe deixado ao acaso"
            description="Parques, compras, Miami e dias de descanso em família — montamos o roteiro completo, dos ingressos ao hotel, para você só se preocupar em aproveitar."
            className="[&_h2]:text-white [&_p]:text-navy-200"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
          {gallery.map((item, index) => (
            <Reveal key={item.alt} delay={index * 80} className={index === 0 ? "col-span-2 sm:col-span-2" : ""}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 20vw, 45vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/disney-orlando" variant="secondary">
            Explorar Disney & Orlando
          </Button>
        </div>
      </div>
    </section>
  );
}
