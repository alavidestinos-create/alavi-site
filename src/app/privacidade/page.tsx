import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade da ALAVI Destinos & Experiências.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-alavi max-w-3xl">
        <SectionTitle eyebrow="Legal" title="Política de Privacidade"
            as="h1"
          />
        <p className="mt-2 text-xs text-navy-400">
          Última atualização: {siteConfig.legal.lastUpdated}. Este texto é um
          modelo estrutural preparado para adequação à Lei Geral de Proteção
          de Dados (LGPD) e não substitui a revisão de um profissional
          jurídico antes da publicação definitiva do site.
        </p>

        <div className="mt-8 space-y-6 text-sm text-navy-700">
          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">1. Quem somos</h2>
            <p className="mt-2">
              Esta Política de Privacidade descreve como a {siteConfig.brand.fullName}{" "}
              ({siteConfig.legal.razaoSocial}) coleta, usa e protege os dados
              pessoais dos visitantes e clientes deste site.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">2. Quais dados coletamos</h2>
            <p className="mt-2">
              Coletamos apenas os dados necessários para responder a pedidos
              de orçamento e contato, como: nome, WhatsApp, e-mail, cidade de
              origem, destino desejado, datas de viagem, número de
              viajantes e informações relacionadas a preferências de viagem
              informadas voluntariamente no formulário. Também podem ser
              coletados dados de navegação (cookies) conforme a Política de
              Cookies.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">3. Como usamos os dados</h2>
            <p className="mt-2">
              Os dados fornecidos são utilizados exclusivamente para: (i)
              elaborar orçamentos de viagem; (ii) entrar em contato sobre o
              pedido realizado; (iii) melhorar a experiência de navegação no
              site. Não vendemos dados pessoais a terceiros.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">4. Compartilhamento de dados</h2>
            <p className="mt-2">
              Dados podem ser compartilhados com fornecedores diretamente
              envolvidos na prestação do serviço de viagem contratado (como
              companhias aéreas, hotéis e operadoras), e com ferramentas de
              envio de formulário e analytics estritamente necessárias ao
              funcionamento do site.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">5. Seus direitos</h2>
            <p className="mt-2">
              Você pode solicitar, a qualquer momento, a confirmação da
              existência de tratamento, acesso, correção, anonimização,
              portabilidade ou eliminação dos seus dados pessoais, conforme a
              LGPD (Lei nº 13.709/2018), entrando em contato pelo e-mail{" "}
              {siteConfig.contact.email}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">6. Retenção de dados</h2>
            <p className="mt-2">
              Os dados são mantidos pelo tempo necessário para cumprir a
              finalidade para a qual foram coletados, observadas obrigações
              legais e regulatórias aplicáveis.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">7. Contato</h2>
            <p className="mt-2">
              Em caso de dúvidas sobre esta política, entre em contato pelo
              e-mail {siteConfig.contact.email}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
