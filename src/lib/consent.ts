/**
 * Gestão do consentimento de cookies (LGPD) e mapeamento para o Google
 * Consent Mode v2.
 *
 * Categorias:
 *  - necessários: sempre ativos (não dependem de consentimento).
 *  - análise: Google Analytics e Microsoft Clarity (medição e gravação de sessões).
 *  - publicidade: Meta Pixel, Google Ads e remarketing.
 *
 * Armazenamento: localStorage, na chave CONSENT_STORAGE_KEY. O formato antigo
 * ("accepted" / "rejected") continua sendo lido para não perder escolhas já
 * feitas por visitantes.
 */

export const CONSENT_STORAGE_KEY = "alavi-cookie-consent";
/** Disparado em window sempre que o visitante salva uma nova escolha. */
export const CONSENT_EVENT = "alavi:consent-changed";
/** Disparado em window para reabrir o banner (botão "Preferências de cookies"). */
export const OPEN_PREFERENCES_EVENT = "alavi:open-cookie-preferences";

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

export type ConsentModeValue = "granted" | "denied";

export interface ConsentModeSettings {
  ad_storage: ConsentModeValue;
  ad_user_data: ConsentModeValue;
  ad_personalization: ConsentModeValue;
  analytics_storage: ConsentModeValue;
  functionality_storage: ConsentModeValue;
  personalization_storage: ConsentModeValue;
  security_storage: ConsentModeValue;
}

/** Padrão antes de qualquer escolha: tudo negado, exceto o estritamente necessário. */
export const DEFAULT_CONSENT_MODE: ConsentModeSettings = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted",
  personalization_storage: "denied",
  security_storage: "granted",
};

export function toConsentMode(state: ConsentState): ConsentModeSettings {
  const analytics: ConsentModeValue = state.analytics ? "granted" : "denied";
  const marketing: ConsentModeValue = state.marketing ? "granted" : "denied";
  return {
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
    analytics_storage: analytics,
    functionality_storage: "granted",
    personalization_storage: marketing,
    security_storage: "granted",
  };
}

/** Interpreta o valor salvo no localStorage (formato novo em JSON ou legado). */
export function parseStoredConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  if (raw === "accepted") return { analytics: true, marketing: true };
  if (raw === "rejected") return { analytics: false, marketing: false };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed === "object" && parsed !== null) {
      const { analytics, marketing } = parsed as Record<string, unknown>;
      return { analytics: analytics === true, marketing: marketing === true };
    }
  } catch {
    // valor inválido: trata como se o visitante ainda não tivesse escolhido
  }
  return null;
}

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    return parseStoredConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function saveConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ version: 2, ...state, updatedAt: new Date().toISOString() })
    );
  } catch {
    // localStorage indisponível: a escolha vale apenas nesta sessão (via evento).
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return readConsent()?.marketing === true;
}

export function hasAnyConsent(): boolean {
  const state = readConsent();
  return state !== null && (state.analytics || state.marketing);
}
