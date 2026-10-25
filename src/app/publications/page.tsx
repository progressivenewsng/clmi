import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Accordion, { type AccordionSection } from "@/components/Accordion";
import { getPublishedPublications } from "@/lib/content/publications";

function createSections(publications: Awaited<ReturnType<typeof getPublishedPublications>>): AccordionSection[] {
  return [
  {
    id: "ktc",
    title: "Kingdom Testament Chronicles (KTC)",
    content: (
      <div className="space-y-8">
        <p>
          Kingdom Testament Chronicles is CLMI&rsquo;s publishing arm, presenting the ministry&rsquo;s
          publications as complete downloadable and readable PDF editions.
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {publications.map((p) => (
            <Link key={p.slug} href={`/publications/${p.slug}`} className="group">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-indigo">
                <Image src={p.image} alt={p.title} fill unoptimized={p.image.includes("supabase.co")} className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="mt-4">
                <div className="text-[11px] uppercase tracking-widest text-indigo/70">{p.date} · {p.author}</div>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-indigo">{p.title}</h3>
                <p className="mt-2 text-[12px] font-semibold uppercase tracking-widest text-indigo">Open full publication</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    ),
  },
  ];
}

export default async function PublicationsPage() {
  const publications = await getPublishedPublications();
  const sections = createSections([...publications].reverse());
  return (
    <>
      <PageHero
        eyebrow="Publications"
        title="Kingdom Testament Chronicles"
        description="Books, articles and studies applying scripture to leadership, governance and public life."
      />
      <section className="relative overflow-hidden bg-parchment py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Accordion sections={sections} />
        </div>
      </section>
    </>
  );
}
