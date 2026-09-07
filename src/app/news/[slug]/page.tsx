import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedNewsItem } from "@/lib/content/public";

export const dynamic = "force-dynamic";

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getPublishedNewsItem(slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <Link href="/news" className="text-[12px] font-semibold uppercase tracking-widest text-indigo hover:text-gold">
        ← News & Updates
      </Link>

      {item.type === "video" ? (
        <video controls poster={item.image} className="mt-6 w-full border border-line bg-ink">
          <source src={item.videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden border border-line bg-ink">
          <Image src={item.image} alt={item.title} fill unoptimized={item.image.includes("supabase.co")} className="object-cover" priority />
        </div>
      )}

      <div className="mt-8">
        <div className="text-[12px] uppercase tracking-widest text-indigo/70">{item.date}</div>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">{item.title}</h1>
        <p className="mt-6 text-[16px] leading-relaxed text-charcoal/80">{item.body}</p>
      </div>
    </article>
  );
}
