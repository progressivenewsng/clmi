import { sendFormEmail } from "@/lib/email";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const formType = String(payload.formType || "contact");
    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim();

    if (!name || !email) {
      return Response.json({ error: "Name and email are required." }, { status: 400 });
    }

    const validTypes = ["join", "prayer-request", "counselling", "salvation", "contact"];
    if (!validTypes.includes(formType)) {
      return Response.json({ error: "Invalid form type." }, { status: 400 });
    }

    const databaseFormType = formType.replaceAll("-", "_");
    const supabase = createAdminClient();
    const { error: saveError } = await supabase.from("form_submissions").insert({
      form_type: databaseFormType,
      name,
      email,
      phone: String(payload.phone || "").trim() || null,
      location: String(payload.location || "").trim() || null,
      occupation: String(payload.occupation || "").trim() || null,
      ministry: String(payload.ministry || "").trim() || null,
      message: String(payload.message || "").trim(),
      status: "new",
    });

    if (saveError) {
      console.error("Unable to save form submission:", saveError.message);
      return Response.json({ error: "Unable to save your submission. Please try again later." }, { status: 500 });
    }

    await sendFormEmail({ ...payload, formType });

    return Response.json({ ok: true, message: "Message sent successfully." }, { status: 200 });
  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : "Unable to send message. Please try again later.",
    }, { status: 500 });
  }
}
