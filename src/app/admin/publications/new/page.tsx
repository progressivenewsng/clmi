import Link from "next/link";
import PublicationForm from "@/components/admin/PublicationForm";

export default function NewPublicationPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white/35 px-6 py-8 lg:px-10">
        <Link href="/admin/publications" className="text-[11px] font-semibold uppercase tracking-widest text-indigo hover:text-gold">
          ← Back to publications
        </Link>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo">Kingdom Testament Chronicles</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Create publication</h1>
      </header>
      <section className="px-6 py-10 lg:px-10">
        <PublicationForm />
      </section>
    </div>
  );
}
