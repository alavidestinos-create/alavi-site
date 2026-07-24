import type { QuoteFormData } from "@/types/quote";

export type QuoteFormErrors = Partial<Record<keyof QuoteFormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Aceita numeros com DDI+DDD+numero, com ou sem formatacao (8 a 15 digitos)
const PHONE_DIGITS_REGEX = /^\d{8,15}$/;

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Valida os dados do formulario de orcamento no cliente.
 * Retorna um mapa de erros; formulario e considerado valido quando o mapa
 * esta vazio. A mesma logica essencial deve ser espelhada no servidor
 * (ver src/app/api/orcamento/route.ts) - nunca confiar apenas na validacao
 * do cliente.
 */
export function validateQuoteForm(data: QuoteFormData): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  const fullNameTrimmed = data.fullName.trim();
  const nameParts = fullNameTrimmed.split(/\s+/).filter(Boolean);
  if (fullNameTrimmed.length < 3 || nameParts.length < 2) {
    errors.fullName = "Informe seu nome completo (nome e sobrenome).";
  }

  const whatsappDigits = onlyDigits(data.whatsapp);
  if (!PHONE_DIGITS_REGEX.test(whatsappDigits)) {
    errors.whatsapp = "Informe um número de WhatsApp válido, com DDD.";
  }

  if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!data.originCity.trim()) {
    errors.originCity = "Informe a cidade de origem.";
  }

  if (!data.destination.trim()) {
    errors.destination = "Informe o destino desejado.";
  }

  if (!data.flexibleDates && !data.departureDate) {
    errors.departureDate = "Informe a data de ida ou marque datas flexíveis.";
  }

  if (
    !data.flexibleDates &&
    data.departureDate &&
    data.returnDate &&
    data.returnDate < data.departureDate
  ) {
    errors.returnDate = "A data de volta não pode ser anterior à data de ida.";
  }

  if (data.adults < 1) {
    errors.adults = "Informe ao menos 1 adulto.";
  }

  if (data.children > 0 && !data.childrenAges.trim()) {
    errors.childrenAges = "Informe a idade das crianças.";
  }

  if (data.needsAccommodation && !data.accommodationStandard) {
    errors.accommodationStandard = "Selecione o padrão de hospedagem desejado.";
  }

  if (!data.acceptsPrivacyPolicy) {
    errors.acceptsPrivacyPolicy = "É necessário concordar com a Política de Privacidade.";
  }

  return errors;
}

export function isQuoteFormValid(data: QuoteFormData): boolean {
  return Object.keys(validateQuoteForm(data)).length === 0;
}
