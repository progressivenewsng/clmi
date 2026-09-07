import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getPublishedNews } from "@/lib/content/public";

export default async function NewsPage() {
  const newsItems = await getPublishedNews();
  return (
    <>
      <PageHero
        eyebrow="Stay Informed"
        title="News & Updates"
        description="Highlights from fellowships, outreaches, conventions and lectures across every CLMI chapter."
      />
      <section className="relative overflow-hidden bg-parchment py-16">
        <div className="absolute right-12 bottom-32 hidden w-60 border-l-2 border-gold/50 pl-4 text-[12px] font-display italic leading-relaxed text-ink/45 lg:block">
          "For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder..." Isaiah 9:6
        </div>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="masonry">
            {newsItems.map((n) => (
              <Link key={n.slug} href={`/news/${n.slug}`} className="group relative block overflow-hidden bg-ink">
                <div className="relative w-full" style={{ aspectRatio: n.type === "video" ? "16/9" : "4/5" }}>
                  <Image src={n.image} alt={n.title} fill unoptimized={n.image.includes("supabase.co")} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  {n.type === "video" && (
                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-gold-light backdrop-blur">
                      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1L12 7L3 13V1Z" fill="currentColor" /></svg>
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="text-[11px] uppercase tracking-widest text-gold-light">{n.date}</div>
                    <h3 className="mt-1.5 font-display text-base font-semibold leading-snug text-parchment">{n.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
