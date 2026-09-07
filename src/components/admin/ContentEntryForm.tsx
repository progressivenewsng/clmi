"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";

type ContentType = "news" | "testimonies" | "reviews" | "gallery";

const inputClass = "w-full border border-line bg-white/60 px-4 py-3 text-[14px] text-charcoal outline-none transition-colors focus:border-gold";
const emptyBody = { type: "doc", content: [{ type: "paragraph" }] };

export default function ContentEntryForm({ contentType }: { contentType: ContentType }) {
  const router = useRouter();
  const [headline, setHeadline] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [body, setBody] = useState<Record<string, unknown>>(emptyBody);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const isNews = contentType === "news";
  const isGallery = contentType === "gallery";
  const isReview = contentType === "reviews";
  const label = isNews ? "news item" : isGallery ? "gallery media" : contentType.slice(0, -1);

  function handleHeadlineChange(value: string) {
    setHeadline(value);
    if (!slugEdited) setSlug(value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    formData.set("contentType", contentType);
    formData.set("slug", slug);
    formData.set("body", JSON.stringify(body));
    const response = await fetch("/api/admin/content", { method: "POST", body: formData });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setError(result.error || `Could not save ${label}.`);
      setSaving(false);
      return;
    }
    router.push(`/admin/${contentType}`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
      {error && <div className="border-l-2 border-red-700 bg-red-50 px-4 py-3 text-[13px] text-red-800">{error}</div>}
      {isGallery ? (
        <>
          <div><label htmlFor="title" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Headline</label><input id="title" name="title" required value={headline} onChange={(event) => handleHeadlineChange(event.target.value)} className={inputClass} /></div>
          <div><label htmlFor="caption" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Caption</label><textarea id="caption" name="caption" rows={3} className={inputClass} /></div>
          <div><label htmlFor="altText" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Alt text</label><input id="altText" name="altText" required className={inputClass} /></div>
        </>
      ) : (
        <>
          <div><label htmlFor="title" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Headline</label><input id="title" name="title" required value={headline} onChange={(event) => handleHeadlineChange(event.target.value)} className={inputClass} /></div>
          <div><label htmlFor="slug" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Slug</label><input id="slug" name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={slug} onChange={(event) => { setSlugEdited(true); setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")); }} className={inputClass} /><p className="mt-1.5 text-[11px] text-charcoal/50">Generated automatically from the headline.</p></div>
          {isNews && <div><label htmlFor="excerpt" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Excerpt</label><textarea id="excerpt" name="excerpt" required rows={3} className={inputClass} /></div>}
          <div><label htmlFor="quote" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">{isNews ? "Content" : "Quote"}</label>{isNews ? <RichTextEditor value={body} onChange={setBody} /> : <textarea id="quote" name="quote" required rows={5} className={inputClass} />}</div>
        </>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="image" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Image</label><input id="image" name={isGallery ? "media" : "image"} type="file" required={isGallery} accept="image/jpeg,image/png,image/webp" className={inputClass} /></div>
        {isNews && <div><label htmlFor="video" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-indigo">Video</label><input id="video" name="video" type="file" accept="video/mp4" className={inputClass} /></div>}
      </div>
      <p className="border-l-2 border-gold bg-gold/5 px-4 py-3 text-[12px] text-charcoal/65">Author and date are assigned automatically. New {label}s are saved as drafts.</p>
      <button type="submit" disabled={saving} className="bg-gold px-6 py-3 text-[12px] font-semibold uppercase tracking-widest text-ink hover:bg-gold-light disabled:opacity-60">{saving ? "Saving..." : "Save draft"}</button>
    </form>
  );
}
