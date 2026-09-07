import PageHero from "@/components/PageHero";
import Accordion, { type AccordionSection } from "@/components/Accordion";
import { ministries } from "@/data/mock";

function MinistryBody({ m }: { m: (typeof ministries)[keyof typeof ministries] }) {
  return (
    <div className="space-y-5">
      <p className="font-display text-lg italic text-indigo">{m.tagline}</p>
      <p>{m.description}</p>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-widest text-ink">What We Do</div>
        <ul className="mt-3 space-y-2.5">
          {m.activities.map((a) => (
            <li key={a} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const sections: AccordionSection[] = [
  { id: "mercy-reach", title: "Mercy Reach", content: <MinistryBody m={ministries.mercyReach} /> },
  { id: "leadership-development", title: "Leadership Development", content: <MinistryBody m={ministries.leadershipDevelopment} /> },
  { id: "believers-in-politics", title: "Believers in Politics", content: <MinistryBody m={ministries.believersInPolitics} /> },
];

export default function MinistriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Ministries"
        title="Three Arms, One Mandate"
        description="Every CLMI ministry arm exists to serve leaders practically — spiritually, socially and politically."
      />
      <section className="relative overflow-hidden bg-parchment py-16">
        <div className="absolute right-12 top-20 hidden w-64 border-l-2 border-gold/50 pl-4 text-[13px] font-display italic leading-relaxed text-ink/45 lg:block">
          "And he said unto them, Go ye into all the world, and preach the gospel to every creature." Mark 16:15
        </div>
        <div className="absolute -left-12 bottom-20 hidden w-80 border-r-2 border-gold/50 pr-4 text-right text-[13px] font-display italic leading-relaxed text-ink/45 lg:block">
          "And Jesus came and spake unto them, saying, All power is given unto me in heaven and in earth." Matthew 28:18
        </div>
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Accordion sections={sections} />
        </div>
      </section>
    </>
  );
}
