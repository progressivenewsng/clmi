"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const inputClass = "w-full border border-line bg-white/60 px-4 py-3 text-[14px] text-charcoal outline-none transition-colors focus:border-gold";

export type PublicationType = "ktc" | "leadership_nuggets" | "word_for_you";

const sectionLabels: Record<PublicationType, string> = {
  ktc: "Kingdom Testament Chronicles",
  leadership_nuggets: "Leadership Nuggets",
  word_for_you: "The Word for You",
};

export default function PublicationForm({ publicationType = "ktc" }: { publicationType?: PublicationType }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugEdited) {
      setSlug(value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const response = await fetch("/api/admin/publications", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setError(result.error || "Could not save publication.");
      setSaving(false);
      return;
    }

    router.push(publicationType === "ktc" ? "/admin/publications" : `/admin/publications/${publicationType === "leadership_nuggets" ? "leadership-nuggets" : "word-for-you"}`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
      <input type="hidden" name="publicationType" value={publicationType} />
      {error && <div className="border-l-2 border-red-700 bg-red-50 px-4 py-3 text-[13px] text-red-800">{error}</div>}
      <div>
        <label htmlFor="title" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Headline</label>
        <input id="title" name="title" required value={title} onChange={(event) => handleTitleChange(event.target.value)} className={inputClass} />
      </div>
      <div>
        <label htmlFor="slug" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Slug</label>
        <input id="slug" name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={slug} onChange={(event) => { setSlugEdited(true); setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")); }} className={inputClass} />
        <p className="mt-1.5 text-[11px] text-charcoal/50">Generated from the headline. You can edit it.</p>
      </div>
      <p className="border-l-2 border-gold bg-gold/5 px-4 py-3 text-[12px] text-charcoal/65">Author and publication date are assigned automatically.{publicationType !== "word_for_you" ? " The first PDF page becomes the cover image." : " Upload pages in the order they should appear."}</p>
      {publicationType === "word_for_you" ? (
        <>
          <div>
            <label htmlFor="pages" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Publication pages</label>
            <input id="pages" name="pages" type="file" required multiple accept="image/jpeg,image/png,image/webp" className={`${inputClass} file:mr-3 file:border-0 file:bg-ink file:px-3 file:py-2 file:text-[11px] file:uppercase file:text-parchment`} />
            <p className="mt-1.5 text-[11px] text-charcoal/50">Select up to 20 JPEG, PNG, or WebP pages, up to 10 MB each.</p>
          </div>
          <div>
            <label htmlFor="verseText" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Bible verse</label>
            <textarea id="verseText" name="verseText" required rows={4} className={inputClass} />
          </div>
          <div>
            <label htmlFor="verseReference" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Verse reference</label>
            <input id="verseReference" name="verseReference" required placeholder="e.g. Proverbs 3:5-6" className={inputClass} />
          </div>
        </>
      ) : (
        <div>
          <label htmlFor="pdf" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">{sectionLabels[publicationType]} PDF</label>
          <input id="pdf" name="pdf" type="file" required accept="application/pdf" className={`${inputClass} file:mr-3 file:border-0 file:bg-ink file:px-3 file:py-2 file:text-[11px] file:uppercase file:text-parchment`} />
          <p className="mt-1.5 text-[11px] text-charcoal/50">PDF only, maximum 50 MB. The first page becomes the cover image.</p>
        </div>
      )}
      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving} className="bg-gold px-6 py-3 text-[12px] font-semibold uppercase tracking-widest text-ink hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Uploading..." : "Save publication"}</button>
        <span className="text-[12px] text-charcoal/50">New publications start as drafts.</span>
      </div>
    </form>
  );
}
