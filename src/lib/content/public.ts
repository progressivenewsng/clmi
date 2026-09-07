import { createClient } from "@/lib/supabase/server";
import type { GalleryItem, NewsItem, Review, Testimony } from "@/data/mock";

const imageFallback = "/clmi-logo.jpeg";

function formatDate(value: string | null) {
  return value ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(`${value}T00:00:00`)) : "";
}

function bodyToText(body: unknown) {
  if (!body || typeof body !== "object") return "";
  const content = (body as { content?: unknown }).content;
  if (!Array.isArray(content)) return "";
  return content.map((node) => {
    if (!node || typeof node !== "object") return "";
    const children = (node as { content?: unknown }).content;
    return Array.isArray(children) ? children.map((child) => child && typeof child === "object" && "text" in child ? String(child.text) : "").join("") : "";
  }).filter(Boolean).join("\n\n");
}

export async function getPublishedNews(): Promise<NewsItem[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("news_items").select("id, slug, title, body, cover_image_url, video_url, media_type, publication_date").eq("status", "published").order("publication_date", { ascending: false }).order("created_at", { ascending: false });
  return (data || []).map((item) => ({ slug: item.slug, title: item.title, type: item.media_type, image: item.cover_image_url || imageFallback, videoUrl: item.video_url || undefined, date: formatDate(item.publication_date), body: bodyToText(item.body) }));
}

export async function getPublishedNewsItem(slug: string) {
  return (await getPublishedNews()).find((item) => item.slug === slug);
}

export async function getPublishedTestimonies(): Promise<Testimony[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonies").select("id, name, role, quote, photo_url, video_url, media_type").eq("status", "published").order("published_at", { ascending: false }).order("created_at", { ascending: false });
  return (data || []).map((item) => ({ id: item.id, name: item.name, role: item.role, image: item.photo_url || imageFallback, quote: item.quote }));
}

export async function getPublishedReviews(): Promise<Review[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("reviews").select("id, name, organization, quote, photo_url, video_url, media_type").eq("status", "published").order("published_at", { ascending: false }).order("created_at", { ascending: false });
  return (data || []).map((item) => ({ id: item.id, name: item.name, organization: item.organization, image: item.photo_url || imageFallback, quote: item.quote }));
}

export async function getPublishedGallery(): Promise<GalleryItem[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("gallery_items").select("id, title, caption, media_url, thumbnail_url, media_type, alt_text").eq("status", "published").order("sort_order", { ascending: true }).order("published_at", { ascending: false }).order("created_at", { ascending: false });
  return (data || []).map((item) => ({ id: item.id, image: item.thumbnail_url || item.media_url || imageFallback, caption: item.caption || item.title }));
}
