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
