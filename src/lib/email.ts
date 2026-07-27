import type { QuoteFormData } from "@/types/quote";

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
  return `Novo orçamento — ${data.fullName} — ${data.destination}`;
}
