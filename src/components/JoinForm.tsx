"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full border border-line bg-white/60 px-4 py-3 text-[14px] text-charcoal placeholder:text-charcoal/40 outline-none transition-colors focus:border-gold";

export default function JoinForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.formType = "join";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send message.");
      }

      setStatus("submitted");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send message.");
    }
  };

  if (status === "submitted") {
    return (
      <div className="border border-gold/50 bg-white/50 p-10 text-center">
        <span className="seal mx-auto">
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8.5L6 12.5L14 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">You&rsquo;re In, Welcome to CLMI</h3>
        <p className="mx-auto mt-2 max-w-sm text-[14px] text-charcoal/70">
          Thank you for joining Covenant Leadership Ministry International. A member of our team will reach
          out with details of the fellowship nearest to you.
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-widest text-indigo">Phone Number</label>
          <input required name="phone" type="tel" placeholder="+234 800 000 0000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-widest text-indigo">City / Country</label>
          <input name="location" type="text" placeholder="Abuja, Nigeria" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-widest text-indigo">Occupation / Field of Leadership</label>
        <input name="occupation" type="text" placeholder="e.g. State Legislator, Corporate Executive, Civil Servant" className={inputClass} />
      </div>
      <div>
        <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-widest text-indigo">Which ministry arm interests you?</label>
        <select name="ministry" className={inputClass}>
          <option>Not sure yet</option>
          <option>Mercy Reach</option>
          <option>Leadership Development</option>
          <option>Believers in Politics</option>
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-widest text-indigo">Tell Us About Yourself (optional)</label>
        <textarea name="message" rows={4} placeholder="Share a little about your leadership journey or what drew you to CLMI." className={inputClass} />
      </div>
      {status === "error" && (
        <p className="text-[13px] text-red-700">{message}</p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-gold px-8 py-3.5 text-[13px] font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending..." : "Submit Application"}
      </button>
    </form>
  );
}
