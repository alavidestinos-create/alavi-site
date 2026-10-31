"use client";

import { hasAnalyticsConsent, hasAnyConsent, hasMarketingConsent } from "@/lib/consent";
import { isExcludedPath, isTrackingConfigured, trackingConfig } from "@/lib/tracking-config";

/**
 * Camada de eventos de conversão do site.
 *
 * - Com GTM configurado, todo evento vai para o dataLayer (o GTM decide para
 *   quais ferramentas enviar: GA4, Meta, Google Ads etc.).
 * - Sem GTM, usa diretamente GA4 (gtag) e Meta Pixel (fbq), se existirem.
 * - Nada é enviado sem consentimento, nem em áreas excluídas, nem enquanto
 *   nenhum ID estiver configurado.
 * - Os payloads NUNCA devem conter dados pessoais (nome, e-mail, telefone,
 *   texto livre digitado pelo cliente).
 *
 * Diferença importante entre os eventos:
 *  - whatsapp_click: intenção — o visitante clicou para abrir o WhatsApp.
 *  - generate_lead: lead confirmado — o pedido de orçamento foi recebido com
 *    sucesso pelo servidor.
 */

export type EventName =
  | "whatsapp_click"
  | "quote_form_start"
  | "quote_form_validation_error"
  | "quote_form_submit"
  | "quote_form_whatsapp_handoff"
  | "quote_form_error"
  | "generate_lead"
  | "service_click"
  | "destination_click"
  | "instagram_click"
  | "article_share_whatsapp"
  | "article_link_copied"
  | "route_change";

export interface EventPayload {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

// Eventos que também viram eventos padrão do Meta Pixel (apenas no modo sem GTM).
const META_STANDARD_EVENTS: Partial<Record<EventName, string>> = {
  generate_lead: "Lead",
  whatsapp_click: "Contact",
};

export function trackEvent(name: EventName, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;
  if (!isTrackingConfigured) return;
  if (!hasAnyConsent()) return;
  if (isExcludedPath(window.location.pathname)) return;

  const params: EventPayload = { ...payload, page_path: window.location.pathname };

  if (trackingConfig.usesGtm) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
    return;
  }

  if (trackingConfig.gaId && hasAnalyticsConsent() && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  const metaEvent = META_STANDARD_EVENTS[name];
  if (
    metaEvent &&
    trackingConfig.metaPixelId &&
    hasMarketingConsent() &&
    typeof window.fbq === "function"
  ) {
    const { event_id: eventId, ...rest } = params;
    window.fbq("track", metaEvent, rest, eventId ? { eventID: String(eventId) } : undefined);
  }
}

/** ID único por evento — permite deduplicar navegador x servidor (API de Conversões, no futuro). */
export function createEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
