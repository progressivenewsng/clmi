import Image from "next/image";
import PageHero from "@/components/PageHero";
import Accordion, { type AccordionSection } from "@/components/Accordion";
import { leadershipData } from "@/data/mock";

function PersonCard({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div className="group">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-indigo">
        <Image src={image} alt={name} fill className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
      </div>
      <div className="mt-4 border-l-2 border-gold pl-3">
        <div className="font-display text-base font-semibold text-ink">{name}</div>
        <div className="text-[12px] uppercase tracking-widest text-indigo">{role}</div>
      </div>
    </div>
  );
}

const sections: AccordionSection[] = [
  {
    id: "president",
    title: "President / Founder",
    content: (
      <div className="grid gap-8 sm:grid-cols-[240px_1fr]">
        <PersonCard name={leadershipData.president.name} role={leadershipData.president.title} image={leadershipData.president.image} />
        <div className="space-y-4">
          {leadershipData.president.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "executive-council",
    title: "Executive Council",
    content: (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {leadershipData.executiveCouncil.map((p) => (
          <PersonCard key={p.name} {...p} />
        ))}
      </div>
    ),
  },
  {
    id: "directors",
    title: "Ministry Directors",
    content: (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {leadershipData.directors.map((p) => (
          <PersonCard key={p.name} {...p} />
        ))}
      </div>
    ),
  },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="The People Behind CLMI"
        description="Meet the president, executive council and ministry directors stewarding CLMI's mandate."
      />
      <section className="relative overflow-hidden bg-parchment py-16">
        <div className="absolute right-8 top-16 hidden w-56 border-l-2 border-gold/50 pl-4 text-[12px] font-display italic leading-relaxed text-ink/45 lg:block">
          "Now then we are ambassadors for Christ, as though God did beseech you by us: we pray you in Christ's stead, be ye reconciled to God." 2 Corinthians 5:20
        </div>
        <div className="absolute left-5 bottom-24 hidden w-72 border-r-2 border-gold/50 pr-4 text-right text-[13px] font-display italic leading-relaxed text-ink/45 lg:block">
          "There shall not any man be able to stand before thee all the days of thy life: as I was with Moses, so I will be with thee: I will not fail thee, nor forsake thee." Joshua 1:5
        </div>
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Accordion sections={sections} />
        </div>
      </section>
    </>
  );
}
