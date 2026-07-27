import { NextResponse } from "next/server";
import { validateQuoteForm } from "@/lib/validation";
import { buildQuoteEmailHtml, buildQuoteEmailSubject, buildQuoteEmailText } from "@/lib/email";
import { emptyQuoteFormData, type QuoteFormData } from "@/types/quote";

export const runtime = "nodejs";

/**
 * Endpoint de recebimento do formulario de orcamento.
 *
 * Este projeto e independente do CRM interno da ALAVI. O pedido validado e
 * entregue por um dos dois caminhos abaixo, na seguinte ordem de
 * prioridade:
 *
 * 1) E-mail direto via SMTP (nodemailer), se SMTP_HOST/SMTP_USER/
 *    SMTP_PASSWORD estiverem configurados — envia para ORCAMENTO_EMAIL_TO
 *    (ou, na falta dela, para o e-mail comercial do site).
 * 2) Webhook (ORCAMENTO_WEBHOOK_URL), se configurado — encaminha o payload
 *    (ver docs/INTEGRACAO-API.md) para um destino externo (Make/Zapier,
 *    Formspree, ou futuramente o CRM interno).
 *
 * Se nenhum dos dois estiver configurado, responde 501 e o frontend usa o
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

  const smtpConfigured =
    !!process.env.SMTP_HOST && !!process.env.SMTP_USER && !!process.env.SMTP_PASSWORD;
  const webhookUrl = process.env.ORCAMENTO_WEBHOOK_URL;

  if (!smtpConfigured && !webhookUrl) {
    return NextResponse.json({ error: "no_destination_configured" }, { status: 501 });
  }

  if (smtpConfigured) {
    try {
      await sendQuoteEmail(data);
      return NextResponse.json({ ok: true, channel: "email" });
    } catch (error) {
      console.error("Falha ao enviar e-mail do orçamento:", error);
      // Se o e-mail falhar mas houver webhook configurado, tenta o webhook
      // como caminho alternativo antes de desistir.
      if (!webhookUrl) {
        return NextResponse.json({ error: "email_send_failed" }, { status: 502 });
      }
    }
  }

  try {
    const webhookToken = process.env.ORCAMENTO_WEBHOOK_TOKEN;

    const response = await fetch(webhookUrl as string, {
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

    return NextResponse.json({ ok: true, channel: "webhook" });
  } catch {
    return NextResponse.json({ error: "webhook_unreachable" }, { status: 502 });
  }
}

async function sendQuoteEmail(data: QuoteFormData): Promise<void> {
  // Import dinâmico: evita custo de carregar o nodemailer em builds/rotas
  // que não chegam a usar o envio por e-mail.
  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const to = process.env.ORCAMENTO_EMAIL_TO || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"Site ALAVI" <${process.env.SMTP_USER}>`,
    to,
    replyTo: data.email || undefined,
    subject: buildQuoteEmailSubject(data),
    text: buildQuoteEmailText(data),
    html: buildQuoteEmailHtml(data),
  });
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
