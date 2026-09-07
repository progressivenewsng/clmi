import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import ContentStatusButton from "@/components/admin/ContentStatusButton";
import DeleteDraftButton from "@/components/admin/DeleteDraftButton";

const areas = {
  publications: {
    label: "Publications",
    eyebrow: "Kingdom Testament Chronicles",
    description: "Create and manage teaching, studies and leadership publications.",
  },
  news: {
    label: "News",
    eyebrow: "News & Updates",
    description: "Create and manage announcements, events and chapter updates.",
  },
  testimonies: {
    label: "Testimonies",
    eyebrow: "Changed Lives",
    description: "Create and manage stories from the CLMI community.",
  },
  reviews: {
    label: "Reviews",
    eyebrow: "External Reviews",
    description: "Create and manage outside endorsements and reviews.",
  },
  gallery: {
    label: "Gallery",
    eyebrow: "Media Gallery",
    description: "Upload and manage CLMI images.",
  },
} as const;

const tableNames = { news: "news_items", testimonies: "testimonies", reviews: "reviews", gallery: "gallery_items" } as const;

type ContentType = keyof typeof areas;

export default async function ContentManagerPage({
  params,
}: Readonly<{ params: Promise<{ contentType: string }> }>) {
  const { contentType } = await params;
  const area = areas[contentType as ContentType];

  if (!area) {
    notFound();
  }

  const table = tableNames[contentType as keyof typeof tableNames];
  const supabase = createAdminClient();
  const { data: items, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
  const createLabel = area.label === "Gallery" ? "media" : area.label.slice(0, -1);

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white/35 px-6 py-8 lg:px-10">
        <Link href="/admin" className="text-[11px] font-semibold uppercase tracking-widest text-indigo hover:text-gold">
          ← Back to overview
        </Link>
        <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo">{area.eyebrow}</p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">{area.label}</h1>
            <p className="mt-2 text-[14px] text-charcoal/65">{area.description}</p>
          </div>
          <Link href={`/admin/${contentType}/new`} className="bg-gold px-5 py-3 text-[12px] font-semibold uppercase tracking-widest text-ink hover:bg-gold-light">Create {createLabel}</Link>
        </div>
      </header>

      <section className="px-6 py-10 lg:px-10">
        <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-5 text-[11px] font-semibold uppercase tracking-widest">
            <span className="border-b-2 border-gold pb-3 text-ink">All</span>
            <span className="text-charcoal/45">Drafts</span>
            <span className="text-charcoal/45">Published</span>
          </div>
          <span className="text-[12px] text-charcoal/50">{items?.length || 0} items</span>
        </div>
        {error ? <div className="border-x border-b border-red-200 bg-red-50 px-5 py-4 text-[13px] text-red-800">Could not load {area.label.toLowerCase()}.</div> : items?.length ? (
          <div className="overflow-x-auto border-x border-b border-line bg-white/40"><table className="w-full min-w-[640px] text-left"><thead className="border-b border-line text-[10px] uppercase tracking-widest text-indigo"><tr><th className="px-5 py-4">Title</th><th className="px-5 py-4">Details</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Action</th></tr></thead><tbody className="divide-y divide-line text-[13px] text-charcoal/75">{items.map((item) => <tr key={item.id}><td className="px-5 py-4 font-display text-base font-semibold text-ink">{item.title || item.name || "Untitled"}</td><td className="px-5 py-4">{item.organization || item.role || item.caption || item.media_type || "—"}</td><td className="px-5 py-4"><span className="text-[10px] font-semibold uppercase tracking-widest text-indigo">{item.status}</span></td><td className="flex gap-4 px-5 py-4"><ContentStatusButton contentType={contentType} id={item.id} status={item.status} />{item.status === "draft" && <DeleteDraftButton endpoint="/api/admin/content" body={{ contentType, id: item.id }} />}</td></tr>)}</tbody></table></div>
        ) : <div className="flex min-h-72 items-center justify-center border-x border-b border-line bg-white/25 px-6 py-16 text-center">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-gold/50 text-gold">+</div>
            <h2 className="mt-5 font-display text-xl font-semibold text-ink">Nothing here yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-charcoal/60">
              Create your first {createLabel} draft.
            </p>
          </div>
        </div>}
      </section>
    </div>
  );
}
