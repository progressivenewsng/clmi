import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getPublishedPublications } from "@/lib/content/publications";
import type { Publication } from "@/data/mock";

export default async function PublicationSectionPage({
  publicationType,
  title,
  description,
}: {
  publicationType: NonNullable<Publication["publicationType"]>;
  title: string;
  description: string;
}) {
  const publications = [...await getPublishedPublications(publicationType)].reverse();

  return <>
    <PageHero eyebrow="Publications" title={title} description={description} />
    <section className="bg-parchment px-6 py-14 lg:px-8 lg:py-20 mt-10">
      <div className="mx-auto max-w-5xl">
        
        {publications.length ? <div className="grid gap-8 sm:grid-cols-2">
          {publications.map((publication) => <Link key={publication.slug} href={`/publications/${publication.slug}`} className="group">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-indigo">
              <Image src={publication.image} alt={publication.title} fill unoptimized={publication.image.includes("supabase.co")} className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="mt-4">
              <div className="text-[11px] uppercase tracking-widest text-indigo/70">{publication.date} · {publication.author}</div>
              <h2 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-indigo">{publication.title}</h2>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-widest text-indigo">{publicationType === "leadership_nuggets" ? "Read or download PDF" : "View scripture"}</p>
            </div>
          </Link>)}
        </div> : <div className="border-y border-line py-16 text-center"><p className="font-display text-xl text-ink">No editions published yet</p><p className="mt-2 text-[13px] text-charcoal/60">New editions will appear here when published.</p></div>}
      </div>
    </section>
  </>;
}
