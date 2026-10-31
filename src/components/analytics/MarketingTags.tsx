"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  CONSENT_EVENT,
  DEFAULT_CONSENT_MODE,
  readConsent,
  toConsentMode,
  type ConsentState,
} from "@/lib/consent";
import { isExcludedPath, isTrackingConfigured, trackingConfig } from "@/lib/tracking-config";
import { trackEvent } from "@/lib/analytics";
import { clearCookiesForCategories } from "@/lib/cookie-cleanup";

/**
 * Único ponto de carga das ferramentas de medição e marketing.
 *
 * Fluxo:
 *  1. Define o Google Consent Mode v2 com tudo NEGADO por padrão (e aplica a
 *     escolha já salva do visitante, se houver).
 *  2. Só carrega scripts de terceiros depois que o visitante consentir em pelo
 *     menos uma categoria (análise ou publicidade) — nenhuma requisição a
 *     googletagmanager.com, facebook.net ou clarity.ms antes disso.
 *  3. Com NEXT_PUBLIC_GTM_ID: carrega somente o GTM (GA4, Meta, Clarity e Ads
 *     são configurados dentro do contêiner). Sem GTM: carrega diretamente as
 *     ferramentas cujos IDs estiverem preenchidas, respeitando a categoria de
 *     cada uma.
 *  4. Nunca roda em áreas excluídas (ver tracking-config.ts).
 *
 * Retirar o consentimento recarrega a página: scripts de terceiros já
 * carregados não podem ser "descarregados" com segurança.
 */

type GtagArgs = unknown[];

function ensureDataLayer(): unknown[] {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

function ensureGtag(): (...args: GtagArgs) => void {
  if (!window.gtag) {
    window.gtag = function gtag(...args: GtagArgs) {
      // O gtag.js e o GTM exigem o objeto `arguments`, não um array.
      // eslint-disable-next-line prefer-rest-params
      ensureDataLayer().push(arguments);
      void args;
    };
  }
  return window.gtag;
}

function loadScript(id: string, src: string): void {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadGtm(gtmId: string): void {
  if (document.getElementById("alavi-gtm")) return;
  ensureDataLayer().push({ "gtm.start": Date.now(), event: "gtm.js" });
  loadScript("alavi-gtm", `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
}

function loadGa(gaId: string): void {
  if (document.getElementById("alavi-ga")) return;
  const gtag = ensureGtag();
  loadScript("alavi-ga", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`);
  gtag("js", new Date());
  // Os page_views são enviados manualmente (SPA), por rota.
  gtag("config", gaId, { send_page_view: false });
}

function loadMetaPixel(pixelId: string): void {
  if (document.getElementById("alavi-meta-pixel")) return;
  if (!window.fbq) {
    const queue: unknown[] = [];
    const stub = Object.assign(
      function fbq(...args: unknown[]) {
        queue.push(args);
      },
      { queue, loaded: true, version: "2.0" }
    );
    window.fbq = stub;
  }
  loadScript("alavi-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", pixelId);
}

function loadClarity(clarityId: string): void {
  if (document.getElementById("alavi-clarity")) return;
  if (!window.clarity) {
    const queue: unknown[] = [];
    window.clarity = Object.assign(
      function clarity(...args: unknown[]) {
        queue.push(args);
      },
      { q: queue }
    );
  }
  loadScript("alavi-clarity", `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`);
}

export function MarketingTags() {
  const pathname = usePathname();
  const consentRef = useRef<ConsentState | null>(null);
  const defaultsSet = useRef(false);
  const lastPageSent = useRef<string | null>(null);

  /** Envia o "page view" da rota atual conforme o modo (GTM ou direto). */
  function sendPageView(path: string) {
    if (lastPageSent.current === path) return;
    lastPageSent.current = path;

    const consent = consentRef.current;
    if (!consent || isExcludedPath(path)) return;

    if (trackingConfig.usesGtm) {
      // O GTM dispara o page view inicial sozinho; trocas de rota viram evento.
      return;
    }
    if (trackingConfig.gaId && consent.analytics && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
    if (trackingConfig.metaPixelId && consent.marketing && window.fbq) {
      window.fbq("track", "PageView");
    }
  }

  function applyConsent(state: ConsentState) {
    consentRef.current = state;
    if (!isTrackingConfigured) return;
    if (isExcludedPath(window.location.pathname)) return;
    if (!state.analytics && !state.marketing) return;

    if (trackingConfig.usesGtm) {
      loadGtm(trackingConfig.gtmId);
      lastPageSent.current = window.location.pathname; // GTM registra a página inicial
      return;
    }

    if (trackingConfig.gaId && state.analytics) loadGa(trackingConfig.gaId);
    if (trackingConfig.clarityId && state.analytics) loadClarity(trackingConfig.clarityId);
    if (trackingConfig.metaPixelId && state.marketing) loadMetaPixel(trackingConfig.metaPixelId);
    lastPageSent.current = null;
    sendPageView(window.location.pathname);
  }

  // Inicialização única: consent default (negado), escolha salva e escuta de mudanças.
  useEffect(() => {
    if (!isTrackingConfigured) return;

    if (!defaultsSet.current) {
      defaultsSet.current = true;
      ensureDataLayer();
      ensureGtag()("consent", "default", { ...DEFAULT_CONSENT_MODE, wait_for_update: 500 });
    }

    const stored = readConsent();
    if (stored) {
      ensureGtag()("consent", "update", toConsentMode(stored));
      applyConsent(stored);
    }

    function onConsentChanged(event: Event) {
      const next = (event as CustomEvent<ConsentState>).detail;
      if (!next) return;
      const previous = consentRef.current;
      const revoked =
        !!previous && ((previous.analytics && !next.analytics) || (previous.marketing && !next.marketing));

      ensureGtag()("consent", "update", toConsentMode(next));

      if (revoked) {
        // Scripts de terceiros já carregados não são removíveis com segurança:
        // recarrega para que a página volte a rodar sem eles.
        consentRef.current = next;
        clearCookiesForCategories(
          {
            analytics: !!previous && previous.analytics && !next.analytics,
            marketing: !!previous && previous.marketing && !next.marketing,
          },
          document,
          window.location.hostname
        );
        window.location.reload();
        return;
      }
      applyConsent(next);
    }

    window.addEventListener(CONSENT_EVENT, onConsentChanged);
    return () => window.removeEventListener(CONSENT_EVENT, onConsentChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mudança de rota (navegação client-side do App Router).
  useEffect(() => {
    if (!isTrackingConfigured || !consentRef.current) return;
    const previous = lastPageSent.current;
    if (trackingConfig.usesGtm) {
      if (previous !== null && previous !== pathname && !isExcludedPath(pathname)) {
        trackEvent("route_change", { page_title: document.title });
      }
      lastPageSent.current = pathname;
      return;
    }
    sendPageView(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Cliques em links de WhatsApp (intenção — NÃO é lead confirmado).
  useEffect(() => {
    if (!isTrackingConfigured) return;
    const whatsappPrefix = `https://wa.me/${siteConfig.contact.whatsappNumber}`;

    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || !link.href.startsWith(whatsappPrefix)) return;
      trackEvent("whatsapp_click", {
        link_location: link.dataset.trackSource || "site",
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
