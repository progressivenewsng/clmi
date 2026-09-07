import PageHero from "@/components/PageHero";
import JoinForm from "@/components/JoinForm";

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Become a Member"
        title="Join CLMI"
        description="Fill the form below to become part of a growing community of leaders and politicians reconciled to God's agenda for their calling."
      />
      <section className="bg-parchment py-16">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <JoinForm />
        </div>
      </section>
    </>
  );
}
