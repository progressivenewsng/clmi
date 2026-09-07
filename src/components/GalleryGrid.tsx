"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/data/mock";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="masonry">
        {items.map((g) => (
          <button
            key={g.id}
            onClick={() => setActive(g)}
            className="group relative block w-full overflow-hidden bg-ink text-left"
          >
            <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
              <Image src={g.image} alt={g.caption} fill unoptimized={g.image.includes("supabase.co")} className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-[12px] text-parchment opacity-0 transition-opacity group-hover:opacity-100">
                {g.caption}
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-6"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-parchment"
            onClick={() => setActive(null)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <div className="max-h-[85vh] max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative max-h-[75vh] w-full">
              <Image
                src={active.image}
                alt={active.caption}
                width={1000}
                height={1250}
                unoptimized={active.image.includes("supabase.co")}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-center text-[13px] text-parchment/70">{active.caption}</p>
          </div>
        </div>
      )}
    </>
  );
}
