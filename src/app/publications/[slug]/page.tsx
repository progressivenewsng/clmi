import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPublication } from "@/lib/content/publications";

export const dynamic = "force-dynamic";

export default async function PublicationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pub = await getPublishedPublication(slug);
  if (!pub) notFound();

  return (
    <article>
      <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden bg-ink">
        <Image src={pub.image} alt={pub.title} fill unoptimized={pub.image.includes("supabase.co")} className="object-cover opacity-70" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-6 pb-12">
          <Link href="/publications" className="text-[12px] font-semibold uppercase tracking-widest text-gold-light">
            ← Kingdom Testament Chronicles
          </Link>
          <h1 className="mt-4 font-display text-3xl font-semibold text-parchment sm:text-4xl">{pub.title}</h1>
          <p className="mt-3 text-[13px] text-parchment/60">{pub.date} · By {pub.author}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        {pub.pdfUrl ? (
          <iframe src={`${pub.pdfUrl}#view=FitH`} title={`${pub.title} PDF`} className="h-[75vh] min-h-[620px] w-full border border-line bg-white" />
        ) : <p className="mx-auto max-w-3xl text-[14px] text-charcoal/65">The full publication file is not available yet.</p>}
        {pub.pdfUrl && <a href={pub.pdfUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block bg-gold px-5 py-3 text-[12px] font-semibold uppercase tracking-widest text-ink hover:bg-gold-light">Open PDF in new tab</a>}
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
            ← Back to all publications
          </Link>
        </div>
      </div>
    </article>
  );
}
