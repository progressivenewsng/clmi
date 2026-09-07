import PageHero from "@/components/PageHero";
import JoinForm from "@/components/JoinForm";

const info = [
  { label: "Address", value: "Covenant House, 14 Aso Drive, Central Business District, Abuja, FCT, Nigeria" },
  { label: "Phone", value: "+234 802 345 6789" },
  { label: "Email", value: "info@clmiglobal.org" },
  { label: "Fellowship", value: "Every 3rd Sunday, 5 – 7pm, across chapters" },
];

const socials = [
  { label: "Facebook", handle: "@CLMIGlobal" },
  { label: "Instagram", handle: "@clmi_global" },
  { label: "X (Twitter)", handle: "@CLMI_Global" },
  { label: "YouTube", handle: "CLMI Global" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact CLMI"
        description="Reach out to us for prayer, partnership, media enquiries or general questions."
      />
      <section className="relative overflow-hidden bg-parchment py-16">
        <div className="absolute -left-12 bottom-24 hidden w-56 border-r-2 border-gold/50 pr-4 text-right text-[11px] font-display italic leading-relaxed text-ink/45 lg:block">
          "And of some have compassion, making a difference" Jude 1:22
        </div>
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">Reach Us Directly</h2>
              <ul className="mt-5 space-y-4">
                {info.map((i) => (
                  <li key={i.label} className="border-l-2 border-gold pl-4">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-indigo">{i.label}</div>
                    <div className="mt-1 text-[14px] text-charcoal/80">{i.value}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">Follow CLMI</h2>
              <ul className="mt-5 space-y-3">
                {socials.map((s) => (
                  <li key={s.label} className="flex justify-between text-[14px]">
                    <span className="text-charcoal/60">{s.label}</span>
                    <span className="font-medium text-indigo">{s.handle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Send Us a Message</h2>
            <div className="mt-5">
              <JoinForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
