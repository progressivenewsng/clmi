"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { scriptures } from "@/data/scriptures";

type Verse = {
  text: string;
  reference: string;
  style: string;
};

const verses: Verse[] = scriptures.map((scripture, index) => ({
  text: scripture.text,
  reference: scripture.reference,
  style: `font-display text-lg leading-relaxed break-words ${index % 2 ? "text-gold-light" : "text-parchment"} sm:text-xl`,
}));

const typeDelay = 45;
const referenceDelay = 1000;
const cycleDelay = 4200;

export default function VerseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showReference, setShowReference] = useState(false);

  const activeVerse = verses[activeIndex];

  useEffect(() => {
    setDisplayedText("");
    setShowReference(false);

    let timeoutIds: number[] = [];
    let charIndex = 0;

    const typeNextChar = () => {
      if (charIndex <= activeVerse.text.length) {
        setDisplayedText(activeVerse.text.slice(0, charIndex));
        charIndex += 1;
      }

      if (charIndex <= activeVerse.text.length) {
        const t = window.setTimeout(typeNextChar, typeDelay);
        timeoutIds.push(t);
        return;
      }

      const refTimer = window.setTimeout(() => {
        setShowReference(true);
      }, referenceDelay);
      timeoutIds.push(refTimer);

      const nextTimer = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % verses.length);
      }, cycleDelay);
      timeoutIds.push(nextTimer);
    };

    const startTimer = window.setTimeout(typeNextChar, 180);
    timeoutIds.push(startTimer);

    return () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [activeIndex, activeVerse.text]);

  return (
    <div className="relative mx-auto min-w-0 w-full max-w-[34rem]">
      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_30px_70px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:rounded-[2rem] sm:p-7 lg:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light sm:tracking-[0.28em]">
            Scripture focus
          </div>
          <Link href="/cast-on-stone" className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-light transition-colors hover:border-gold hover:bg-gold/20 sm:tracking-[0.2em]">
            Cast On Stone
          </Link>
        </div>

        <div className={`relative min-h-52 sm:min-h-56 ${activeVerse.style}`} aria-live="polite">
          <span>{displayedText}</span>
          <span
            className={`ml-1 inline-block h-[0.8em] w-[3px] align-middle bg-gold transition-opacity duration-200 ${
              displayedText.length < activeVerse.text.length ? "opacity-100" : "opacity-0"
            }`}
            style={{ animation: "blink 1s step-end infinite" }}
          />
        </div>

        <div
          className={`mt-6 transition-all duration-500 ${
            showReference ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-parchment/60">
            Reference
          </div>
          <div className="mt-2 font-display text-xl text-parchment sm:text-2xl">{activeVerse.reference}</div>
        </div>

        {/* <div className="mx-auto mt-7 grid max-w-64 grid-cols-10 justify-items-center gap-x-1 gap-y-2 sm:mt-8" aria-label="Choose scripture">
          {verses.map((verse, index) => (
            <button
              key={verse.reference}
              type="button"
              aria-label={`Show verse ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? "scale-125 bg-gold" : "bg-white/35 hover:bg-white/65"
              }`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
