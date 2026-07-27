import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso do site da ALAVI Destinos & Experiências.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-alavi max-w-3xl">
        <SectionTitle eyebrow="Legal" title="Termos de Uso"
            as="h1"
          />
        <p className="mt-2 text-xs text-navy-400">
          Última atualização: {siteConfig.legal.lastUpdated}. Este texto é um
          modelo estrutural e não substitui a revisão de um profissional
          jurídico antes da publicação definitiva do site.
        </p>

        <div className="mt-8 space-y-6 text-sm text-navy-700">
          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">1. Aceitação dos termos</h2>
            <p className="mt-2">
              Ao acessar e utilizar este site, você concorda com os termos
              descritos a seguir. Caso não concorde, recomendamos não utilizar
              o site.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">2. Natureza institucional do site</h2>
            <p className="mt-2">
              Este site tem caráter institucional e comercial, destinado a
              apresentar os serviços da {siteConfig.brand.fullName} e
              possibilitar o envio de pedidos de orçamento. As informações
              sobre destinos, serviços e preços têm caráter informativo e
              estão sujeitas a confirmação e disponibilidade no momento da
              contratação.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">3. Ausência de garantia de preços e disponibilidade</h2>
            <p className="mt-2">
              Valores, condições e disponibilidade de passagens, hospedagens
              e emissões com pontos ou milhas dependem de terceiros (companhias
              aéreas, hotéis, operadoras e programas de fidelidade) e podem
              mudar sem aviso prévio. Nenhuma condição é considerada
              confirmada até a formalização do orçamento.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">4. Propriedade intelectual</h2>
            <p className="mt-2">
              Marca, logotipo, textos e demais conteúdos deste site pertencem
              à {siteConfig.brand.fullName} e não podem ser reproduzidos sem
              autorização prévia.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">5. Alterações</h2>
            <p className="mt-2">
              Estes Termos de Uso podem ser atualizados periodicamente. A
              versão vigente é sempre a publicada nesta página.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">6. Contato</h2>
            <p className="mt-2">
              Em caso de dúvidas sobre estes termos, entre em contato pelo
              e-mail {siteConfig.contact.email}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
