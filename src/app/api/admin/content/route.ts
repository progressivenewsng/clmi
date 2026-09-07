import { createAdminClient } from "@/lib/supabase/admin";

const types = {
  news: { table: "news_items", folder: "news", title: "News", needsSlug: true },
  testimonies: { table: "testimonies", folder: "testimonies", title: "Testimony", needsSlug: true },
  reviews: { table: "reviews", folder: "reviews", title: "Review", needsSlug: true },
  gallery: { table: "gallery_items", folder: "gallery", title: "Gallery", needsSlug: false },
} as const;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const maxImageSize = 10 * 1024 * 1024;
const maxVideoSize = 100 * 1024 * 1024;

type ContentType = keyof typeof types;

async function upload(file: FormDataEntryValue | null, folder: string) {
  if (!(file instanceof File) || file.size === 0) return null;
  const isVideo = file.type === "video/mp4";
  const valid = isVideo ? file.size <= maxVideoSize : ["image/jpeg", "image/png", "image/webp"].includes(file.type) && file.size <= maxImageSize;
  if (!valid) throw new Error("Invalid media file or file exceeds the allowed size.");
  const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const supabase = createAdminClient();
  const { error } = await supabase.storage.from("clmi-media").upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(`Media upload failed: ${error.message}`);
  return { url: supabase.storage.from("clmi-media").getPublicUrl(path).data.publicUrl, type: isVideo ? "video" : "image" };
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") return Response.json({ error: "Unavailable" }, { status: 404 });
  const form = await request.formData();
  const contentType = form.get("contentType");
  if (typeof contentType !== "string" || !(contentType in types)) return Response.json({ error: "Invalid content type." }, { status: 400 });
  const config = types[contentType as ContentType];
  const title = String(form.get("title") || "").trim();
  const slug = String(form.get("slug") || "").trim();
  const quote = String(form.get("quote") || "").trim();
  const excerpt = String(form.get("excerpt") || "").trim();
  const bodyValue = form.get("body");
  let body: unknown = {};
  if (typeof bodyValue === "string" && bodyValue) {
    try { body = JSON.parse(bodyValue); } catch { return Response.json({ error: "Invalid rich-text content." }, { status: 400 }); }
  }
  if (!title || (config.needsSlug && (!slug || !slugPattern.test(slug))) || (!config.needsSlug && !String(form.get("media")))) return Response.json({ error: "Please complete all required fields." }, { status: 400 });
  try {
    const image = await upload(form.get(config.needsSlug ? "image" : "media"), `${config.folder}/images`);
    const video = contentType === "news" ? await upload(form.get("video"), `${config.folder}/videos`) : null;
    const supabase = createAdminClient();
    const author = process.env.CLMI_DEFAULT_AUTHOR || "CLMI Editorial Team";
    const record: Record<string, unknown> = config.table === "news_items"
      ? { title, slug, excerpt, body, author, cover_image_url: image?.url || null, video_url: video?.url || null, media_type: video ? "video" : "image", publication_date: new Date().toISOString().slice(0, 10), status: "draft" }
      : config.table === "testimonies"
        ? { title, slug, name: title, author, role: "", quote, photo_url: image?.url || null, video_url: null, media_type: "image", status: "draft" }
        : config.table === "reviews"
          ? { title, slug, name: title, author, organization: "", quote, photo_url: image?.url || null, video_url: null, media_type: "image", status: "draft" }
          : { title, author, caption: String(form.get("caption") || "").trim(), alt_text: String(form.get("altText") || "").trim(), media_url: image?.url || null, thumbnail_url: image?.type === "image" ? image.url : null, media_type: image?.type || "image", status: "draft" };
    const { error } = await supabase.from(config.table).insert(record);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Could not save content." }, { status: 500 }); }
}

export async function PATCH(request: Request) {
  if (process.env.NODE_ENV === "production") return Response.json({ error: "Unavailable" }, { status: 404 });
  const payload = await request.json();
  const contentType = payload.contentType;
  const config = types[contentType as ContentType];
  const id = typeof payload.id === "string" ? payload.id : "";
  const status = payload.status === "published" ? "published" : payload.status === "draft" ? "draft" : "";
  if (!config || !id || !status) return Response.json({ error: "Invalid content status request." }, { status: 400 });
  const supabase = createAdminClient();
  const { error } = await supabase.from(config.table).update({ status, published_at: status === "published" ? new Date().toISOString() : null }).eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (process.env.NODE_ENV === "production") return Response.json({ error: "Unavailable" }, { status: 404 });
  const payload = await request.json();
  const config = types[payload.contentType as ContentType];
  const id = typeof payload.id === "string" ? payload.id : "";
  if (!config || !id) return Response.json({ error: "Invalid delete request." }, { status: 400 });
  const supabase = createAdminClient();
  const { data: item, error: lookupError } = await supabase.from(config.table).select("status").eq("id", id).single();
  if (lookupError || !item) return Response.json({ error: "Content not found." }, { status: 404 });
  if (item.status !== "draft") return Response.json({ error: "Only drafts can be deleted." }, { status: 403 });
  const { error } = await supabase.from(config.table).delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
