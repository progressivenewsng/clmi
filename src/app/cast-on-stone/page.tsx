import PageHero from "@/components/PageHero";
import { scriptures } from "@/data/scriptures";

export const metadata = {
  title: "Cast on Stone | CLMI",
  description: "The scriptures that ground CLMI's calling to principled leadership and public service.",
};

export default function CastOnStonePage() {
  return (
    <>
      <PageHero
        eyebrow="Cast on Stone"
        title="The Word beneath the work"
        description="The scriptures that ground CLMI's calling, identity and practice in the public square."
      />
      <section className="bg-parchment px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl border-l-2 border-gold pl-5">
            <p className="text-[13px] leading-relaxed text-charcoal/75">These passages are held close by the fellowship as a foundation for faithful leadership. Read each one in full, sit with its context, and let the Word shape the work.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {scriptures.map((scripture, index) => (
              <article key={scripture.reference} className="group border border-line bg-white/55 p-6 transition-colors hover:border-gold sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-2xl font-semibold text-gold/80">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-indigo">{scripture.theme}</span>
                </div>
                <blockquote className="mt-8 font-display text-xl leading-relaxed text-ink sm:text-2xl">&ldquo;{scripture.text}&rdquo;</blockquote>
                <cite className="mt-7 block border-t border-line pt-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-indigo not-italic">{scripture.reference}</cite>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
