import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

const contentAreas = [
  { label: "Publications", description: "Kingdom Testament Chronicles", href: "/admin/publications", accent: "text-gold" },
  { label: "News", description: "Updates, events and announcements", href: "/admin/news", accent: "text-indigo" },
  { label: "Testimonies", description: "Stories from the CLMI community", href: "/admin/testimonies", accent: "text-gold" },
  { label: "Reviews", description: "External endorsements and reviews", href: "/admin/reviews", accent: "text-indigo" },
  { label: "Gallery", description: "Images and videos from CLMI", href: "/admin/gallery", accent: "text-gold" },
];

const contentTables = ["publications", "news_items", "testimonies", "reviews", "gallery_items"] as const;

export default async function AdminPage() {
  const supabase = createAdminClient();
  const counts = await Promise.all(contentTables.map(async (table) => {
    const [{ count: published }, { count: drafts }] = await Promise.all([
      supabase.from(table).select("id", { count: "exact", head: true }).eq("status", "published"),
      supabase.from(table).select("id", { count: "exact", head: true }).eq("status", "draft"),
    ]);
    return { published: published || 0, drafts: drafts || 0 };
  }));
  const { count: formSubmissions } = await supabase
    .from("form_submissions")
    .select("id", { count: "exact", head: true });
  const publishedCount = counts.reduce((total, item) => total + item.published, 0);
  const draftCount = counts.reduce((total, item) => total + item.drafts, 0);

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white/35 px-6 py-8 lg:px-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo">Content management</p>
        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Good morning, CLMI.</h1>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-charcoal/65">
              Your publishing workspace for the stories, teaching and media that carry the mandate forward.
            </p>
          </div>
          <span className="border border-gold/40 bg-gold/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-ink">
            Development preview
          </span>
        </div>
      </header>

      <section className="px-6 py-8 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            [String(contentTables.length).padStart(2, "0"), "Content areas"],
            [String(publishedCount).padStart(2, "0"), "Published"],
            [String(draftCount).padStart(2, "0"), "Drafts"],
            [String(formSubmissions || 0).padStart(2, "0"), "Form submissions"],
          ].map(([value, label]) => (
            <div key={label} className="border border-line bg-white/45 p-5">
              <div className="font-display text-3xl font-semibold text-ink">{value}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-indigo">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo">Your workspace</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Choose a content area</h2>
          </div>
          <span className="hidden text-[12px] text-charcoal/50 sm:block">Database connection next</span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {contentAreas.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className="group border border-line bg-white/45 p-6 transition-colors hover:border-gold hover:bg-white/70"
            >
              <div className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${area.accent}`}>{area.label}</div>
              <h3 className="mt-8 font-display text-xl font-semibold text-ink group-hover:text-indigo">{area.description}</h3>
              <div className="mt-8 text-[12px] font-semibold uppercase tracking-widest text-indigo">Open manager <span aria-hidden>→</span></div>
            </Link>
          ))}
        </div>

        <div className="mt-12 border-l-2 border-gold bg-white/35 px-5 py-4 text-[13px] leading-relaxed text-charcoal/65">
          Authentication is intentionally deferred. This dashboard is available only in development and will be secured before deployment.
        </div>
      </section>
    </div>
  );
}
