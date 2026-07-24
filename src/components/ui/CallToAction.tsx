import Link from "next/link";
import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

interface CallToActionProps {
  title: string;
  description?: string;
  whatsappMessage?: string;
  source: string;
}

export function CallToAction({ title, description, whatsappMessage, source }: CallToActionProps) {
  return (
    <section className="bg-navy-900">
      <div className="container-alavi flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between sm:py-16">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          {description && <p className="mt-3 text-navy-100">{description}</p>}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton
            message={whatsappMessage ?? siteConfig.whatsappMessages.default}
            label="Solicitar no WhatsApp"
            source={source}
          />
          <Link
            href="/orcamento"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Preencher formulário
          </Link>
        </div>
      </div>
    </section>
  );
}
