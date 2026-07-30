import type { QuoteFormData } from "@/types/quote";
import { buildClientWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Monta o corpo (texto simples) do e-mail de notificacao de um novo pedido
 * de orcamento, com todos os campos preenchidos pelo cliente.
 */
export function buildQuoteEmailText(data: QuoteFormData): string {
  const lines: string[] = [
    "Novo pedido de orçamento recebido pelo site da ALAVI.",
    "",
    `Nome completo: ${data.fullName}`,
    `WhatsApp: ${data.whatsapp}`,
    `E-mail: ${data.email}`,
    "",
    `Origem: ${data.originCity}`,
    `Destino: ${data.destination}`,
  ];

  if (data.flexibleDates) {
    lines.push("Datas: flexíveis");
  } else {
    if (data.departureDate) lines.push(`Data de ida: ${data.departureDate}`);
    if (data.returnDate) lines.push(`Data de volta: ${data.returnDate}`);
  }

  const paxParts: string[] = [`${data.adults} adulto(s)`];
  if (data.children) paxParts.push(`${data.children} criança(s)`);
  if (data.infants) paxParts.push(`${data.infants} bebê(s)`);
  lines.push(`Viajantes: ${paxParts.join(", ")}`);
  if (data.children > 0 && data.childrenAges) {
    lines.push(`Idade das crianças: ${data.childrenAges}`);
  }

  if (data.tripType) lines.push(`Tipo de viagem: ${data.tripType}`);
  if (data.flightClass) lines.push(`Classe de voo: ${data.flightClass}`);

  lines.push("");
  lines.push(`Precisa de hospedagem: ${data.needsAccommodation ? "Sim" : "Não"}`);
  if (data.needsAccommodation) {
    if (data.accommodationStandard) lines.push(`Padrão de hospedagem: ${data.accommodationStandard}`);
    if (data.roomsCount) lines.push(`Quantidade de quartos: ${data.roomsCount}`);
  }
  lines.push(`Precisa de seguro viagem: ${data.needsInsurance ? "Sim" : "Não"}`);
  lines.push(`Precisa de transfer: ${data.needsTransfer ? "Sim" : "Não"}`);

  lines.push("");
  lines.push(`Interesse em usar pontos/milhas: ${data.wantsToUsePoints ? "Sim" : "Não"}`);
  if (data.wantsToUsePoints) {
    if (data.loyaltyPrograms) lines.push(`Programas de fidelidade: ${data.loyaltyPrograms}`);
    if (data.approximatePoints) lines.push(`Pontos aproximados: ${data.approximatePoints}`);
  }

  if (data.estimatedBudget) lines.push(`\nOrçamento estimado: ${data.estimatedBudget}`);
  if (data.notes) lines.push(`Observações: ${data.notes}`);

  lines.push("");
  lines.push(`Autoriza contato: ${data.allowContact ? "Sim" : "Não"}`);
  lines.push(`Aceitou a Política de Privacidade: ${data.acceptsPrivacyPolicy ? "Sim" : "Não"}`);

  return lines.join("\n");
}

export function buildQuoteEmailSubject(data: QuoteFormData): string {
  return `Novo lead — ${data.fullName} — ${data.destination}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | number | boolean | undefined | null): string {
  if (value === undefined || value === null || value === "" || value === false) {
    return "";
  }
  const displayValue = typeof value === "boolean" ? "Sim" : String(value);
  return `
    <tr>
      <td style="padding:8px 16px;border-bottom:1px solid #eee;color:#5b6b82;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td>
      <td style="padding:8px 16px;border-bottom:1px solid #eee;color:#032050;font-size:14px;font-weight:600;">${escapeHtml(displayValue)}</td>
    </tr>`;
}

function linkRow(label: string, displayValue: string, href: string): string {
  return `
    <tr>
      <td style="padding:8px 16px;border-bottom:1px solid #eee;color:#5b6b82;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td>
      <td style="padding:8px 16px;border-bottom:1px solid #eee;font-size:14px;font-weight:600;">
        <a href="${href}" style="color:#1d7788;text-decoration:none;">${escapeHtml(displayValue)} ↗</a>
      </td>
    </tr>`;
}

function sectionTitle(title: string): string {
  return `
    <tr>
      <td colspan="2" style="padding:20px 16px 6px;color:#1d7788;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${escapeHtml(title)}</td>
    </tr>`;
}

/**
 * E-mail em HTML no formato "lead" — pensado para leitura rápida por quem
 * recebe o pedido (nome, contato e destino em destaque no topo, restante
 * organizado por seções).
 */
export function buildQuoteEmailHtml(data: QuoteFormData): string {
  const paxParts: string[] = [`${data.adults} adulto(s)`];
  if (data.children) paxParts.push(`${data.children} criança(s)`);
  if (data.infants) paxParts.push(`${data.infants} bebê(s)`);

  const rows = [
    sectionTitle("Contato"),
    row("Nome completo", data.fullName),
    data.whatsapp ? linkRow("WhatsApp", data.whatsapp, buildClientWhatsAppUrl(data)) : "",
    row("E-mail", data.email),

    sectionTitle("Viagem"),
    row("Origem", data.originCity),
    row("Destino", data.destination),
    row("Datas flexíveis", data.flexibleDates),
    !data.flexibleDates ? row("Data de ida", data.departureDate) : "",
    !data.flexibleDates ? row("Data de volta", data.returnDate) : "",
    row("Viajantes", paxParts.join(", ")),
    row("Idade das crianças", data.children > 0 ? data.childrenAges : undefined),
    row("Tipo de viagem", data.tripType),
    row("Classe de voo", data.flightClass),

    sectionTitle("Serviços adicionais"),
    row("Precisa de hospedagem", data.needsAccommodation),
    row("Padrão de hospedagem", data.needsAccommodation ? data.accommodationStandard : undefined),
    row("Quantidade de quartos", data.needsAccommodation ? data.roomsCount : undefined),
    row("Precisa de seguro viagem", data.needsInsurance),
    row("Precisa de transfer", data.needsTransfer),

    sectionTitle("Pontos e milhas"),
    row("Interesse em usar pontos/milhas", data.wantsToUsePoints),
    row("Programas de fidelidade", data.wantsToUsePoints ? data.loyaltyPrograms : undefined),
    row("Pontos aproximados", data.wantsToUsePoints ? data.approximatePoints : undefined),

    sectionTitle("Orçamento e observações"),
    row("Orçamento estimado", data.estimatedBudget),
    row("Observações", data.notes),

    sectionTitle("Consentimento"),
    row("Autoriza contato", data.allowContact),
    row("Aceitou a Política de Privacidade", data.acceptsPrivacyPolicy),
  ]
    .filter(Boolean)
    .join("");

  return `
<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:24px;background:#f4f2ec;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e0d3;">
      <tr>
        <td style="background:#032050;padding:24px 24px;">
          <p style="margin:0;color:#82b0ab;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Novo lead — site ALAVI</p>
          <p style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:700;">${escapeHtml(data.fullName)}</p>
          <p style="margin:2px 0 0;color:#c7daeb;font-size:14px;">${escapeHtml(data.originCity)} → ${escapeHtml(data.destination)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 8px 24px;">
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            ${rows}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px;background:#fbf9f4;border-top:1px solid #e5e0d3;">
          <p style="margin:0;color:#9a917d;font-size:11px;">Recebido pelo formulário de orçamento em alavidestinos.com.br</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * E-mail de confirmação enviado ao próprio cliente logo após o envio do
 * formulário — avisa que o pedido foi recebido e que a ALAVI vai entrar em
 * contato, para reduzir a ansiedade de quem preencheu o formulário.
 */
export function buildClientConfirmationEmailSubject(): string {
  return "Recebemos seu pedido — ALAVI Destinos & Experiências";
}

export function buildClientConfirmationEmailText(data: QuoteFormData): string {
  const lines: string[] = [
    `Olá, ${data.fullName.trim().split(/\s+/)[0] || ""}!`,
    "",
    "Recebemos seu pedido de orçamento e em breve um de nossos consultores vai entrar em contato com você.",
    "",
    `Destino: ${data.destination}`,
  ];
  if (data.originCity) lines.push(`Origem: ${data.originCity}`);
  if (!data.flexibleDates && data.departureDate) lines.push(`Data de ida: ${data.departureDate}`);
  if (data.flexibleDates) lines.push("Datas: flexíveis");

  lines.push(
    "",
    "Horário de atendimento: segunda a sexta-feira, das 9h30 às 18h. Sábados, das 9h30 às 12h.",
    "",
    "Qualquer dúvida, é só responder este e-mail.",
    "",
    "Atenciosamente,",
    "ALAVI Destinos & Experiências"
  );

  return lines.join("\n");
}

export function buildClientConfirmationEmailHtml(data: QuoteFormData): string {
  const firstName = data.fullName.trim().split(/\s+/)[0] || "";
  const summaryParts: string[] = [];
  if (data.originCity) summaryParts.push(`saindo de ${data.originCity}`);
  if (!data.flexibleDates && data.departureDate) summaryParts.push(`com ida em ${data.departureDate}`);
  if (data.flexibleDates) summaryParts.push("com datas flexíveis");

  return `
<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:24px;background:#f4f2ec;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e0d3;">
      <tr>
        <td style="background:#032050;padding:28px 28px;">
          <p style="margin:0;color:#82b0ab;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">ALAVI Destinos &amp; Experiências</p>
          <p style="margin:8px 0 0;color:#ffffff;font-size:20px;font-weight:700;">Recebemos seu pedido!</p>
        </td>
      </tr>
      <tr>
        <td style="padding:28px;">
          <p style="margin:0 0 16px;color:#032050;font-size:15px;line-height:1.6;">
            Olá${firstName ? `, ${escapeHtml(firstName)}` : ""}! Recebemos seu pedido de orçamento para
            <strong>${escapeHtml(data.destination)}</strong>${summaryParts.length ? `, ${escapeHtml(summaryParts.join(" "))}` : ""}.
          </p>
          <p style="margin:0 0 16px;color:#032050;font-size:15px;line-height:1.6;">
            Em breve um de nossos consultores entra em contato para dar continuidade ao seu pedido, sem compromisso.
          </p>
          <p style="margin:0;padding:14px 16px;background:#fbf9f4;border-radius:10px;color:#5b6b82;font-size:13px;line-height:1.6;">
            Horário de atendimento: segunda a sexta-feira, das 9h30 às 18h. Sábados, das 9h30 às 12h.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;background:#fbf9f4;border-top:1px solid #e5e0d3;">
          <p style="margin:0;color:#9a917d;font-size:11px;">Qualquer dúvida, é só responder este e-mail.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
