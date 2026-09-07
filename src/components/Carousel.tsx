"use client";

import { useRef, type ReactNode } from "react";

export default function Carousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-6 pb-4"
      >
        {children}
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          aria-label="Previous"
          onClick={() => scroll(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          aria-label="Next"
          onClick={() => scroll(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}
