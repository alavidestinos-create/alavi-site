import { CallToAction } from "@/components/ui/CallToAction";
import { siteConfig } from "@/config/site";

export function FinalCta() {
  return (
    <CallToAction
      title="Vamos planejar sua próxima viagem?"
      description="Conte para a gente o que você tem em mente e receba um orçamento sem compromisso."
      whatsappMessage={siteConfig.whatsappMessages.default}
      source="final_cta"
    />
  );
}
