import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const maxPdfSize = 50 * 1024 * 1024;

async function uploadFile(file: File, folder: string, contentType: string) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const supabase = createAdminClient();
  const { error } = await supabase.storage.from("clmi-media").upload(path, Buffer.from(await file.arrayBuffer()), {
    contentType,
    upsert: false,
  });

  if (error) throw new Error(`Media upload failed: ${error.message}`);
  return supabase.storage.from("clmi-media").getPublicUrl(path).data.publicUrl;
}

async function createCoverFromPdf(file: File) {
  const worker = await import("pdfjs-dist/legacy/build/pdf.worker.mjs");
  (globalThis as typeof globalThis & { pdfjsWorker?: typeof worker }).pdfjsWorker = worker;
  const { pdf } = await import("pdf-to-img");
  const dataUrl = `data:application/pdf;base64,${Buffer.from(await file.arrayBuffer()).toString("base64")}`;
  const document = await pdf(dataUrl, { scale: 2 });
  try {
    return await document.getPage(1);
  } finally {
    document.destroy();
  }
}

async function uploadPdf(file: FormDataEntryValue | null) {
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  if (file.type !== "application/pdf" || file.size > maxPdfSize) {
    throw new Error("The publication must be a PDF no larger than 50 MB.");
  }

  const pdfUrl = await uploadFile(file, "publications/pdfs", "application/pdf");
  const supabase = createAdminClient();
  const cover = await createCoverFromPdf(file);
  const coverPath = `publications/covers/${crypto.randomUUID()}.png`;
  const { error } = await supabase.storage.from("clmi-media").upload(coverPath, cover, {
    contentType: "image/png",
    upsert: false,
  });

  if (error) {
    throw new Error(`Cover upload failed: ${error.message}`);
  }

  return {
    pdfUrl,
    coverImageUrl: supabase.storage.from("clmi-media").getPublicUrl(coverPath).data.publicUrl,
  };
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Unavailable" }, { status: 404 });
  }

  const payload = await request.formData();
  const title = typeof payload.get("title") === "string" ? String(payload.get("title")).trim() : "";
  const slug = typeof payload.get("slug") === "string" ? String(payload.get("slug")).trim() : "";

  const author = process.env.CLMI_DEFAULT_AUTHOR || "CLMI Editorial Team";
  const publicationDate = new Date().toISOString().slice(0, 10);

  if (!title || !slug || !slugPattern.test(slug) || !author || !(payload.get("pdf") instanceof File)) {
    return Response.json({ error: "Headline, valid slug, and a PDF are required." }, { status: 400 });
  }

  try {
    const publicationFile = await uploadPdf(payload.get("pdf"));
    if (!publicationFile) return Response.json({ error: "A PDF is required." }, { status: 400 });
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("publications")
      .insert({ title, slug, author, publication_date: publicationDate, cover_image_url: publicationFile.coverImageUrl, pdf_url: publicationFile.pdfUrl, status: "draft" })
      .select("id")
      .single();

    if (error) {
      return Response.json({ error: error.code === "23505" ? "That slug is already in use." : error.message }, { status: 500 });
    }

    return Response.json({ id: data.id }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Could not save publication." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Unavailable" }, { status: 404 });
  }

  const payload = await request.json();
  const id = typeof payload.id === "string" ? payload.id : "";
  const status = payload.status === "published" ? "published" : payload.status === "draft" ? "draft" : "";

  if (!id || !status) {
    return Response.json({ error: "A valid publication and status are required." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("publications")
    .update({ status, published_at: status === "published" ? new Date().toISOString() : null })
    .eq("id", id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (process.env.NODE_ENV === "production") return Response.json({ error: "Unavailable" }, { status: 404 });
  const { id } = await request.json();
  if (typeof id !== "string" || !id) return Response.json({ error: "A publication id is required." }, { status: 400 });
  const supabase = createAdminClient();
  const { data: publication, error: lookupError } = await supabase.from("publications").select("status").eq("id", id).single();
  if (lookupError || !publication) return Response.json({ error: "Publication not found." }, { status: 404 });
  if (publication.status !== "draft") return Response.json({ error: "Only drafts can be deleted." }, { status: 403 });
  const { error } = await supabase.from("publications").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
