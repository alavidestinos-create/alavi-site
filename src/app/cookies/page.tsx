import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Como o site da ALAVI Destinos & Experiências utiliza cookies.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-alavi max-w-3xl">
        <SectionTitle eyebrow="Legal" title="Política de Cookies"
            as="h1"
          />
        <p className="mt-2 text-xs text-navy-400">
          Última atualização: {siteConfig.legal.lastUpdated}. Este texto é um
          modelo estrutural e não substitui a revisão de um profissional
          jurídico antes da publicação definitiva do site.
        </p>

        <div className="mt-8 space-y-6 text-sm text-navy-700">
          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">1. O que são cookies</h2>
            <p className="mt-2">
              Cookies são pequenos arquivos armazenados no seu navegador que
              ajudam o site a funcionar corretamente e, quando autorizado, a
              entender como os visitantes utilizam o site.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">2. Cookies essenciais</h2>
            <p className="mt-2">
              Utilizados para funções básicas do site, como lembrar sua
              escolha sobre o aviso de cookies. Não podem ser desativados, pois
              são necessários para o funcionamento do site.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">3. Cookies de análise (não essenciais)</h2>
            <p className="mt-2">
              Utilizados apenas mediante seu consentimento, para entender como
              o site é utilizado e melhorar conteúdo e navegação. Podem incluir
              ferramentas como Google Analytics e Microsoft Clarity (esta
              última registra a navegação de forma agregada, com campos de
              formulário e dados pessoais mascarados). Nenhuma dessas
              ferramentas é carregada antes da sua escolha.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">4. Cookies de publicidade (não essenciais)</h2>
            <p className="mt-2">
              Utilizados apenas mediante seu consentimento, para medir a
              eficácia de anúncios e apresentar publicidade mais relevante, por
              exemplo por meio do Meta Pixel e de tags do Google Ads. Também
              não são carregados antes da sua escolha.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">5. Como gerenciar cookies</h2>
            <p className="mt-2">
              Você pode aceitar, recusar ou personalizar cada categoria no aviso
              exibido na primeira visita e alterar sua escolha a qualquer
              momento pelo link &ldquo;Preferências de cookies&rdquo; no rodapé
              do site. Também é possível gerenciar ou bloquear cookies
              diretamente nas configurações do seu navegador.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">6. Contato</h2>
            <p className="mt-2">
              Em caso de dúvidas sobre o uso de cookies, entre em contato pelo
              e-mail {siteConfig.contact.email}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
