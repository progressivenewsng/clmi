"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function UserActions({ userId, isCurrentUser }: { userId: string; isCurrentUser: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, password }),
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setError(result.error || "Unable to reset password.");
    } else {
      setPassword("");
    }
    setSaving(false);
  }

  async function deleteUser() {
    if (!window.confirm("Delete this user permanently?")) return;
    setSaving(true);
    setError("");
    const response = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setError(result.error || "Unable to delete user.");
    } else {
      router.refresh();
    }
    setSaving(false);
  }

  return (
    <div className="space-y-2">
      {!isCurrentUser && (
        <div className="flex flex-wrap items-center gap-2">
          <form onSubmit={resetPassword} className="flex gap-2">
            <input aria-label="New password" type="password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="New password" className="w-32 border border-line bg-white/60 px-2 py-1.5 text-[12px] outline-none focus:border-gold" />
            <button type="submit" disabled={saving} className="text-[10px] font-semibold uppercase tracking-widest text-indigo hover:text-gold disabled:opacity-50">Reset password</button>
          </form>
          <button type="button" onClick={deleteUser} disabled={saving} className="text-[10px] font-semibold uppercase tracking-widest text-red-700 hover:text-red-900 disabled:opacity-50">Delete</button>
        </div>
      )}
      {isCurrentUser && <span className="text-[10px] uppercase tracking-widest text-charcoal/45">Current account</span>}
      {error && <p className="text-[11px] text-red-700">{error}</p>}
    </div>
  );
}