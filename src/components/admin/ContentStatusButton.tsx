"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContentStatusButton({ contentType, id, status }: { contentType: string; id: string; status: string }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const nextStatus = status === "published" ? "draft" : "published";
  async function changeStatus() {
    setSaving(true);
    const response = await fetch("/api/admin/content", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contentType, id, status: nextStatus }) });
    if (response.ok) router.refresh();
    setSaving(false);
  }
  return <button type="button" onClick={changeStatus} disabled={saving} className="text-[10px] font-semibold uppercase tracking-widest text-indigo hover:text-gold disabled:opacity-50">{saving ? "Saving" : nextStatus === "published" ? "Publish" : "Unpublish"}</button>;
}
