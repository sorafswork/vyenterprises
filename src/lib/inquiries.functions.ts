import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(6, "Phone is required").max(30),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  businessType: z.string().trim().max(50).optional(),
  requirement: z.string().trim().max(1000).optional(),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"] ?? "";
    const { sendInquiryEmails } = await import("@/lib/inquiry-email.server");
    const emailSent = await sendInquiryEmails(
      {
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        businessType: data.businessType || undefined,
        requirement: data.requirement || undefined,
      },
      apiKey,
    );
    return { ok: true as const, emailSent };
  });
