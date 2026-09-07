"use client";

import { useState } from "react";

export default function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border border-line bg-white/40 px-5 py-4">
      <div>
        <div className="text-[11px] uppercase tracking-widest text-indigo/70">{label}</div>
        <div className="mt-1 font-display text-lg font-semibold text-ink sm:text-xl">{value}</div>
      </div>
      <button
        onClick={copy}
        className="copy-btn flex shrink-0 items-center gap-2 border border-gold px-3.5 py-2 text-[12px] font-semibold uppercase tracking-widest text-gold-light bg-ink transition-colors hover:bg-gold hover:text-ink"
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16"><path d="M2 8.5L6 12.5L14 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Copied
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16"><rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" /><path d="M3 11V3a1 1 0 0 1 1-1h8" stroke="currentColor" strokeWidth="1.4" fill="none" /></svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
}
