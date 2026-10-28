"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type WordForYouEdition = {
  slug: string;
  title: string;
  verseText: string;
  verseReference: string;
};

export default function WordForYouHomeCarousel({ publications }: { publications: WordForYouEdition[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (publications.length < 2) return;
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % publications.length);
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, [publications.length]);

  const activePublication = publications[activeIndex];

  if (!activePublication) {
    return <p className="border-l border-gold/50 py-4 pl-6 font-display text-xl italic text-parchment/55">New scripture editions will appear here.</p>;
  }

  return (
    <Link
      key={activePublication.slug}
      href={`/publications/${activePublication.slug}`}
      aria-label={`Read ${activePublication.title}: ${activePublication.verseReference}`}
      aria-live="polite"
      className="group block min-w-0 border-l border-gold/50 py-2 pl-6 transition-colors hover:border-gold sm:pl-10"
    >
      <blockquote className="font-display text-2xl leading-relaxed text-parchment transition-colors group-hover:text-gold-light sm:text-3xl lg:text-4xl">
        &ldquo;{activePublication.verseText}&rdquo;
      </blockquote>
      <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-light sm:text-[13px]">
        {activePublication.verseReference}
      </p>
    </Link>
  );
}