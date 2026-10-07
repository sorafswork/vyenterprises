// Server-only helper: sends inquiry notification + customer confirmation emails
// through Lovable's managed email API. No database involved.
import { sendLovableEmail, EmailAPIError } from "@lovable.dev/email-js";

const SENDER_DOMAIN = "notify.vyenterprises.in";
const FROM = `VY Enterprises <inquiries@${SENDER_DOMAIN}>`;
const BUSINESS_EMAIL = "business@vyenterprises.in";

export type Inquiry = {
  name: string;
  phone: string;
  email?: string;
  businessType?: string;
  requirement?: string;
};

function esc(value: string) {
  return value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 12px;color:#5b6b5f;font-size:13px;">${esc(label)}</td><td style="padding:8px 12px;color:#14261b;font-size:14px;font-weight:600;">${esc(value)}</td></tr>`;
}

function businessHtml(i: Inquiry) {
  return `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:28px 24px;">
  <h1 style="margin:0 0 4px;font-size:20px;color:#14261b;">New website inquiry</h1>
  <p style="margin:0 0 18px;font-size:13px;color:#5b6b5f;">VY Enterprises &middot; vyenterprises.in</p>
  <table style="width:100%;border-collapse:collapse;border:1px solid #e3ebe4;border-radius:10px;">
    ${row("Name", i.name)}
    ${row("Phone", i.phone)}
    ${row("Email", i.email || "—")}
    ${row("Business type", i.businessType || "—")}
    ${row("Requirement", i.requirement || "—")}
  </table>
  <p style="margin:18px 0 0;font-size:12px;color:#5b6b5f;">Submitted from the website inquiry form.</p>
</div></body></html>`;
}

function customerHtml(i: Inquiry) {
  return `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:28px 24px;">
  <h1 style="margin:0 0 10px;font-size:20px;color:#14261b;">Thank you, ${esc(i.name)}!</h1>
  <p style="margin:0 0 14px;font-size:14px;color:#3d4f43;line-height:1.6;">
    We have received your inquiry for our eco-friendly disposable products. Our team will contact you shortly with pricing and availability.
  </p>
  <table style="width:100%;border-collapse:collapse;border:1px solid #e3ebe4;border-radius:10px;">
    ${row("Phone", i.phone)}
    ${row("Business type", i.businessType || "—")}
    ${row("Requirement", i.requirement || "—")}
  </table>
  <p style="margin:18px 0 0;font-size:13px;color:#3d4f43;">
    Need us sooner? Call <strong>+91 85086 57377</strong> or email business@vyenterprises.in.
  </p>
  <p style="margin:14px 0 0;font-size:12px;color:#5b6b5f;">VY Enterprises &middot; Tiruchirappalli, Tamil Nadu</p>
</div></body></html>`;
}

function text(i: Inquiry) {
  return [
    `Name: ${i.name}`,
    `Phone: ${i.phone}`,
    `Email: ${i.email || "-"}`,
    `Business type: ${i.businessType || "-"}`,
    `Requirement: ${i.requirement || "-"}`,
  ].join("\n");
}

async function trySend(payload: Parameters<typeof sendLovableEmail>[0], apiKey: string, label: string) {
  try {
    await sendLovableEmail(payload, { apiKey });
    return true;
  } catch (error) {
    if (error instanceof EmailAPIError) {
      console.error(`[inquiry] ${label} email failed`, error.status, error.code, error.message);
    } else {
      console.error(`[inquiry] ${label} email failed`, error);
    }
    return false;
  }
}

/** Sends both emails. Never throws — returns whether the business email went out. */
export async function sendInquiryEmails(inquiry: Inquiry, key: string): Promise<boolean> {
  const apiKey = key;
  if (!apiKey) {
    console.error("[inquiry] email API key is not configured");
    return false;
  }

  const stamp = Date.now();
  const businessSent = await trySend(
    {
      to: BUSINESS_EMAIL,
      from: FROM,
      sender_domain: SENDER_DOMAIN,
      subject: `New inquiry — ${inquiry.name} (${inquiry.businessType || "General"})`,
      html: businessHtml(inquiry),
      text: text(inquiry),
      reply_to: inquiry.email || undefined,
      idempotency_key: `inquiry-business-${stamp}-${inquiry.phone}`,
    },
    apiKey,
    "business",
  );

  if (inquiry.email) {
    await trySend(
      {
        to: inquiry.email,
        from: FROM,
        sender_domain: SENDER_DOMAIN,
        subject: "We received your inquiry — VY Enterprises",
        html: customerHtml(inquiry),
        text: `Thank you, ${inquiry.name}! We received your inquiry and will contact you shortly.\n\n${text(inquiry)}`,
        idempotency_key: `inquiry-customer-${stamp}-${inquiry.email}`,
      },
      apiKey,
      "customer",
    );
  }

  return businessSent;
}
