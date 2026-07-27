import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a ALAVI Destinos & Experiências pelo WhatsApp, e-mail, Instagram ou pelo formulário de orçamento.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-alavi grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <SectionTitle eyebrow="Contato" title="Fale com a ALAVI"
            as="h1"
          />
          <p className="mt-4 text-sm text-navy-700">
            Prefere falar diretamente? Use o WhatsApp ou os canais abaixo. Se
            já quiser detalhar sua viagem, o formulário ao lado ajuda a
            organizar as informações.
          </p>
          <div className="mt-6">
            <WhatsAppButton
              message={siteConfig.whatsappMessages.default}
              label="Falar no WhatsApp"
              size="lg"
              source="contato_page"
            />
          </div>
          <ContactLinks className="mt-8 space-y-3 text-sm text-navy-700 [&_a]:text-navy-900" />
        </div>
        <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-soft sm:p-8">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
