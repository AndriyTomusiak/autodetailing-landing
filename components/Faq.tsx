"use client";

import { useState } from "react";
import { faqs } from "@/lib/faq";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-10 space-y-3">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-xl border border-white/5 bg-surface-2"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-semibold"
              aria-expanded={isOpen}
            >
              {item.q}
              <span
                className={`text-accent transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            {/* Відповідь завжди присутня в HTML (важливо для SEO),
                ховається лише візуально */}
            <p
              className={`px-6 text-sm leading-relaxed text-muted transition-all ${
                isOpen ? "pb-5" : "hidden"
              }`}
            >
              {item.a}
            </p>
          </div>
        );
      })}
    </div>
  );
}
