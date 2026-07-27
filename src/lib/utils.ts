export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formata uma string digitada livremente como moeda BRL (R$), atualizando
 * a cada tecla — ex.: digitar "1000" vira "R$ 10,00", "100000" vira
 * "R$ 1.000,00". Considera os dígitos digitados como centavos, no padrão
 * comum de máscaras de valor monetário.
 */
export function formatCurrencyInput(rawValue: string): string {
  const digitsOnly = rawValue.replace(/\D/g, "");

  if (!digitsOnly) {
    return "";
  }

  const cents = parseInt(digitsOnly, 10);
  const amount = cents / 100;

  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
