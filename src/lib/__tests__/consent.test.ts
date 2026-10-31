import { describe, expect, it } from "vitest";
import { DEFAULT_CONSENT_MODE, parseStoredConsent, toConsentMode } from "@/lib/consent";
import { isExcludedPath } from "@/lib/tracking-config";

describe("parseStoredConsent", () => {
  it("retorna null quando não há escolha salva", () => {
    expect(parseStoredConsent(null)).toBeNull();
    expect(parseStoredConsent("")).toBeNull();
  });

  it("lê o formato antigo (accepted/rejected)", () => {
    expect(parseStoredConsent("accepted")).toEqual({ analytics: true, marketing: true });
    expect(parseStoredConsent("rejected")).toEqual({ analytics: false, marketing: false });
  });

  it("lê o formato novo em JSON", () => {
    const raw = JSON.stringify({ version: 2, analytics: true, marketing: false });
    expect(parseStoredConsent(raw)).toEqual({ analytics: true, marketing: false });
  });

  it("ignora valores inválidos", () => {
    expect(parseStoredConsent("{quebrado")).toBeNull();
    expect(parseStoredConsent("42")).toBeNull();
  });
});

describe("toConsentMode", () => {
  it("nega tudo, exceto o necessário, por padrão", () => {
    expect(DEFAULT_CONSENT_MODE.analytics_storage).toBe("denied");
    expect(DEFAULT_CONSENT_MODE.ad_storage).toBe("denied");
    expect(DEFAULT_CONSENT_MODE.ad_user_data).toBe("denied");
    expect(DEFAULT_CONSENT_MODE.ad_personalization).toBe("denied");
    expect(DEFAULT_CONSENT_MODE.security_storage).toBe("granted");
  });

  it("separa análise de publicidade", () => {
    const onlyAnalytics = toConsentMode({ analytics: true, marketing: false });
    expect(onlyAnalytics.analytics_storage).toBe("granted");
    expect(onlyAnalytics.ad_storage).toBe("denied");
    expect(onlyAnalytics.ad_user_data).toBe("denied");

    const onlyMarketing = toConsentMode({ analytics: false, marketing: true });
    expect(onlyMarketing.analytics_storage).toBe("denied");
    expect(onlyMarketing.ad_storage).toBe("granted");
    expect(onlyMarketing.ad_personalization).toBe("granted");
  });
});

describe("isExcludedPath", () => {
  it("exclui áreas administrativas e de API", () => {
    expect(isExcludedPath("/admin")).toBe(true);
    expect(isExcludedPath("/admin/clientes")).toBe(true);
    expect(isExcludedPath("/crm/leads")).toBe(true);
    expect(isExcludedPath("/api/orcamento")).toBe(true);
  });

  it("não exclui páginas públicas", () => {
    expect(isExcludedPath("/")).toBe(false);
    expect(isExcludedPath("/orcamento")).toBe(false);
    expect(isExcludedPath("/administracao-de-viagens")).toBe(false);
  });
});
