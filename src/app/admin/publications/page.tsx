import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import PublicationStatusButton from "@/components/admin/PublicationStatusButton";
import DeleteDraftButton from "@/components/admin/DeleteDraftButton";

export default async function PublicationsManagerPage() {
  const supabase = createAdminClient();
  const { data: publications, error } = await supabase
    .from("publications")
    .select("id, title, author, publication_date, status, updated_at")
    .eq("publication_type", "ktc")
    .order("updated_at", { ascending: false });

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white/35 px-6 py-8 lg:px-10">
        <Link href="/admin" className="text-[11px] font-semibold uppercase tracking-widest text-indigo hover:text-gold">← Back to overview</Link>
        <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo">Kingdom Testament Chronicles</p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Publications</h1>
            <p className="mt-2 text-[14px] text-charcoal/65">Manage teaching, studies and leadership publications.</p>
          </div>
          <Link href="/admin/publications/new" className="bg-gold px-5 py-3 text-[12px] font-semibold uppercase tracking-widest text-ink hover:bg-gold-light">Create publication</Link>
        </div>
      </header>
      <section className="px-6 py-10 lg:px-10">
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <Link href="/admin/publications/leadership-nuggets" className="border border-line bg-white/45 p-5 transition-colors hover:border-gold">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-indigo">PDF editions</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-ink">Leadership Nuggets</h2>
            <p className="mt-1 text-[13px] text-charcoal/65">Manage uploads and publication status.</p>
          </Link>
          <Link href="/admin/publications/word-for-you" className="border border-line bg-white/45 p-5 transition-colors hover:border-gold">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-indigo">Image editions + scripture</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-ink">The Word for You</h2>
            <p className="mt-1 text-[13px] text-charcoal/65">Manage image pages and Bible verses.</p>
          </Link>
        </div>
        {error ? (
          <div className="border-l-2 border-red-700 bg-red-50 px-4 py-3 text-[13px] text-red-800">Could not load publications. Check that the Supabase migration has been applied.</div>
        ) : publications?.length ? (
          <div className="overflow-x-auto border border-line bg-white/40">
            <table className="w-full min-w-[640px] text-left">
              <thead className="border-b border-line text-[10px] uppercase tracking-widest text-indigo">
                <tr><th className="px-5 py-4">Title</th><th className="px-5 py-4">Author</th><th className="px-5 py-4">Date</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-line text-[13px] text-charcoal/75">
                {publications.map((publication) => (
                  <tr key={publication.id}>
                    <td className="px-5 py-4 font-display text-base font-semibold text-ink">{publication.title}</td>
                    <td className="px-5 py-4">{publication.author || "—"}</td>
                    <td className="px-5 py-4">{publication.publication_date || "—"}</td>
                    <td className="px-5 py-4"><span className="text-[10px] font-semibold uppercase tracking-widest text-indigo">{publication.status}</span></td>
                    <td className="flex gap-4 px-5 py-4"><PublicationStatusButton id={publication.id} status={publication.status} />{publication.status === "draft" && <DeleteDraftButton endpoint="/api/admin/publications" body={{ id: publication.id }} />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex min-h-72 items-center justify-center border border-line bg-white/25 px-6 py-16 text-center">
            <div><div className="mx-auto flex h-12 w-12 items-center justify-center border border-gold/50 text-gold">+</div><h2 className="mt-5 font-display text-xl font-semibold text-ink">No publications yet</h2><p className="mt-2 text-[13px] text-charcoal/60">Create the first Kingdom Testament Chronicle draft.</p></div>
          </div>
        )}
      </section>
    </div>
  );
}
