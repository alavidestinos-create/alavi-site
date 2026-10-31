import { siteConfig } from "@/config/site";

/**
 * Configuração de medição/marketing derivada das variáveis de ambiente.
 *
 * Regras:
 *  - Nada é carregado enquanto os IDs estiverem vazios (nenhum ID é inventado).
 *  - IDs com formato inválido são tratados como "não configurado" (evita
 *    injetar valores arbitrários em URLs de script).
 *  - Se NEXT_PUBLIC_GTM_ID estiver definido, o GTM é o ÚNICO ponto de carga:
 *    GA4, Meta Pixel, Clarity e Google Ads devem ser configurados dentro do
 *    contêiner, e os IDs diretos abaixo são ignorados (evita duplicidade).
 *  - Sem GTM, o código carrega diretamente, e somente com consentimento, as
 *    ferramentas cujos IDs estiverem preenchidos.
 */

const GTM_REGEX = /^GTM-[A-Z0-9]{4,12}$/;
const GA_REGEX = /^G-[A-Z0-9]{4,14}$/;
const META_PIXEL_REGEX = /^\d{8,20}$/;
const CLARITY_REGEX = /^[a-z0-9]{6,16}$/i;

function valid(value: string, regex: RegExp): string {
  const trimmed = value.trim();
  return regex.test(trimmed) ? trimmed : "";
}

const gtmId = valid(siteConfig.analytics.gtmId, GTM_REGEX);
const usesGtm = gtmId !== "";

export const trackingConfig = {
  gtmId,
  usesGtm,
  // Quando o GTM está ativo, as ferramentas abaixo são geridas por ele.
  gaId: usesGtm ? "" : valid(siteConfig.analytics.gaId, GA_REGEX),
  metaPixelId: usesGtm ? "" : valid(siteConfig.analytics.metaPixelId, META_PIXEL_REGEX),
  clarityId: usesGtm ? "" : valid(siteConfig.analytics.clarityId, CLARITY_REGEX),
};

export const isTrackingConfigured =
  trackingConfig.usesGtm ||
  trackingConfig.gaId !== "" ||
  trackingConfig.metaPixelId !== "" ||
  trackingConfig.clarityId !== "";

/**
 * Áreas em que nenhuma ferramenta de medição, publicidade ou gravação de
 * sessão deve rodar (áreas administrativas ou com dados de clientes).
 * O site público atual não tem essas rotas; a lista protege rotas futuras.
 */
export const EXCLUDED_PATH_PREFIXES = ["/admin", "/painel", "/crm", "/api"];

export function isExcludedPath(pathname: string): boolean {
  return EXCLUDED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
