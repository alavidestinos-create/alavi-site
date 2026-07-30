import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface CallToActionProps {
  title: string;
  description?: string;
  whatsappMessage?: string;
  source: string;
}

export function CallToAction({ title, description, whatsappMessage, source }: CallToActionProps) {
  return (
    <section className="bg-navy-950">
      <div className="container-alavi flex flex-col items-start gap-7 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
          {description && <p className="mt-3 text-navy-200">{description}</p>}
        </Reveal>
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton
            message={whatsappMessage ?? siteConfig.whatsappMessages.default}
            label="Solicitar no WhatsApp"
            source={source}
          />
          <Button href="/orcamento" variant="outline-light">
            Preencher formulário
          </Button>
        </div>
      </div>
    </section>
  );
}
