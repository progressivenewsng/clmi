"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full border border-line bg-white/60 px-4 py-3 text-[14px] text-charcoal placeholder:text-charcoal/40 outline-none transition-colors focus:border-gold";

export default function CounsellingForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.formType = "counselling";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send counselling request.");
      }

      setStatus("submitted");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send counselling request.");
    }
  };

  if (status === "submitted") {
    return (
      <div className="border border-gold/50 bg-white/50 p-10 text-center">
        <span className="seal mx-auto">
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8.5L6 12.5L14 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">Your Request Has Been Received</h3>
        <p className="mx-auto mt-2 max-w-sm text-[14px] text-charcoal/70">
          Thank you for reaching out. A member of our team will be in touch with care and support.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-widest text-indigo">Full Name</label>
          <input required name="name" type="text" placeholder="Jane Doe" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-widest text-indigo">Email Address</label>
          <input required name="email" type="email" placeholder="jane@email.com" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-widest text-indigo">What would you like to talk about?</label>
        <textarea required name="purpose" rows={4} placeholder="Share the situation, concern, or challenge you would like support with..." className={inputClass} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-widest text-indigo">Phone Number</label>
          <input name="phone" type="tel" placeholder="+234 800 000 0000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-widest text-indigo">Any Extra Information</label>
          <input name="extra" type="text" placeholder="Optional details" className={inputClass} />
        </div>
      </div>
      {status === "error" && (
        <p className="text-[13px] text-red-700">{message}</p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-gold px-8 py-3.5 text-[13px] font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending..." : "Send Counselling Request"}
      </button>
    </form>
  );
}
