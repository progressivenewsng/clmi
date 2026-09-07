"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full border border-line bg-white/60 px-4 py-3 text-[14px] text-charcoal placeholder:text-charcoal/40 outline-none transition-colors focus:border-gold";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message || "Unable to sign in.");
      setIsLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-parchment px-6 py-12">
      <div className="w-full max-w-md border border-line bg-white/60 p-8 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo">CLMI Admin</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">Sign in</h1>
        <p className="mt-2 text-[14px] text-charcoal/65">Use your Supabase admin account to continue.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-widest text-indigo">Email</label>
            <input name="email" type="email" autoComplete="email" required className={inputClass} />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-widest text-indigo">Password</label>
            <input name="password" type="password" autoComplete="current-password" required className={inputClass} />
          </div>

          {error ? <p className="text-[13px] text-red-700">{error}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold px-5 py-3.5 text-[12px] font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
