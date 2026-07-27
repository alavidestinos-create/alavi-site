import faqData from "@/data/faq.json";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ da Home ("Tire suas dúvidas"). Dados em src/data/faq.json.
 */
export const homeFaq: FaqItem[] = faqData;
