import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import PublicationStatusButton from "@/components/admin/PublicationStatusButton";
import DeleteDraftButton from "@/components/admin/DeleteDraftButton";
import type { PublicationType } from "@/components/admin/PublicationForm";

const labels: Record<Exclude<PublicationType, "ktc">, string> = {
  leadership_nuggets: "Leadership Nuggets",
  word_for_you: "The Word for You",
};

export default async function PublicationTypeManager({ publicationType }: { publicationType: Exclude<PublicationType, "ktc"> }) {
  const label = labels[publicationType];
  const path = publicationType === "leadership_nuggets" ? "leadership-nuggets" : "word-for-you";
  const supabase = createAdminClient();
  const { data: entries, error } = await supabase
    .from("publications")
    .select("id, title, author, publication_date, status, updated_at")
    .eq("publication_type", publicationType)
    .order("updated_at", { ascending: false });

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white/35 px-6 py-8 lg:px-10">
        <Link href="/admin/publications" className="text-[11px] font-semibold uppercase tracking-widest text-indigo hover:text-gold">Back to publications</Link>
        <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo">Publications</p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">{label}</h1>
            <p className="mt-2 text-[14px] text-charcoal/65">Manage {publicationType === "word_for_you" ? "image editions and their scripture" : "PDF editions"}.</p>
          </div>
          <Link href={`/admin/publications/${path}/new`} className="bg-gold px-5 py-3 text-[12px] font-semibold uppercase tracking-widest text-ink hover:bg-gold-light">Create edition</Link>
        </div>
      </header>
      <section className="px-6 py-10 lg:px-10">
        {error ? <div className="border-l-2 border-red-700 bg-red-50 px-4 py-3 text-[13px] text-red-800">Could not load editions. Apply the publication sections migration.</div> : entries?.length ? (
          <div className="overflow-x-auto border border-line bg-white/40">
            <table className="w-full min-w-[640px] text-left">
              <thead className="border-b border-line text-[10px] uppercase tracking-widest text-indigo"><tr><th className="px-5 py-4">Headline</th><th className="px-5 py-4">Author</th><th className="px-5 py-4">Date</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Actions</th></tr></thead>
              <tbody className="divide-y divide-line text-[13px] text-charcoal/75">
                {entries.map((entry) => <tr key={entry.id}>
                  <td className="px-5 py-4 font-display text-base font-semibold text-ink">{entry.title}</td>
                  <td className="px-5 py-4">{entry.author || "—"}</td>
                  <td className="px-5 py-4">{entry.publication_date || "—"}</td>
                  <td className="px-5 py-4"><span className="text-[10px] font-semibold uppercase tracking-widest text-indigo">{entry.status}</span></td>
                  <td className="px-5 py-4"><div className="flex gap-4"><PublicationStatusButton id={entry.id} status={entry.status} />{entry.status === "draft" && <DeleteDraftButton endpoint="/api/admin/publications" body={{ id: entry.id }} />}</div></td>
                </tr>)}
              </tbody>
            </table>
          </div>
        ) : <div className="border border-line bg-white/30 px-6 py-16 text-center"><h2 className="font-display text-xl font-semibold text-ink">No editions yet</h2><p className="mt-2 text-[13px] text-charcoal/60">Create the first {label} edition.</p></div>}
      </section>
    </div>
  );
}
