import PageHero from "@/components/PageHero";

const beliefs = [
  "We believe in the Holy Bible as the inspired, infallible word of God.",
  "We believe in the Trinity — Father, Son and Holy Spirit.",
  "We believe in redemption through Christ.",
  "We believe in sanctification.",
  "We believe in the baptism of the Holy Ghost.",
  "We believe in water baptism.",
  "We believe in the second coming of Christ.",
  "We believe in signs, wonders, miracles and the supernatural.",
  "We believe in the potency of faith.",
  "We believe that leadership and politics are a calling and gifting of God — a spiritual gift.",
  "We believe in heaven and hell.",
  "We believe in the applicability of the word of God to every life reality and situation.",
];

export default function BeliefsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Doctrinal Foundation"
        title="Our Beliefs"
        description="For the avoidance of doubt, these are the basic beliefs CLMI affirms as a threshold for fellowship."
      />
      <section className="relative overflow-hidden bg-parchment py-20">
        <div className="absolute right-10 top-12 hidden w-60 border-l-2 border-gold/50 pl-4 text-[12px] font-display italic leading-relaxed text-ink/45 md:block">
          "Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you." Luke 10:19
        </div>
        <div className="absolute -left-16 bottom-32 hidden w-72 border-r-2 border-gold/50 pr-4 text-right text-[12px] font-display italic leading-relaxed text-ink/45 lg:block">
          "The angel of the LORD encampeth round about them that fear him, and delivereth them." Psalm 34:7
        </div>
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <ol className="divide-y divide-line border-y border-line">
            {beliefs.map((b, i) => (
              <li key={b} className="flex items-start gap-5 py-6">
                <span className="seal font-display text-sm">{String(i + 1).padStart(2, "0")}</span>
                <p className="pt-1.5 text-[16px] leading-relaxed text-charcoal/85">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
