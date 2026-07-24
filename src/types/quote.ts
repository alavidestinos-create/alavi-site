export type TripType =
  | "lazer"
  | "lua-de-mel"
  | "familia"
  | "negocios"
  | "neve"
  | "outro";

export type FlightClass = "economica" | "premium-economy" | "executiva" | "primeira-classe";

export type AccommodationStandard = "economico" | "confortavel" | "luxo" | "sem-preferencia";

export interface QuoteFormData {
  // Contato
  fullName: string;
  whatsapp: string;
  email: string;

  // Viagem
  originCity: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  flexibleDates: boolean;

  // Viajantes
  adults: number;
  children: number;
  childrenAges: string;
  infants: number;

  // Preferencias
  tripType: TripType | "";
  flightClass: FlightClass | "";

  // Hospedagem
  needsAccommodation: boolean;
  accommodationStandard: AccommodationStandard | "";
  roomsCount: number;

  // Servicos adicionais
  needsInsurance: boolean;
  needsTransfer: boolean;

  // Pontos e milhas
  wantsToUsePoints: boolean;
  loyaltyPrograms: string;
  approximatePoints: string;

  // Orcamento e observacoes
  estimatedBudget: string;
  notes: string;

  // Consentimento
  allowContact: boolean;
  acceptsPrivacyPolicy: boolean;
}

export const emptyQuoteFormData: QuoteFormData = {
  fullName: "",
  whatsapp: "",
  email: "",
  originCity: "",
  destination: "",
  departureDate: "",
  returnDate: "",
  flexibleDates: false,
  adults: 1,
  children: 0,
  childrenAges: "",
  infants: 0,
  tripType: "",
  flightClass: "",
  needsAccommodation: false,
  accommodationStandard: "",
  roomsCount: 1,
  needsInsurance: false,
  needsTransfer: false,
  wantsToUsePoints: false,
  loyaltyPrograms: "",
  approximatePoints: "",
  estimatedBudget: "",
  notes: "",
  allowContact: false,
  acceptsPrivacyPolicy: false,
};
