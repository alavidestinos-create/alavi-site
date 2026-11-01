/**
 * Detecção simples e conservadora de tráfego automatizado (bots, navegadores
 * headless, scripts). Objetivo: não contar bots em métricas/públicos de
 * anúncios e não aceitar envios automatizados no formulário.
 *
 * Não substitui a proteção da plataforma de anúncios (filtro de cliques
 * inválidos do Google Ads) nem um WAF/CDN. É só uma camada barata e sem
 * dependências. Falso positivo é raro porque só olha para assinaturas
 * explícitas de automação.
 */

const BOT_UA =
  /bot\b|crawler|spider|slurp|headless|phantomjs|puppeteer|playwright|selenium|lighthouse|pagespeed|gtmetrix|curl\/|wget\/|python-requests|python-urllib|aiohttp|httpx|go-http-client|java\/|okhttp|libwww|scrapy|node-fetch|axios\/|postmanruntime|facebookexternalhit|bytespider|semrush|ahrefs|mj12|dotbot/i;

export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true; // navegador real sempre envia User-Agent
  return BOT_UA.test(userAgent);
}

/** Uso no navegador: UA de bot ou automação declarada (navigator.webdriver). */
export function isLikelyBrowserBot(nav: Pick<Navigator, "userAgent" | "webdriver">): boolean {
  return nav.webdriver === true || isBotUserAgent(nav.userAgent);
}
