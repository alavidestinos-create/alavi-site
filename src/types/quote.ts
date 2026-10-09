export type TravelInterest =
  | "passagem-aerea"
  | "pacote"
  | "cruzeiro"
  | "hospedagem"
  | "outro";

export type TripType =
  | "lazer"
  | "lua-de-mel"
  | "familia"
  | "negocios"
  | "neve"
  | "outro";

export type FlightClass = "economica" | "premium-economy" | "executiva" | "primeira-classe";

export type AccommodationStandard = "economico" | "confortavel" | "luxo" | "sem-preferencia";

export type TripDuration = "ate-5" | "6-8" | "9-12" | "13-20" | "21-mais" | "indefinido";

export type CruiseScope = "nacional" | "internacional" | "indiferente";

export type CruiseDuration = "fim-de-semana" | "3-5" | "6-8" | "9-14" | "15-mais" | "indiferente";

export type CabinType = "interna" | "externa" | "varanda" | "suite" | "indiferente";

export type ContactChannel = "whatsapp" | "email" | "telefone";

export type ContactPeriod = "manha" | "tarde" | "noite" | "qualquer";

export interface QuoteFormData {
  // O que o cliente procura
  interest: TravelInterest | "";

  // Contato
  fullName: string;
  whatsapp: string;
  email: string;

  // Viagem
  originCity: string;
  destination: string;
  secondDestination: string;
  departureDate: string;
  returnDate: string;
  flexibleDates: boolean;
  travelMonth: string; // AAAA-MM, usado quando as datas sao flexiveis
  tripDuration: TripDuration | "";

  // Viajantes
  adults: number;
  children: number;
  childrenAges: string;
  infants: number;

  // Preferencias
  tripType: TripType | "";
  flightClass: FlightClass | "";
  travelInterests: string[];

  // Cruzeiro
  cruiseScope: CruiseScope | "";
  cruiseRegions: string[];
  cruiseLines: string[];
  cruiseDuration: CruiseDuration | "";
  cabinType: CabinType | "";
  departurePort: string;
  cruiseDrinkPackage: boolean;

  // Hospedagem
  needsAccommodation: boolean;
  accommodationStandard: AccommodationStandard | "";
  roomsCount: number;

  // Servicos adicionais
  needsFlights: boolean;
  needsInsurance: boolean;
  needsTransfer: boolean;
  needsCheckedBaggage: boolean;

  // Pontos e milhas
  wantsToUsePoints: boolean;
  loyaltyPrograms: string;
  approximatePoints: string;

  // Orcamento e observacoes
  estimatedBudget: string;
  notes: string;

  // Preferencia de contato
  preferredContact: ContactChannel | "";
  preferredPeriod: ContactPeriod | "";

  // Consentimento
  allowContact: boolean;
  acceptsPrivacyPolicy: boolean;
}

export const emptyQuoteFormData: QuoteFormData = {
  interest: "",
  fullName: "",
  whatsapp: "",
  email: "",
  originCity: "",
  destination: "",
  secondDestination: "",
  departureDate: "",
  returnDate: "",
  flexibleDates: false,
  travelMonth: "",
  tripDuration: "",
  adults: 1,
  children: 0,
  childrenAges: "",
  infants: 0,
  tripType: "",
  flightClass: "",
  travelInterests: [],
  cruiseScope: "",
  cruiseRegions: [],
  cruiseLines: [],
  cruiseDuration: "",
  cabinType: "",
  departurePort: "",
  cruiseDrinkPackage: false,
  needsAccommodation: false,
  accommodationStandard: "",
  roomsCount: 1,
  needsFlights: false,
  needsInsurance: false,
  needsTransfer: false,
  needsCheckedBaggage: false,
  wantsToUsePoints: false,
  loyaltyPrograms: "",
  approximatePoints: "",
  estimatedBudget: "",
  notes: "",
  preferredContact: "",
  preferredPeriod: "",
  allowContact: false,
  acceptsPrivacyPolicy: false,
};

/** Rótulos legíveis para exibir valores do formulário em e-mails e WhatsApp. */
export const labels = {
  interest: {
    "passagem-aerea": "Passagem aérea",
    pacote: "Pacote / roteiro completo",
    cruzeiro: "Cruzeiro",
    hospedagem: "Hospedagem",
    outro: "Outro",
  },
  tripType: {
    lazer: "Lazer",
    "lua-de-mel": "Lua de mel",
    familia: "Viagem em família",
    negocios: "Negócios",
    neve: "Viagem de neve",
    outro: "Outro",
  },
  flightClass: {
    economica: "Econômica",
    "premium-economy": "Premium Economy",
    executiva: "Executiva",
    "primeira-classe": "Primeira Classe",
  },
  tripDuration: {
    "ate-5": "Até 5 dias",
    "6-8": "6 a 8 dias",
    "9-12": "9 a 12 dias",
    "13-20": "13 a 20 dias",
    "21-mais": "21 dias ou mais",
    indefinido: "Ainda não sei",
  },
  cruiseScope: {
    nacional: "Nacional",
    internacional: "Internacional",
    indiferente: "Nacional ou internacional",
  },
  cruiseDuration: {
    "fim-de-semana": "Fim de semana",
    "3-5": "3 a 5 noites",
    "6-8": "6 a 8 noites",
    "9-14": "9 a 14 noites",
    "15-mais": "15 noites ou mais",
    indiferente: "Indiferente",
  },
  cabinType: {
    interna: "Interna",
    externa: "Externa (com janela)",
    varanda: "Com varanda",
    suite: "Suíte",
    indiferente: "Indiferente",
  },
  accommodationStandard: {
    economico: "Econômico",
    confortavel: "Confortável",
    luxo: "Luxo",
    "sem-preferencia": "Sem preferência",
  },
  preferredContact: {
    whatsapp: "WhatsApp",
    email: "E-mail",
    telefone: "Ligação",
  },
  preferredPeriod: {
    manha: "Manhã",
    tarde: "Tarde",
    noite: "Noite",
    qualquer: "Qualquer horário",
  },
} as const;

export function labelFor(group: keyof typeof labels, value: string): string {
  const map = labels[group] as Record<string, string>;
  return map[value] ?? value;
}

/** Destino principal exibido nos e-mails/WhatsApp (cruzeiro usa as regiões escolhidas). */
export function getDestinationLabel(data: Pick<QuoteFormData, "destination" | "cruiseRegions" | "interest">): string {
  if (data.destination.trim()) return data.destination.trim();
  if (data.interest === "cruzeiro" && data.cruiseRegions.length > 0) {
    return `Cruzeiro: ${data.cruiseRegions.join(", ")}`;
  }
  return "";
}
