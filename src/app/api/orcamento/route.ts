import { NextResponse } from "next/server";
import { validateQuoteForm } from "@/lib/validation";
import { emptyQuoteFormData, type QuoteFormData } from "@/types/quote";

export const runtime = "nodejs";

/**
 * Endpoint de recebimento do formulario de orcamento.
 *
 * Este projeto e independente do CRM interno da ALAVI. Enquanto nao existe
 * uma integracao direta por API com o sistema interno, este endpoint apenas
 * valida os dados no servidor e, se ORCAMENTO_WEBHOOK_URL estiver
 * configurada, encaminha o payload (ver formato em docs/INTEGRACAO-API.md)
 * para esse destino (ex.: um webhook do Make/Zapier, um servico de
 * formulario, ou futuramente o endpoint do CRM).
 *
 * Se nenhum destino estiver configurado, responde 501 e o frontend usa o
 * fallback de continuar o pedido diretamente pelo WhatsApp.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const data: QuoteFormData = { ...emptyQuoteFormData, ...sanitize(body) };
  const errors = validateQuoteForm(data);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "validation_failed", fields: errors }, { status: 422 });
  }

  const webhookUrl = process.env.ORCAMENTO_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "no_destination_configured" },
      { status: 501 }
    );
  }

  try {
    const webhookToken = process.env.ORCAMENTO_WEBHOOK_TOKEN;

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(webhookToken ? { Authorization: `Bearer ${webhookToken}` } : {}),
      },
      body: JSON.stringify({
        source: "site-alavi",
        submittedAt: new Date().toISOString(),
        data,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "webhook_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "webhook_unreachable" }, { status: 502 });
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Sanitizacao basica: mantem apenas as chaves conhecidas do formulario e
// garante tipos primitivos (evita injecao de objetos/arrays inesperados).
function sanitize(input: Record<string, unknown>): Partial<QuoteFormData> {
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(emptyQuoteFormData) as Array<keyof QuoteFormData>) {
    const value = input[key];
    const defaultValue = emptyQuoteFormData[key];

    if (typeof defaultValue === "boolean") {
      result[key] = typeof value === "boolean" ? value : defaultValue;
    } else if (typeof defaultValue === "number") {
      result[key] = typeof value === "number" && Number.isFinite(value) ? value : defaultValue;
    } else {
      result[key] = typeof value === "string" ? value.slice(0, 2000) : defaultValue;
    }
  }

  return result as Partial<QuoteFormData>;
}
