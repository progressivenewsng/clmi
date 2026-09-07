"use client";

import { useEffect, useState, type ReactNode } from "react";

export type AccordionSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export default function Accordion({ sections }: { sections: AccordionSection[] }) {
  const [openId, setOpenId] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash || !sections.some((s) => s.id === hash)) return;
    const timer = setTimeout(() => {
      setOpenId(hash);
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => clearTimeout(timer);
  }, [sections]);

  return (
    <div className="divide-y divide-line">
      {sections.map((s, i) => {
        const isOpen = openId === s.id;
        return (
          <div key={s.id} id={s.id} className="scroll-mt-28">
            <button
              onClick={() => setOpenId(isOpen ? null : s.id)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="flex items-center gap-4">
                <span className="seal font-display text-sm">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl font-semibold text-ink sm:text-2xl">{s.title}</span>
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo/30 text-indigo transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden pb-8 pl-14 pr-4 text-[15px] leading-relaxed text-charcoal/80">
                {s.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
