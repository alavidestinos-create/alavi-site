import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Solicitar orçamento",
  description: "Preencha o formulário e receba um orçamento de viagem sob medida da ALAVI Destinos & Experiências.",
  alternates: { canonical: "/orcamento" },
};

export default function OrcamentoPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-alavi max-w-3xl">
        <SectionTitle
          eyebrow="Orçamento"
          title="Conte sua viagem para a gente"
          description="Quanto mais detalhes você compartilhar, mais preciso é o orçamento. Todos os campos marcados com * são obrigatórios."
            as="h1"
          />
        <div className="mt-10 rounded-2xl border border-sand-200 bg-white p-6 shadow-soft sm:p-8">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
