import { describe, expect, it } from "vitest";
import { validateQuoteForm, isQuoteFormValid, onlyDigits } from "@/lib/validation";
import { emptyQuoteFormData, type QuoteFormData } from "@/types/quote";

function validData(): QuoteFormData {
  return {
    ...emptyQuoteFormData,
    fullName: "Maria da Silva",
    whatsapp: "5511999999999",
    email: "maria@example.com",
    originCity: "São Paulo",
    destination: "Bariloche",
    departureDate: "2026-08-10",
    returnDate: "2026-08-17",
    acceptsPrivacyPolicy: true,
  };
}

describe("validateQuoteForm", () => {
  it("aceita um formulário preenchido corretamente", () => {
    expect(isQuoteFormValid(validData())).toBe(true);
  });

  it("exige nome completo", () => {
    const errors = validateQuoteForm({ ...validData(), fullName: "Ana" });
    expect(errors.fullName).toBeDefined();
  });

  it("exige whatsapp válido", () => {
    const errors = validateQuoteForm({ ...validData(), whatsapp: "123" });
    expect(errors.whatsapp).toBeDefined();
  });

  it("exige e-mail válido", () => {
    const errors = validateQuoteForm({ ...validData(), email: "invalido" });
    expect(errors.email).toBeDefined();
  });

  it("exige data de ida quando não há flexibilidade de datas", () => {
    const errors = validateQuoteForm({ ...validData(), departureDate: "" });
    expect(errors.departureDate).toBeDefined();
  });

  it("permite ausência de data de ida quando datas são flexíveis", () => {
    const errors = validateQuoteForm({
      ...validData(),
      departureDate: "",
      flexibleDates: true,
    });
    expect(errors.departureDate).toBeUndefined();
  });

  it("rejeita data de volta anterior à data de ida", () => {
    const errors = validateQuoteForm({
      ...validData(),
      departureDate: "2026-08-17",
      returnDate: "2026-08-10",
    });
    expect(errors.returnDate).toBeDefined();
  });

  it("exige idade das crianças quando há crianças", () => {
    const errors = validateQuoteForm({ ...validData(), children: 2, childrenAges: "" });
    expect(errors.childrenAges).toBeDefined();
  });

  it("exige aceite da política de privacidade", () => {
    const errors = validateQuoteForm({ ...validData(), acceptsPrivacyPolicy: false });
    expect(errors.acceptsPrivacyPolicy).toBeDefined();
  });

  it("onlyDigits remove caracteres não numéricos", () => {
    expect(onlyDigits("(11) 99999-9999")).toBe("11999999999");
  });
});
