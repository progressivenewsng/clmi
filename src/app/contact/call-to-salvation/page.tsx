import PageHero from "@/components/PageHero";
import SalvationForm from "@/components/SalvationForm";

export default function CallToSalvationPage() {
  return (
    <>
      <PageHero
        eyebrow="Call to Salvation"
        title="Take the Step of Faith"
        description="If you are seeking Christ, we would be honored to walk with you in prayer and guidance as you respond to His call."
      />
      <section className="relative overflow-hidden bg-parchment py-16">
        <div className="absolute -left-10 bottom-32 hidden w-56 border-r-2 border-gold/50 pr-4 text-right text-[11px] font-display italic leading-relaxed text-ink/45 lg:block">
          "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." Romans 8:28
        </div>
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <SalvationForm />
        </div>
      </section>
    </>
  );
}
