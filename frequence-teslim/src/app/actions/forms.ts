"use server";

import { submitForm } from "@/lib/forms/submit-form";
import type { FormSubmissionResult } from "@/lib/forms/types";

function payloadFromFormData(formData: FormData): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "website") continue;
    if (value === "on" && key === "consent") {
      payload[key] = true;
      continue;
    }
    payload[key] = typeof value === "string" ? value : String(value);
  }
  return payload;
}

export async function submitCreatorApplicationAction(
  _prev: FormSubmissionResult | null,
  formData: FormData
): Promise<FormSubmissionResult> {
  return submitForm({
    kind: "creator_application",
    payload: payloadFromFormData(formData),
    website: String(formData.get("website") ?? ""),
  });
}

export async function submitBrandInquiryAction(
  _prev: FormSubmissionResult | null,
  formData: FormData
): Promise<FormSubmissionResult> {
  return submitForm({
    kind: "brand_inquiry",
    payload: payloadFromFormData(formData),
    website: String(formData.get("website") ?? ""),
  });
}
