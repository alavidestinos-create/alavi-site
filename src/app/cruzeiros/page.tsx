import type { Metadata } from "next";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CallToAction } from "@/components/ui/CallToAction";
import { Faq } from "@/components/sections/Faq";
import { images } from "@/content/images";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cruzeiros nacionais e internacionais",
  description:
    "Cruzeiros marítimos nacionais e internacionais: como funcionam as temporadas, companhias, destinos como Caribe, Europa e Alasca e como reservar com a ALAVI Destinos & Experiências.",
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
      "Cada saída tem data, porto e número de cabines definidos. Quando uma categoria esgota, é preciso consultar outras datas ou categorias.",
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

const cruiseLines = [
  {
    name: "Royal Caribbean",
    tag: "Para toda a família",
    description:
      "Uma das maiores companhias do mundo, conhecida por navios grandes e cheios de atrações: parques aquáticos, shows, restaurantes temáticos e programação para todas as idades. Os roteiros passam por Caribe, Mediterrâneo, Alasca, Norte da Europa, Ásia e Austrália.",
  },
  {
    name: "Celebrity Cruises",
    tag: "Luxo contemporâneo",
    description:
      "Aposta em ambientes elegantes, gastronomia refinada e espaços de bem-estar. É indicada para casais, grupos de amigos e viajantes que buscam sofisticação sem abrir mão do conforto. Navega por Caribe, Mediterrâneo, Ilhas Gregas, Alasca e Norte da Europa.",
  },
  {
    name: "Costa Cruzeiros",
    tag: "Estilo italiano",
    description:
      "Companhia de origem italiana, com forte presença na América do Sul. Os navios combinam música, gastronomia e o clima descontraído da hospitalidade italiana, com roteiros pela costa brasileira e outros destinos.",
  },
  {
    name: "Azamara",
    tag: "Experiências imersivas",
    description:
      "Navios de menor porte e roteiros pensados para explorar cada destino com calma, com mais tempo nos portos. Boa escolha para quem prefere conhecer a cultura local a ficar apenas a bordo.",
  },
  {
    name: "Silversea e Crystal",
    tag: "Ultra luxo",
    description:
      "Suítes espaçosas, serviço personalizado e gastronomia de alto padrão em embarcações menores, que acessam portos exclusivos e destinos menos explorados, incluindo roteiros de expedição.",
  },
  {
    name: "AmaWaterways e Uniworld",
    tag: "Cruzeiros fluviais",
    description:
      "Navegação por rios, em embarcações menores, com paradas frequentes em cidades e vilarejos. Uma forma tranquila de conhecer a Europa e outras regiões, com foco em cultura e gastronomia.",
  },
  {
    name: "Hurtigruten Expeditions, Swan Hellenic e Australis",
    tag: "Expedição",
    description:
      "Roteiros de expedição em regiões remotas, como áreas polares e a Patagônia, em navios de menor porte e com programação voltada à natureza e à cultura local. Datas e disponibilidade costumam ser mais restritas.",
  },
  {
    name: "The Ritz-Carlton Yacht Collection",
    tag: "Iates de luxo",
    description:
      "Experiência de iate de luxo, com serviço personalizado e roteiros em destinos selecionados.",
  },
  {
    name: "Corazul",
    tag: "Consulte as saídas",
    description:
      "Também trabalhamos com saídas da Corazul. Consulte-nos para conhecer roteiros e datas disponíveis.",
  },
];

const included = [
  "Hospedagem na cabine escolhida, com limpeza diária.",
  "Refeições nos restaurantes principais e no buffet, em horários definidos.",
  "Parte do entretenimento: shows, música ao vivo, cinema, piscinas e academia.",
  "Atividades e programação para crianças e adolescentes, conforme a companhia.",
  "Deslocamento entre os destinos do roteiro, sem precisar refazer malas a cada cidade.",
];

const extras = [
  "Bebidas (refrigerantes, sucos especiais, álcool e cafés especiais), salvo se houver pacote de bebidas ou tarifa que inclua.",
  "Restaurantes de especialidades e serviços de quarto, em muitas companhias.",
  "Excursões e passeios nos portos de escala.",
  "Taxas portuárias e de serviço, e gorjetas, que podem ou não estar na tarifa.",
  "Internet a bordo, spa, cassino, fotos e compras.",
  "Seguro viagem, voos até o porto de embarque e hospedagem antes ou depois do cruzeiro.",
];

const onboard = [
  {
    title: "O que significa \"open\"?",
    description:
      "No dia a dia, \"open\" costuma se referir a pacotes que liberam bebidas, como o chamado open bar, ou a tarifas que incluem parte dos serviços. Não é padrão em todas as companhias nem em todas as tarifas: em geral, é um pacote opcional, contratado antes ou durante a viagem. Em algumas companhias de luxo, bebidas e gorjetas já fazem parte da tarifa. Sempre confirmamos o que está incluído em cada oferta antes de você reservar.",
  },
  {
    title: "O navio para nos destinos?",
    description:
      "Sim. O roteiro alterna dias de navegação (em alto-mar, para aproveitar o navio) e dias de escala, em que o navio atraca ou fica fundeado perto de um porto. Nos dias de escala, você pode descer, passear e voltar para dormir a bordo. O número de escalas e de dias de mar varia muito de roteiro para roteiro.",
  },
  {
    title: "Dá para aproveitar cada parada?",
    description:
      "Depende do tempo de escala. Algumas paradas duram o dia todo; outras, poucas horas. Cada porto tem um horário limite para o retorno ao navio, conhecido como all aboard, e ele precisa ser respeitado: o navio não espera passageiros atrasados. Por isso, vale planejar com antecedência o que fazer em cada cidade, escolhendo poucos passeios e deixando margem de tempo.",
  },
  {
    title: "Excursões da companhia ou por conta própria?",
    description:
      "As excursões da companhia costumam dar mais segurança de horário, porque o navio sabe que você está em atraso e normalmente aguarda ou ajuda. Passeios independentes podem ser mais flexíveis e, às vezes, mais baratos, mas exigem atenção redobrada ao relógio. Ajudamos a organizar o que faz mais sentido em cada porto.",
  },
  {
    title: "Atracado ou por tender?",
    description:
      "Em alguns portos, o navio atraca direto no cais. Em outros, fica ancorado ao largo e os passageiros descem em pequenos barcos, os tenders, o que demanda mais tempo na ida e na volta. Essa informação influencia o aproveitamento do dia, e é importante saber antes de planejar o passeio.",
  },
  {
    title: "Como é um dia a bordo?",
    description:
      "Há café da manhã, atividades, piscinas, shows à noite e opções para quem prefere descansar. Em dias de navegação, o navio funciona como um resort flutuante. Em dias de escala, a programação gira em torno do porto, e muitos passageiros voltam no fim da tarde para jantar a bordo.",
  },
];

const goodToKnow = [
  {
    title: "Embarque e desembarque",
    description:
      "Cada porto tem horários e procedimentos próprios. Em geral, é preciso chegar ao porto no horário indicado, com documentação e cartão de embarque. Recomendamos chegar ao destino do embarque com antecedência, e não deixar o voo para o mesmo dia da saída do navio.",
  },
  {
    title: "Roupa e bagagem",
    description:
      "O ambiente é descontraído durante o dia, e algumas noites exigem traje mais arrumado, conforme a companhia. Leve protetor solar, casaco leve para o convés e calçados confortáveis para os passeios. Confira as regras de bagagem e de itens proibidos a bordo, como bebidas alcoólicas.",
  },
  {
    title: "Enjoo no mar",
    description:
      "Navios modernos são estáveis, mas algumas pessoas sentem enjoo, principalmente em travessias agitadas. Cabines mais ao centro e em andares baixos costumam balançar menos. Quem tem histórico de enjoo deve consultar um médico antes da viagem.",
  },
  {
    title: "Internet e telefone",
    description:
      "A conexão a bordo costuma ser paga, com planos pela companhia, e pode ser instável em alto-mar. Verifique também as tarifas de roaming internacional antes de viajar.",
  },
  {
    title: "Crianças, idosos e acessibilidade",
    description:
      "Cruzeiros são uma opção popular para famílias e viajantes de várias idades. Cada companhia tem regras de idade mínima, autorizações e serviços de acessibilidade. Confirmamos essas condições antes de fechar a reserva.",
  },
  {
    title: "Cancelamento e alterações",
    description:
      "As regras de cancelamento, remarcação e reembolso variam por companhia, tarifa e data. Elas devem ser lidas e confirmadas antes de contratar, e explicamos as principais condições durante o atendimento.",
  },
];

const destinations = [
  {
    name: "Caribe e Bahamas",
    image: images.cruzeiroPraia,
    season:
      "Muito procurado entre o fim e o início do ano. A temporada de furacões, em geral entre junho e novembro, pode afetar roteiros.",
    description: "Ilhas, praias e portos de escala curta, ideais para quem quer sol e mar.",
  },
  {
    name: "Europa e Mediterrâneo",
    image: images.cruzeiroIlha,
    season: "A temporada principal costuma ser de primavera a outono do hemisfério norte.",
    description: "Cidades históricas, ilhas gregas e portos italianos em um único roteiro.",
  },
  {
    name: "Alasca",
    image: images.cruzeiroCeuAzul,
    season: "Temporada curta, concentrada nos meses mais quentes do hemisfério norte.",
    description: "Geleiras, fiordes e fauna selvagem em paisagens de tirar o fôlego.",
  },
  {
    name: "Costa brasileira",
    image: images.cruzeiroPorDoSol,
    season: "Concentra-se, em geral, na temporada de verão brasileiro.",
    description: "Saídas de portos como Santos e Rio, com roteiros curtos e médios.",
  },
];

const steps = [
  { title: "1. Conversa inicial", description: "Você conta período, destino, número de pessoas e o estilo de viagem que procura." },
  { title: "2. Opções selecionadas", description: "Apresentamos saídas disponíveis, companhias e categorias de cabine que combinam com o seu perfil." },
  { title: "3. Reserva", description: "Com a escolha feita, cuidamos da reserva e explicamos as condições, prazos e formas de pagamento." },
  { title: "4. Preparação para embarcar", description: "Orientamos sobre documentação, check-in, bagagem e voos até o porto de embarque." },
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
    question: "O que costuma estar incluso na tarifa?",
    answer:
      "Em geral, hospedagem na cabine, refeições nos restaurantes principais e parte do entretenimento a bordo. Bebidas, restaurantes especiais, excursões, gorjetas e taxas portuárias podem ser cobrados à parte, conforme a companhia. Confirmamos o que está incluído em cada oferta.",
  },
  {
    question: "Qual categoria de cabine escolher?",
    answer:
      "Interna, com janela, com varanda ou suíte: a escolha depende do orçamento e do quanto você pretende aproveitar a cabine. Ajudamos a comparar as opções disponíveis para a sua data.",
  },
  {
    question: "Quais documentos preciso para viajar?",
    answer:
      "Em cruzeiros nacionais, em geral basta documento oficial com foto. Em internacionais, é necessário passaporte válido e, conforme os portos visitados, visto ou autorização. Orientamos o seu caso durante o atendimento e as regras devem ser conferidas antes da viagem.",
  },
  {
    question: "Crianças e idosos podem viajar?",
    answer:
      "Sim, mas cada companhia tem regras de idade mínima, documentação e autorização. Confirmamos essas condições antes de fechar a reserva.",
  },
  {
    question: "Preciso de seguro viagem?",
    answer:
      "É recomendado, principalmente em cruzeiros internacionais. Ajudamos a escolher uma cobertura adequada ao roteiro.",
  },
  {
    question: "O cruzeiro é open bar?",
    answer:
      "Em geral não. O open bar costuma ser um pacote de bebidas opcional, vendido à parte. Algumas companhias de luxo incluem bebidas na tarifa. Confirmamos esse ponto em cada oferta.",
  },
  {
    question: "O navio para nos lugares e dá para descer?",
    answer:
      "Sim. Os roteiros têm paradas em portos, em que você pode descer, passear e voltar a bordo. Há também dias de navegação, em que o navio fica em alto-mar. O número de paradas e o tempo em cada uma variam.",
  },
  {
    question: "E se eu me atrasar para voltar ao navio?",
    answer:
      "O horário de retorno precisa ser respeitado. Em passeios contratados pela companhia, o navio costuma aguardar; em passeios por conta própria, o risco é do passageiro. Por isso, recomendamos planejar com margem de tempo.",
  },
  {
    question: "Preciso levar dinheiro?",
    answer:
      "A bordo, os gastos costumam ser registrados na conta da cabine e pagos ao final. Em terra, é útil ter forma de pagamento aceita no país visitado. Confira as regras de cada companhia.",
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
            description="Entenda como funcionam os cruzeiros marítimos e escolha a melhor temporada, companhia e roteiro para a sua viagem."
            as="h1"
          />
          <p className="mt-4 text-sm text-navy-500">
            Datas, roteiros, cabines e valores dependem de cada companhia e da
            disponibilidade no momento da consulta, e podem mudar sem aviso.
            Não trabalhamos com valores fixos: montamos a cotação conforme o
            seu período e o seu perfil de viagem.
          </p>
        </div>
        <div className="container-alavi mt-10">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl shadow-premium">
            <Image
              src={images.cruzeiroAereo}
              alt="Navios de cruzeiro atracados em um porto"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
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
        <div className="container-alavi">
          <SectionTitle
            eyebrow="Dúvidas na prática"
            title="Como funciona um cruzeiro, na prática"
            description="As respostas para o que mais perguntam antes de embarcar."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {onboard.map((item) => (
              <div key={item.title} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-soft">
                <h3 className="font-display text-base font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-50/60 py-16 sm:py-24">
        <div className="container-alavi">
          <SectionTitle
            eyebrow="Tarifa"
            title="O que está incluso e o que costuma ser cobrado à parte"
            description="Varia por companhia, roteiro e tipo de tarifa. Confirmamos os detalhes de cada oferta."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
              <h3 className="font-display text-lg font-semibold text-navy-900">Geralmente incluso</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-navy-800 marker:text-teal-700">
                {included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
              <h3 className="font-display text-lg font-semibold text-navy-900">Costuma ser cobrado à parte</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-navy-800 marker:text-teal-700">
                {extras.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-alavi">
          <SectionTitle
            eyebrow="Companhias"
            title="Escolha o estilo de cruzeiro ideal"
            description="Cada companhia tem um perfil: da diversão em família ao ultra luxo. Veja algumas das opções com as quais trabalhamos."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cruiseLines.map((line) => (
              <div key={line.name} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-soft">
                <p className="eyebrow">{line.tag}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy-900">{line.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-700">{line.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-50/60 py-16 sm:py-24">
        <div className="container-alavi">
          <SectionTitle
            eyebrow="Destinos"
            title="Para onde navegar"
            description="As épocas citadas são referências gerais e variam por companhia e por ano."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {destinations.map((destination) => (
              <div key={destination.name} className="overflow-hidden rounded-2xl bg-white shadow-soft">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={destination.image}
                    alt={`Cruzeiro: ${destination.name}`}
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-navy-900">{destination.name}</h3>
                  <p className="mt-2 text-sm text-navy-700">{destination.description}</p>
                  <p className="mt-2 text-sm text-navy-500">{destination.season}</p>
                </div>
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
              <li>Saídas a partir de portos brasileiros, como Santos e Rio de Janeiro, entre outros.</li>
              <li>Concentram-se, em geral, na temporada de verão brasileiro, que costuma ir de novembro a abril.</li>
              <li>Roteiros curtos (fim de semana) e médios, passando por destinos do litoral brasileiro.</li>
              <li>Em geral, exigem documento de identificação oficial com foto; confirme as regras da companhia.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-sand-200 bg-sand-50 p-6 sm:p-8">
            <p className="eyebrow">Mundo</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-navy-900">Cruzeiros internacionais</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-navy-800 marker:text-teal-700">
              <li>Regiões variam conforme a época: Caribe, Mediterrâneo, Norte da Europa, Alasca, entre outras.</li>
              <li>Cada região tem sua temporada própria, definida pelo clima e pela operação das companhias.</li>
              <li>Roteiros mais longos, com embarque no exterior ou em portos brasileiros em temporadas específicas.</li>
              <li>Exigem passaporte válido e, conforme o destino, visto ou autorização de viagem.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-navy-50/60 py-16 sm:py-24">
        <div className="container-alavi">
          <SectionTitle eyebrow="Passo a passo" title="Como reservar com a ALAVI" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.title} className="rounded-2xl bg-white p-6 shadow-soft">
                <h3 className="font-display text-base font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm text-navy-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-alavi">
          <SectionTitle eyebrow="Bom saber" title="Antes de embarcar" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {goodToKnow.map((item) => (
              <div key={item.title} className="rounded-2xl border border-sand-200 bg-sand-50 p-6">
                <h3 className="font-display text-base font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">{item.description}</p>
              </div>
            ))}
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
