import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPublication } from "@/lib/content/publications";

export const dynamic = "force-dynamic";

export default async function PublicationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pub = await getPublishedPublication(slug);
  if (!pub) notFound();
  const sectionPath = pub.publicationType === "leadership_nuggets"
    ? "/publications/leadership-nuggets"
    : pub.publicationType === "word_for_you"
      ? "/publications/the-word-for-you"
      : "/publications";
  const sectionLabel = pub.publicationType === "leadership_nuggets"
    ? "Leadership Nuggets"
    : pub.publicationType === "word_for_you"
      ? "The Word for You"
      : "Kingdom Testament Chronicles";
  const downloadUrl = pub.pdfUrl
    ? `${pub.pdfUrl}${pub.pdfUrl.includes("?") ? "&" : "?"}download=${encodeURIComponent(`${pub.slug}.pdf`)}`
    : undefined;

  return (
    <article>
      <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden bg-ink">
        <Image src={pub.image} alt={pub.title} fill unoptimized={pub.image.includes("supabase.co")} className="object-cover opacity-70" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-6 pb-12">
          <Link href={sectionPath} className="text-[12px] font-semibold uppercase tracking-widest text-gold-light">
            ← {sectionLabel}
          </Link>
          <h1 className="mt-4 font-display text-3xl font-semibold text-parchment sm:text-4xl">{pub.title}</h1>
          <p className="mt-3 text-[13px] text-parchment/60">{pub.date} · By {pub.author}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        {pub.publicationType === "word_for_you" ? (
          <div className="space-y-10">
            {pub.verseText && <blockquote className="mx-auto max-w-3xl border-l-2 border-gold bg-white/45 px-6 py-6 font-display text-xl leading-relaxed text-ink sm:px-8 sm:text-2xl">
              <p>&ldquo;{pub.verseText}&rdquo;</p>
              {pub.verseReference && <cite className="mt-4 block text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo not-italic">{pub.verseReference}</cite>}
            </blockquote>}
            <div className="mx-auto max-w-3xl space-y-6">
              {(pub.pageImageUrls || []).map((imageUrl, index) => <figure key={`${imageUrl}-${index}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-white">
                  <Image src={imageUrl} alt={`${pub.title}, page ${index + 1}`} fill unoptimized={imageUrl.includes("supabase.co")} className="object-contain" />
                </div>
                <figcaption className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/50">Page {index + 1}</figcaption>
              </figure>)}
            </div>
          </div>
        ) : pub.pdfUrl ? (
          <iframe src={`${pub.pdfUrl}#view=FitH`} title={`${pub.title} PDF`} className="h-[75vh] min-h-[620px] w-full border border-line bg-white" />
        ) : <p className="mx-auto max-w-3xl text-[14px] text-charcoal/65">The full publication file is not available yet.</p>}
        {pub.pdfUrl && <div className="mt-6 flex flex-wrap gap-3">
          <a href={`${pub.pdfUrl}#view=FitH`} target="_blank" rel="noreferrer" className="border border-indigo px-5 py-3 text-[12px] font-semibold uppercase tracking-widest text-indigo hover:bg-indigo hover:text-white">Open PDF</a>
          <a href={downloadUrl} className="bg-gold px-5 py-3 text-[12px] font-semibold uppercase tracking-widest text-ink hover:bg-gold-light">Download PDF</a>
        </div>}
        {pub.links && pub.links.length > 0 && (
          <div className="mt-10 border-t border-line pt-8">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-indigo">Related Links</div>
            <ul className="mt-4 space-y-2">
              {pub.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[14px] font-medium text-indigo underline decoration-gold underline-offset-4 hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-14">
          <Link href="/publications" className="text-[13px] font-semibold uppercase tracking-widest text-indigo hover:text-gold">
            ← Back to {sectionLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
