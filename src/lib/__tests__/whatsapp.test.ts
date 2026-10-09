import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, buildQuoteWhatsAppMessage } from "@/lib/whatsapp";
import { emptyQuoteFormData } from "@/types/quote";

describe("buildWhatsAppUrl", () => {
  it("gera uma URL wa.me com a mensagem codificada", () => {
    const url = buildWhatsAppUrl("Olá ALAVI!");
    expect(url).toContain("https://wa.me/");
    expect(url).toContain("text=Ol%C3%A1%20ALAVI!");
  });
});

describe("buildQuoteWhatsAppMessage", () => {
  it("inclui apenas os campos preenchidos", () => {
    const message = buildQuoteWhatsAppMessage({
      ...emptyQuoteFormData,
      fullName: "João Vinícius",
      destination: "Bariloche",
    });
    expect(message).toContain("João Vinícius");
    expect(message).toContain("Bariloche");
    expect(message).not.toContain("Origem:");
  });

  it("inclui detalhes de cruzeiro quando o interesse é cruzeiro", () => {
    const message = buildQuoteWhatsAppMessage({
      ...emptyQuoteFormData,
      interest: "cruzeiro",
      cruiseRegions: ["Caribe e Bahamas"],
      cruiseLines: ["Royal Caribbean"],
      cabinType: "varanda",
      cruiseDrinkPackage: true,
      flexibleDates: true,
      travelMonth: "2027-01",
    });
    expect(message).toContain("Interesse: Cruzeiro");
    expect(message).toContain("Destino: Cruzeiro: Caribe e Bahamas");
    expect(message).toContain("Royal Caribbean");
    expect(message).toContain("Cabine: Com varanda");
    expect(message).toContain("pacote de bebidas");
    expect(message).toContain("2027-01");
  });

  it("não inclui campos de cruzeiro em outros tipos de pedido", () => {
    const message = buildQuoteWhatsAppMessage({
      ...emptyQuoteFormData,
      interest: "passagem-aerea",
      cruiseLines: ["Royal Caribbean"],
    });
    expect(message).not.toContain("Royal Caribbean");
  });

  it("inclui contagem de viajantes quando informada", () => {
    const message = buildQuoteWhatsAppMessage({
      ...emptyQuoteFormData,
      adults: 2,
      children: 1,
    });
    expect(message).toContain("2 adulto(s)");
    expect(message).toContain("1 criança(s)");
  });
});
