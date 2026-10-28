import { createClient } from "@/lib/supabase/server";
import type { Publication } from "@/data/mock";

type DatabasePublication = {
  slug: string;
  title: string;
  author: string;
  cover_image_url: string | null;
  pdf_url: string | null;
  publication_type: "ktc" | "leadership_nuggets" | "word_for_you";
  page_image_urls: string[] | null;
  verse_text: string | null;
  verse_reference: string | null;
  publication_date: string | null;
};

function toPublication(item: DatabasePublication): Publication {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: "",
    image: item.cover_image_url || "/clmi-logo.jpeg",
    pdfUrl: item.pdf_url || undefined,
    pageImageUrls: item.page_image_urls || [],
    publicationType: item.publication_type,
    verseText: item.verse_text || undefined,
    verseReference: item.verse_reference || undefined,
    date: item.publication_date
      ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(`${item.publication_date}T00:00:00`))
      : "",
    author: item.author,
    body: [],
  };
}

export async function getPublishedPublications(publicationType: NonNullable<Publication["publicationType"]> = "ktc"): Promise<Publication[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("publications")
    .select("slug, title, author, cover_image_url, pdf_url, publication_type, page_image_urls, verse_text, verse_reference, publication_date")
    .eq("publication_type", publicationType)
    .eq("status", "published")
    .order("publication_date", { ascending: false });

  return (data as DatabasePublication[] | null)?.map(toPublication) || [];
}

export async function getPublishedPublication(slug: string): Promise<Publication | undefined> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("publications")
    .select("slug, title, author, cover_image_url, pdf_url, publication_type, page_image_urls, verse_text, verse_reference, publication_date")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return data ? toPublication(data as DatabasePublication) : undefined;
}
