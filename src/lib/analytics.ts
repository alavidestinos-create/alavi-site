"use client";

/**
 * Camada fina sobre gtag / dataLayer para disparar eventos de conversao.
 * Nao faz nada caso o Analytics nao esteja configurado (nenhum ID definido)
 * ou o usuario ainda nao tenha dado consentimento de cookies nao essenciais.
 */

type EventName =
  | "whatsapp_click"
  | "quote_form_start"
  | "quote_form_submit"
  | "quote_form_validation_error"
  | "service_click"
  | "destination_click"
  | "instagram_click";

interface EventPayload {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_STORAGE_KEY = "alavi-cookie-consent";

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

export function trackEvent(name: EventName, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...payload });
  }
}

export { CONSENT_STORAGE_KEY };
