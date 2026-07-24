import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /**
   * Nível do heading renderizado para o título principal. Use "h1" quando o
   * SectionTitle for o título principal da página (uma vez por página) e
   * "h2" (padrão) quando for um título de seção dentro de uma página que já
   * tem seu próprio h1 (ex.: seções da Home, que já tem h1 no Hero).
   */
  as?: "h1" | "h2";
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as = "h2",
}: SectionTitleProps) {
  const Heading = as;

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-teal-700">
          {eyebrow}
        </p>
      )}
      <Heading className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-3 text-base text-navy-700">{description}</p>
      )}
    </div>
  );
}
