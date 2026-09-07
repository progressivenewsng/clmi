import Link from "next/link";
import { notFound } from "next/navigation";
import ContentEntryForm from "@/components/admin/ContentEntryForm";

const contentTypes = ["news", "testimonies", "reviews", "gallery"] as const;
type ContentType = (typeof contentTypes)[number];

export default async function NewContentPage({ params }: Readonly<{ params: Promise<{ contentType: string }> }>) {
  const { contentType } = await params;
  if (!contentTypes.includes(contentType as ContentType)) notFound();
  const label = contentType === "news" ? "News" : contentType[0].toUpperCase() + contentType.slice(1);
  return <div className="min-h-screen"><header className="border-b border-line bg-white/35 px-6 py-8 lg:px-10"><Link href={`/admin/${contentType}`} className="text-[11px] font-semibold uppercase tracking-widest text-indigo hover:text-gold">← Back to {label.toLowerCase()}</Link><p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo">Content management</p><h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Create {contentType === "gallery" ? "media" : contentType.slice(0, -1)}</h1></header><section className="px-6 py-10 lg:px-10"><ContentEntryForm contentType={contentType as ContentType} /></section></div>;
}
