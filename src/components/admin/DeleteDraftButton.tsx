"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DeleteDraftButtonProps = {
  endpoint: string;
  body: Record<string, string>;
};

export default function DeleteDraftButton({ endpoint, body }: DeleteDraftButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function deleteDraft() {
    if (!window.confirm("Delete this draft permanently?")) return;
    setDeleting(true);
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok) router.refresh();
    setDeleting(false);
  }

  return <button type="button" onClick={deleteDraft} disabled={deleting} className="text-[10px] font-semibold uppercase tracking-widest text-red-700 hover:text-red-900 disabled:opacity-50">{deleting ? "Deleting" : "Delete"}</button>;
}
