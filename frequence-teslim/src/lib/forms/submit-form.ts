import "server-only";

import {
  brandInquirySchema,
  creatorApplicationSchema,
} from "./schema";
import { submitViaWebhook } from "./providers/webhook";
import { CONTACT_EMAIL } from "@/lib/config/urls";
import type { FormSubmissionResult, SubmitFormInput } from "./types";

function unconfigured(): FormSubmissionResult {
  return {
    ok: false,
    code: "provider_unconfigured",
    message:
      `Form şu an çevrim dışı. Talebinizi ${CONTACT_EMAIL} adresine e-postayla iletebilirsiniz.`,
  };
}

function honeypotHit(): FormSubmissionResult {
  return {
    ok: false,
    code: "honeypot",
    message: "Gönderim reddedildi.",
  };
}

function fieldErrorsFromZod(
  error: { flatten: () => { fieldErrors: Record<string, string[] | undefined> } }
): Record<string, string[]> {
  const flat = error.flatten().fieldErrors;
  const out: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(flat)) {
    if (value && value.length) out[key] = value;
  }
  return out;
}

export async function submitForm(
  input: SubmitFormInput
): Promise<FormSubmissionResult> {
  if (input.website && input.website.trim().length > 0) {
    return honeypotHit();
  }

  const provider = (process.env.FORM_SUBMISSION_PROVIDER ?? "none").trim();

  if (input.kind === "creator_application") {
    const parsed = creatorApplicationSchema.safeParse(input.payload);
    if (!parsed.success) {
      return {
        ok: false,
        code: "validation_error",
        message: "Lütfen formdaki hataları düzeltin.",
        fieldErrors: fieldErrorsFromZod(parsed.error),
      };
    }
    const { website, consent, ...data } = parsed.data;
    void website;
    void consent;
    if (provider !== "webhook") return unconfigured();
    return submitViaWebhook({ kind: input.kind, payload: data });
  }

  if (input.kind === "brand_inquiry") {
    const parsed = brandInquirySchema.safeParse(input.payload);
    if (!parsed.success) {
      return {
        ok: false,
        code: "validation_error",
        message: "Lütfen formdaki hataları düzeltin.",
        fieldErrors: fieldErrorsFromZod(parsed.error),
      };
    }
    const { website, consent, ...data } = parsed.data;
    void website;
    void consent;
    if (provider !== "webhook") return unconfigured();
    return submitViaWebhook({ kind: input.kind, payload: data });
  }

  return {
    ok: false,
    code: "unknown",
    message: "Bilinmeyen form türü.",
  };
}
