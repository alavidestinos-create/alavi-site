"use client";

import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { FaqItem } from "@/content/faq";
import { cn } from "@/lib/utils";

interface FaqProps {
  items: FaqItem[];
}

export function Faq({ items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20">
      <div className="container-alavi">
        <SectionTitle eyebrow="Dúvidas frequentes" title="Perguntas frequentes" />
        <div className="mt-8 divide-y divide-navy-100 rounded-2xl border border-navy-100">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-display text-sm font-semibold text-navy-900 sm:text-base">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-teal-700 transition-transform",
                      isOpen && "rotate-45"
                    )}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 text-sm text-navy-700">{item.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
