import PageHero from "@/components/PageHero";
import PrayerRequestForm from "@/components/PrayerRequestForm";

export default function PrayerRequestPage() {
  return (
    <>
      <PageHero
        eyebrow="Prayer Request"
        title="Send a Prayer Request"
        description="Bring your burdens before God with us. Share what you need prayer for and someone from our team will respond with care and support."
      />
      <section className="relative overflow-hidden bg-parchment py-16">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <PrayerRequestForm />
        </div>
      </section>
    </>
  );
}
