"use client";

import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import type { FaqItem } from "@/content/faq";
import { cn } from "@/lib/utils";

interface FaqProps {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
}

export function Faq({ items, eyebrow = "Dúvidas frequentes", title = "Tire suas dúvidas" }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28">
      <div className="container-alavi max-w-3xl">
        <Reveal>
          <SectionTitle eyebrow={eyebrow} title={title} />
        </Reveal>
        <div className="mt-10 divide-y divide-sand-200 rounded-2xl border border-sand-200">
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
