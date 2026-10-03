"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/content/faqs";

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
  defaultOpenId?: string | null;
};

/**
 * Accessible FAQ accordion — keyboard, aria-expanded, reduced-motion safe.
 */
export function FaqAccordion({
  items,
  className = "",
  defaultOpenId,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(() => {
    if (defaultOpenId !== undefined) return defaultOpenId;
    return items[0]?.id ?? null;
  });
  const baseId = useId();

  return (
    <div
      className={`border-t border-border-strong ${className}`}
      data-testid="faq-accordion"
    >
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        const panelId = `${baseId}-${faq.id}`;

        return (
          <div key={faq.id} className="border-b border-border">
            <h3>
              <button
                type="button"
                id={`${panelId}-trigger`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-[var(--primary-soft)]"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
              >
                <span className="text-[1.0625rem] font-medium">{faq.question}</span>
                <span
                  aria-hidden
                  className={`mt-1 text-[var(--primary)] transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`${panelId}-trigger`}
              hidden={!isOpen}
              className="max-w-2xl pb-6"
            >
              <p className="text-sm leading-relaxed text-muted">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
