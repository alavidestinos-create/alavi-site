import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/content/experiences";
import { experienceImage } from "@/content/experiences";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const href = buildWhatsAppUrl(siteConfig.whatsappMessages.experiencia(experience.label));

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-premium transition-all duration-300 hover:-translate-y-1"
    >
      <Image
        src={experienceImage(experience)}
        alt={experience.label}
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-lg font-semibold text-white">{experience.label}</h3>
        <p className="mt-1 text-xs leading-relaxed text-white/80">{experience.description}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
          Consultar no WhatsApp →
        </span>
      </div>
    </Link>
  );
}
