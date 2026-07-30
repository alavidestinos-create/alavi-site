import { siteConfig } from "@/config/site";
import type { QuoteFormData } from "@/types/quote";

/**
 * Monta a URL do WhatsApp (wa.me) com uma mensagem pre-preenchida.
 * Centraliza a construcao do link para que o numero so precise ser
 * configurado em um unico lugar (src/config/site.ts / env).
 */
export function buildWhatsAppUrl(message: string): string {
  const number = siteConfig.contact.whatsappNumber;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * Normaliza um numero de WhatsApp digitado pelo cliente (ex: "(11) 99999-9999",
 * sem DDI) para o formato exigido pelo wa.me. Assume Brasil (+55) quando o
 * numero informado nao ja inclui um DDI (ou seja, tem 10 ou 11 digitos —
 * DDD + numero).
 */
export function normalizeBrazilianPhoneDigits(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.length <= 11 && digits.length > 0) {
    return `55${digits}`;
  }
  return digits;
}

/**
 * Monta o link de WhatsApp para a ALAVI falar diretamente com o cliente que
 * preencheu o formulario de orcamento — usado no e-mail de lead, para que
 * quem recebe o pedido consiga clicar e ja abrir a conversa com o cliente.
 */
export function buildClientWhatsAppUrl(data: Pick<QuoteFormData, "whatsapp" | "fullName" | "destination">): string {
  const number = normalizeBrazilianPhoneDigits(data.whatsapp);
  const firstName = data.fullName.trim().split(/\s+/)[0] || "";
  const greeting = firstName ? `Olá ${firstName}!` : "Olá!";
  const destinationPart = data.destination ? ` para ${data.destination}` : "";
  const message = `${greeting} Aqui é da ALAVI Destinos, recebemos seu pedido de orçamento${destinationPart} e já vamos te ajudar a planejar essa viagem.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Gera uma mensagem de WhatsApp organizada a partir dos dados do
 * formulario de orcamento, incluindo apenas os campos essenciais para o
 * primeiro contato (evita expor detalhes sensiveis desnecessarios, como
 * quantidade exata de pontos, diretamente no link).
 */
export function buildQuoteWhatsAppMessage(data: Partial<QuoteFormData>): string {
  const lines: string[] = [
    "Olá! Vim pelo site da ALAVI e gostaria de solicitar um orçamento de viagem.",
    "",
  ];

  if (data.fullName) lines.push(`Nome: ${data.fullName}`);
  if (data.originCity) lines.push(`Origem: ${data.originCity}`);
  if (data.destination) lines.push(`Destino: ${data.destination}`);
  if (data.departureDate) lines.push(`Ida: ${data.departureDate}`);
  if (data.returnDate) lines.push(`Volta: ${data.returnDate}`);
  if (data.flexibleDates) lines.push("Datas flexíveis: Sim");

  const paxParts: string[] = [];
  if (data.adults) paxParts.push(`${data.adults} adulto(s)`);
  if (data.children) paxParts.push(`${data.children} criança(s)`);
  if (data.infants) paxParts.push(`${data.infants} bebê(s)`);
  if (paxParts.length > 0) lines.push(`Viajantes: ${paxParts.join(", ")}`);

  if (data.tripType) lines.push(`Tipo de viagem: ${data.tripType}`);
  if (data.flightClass) lines.push(`Classe: ${data.flightClass}`);
  if (data.needsAccommodation) lines.push("Precisa de hospedagem: Sim");
  if (data.needsInsurance) lines.push("Precisa de seguro viagem: Sim");
  if (data.needsTransfer) lines.push("Precisa de transfer: Sim");
  if (data.wantsToUsePoints) lines.push("Tem interesse em usar pontos/milhas: Sim");
  if (data.estimatedBudget) lines.push(`Orçamento estimado: ${data.estimatedBudget}`);
  if (data.notes) lines.push(`Observações: ${data.notes}`);

  return lines.join("\n");
}
