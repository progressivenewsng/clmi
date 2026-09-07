"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const inputClass = "w-full border border-line bg-white/60 px-4 py-3 text-[14px] text-charcoal outline-none transition-colors focus:border-gold";

export default function CreateUserForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
        role: form.get("role"),
      }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setError(result.error || "Unable to create user.");
      setSaving(false);
      return;
    }

    event.currentTarget.reset();
    setSaving(false);
    router.refresh();
  }

  return (
    <section className="mb-8 border border-line bg-white/50 p-5 sm:p-6">
      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo">Admin access</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Add a user</h2>
        <p className="mt-1 text-[13px] text-charcoal/65">Create an editor or another admin account. The new email is confirmed automatically.</p>
      </div>
      {error && <div className="mb-4 border-l-2 border-red-700 bg-red-50 px-4 py-3 text-[13px] text-red-800">{error}</div>}
      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-[1.3fr_1fr_0.8fr_auto] md:items-end">
        <div>
          <label htmlFor="user-email" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Email</label>
          <input id="user-email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="user-password" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Temporary password</label>
          <input id="user-password" name="password" type="password" required minLength={8} className={inputClass} />
        </div>
        <div>
          <label htmlFor="user-role" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Role</label>
          <select id="user-role" name="role" defaultValue="editor" className={inputClass}>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" disabled={saving} className="bg-gold px-5 py-3 text-[12px] font-semibold uppercase tracking-widest text-ink hover:bg-gold-light disabled:opacity-60">{saving ? "Creating..." : "Add user"}</button>
      </form>
    </section>
  );
}