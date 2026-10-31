import { describe, expect, it, vi } from "vitest";
import {
  buildLeadEvent,
  isCapiEnabled,
  normalizePhone,
  parseTracking,
  sendLeadToMeta,
  sha256,
} from "@/lib/meta-capi";

const tracking = { eventId: "abcd1234-ef56", marketingConsent: true, fbp: "fb.1.123.456" };
const env = {
  META_CAPI_ENABLED: "true",
  META_CAPI_ACCESS_TOKEN: "token-de-teste",
  META_PIXEL_ID: "1111983571550069",
} as unknown as NodeJS.ProcessEnv;

describe("normalizePhone", () => {
  it("adiciona 55 e remove máscara", () => {
    expect(normalizePhone("(11) 91234-5678")).toBe("5511912345678");
    expect(normalizePhone("+55 11 91234-5678")).toBe("5511912345678");
    expect(normalizePhone("")).toBe("");
  });
});

describe("parseTracking", () => {
  it("aceita event_id válido e descarta lixo", () => {
    expect(parseTracking({ eventId: "abcd1234-ef56", marketingConsent: true })?.marketingConsent).toBe(true);
    expect(parseTracking({ eventId: "x" })).toBeNull();
    expect(parseTracking(null)).toBeNull();
    expect(parseTracking({ eventId: "abcd1234-ef56", fbp: "<script>" })?.fbp).toBeUndefined();
  });

  it("mantém só origem e caminho da URL", () => {
    const t = parseTracking({ eventId: "abcd1234-ef56", sourceUrl: "https://alavidestinos.com.br/orcamento?x=1#a" });
    expect(t?.sourceUrl).toBe("https://alavidestinos.com.br/orcamento");
  });
});

describe("buildLeadEvent", () => {
  it("usa hash SHA-256 normalizado e o mesmo event_id do Pixel", () => {
    const ev = buildLeadEvent({ tracking, email: "  Ana@Example.COM ", phone: "(11) 91234-5678", eventTime: 1 });
    expect(ev.event_id).toBe("abcd1234-ef56");
    expect(ev.event_name).toBe("Lead");
    expect(ev.user_data.em).toEqual([sha256("ana@example.com")]);
    expect(ev.user_data.ph).toEqual([sha256("5511912345678")]);
    expect(JSON.stringify(ev)).not.toContain("ana@example.com");
  });
});

describe("sendLeadToMeta", () => {
  it("não envia desligada, sem token ou sem consentimento", async () => {
    const f = vi.fn();
    expect(isCapiEnabled({} as NodeJS.ProcessEnv)).toBe(false);
    expect(await sendLeadToMeta({ tracking }, {} as NodeJS.ProcessEnv, f as never)).toBe("skipped");
    expect(
      await sendLeadToMeta({ tracking: { ...tracking, marketingConsent: false } }, env, f as never)
    ).toBe("skipped");
    expect(f).not.toHaveBeenCalled();
  });

  it("envia com consentimento e inclui test_event_code quando definido", async () => {
    const f = vi.fn().mockResolvedValue({ ok: true });
    const result = await sendLeadToMeta(
      { tracking, email: "a@b.com" },
      { ...env, META_CAPI_TEST_EVENT_CODE: "TEST123" } as NodeJS.ProcessEnv,
      f as never
    );
    expect(result).toBe("sent");
    const [url, init] = f.mock.calls[0];
    expect(url).toContain("/1111983571550069/events");
    expect(JSON.parse(init.body).test_event_code).toBe("TEST123");
  });

  it("devolve failed sem lançar exceção", async () => {
    const f = vi.fn().mockRejectedValue(new Error("rede"));
    expect(await sendLeadToMeta({ tracking }, env, f as never)).toBe("failed");
  });
});
