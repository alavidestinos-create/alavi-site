/**
 * Limpeza de cookies de medição por categoria de consentimento.
 *
 * Só apaga cookies PRÓPRIOS (do domínio do site) gravados por GA4/Google Ads,
 * Meta Pixel e Clarity. Cookies de terceiros (ex.: clarity.ms) não podem ser
 * apagados a partir da página.
 */

export const ANALYTICS_COOKIE_PATTERNS: RegExp[] = [/^_ga(_.*)?$/, /^_gid$/, /^_gat(_.*)?$/, /^_clck$/, /^_clsk$/];
export const MARKETING_COOKIE_PATTERNS: RegExp[] = [/^_gcl_.*/, /^_fbp$/, /^_fbc$/];

export type CookieJar = { cookie: string };

export function cookiePatternsFor(categories: { analytics: boolean; marketing: boolean }): RegExp[] {
  return [
    ...(categories.analytics ? ANALYTICS_COOKIE_PATTERNS : []),
    ...(categories.marketing ? MARKETING_COOKIE_PATTERNS : []),
  ];
}

/** Domínios candidatos para expirar o cookie: host atual e domínios pai. */
export function candidateDomains(hostname: string): Array<string | undefined> {
  const parts = hostname.split(".");
  const domains = new Set<string | undefined>([undefined, hostname]);
  for (let i = 1; i < parts.length - 1; i++) domains.add(`.${parts.slice(i).join(".")}`);
  return [...domains];
}

/**
 * Expira os cookies cujo nome case com as categorias marcadas como retiradas.
 * `categories.analytics = true` significa "esta categoria foi RETIRADA".
 */
export function clearCookiesForCategories(
  categories: { analytics: boolean; marketing: boolean },
  jar: CookieJar,
  hostname: string
): string[] {
  const patterns = cookiePatternsFor(categories);
  if (patterns.length === 0) return [];

  const cleared: string[] = [];
  const domains = candidateDomains(hostname);

  jar.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0]?.trim();
    if (!name || !patterns.some((re) => re.test(name))) return;
    cleared.push(name);
    domains.forEach((domain) => {
      const domainPart = domain ? `; domain=${domain}` : "";
      jar.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/${domainPart}`;
    });
  });

  return cleared;
}
