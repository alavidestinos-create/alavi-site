import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CallToAction } from "@/components/ui/CallToAction";
import { Faq } from "@/components/sections/Faq";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cruzeiros nacionais e internacionais",
  description:
    "Como funcionam os cruzeiros marítimos: temporadas, disponibilidade de datas e roteiros nacionais e internacionais. Consulte a ALAVI Destinos & Experiências.",
  alternates: { canonical: "/cruzeiros" },
};

const howItWorks = [
  {
    title: "Operam por temporada",
    description:
      "Os navios não ficam o ano todo na mesma região. Cada companhia define temporadas e redistribui a frota entre destinos conforme a época do ano.",
  },
  {
    title: "Depende da disponibilidade",
    description:
      "Cada saída tem data, porto e número de cabines definidos. Quando uma categoria de cabine esgota, só resta consultar outras datas ou categorias.",
  },
  {
    title: "Planejamento antecipado",
    description:
      "Roteiros costumam ser divulgados com bastante antecedência. Quem tem datas fixas ganha em reservar cedo; quem é flexível pode encontrar boas oportunidades.",
  },
  {
    title: "Consultoria na escolha",
    description:
      "Ajudamos a comparar roteiros, categorias de cabine e datas, de acordo com o seu perfil, e acompanhamos a reserva até o embarque.",
  },
];

const nationalTopics = [
  "Saídas a partir de portos brasileiros, como Santos e Rio de Janeiro, entre outros.",
  "Concentram-se, em geral, na temporada de verão brasileiro, que costuma ir de novembro a abril.",
  "Roteiros curtos (fim de semana) e médios, passando por destinos do litoral brasileiro.",
  "Em geral, exigem documento de identificação oficial com foto; confirme as regras da companhia.",
];

const internationalTopics = [
  "Regiões variam conforme a época: Caribe, Mediterrâneo, Norte da Europa, Alasca, entre outras.",
  "Cada região tem sua temporada própria, definida pelo clima e pela operação das companhias.",
  "Roteiros mais longos, com embarque no exterior ou em portos brasileiros em temporadas específicas.",
  "Exigem passaporte válido e, conforme o destino, visto ou autorização de viagem.",
];

const faqItems = [
  {
    question: "Por que os cruzeiros dependem de temporada?",
    answer:
      "Porque os navios navegam por regiões diferentes ao longo do ano, acompanhando o clima e a demanda. Por isso, um mesmo destino só tem saídas em determinados meses.",
  },
  {
    question: "Posso reservar um cruzeiro em qualquer data?",
    answer:
      "Não. As datas são as das saídas programadas pelas companhias e dependem de disponibilidade de cabines. Mostramos as opções existentes para o período que você tem em mente.",
  },
  {
    question: "Quais documentos preciso para viajar?",
    answer:
      "Em cruzeiros nacionais, em geral basta documento oficial com foto. Em internacionais, é necessário passaporte válido e, conforme o destino, visto ou autorização. Orientamos o seu caso durante o atendimento.",
  },
  {
    question: "Como solicito um orçamento?",
    answer:
      "Fale com a gente pelo WhatsApp ou pelo formulário de orçamento, informando período desejado, destino e número de pessoas. Valores e condições dependem da data e da cabine escolhidas.",
  },
];

export default function CruzeirosPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="container-alavi max-w-3xl">
          <SectionTitle
            eyebrow="Cruzeiros"
            title="Cruzeiros nacionais e internacionais"
            description="Entenda como funcionam os cruzeiros marítimos e escolha a melhor temporada e o melhor roteiro para a sua viagem."
            as="h1"
          />
          <p className="mt-4 text-sm text-navy-500">
            Datas, roteiros, cabines e valores dependem de cada companhia e da
            disponibilidade no momento da consulta, e podem mudar sem aviso.
            Não trabalhamos com valores fixos: montamos a cotação conforme o
            seu período e o seu perfil de viagem.
          </p>
        </div>
      </section>

      <section className="bg-navy-50/60 py-16 sm:py-24">
        <div className="container-alavi">
          <SectionTitle eyebrow="Como funciona" title="Temporada e disponibilidade" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6 shadow-soft">
                <h2 className="font-display text-base font-semibold text-navy-900">{item.title}</h2>
                <p className="mt-2 text-sm text-navy-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-alavi grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-sand-200 bg-sand-50 p-6 sm:p-8">
            <p className="eyebrow">Brasil</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-navy-900">Cruzeiros nacionais</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-navy-800 marker:text-teal-700">
              {nationalTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-sand-200 bg-sand-50 p-6 sm:p-8">
            <p className="eyebrow">Mundo</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-navy-900">Cruzeiros internacionais</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-navy-800 marker:text-teal-700">
              {internationalTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Faq items={faqItems} eyebrow="Dúvidas frequentes" title="Perguntas sobre cruzeiros" />

      <CallToAction
        title="Quer cotar um cruzeiro?"
        description="Conte o período e o destino que você tem em mente e vamos verificar as saídas disponíveis."
        whatsappMessage={siteConfig.whatsappMessages.cruzeiros}
        source="cruzeiros_page"
      />
    </>
  );
}
