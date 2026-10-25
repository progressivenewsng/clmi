import PageHero from "@/components/PageHero";
import CopyField from "@/components/CopyField";

const accounts = [
  {
    currency: "Naira (NGN) Account",
    bank: "First Bank of Nigeria",
    name: "Covenant Leadership Ministry International",
    number: "3012 4456 789",
  },
  {
    currency: "Dollar (USD) Domiciliary Account",
    bank: "Guaranty Trust Bank",
    name: "Covenant Leadership Ministry International",
    number: "0123 4567 891",
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Sow Into The Mandate"
        title="Give to CLMI"
        description="Offerings and partnership donations to CLMI are voluntary and in excess of your regular tithe and offering to your own church."
      />
      <section className="relative overflow-hidden bg-parchment py-16">
        <div className="absolute right-10 top-14 hidden w-56 border-l-2 border-gold/50 pl-4 text-[11px] font-display italic leading-relaxed text-ink/45 md:block">
          "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people." 1 Peter 2:9
        </div>

        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Bank Transfer Details</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-charcoal/70">
              Tap the copy icon next to any field to copy it instantly. Please use your name as the transfer
              narration so we can send you a receipt.
            </p>
            <div className="mt-8 space-y-8">
              {accounts.map((a) => (
                <div key={a.currency} className="border border-line bg-white/40 p-6">
                  <div className="text-[12px] font-semibold uppercase tracking-widest text-indigo">{a.currency}</div>
                  <div className="mt-4 space-y-3">
                    <CopyField label="Bank Name" value={a.bank} />
                    <CopyField label="Account Name" value={a.name} />
                    <CopyField label="Account Number" value={a.number} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-gold/40 bg-ink p-8 text-parchment">
              <span className="seal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 9L20 9L15 13L17 19L12 15.5L7 19L9 13L4 9L10 9L12 3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">Need Help Giving?</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-parchment/70">
                For international transfers, mobile money, or any assistance with your giving, reach our
                finance desk directly.
              </p>
              <a href="tel:+2348023456789" className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-gold-light hover:text-parchment">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3c0 6 5 11 11 11l2-3-4-2-1 1c-2-1-3-2-4-4l1-1-2-4-3 0Z" stroke="currentColor" strokeWidth="1.2" /></svg>
                +234 707 309 2948, +234 705 892 4014
              </a>
            </div>
            <div className="border border-line bg-white/40 p-6 text-[13px] leading-relaxed text-charcoal/65">
              CLMI does not collect tithes — all members are encouraged to pay tithes to their local church.
              Every gift made here is a voluntary partnership with the CLMI mandate.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
