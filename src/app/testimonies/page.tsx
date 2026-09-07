import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getPublishedTestimonies } from "@/lib/content/public";

export default async function TestimoniesPage() {
  const testimonies = await getPublishedTestimonies();
  return (
    <>
      <PageHero
        eyebrow="Changed Lives"
        title="Testimonies"
        description="Real accounts from leaders and politicians whose approach to public life has been transformed through CLMI."
      />
      <section className="relative overflow-hidden bg-parchment py-16">
        <div className="absolute right-12 top-16 hidden w-56 border-l-2 border-gold/50 pl-4 text-[12px] font-display italic leading-relaxed text-ink/45 lg:block">
          "The blessings of the LORD, it maketh rich, and he addeth no sorrow with it." Proverbs 10:22
        </div>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {testimonies.map((t) => (
              <div key={t.id} className="flex flex-col border border-line bg-white/50 p-8">
                <svg width="30" height="22" viewBox="0 0 26 20" fill="none" className="text-gold">
                  <path d="M0 20V11.6C0 4.9 3.9 0.8 10 0L11 3.5C7.4 4.5 5.5 6.8 5.3 10H10V20H0ZM15 20V11.6C15 4.9 18.9 0.8 25 0L26 3.5C22.4 4.5 20.5 6.8 20.3 10H25V20H15Z" fill="currentColor" />
                </svg>
                <p className="mt-4 flex-1 font-display text-lg italic leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image src={t.image} alt={t.name} fill unoptimized={t.image.includes("supabase.co")} className="object-cover" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold text-ink">{t.name}</div>
                    <div className="text-[11px] uppercase tracking-widest text-indigo/70">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border border-dashed border-gold/50 bg-white/30 p-10 text-center">
            <h3 className="font-display text-xl font-semibold text-ink">Has CLMI impacted your leadership journey?</h3>
            <p className="mx-auto mt-2 max-w-md text-[14px] text-charcoal/70">
              We would love to hear your story and share it with the CLMI community.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block bg-gold px-6 py-3 text-[12px] font-semibold uppercase tracking-widest text-ink hover:bg-gold-light"
            >
              Share Your Testimony
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
