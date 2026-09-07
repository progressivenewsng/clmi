export type ContactFormType = "join" | "prayer-request" | "counselling" | "salvation" | "contact";

const formTitles: Record<ContactFormType, string> = {
  join: "Join CLMI",
  "prayer-request": "Prayer Request",
  counselling: "Counselling Request",
  salvation: "Call to Salvation",
  contact: "General Contact Message",
};

const confirmationCopy: Record<ContactFormType, { subject: string; heading: string; body: string }> = {
  join: {
    subject: "Your CLMI membership request has been received",
    heading: "Thank you for joining CLMI",
    body: "Thank you for reaching out to Covenant Leadership Ministry International. A member of our team will contact you soon with the next steps and details about the fellowship nearest to you.",
  },
  "prayer-request": {
    subject: "Your prayer request has been received",
    heading: "Prayer Request Received",
    body: "Thank you for entrusting us with your prayer request. We are grateful for the opportunity to stand with you in prayer and will respond as soon as possible.",
  },
  counselling: {
    subject: "Your counselling request has been received",
    heading: "Counselling Request Received",
    body: "Thank you for reaching out to us. A member of our team will be in touch with care and support as soon as possible.",
  },
  salvation: {
    subject: "Your call to salvation has been received",
    heading: "We Receive You With Christ",
    body: "Thank you for reaching out. Someone from CLMI will connect with you in prayer and spiritual guidance as soon as possible.",
  },
  contact: {
    subject: "We have received your message",
    heading: "Thank you for contacting CLMI",
    body: "Thank you for contacting Covenant Leadership Ministry International. We have received your message and will get back to you as soon as possible.",
  },
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatRow(label: string, value: string | undefined): string {
  const safeValue = value && value.trim() ? value.trim() : "Not provided";
  return `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #f1e8d5; font-weight: 700; color: #1b1a16; text-align: left; vertical-align: top;">${escapeHtml(label)}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #f1e8d5; color: #3b3a35; text-align: left; vertical-align: top;">${escapeHtml(safeValue)}</td>
    </tr>
  `;
}

async function sendEmail({
  to,
  replyTo,
  subject,
  html,
}: {
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "CLMI <noreply@clmi.org.ng>";

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: replyTo || undefined,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend email failed: ${errorText || response.statusText}`);
  }

  return response;
}

export async function sendFormEmail(payload: Record<string, unknown>) {
  const formType = String(payload.formType || payload.type || "contact") as ContactFormType;
  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const phone = String(payload.phone || "").trim();
  const location = String(payload.location || "").trim();
  const occupation = String(payload.occupation || "").trim();
  const ministry = String(payload.ministry || "").trim();
  const purpose = String(payload.purpose || payload.message || "").trim();
  const extra = String(payload.extra || "").trim();
  const to = (process.env.CLMI_NOTIFICATION_EMAIL || "info@clmi.org.ng").trim();

  const subject = `${formTitles[formType] || "CLMI Form Submission"}: ${name || "New submission"}`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; background: #f8f3e8; padding: 24px; color: #1b1a16;">
      <div style="max-width: 720px; margin: 0 auto; background: #ffffff; border: 1px solid #e9d8a8; border-radius: 12px; overflow: hidden;">
        <div style="background: #1f2a44; color: #ffffff; padding: 18px 24px; font-size: 18px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
          ${escapeHtml(formTitles[formType] || "CLMI Form Submission")}
        </div>
        <div style="padding: 24px;">
          <p style="margin: 0 0 18px; font-size: 15px; color: #3b3a35;">You have a new message from the CLMI website.</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${formatRow("Name", name)}
            ${formatRow("Email", email)}
            ${formatRow("Phone", phone)}
            ${formatRow("Location", location)}
            ${formatRow("Occupation", occupation)}
            ${formatRow("Ministry", ministry)}
            ${formatRow("Request / Message", purpose || extra)}
            ${formatRow("Additional Details", extra || "Not provided")}
          </table>
        </div>
      </div>
    </div>
  `;

  await sendEmail({ to: [to], replyTo: email || undefined, subject, html });

  if (email) {
    const confirmation = confirmationCopy[formType] || confirmationCopy.contact;
    const confirmationHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; background: #f8f3e8; padding: 24px; color: #1b1a16;">
        <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e9d8a8; border-radius: 12px; overflow: hidden;">
          <div style="background: #1f2a44; color: #ffffff; padding: 18px 24px; font-size: 18px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
            ${escapeHtml(confirmation.heading)}
          </div>
          <div style="padding: 24px; color: #2f2d2a; line-height: 1.7; font-size: 15px;">
            <p>Dear ${escapeHtml(name || "Friend")},</p>
            <p>${escapeHtml(confirmation.body)}</p>
            <p>Thank you for taking the time to connect with CLMI.</p>
            <p>Warm regards,<br />CLMI Team</p>
          </div>
        </div>
      </div>
    `;

    await sendEmail({
      to: [email],
      replyTo: to,
      subject: confirmation.subject,
      html: confirmationHtml,
    });
  }

  return true;
}
