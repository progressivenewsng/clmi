import PageHero from "@/components/PageHero";
import CounsellingForm from "@/components/CounsellingForm";

export default function CounsellingPage() {
  return (
    <>
      <PageHero
        eyebrow="Counselling"
        title="Request Counselling"
        description="We are here to walk with you through life’s challenges with wisdom, compassion, and biblical guidance."
      />
      <section className="relative overflow-hidden bg-parchment py-16">
        <div className="absolute left-6 top-12 hidden w-56 border-r-2 border-gold/50 pr-4 text-right text-[11px] font-display italic leading-relaxed text-ink/45 md:block">
          "Then he answered and spake unto me, saying, This is the word of the LORD unto Zerubbabel, saying, Not by might, nor by power, but by my spirit, saith the LORD of hosts." Zechariah 4:6
        </div>
        <div className="absolute right-10 bottom-28 hidden w-52 border-l-2 border-gold/50 pl-4 text-[11px] font-display italic leading-relaxed text-ink/45 lg:block">
          "So then it is not of him that willeth, nor of him that runneth, but of God that sheweth mercy." Romans 9:16
        </div>
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <CounsellingForm />
        </div>
      </section>
    </>
  );
}
