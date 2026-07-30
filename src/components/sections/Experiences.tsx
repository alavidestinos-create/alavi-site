import { SectionTitle } from "@/components/ui/SectionTitle";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { Reveal } from "@/components/ui/Reveal";
import { experiences } from "@/content/experiences";

export function Experiences() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-alavi">
        <Reveal>
          <SectionTitle
            eyebrow="Experiências"
            title="Para onde a sua próxima viagem te leva?"
            description="Mais do que um destino, um tipo de viagem. Escolha o tema que mais combina com esse momento e fale direto com um especialista."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {experiences.map((experience, index) => (
            <Reveal key={experience.slug} delay={index * 60}>
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
