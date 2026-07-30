/**
 * Configuracao central do site ALAVI Destinos & Experiencias.
 *
 * Dado comercial vem de variaveis de ambiente, com um valor padrao (os
 * dados reais fornecidos pela agencia) usado como fallback. Isso mantem o
 * dado configuravel via ambiente sem depender de uma variavel ser definida
 * para o site funcionar corretamente. Itens ainda nao fornecidos (CNPJ,
 * razao social) continuam com placeholder EXPLICITO — ver PENDENCIAS.md.
 *
 * Ver .env.example para a lista completa de variaveis.
 */

const DEFAULTS = {
  whatsapp: "5554992312943", // (54) 99231-2943
  email: "alavidestinos@gmail.com",
  instagram: "alavi.destinos",
} as const;

function env(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

const whatsappNumberRaw = env("NEXT_PUBLIC_WHATSAPP_NUMBER", DEFAULTS.whatsapp);
const isWhatsappConfigured = /^\d{10,15}$/.test(whatsappNumberRaw);

export const siteConfig = {
  // Identidade
  brand: {
    name: "ALAVI",
    fullName: "ALAVI Destinos & Experiências",
    tagline: "Destinos & Experiências",
    shortDescription:
      "Agência de viagens em Passo Fundo (RS) especializada em passagens aéreas, viagens em classe executiva, pacotes personalizados e roteiros nacionais e internacionais.",
  },

  // Dominio / URL publica
  url: env("NEXT_PUBLIC_SITE_URL", "https://alavidestinos.com.br"),

  // Contato
  contact: {
    whatsappNumber: whatsappNumberRaw,
    isWhatsappConfigured,
    phoneDisplay: "(54) 99231-2943",
    email: env("NEXT_PUBLIC_CONTACT_EMAIL", DEFAULTS.email),
    instagramHandle: env("NEXT_PUBLIC_INSTAGRAM_HANDLE", DEFAULTS.instagram),
    businessHours: "Segunda a sexta-feira, das 9h30 às 18h. Sábados, das 9h30 às 12h.",
    location: "Passo Fundo, RS",
    address: "Av. Brasil Centro, 1121, Sala 1203 – Centro, Passo Fundo - RS",
    addressDetails: {
      streetAddress: "Av. Brasil Centro, 1121, Sala 1203",
      neighborhood: "Centro",
      city: "Passo Fundo",
      state: "RS",
      country: "BR",
    },
  },

  social: {
    instagramUrl: `https://instagram.com/${env("NEXT_PUBLIC_INSTAGRAM_HANDLE", DEFAULTS.instagram)}`,
  },

  // Mensagens padrao enviadas ao abrir o WhatsApp a partir de cada ponto do site
  whatsappMessages: {
    default: "Olá! Vim pelo site da ALAVI e gostaria de solicitar um orçamento de viagem.",
    header: "Olá! Estou navegando no site da ALAVI e gostaria de falar com um especialista em viagens.",
    hero: "Olá! Vim pelo site da ALAVI e gostaria de solicitar um orçamento de viagem.",
    servicos: (servico: string) =>
      `Olá! Vim pelo site da ALAVI e tenho interesse no serviço de ${servico}. Podem me ajudar?`,
    destino: (destino: string) =>
      `Olá! Vim pelo site da ALAVI e tenho interesse em uma viagem para ${destino}. Podem me ajudar a montar um roteiro?`,
    experiencia: (tema: string) =>
      `Olá! Vim pelo site da ALAVI e tenho interesse em uma viagem com o tema "${tema}". Podem me ajudar a montar um roteiro?`,
    pontosMilhas: "Olá! Vim pelo site da ALAVI e gostaria de entender melhor como usar meus pontos ou milhas em uma viagem.",
    parques: "Olá! Vim pelo site da ALAVI e gostaria de cotar ingressos para os parques da minha viagem.",
    footer: "Olá! Vim pelo site da ALAVI e gostaria de falar com um especialista em viagens.",
    formulario: "Olá! Vim pelo site da ALAVI e gostaria de solicitar um orçamento de viagem.",
  },

  // SEO
  seo: {
    defaultTitle: "ALAVI Destinos & Experiências | Agência de Viagens em Passo Fundo, RS",
    titleTemplate: "%s | ALAVI Destinos & Experiências",
    defaultDescription:
      "Agência de viagens em Passo Fundo (RS): passagens aéreas, classe executiva, pacotes e roteiros personalizados nacionais e internacionais, com uso estratégico de pontos e milhas. Solicite seu orçamento.",
    keywords: [
      "agência de viagens",
      "agência de viagens Passo Fundo",
      "passagens aéreas",
      "pacotes de viagem",
      "roteiros personalizados",
      "viagem para Orlando",
      "viagem para Disney",
      "viagem para Bariloche",
      "viagens internacionais",
      "lua de mel",
    ],
    ogImage: "/images/og/alavi-og-default.jpg",
    twitterHandle: undefined as string | undefined,
  },

  // Analytics (nunca inventar IDs; ficam vazios ate serem fornecidos)
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  },

  // Dados legais (CNPJ, razao social) - PENDENTE fornecimento pela agencia.
  legal: {
    razaoSocial: "PENDENTE_INFORMAR_RAZAO_SOCIAL",
    cnpj: "PENDENTE_INFORMAR_CNPJ",
    lastUpdated: "2026-07-23",
  },
} as const;

export type SiteConfig = typeof siteConfig;
