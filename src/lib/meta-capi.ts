import { createHash } from "node:crypto";

/**
 * API de Conversões da Meta (servidor) para o evento Lead.
 *
 * Regras:
 * - DESLIGADA por padrão. Só envia se META_CAPI_ENABLED === "true" e existirem
 *   META_CAPI_ACCESS_TOKEN e META_PIXEL_ID (variáveis de servidor, sem
 *   NEXT_PUBLIC_; o token nunca vai para o navegador nem para o repositório).
 * - Só envia com consentimento de Publicidade informado pelo navegador no mesmo
 *   envio do formulário. Sem consentimento, nada é enviado nem hasheado.
 * - Deduplicação: o `event_id` é o mesmo usado pelo Pixel (eventID) no
 *   generate_lead, então a Meta conta um único Lead.
 * - E-mail e telefone são enviados somente com hash SHA-256 (normalizados).
 * - Falha da Meta nunca derruba o formulário: o lead já foi entregue por e-mail.
 * - META_CAPI_TEST_EVENT_CODE (opcional) manda os eventos para "Eventos de teste".
 */

const GRAPH_VERSION = "v21.0";

export interface CapiTracking {
  eventId: string;
  marketingConsent: boolean;
  fbp?: string;
  fbc?: string;
  sourceUrl?: string;
}

export interface CapiLeadInput {
  tracking: CapiTracking;
  email?: string;
  phone?: string;
  leadType?: string;
  clientIp?: string;
  userAgent?: string;
  /** Segundos desde a época; injetável para testes. */
  eventTime?: number;
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Somente dígitos; assume Brasil (55) quando vier sem código do país. */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("55") && digits.length >= 12) return digits;
  return digits.length === 10 || digits.length === 11 ? `55${digits}` : digits;
}

/** Valida e saneia o bloco `tracking` recebido do navegador. */
export function parseTracking(value: unknown): CapiTracking | null {
  if (typeof value !== "object" || value === null) return null;
  const v = value as Record<string, unknown>;
  const eventId = typeof v.eventId === "string" ? v.eventId.trim() : "";
  if (!/^[A-Za-z0-9-]{8,64}$/.test(eventId)) return null;

  const clean = (x: unknown, max: number) =>
    typeof x === "string" && /^[A-Za-z0-9._-]+$/.test(x) && x.length <= max ? x : undefined;

  let sourceUrl: string | undefined;
  if (typeof v.sourceUrl === "string") {
    try {
      const url = new URL(v.sourceUrl);
      if (url.protocol === "https:" || url.protocol === "http:") {
        sourceUrl = `${url.origin}${url.pathname}`;
      }
    } catch {
      // URL inválida: ignorada
    }
  }

  return {
    eventId,
    marketingConsent: v.marketingConsent === true,
    fbp: clean(v.fbp, 100),
    fbc: clean(v.fbc, 200),
    sourceUrl,
  };
}

export function isCapiEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return (
    env.META_CAPI_ENABLED === "true" && !!env.META_CAPI_ACCESS_TOKEN && !!env.META_PIXEL_ID
  );
}

export function buildLeadEvent(input: CapiLeadInput) {
  const userData: Record<string, unknown> = {};
  if (input.email) {
    const em = normalizeEmail(input.email);
    if (em) userData.em = [sha256(em)];
  }
  if (input.phone) {
    const ph = normalizePhone(input.phone);
    if (ph) userData.ph = [sha256(ph)];
  }
  if (input.tracking.fbp) userData.fbp = input.tracking.fbp;
  if (input.tracking.fbc) userData.fbc = input.tracking.fbc;
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.userAgent) userData.client_user_agent = input.userAgent;

  return {
    event_name: "Lead",
    event_time: input.eventTime ?? Math.floor(Date.now() / 1000),
    event_id: input.tracking.eventId,
    action_source: "website",
    ...(input.tracking.sourceUrl ? { event_source_url: input.tracking.sourceUrl } : {}),
    user_data: userData,
    custom_data: { content_category: input.leadType || "nao_informado" },
  };
}

/**
 * Envia o Lead para a Meta. Retorna "skipped" quando desligada/sem consentimento,
 * "sent" em sucesso e "failed" em erro (sem lançar exceção).
 */
export async function sendLeadToMeta(
  input: CapiLeadInput,
  env: NodeJS.ProcessEnv = process.env,
  fetchImpl: typeof fetch = fetch
): Promise<"sent" | "skipped" | "failed"> {
  if (!isCapiEnabled(env)) return "skipped";
  if (!input.tracking.marketingConsent) return "skipped";

  const payload: Record<string, unknown> = {
    data: [buildLeadEvent(input)],
    access_token: env.META_CAPI_ACCESS_TOKEN,
  };
  if (env.META_CAPI_TEST_EVENT_CODE) payload.test_event_code = env.META_CAPI_TEST_EVENT_CODE;

  try {
    const response = await fetchImpl(
      `https://graph.facebook.com/${GRAPH_VERSION}/${env.META_PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(4000),
      }
    );
    if (!response.ok) {
      console.error("API de Conversões da Meta respondeu", response.status);
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.error("Falha ao enviar à API de Conversões da Meta:", error instanceof Error ? error.name : "erro");
    return "failed";
  }
}
