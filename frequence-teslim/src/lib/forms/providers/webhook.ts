import "server-only";

import type { FormKind, FormSubmissionResult } from "../types";

const TIMEOUT_MS = 8_000;

export async function submitViaWebhook(input: {
  kind: FormKind;
  payload: Record<string, unknown>;
}): Promise<FormSubmissionResult> {
  const url = process.env.FORM_WEBHOOK_URL?.trim();
  const secret = process.env.FORM_WEBHOOK_SECRET?.trim();

  if (!url) {
    return {
      ok: false,
      code: "provider_unconfigured",
      message:
        "Form gönderimi yapılandırılmamış. FORM_WEBHOOK_URL tanımlayın.",
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
      },
      body: JSON.stringify({
        kind: input.kind,
        submittedAt: new Date().toISOString(),
        data: input.payload,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        code: "provider_error",
        message: "Form şu an iletilemedi. Lütfen daha sonra tekrar deneyin.",
      };
    }

    return { ok: true };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return {
        ok: false,
        code: "timeout",
        message: "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.",
      };
    }
    return {
      ok: false,
      code: "provider_error",
      message: "Form şu an iletilemedi. Lütfen daha sonra tekrar deneyin.",
    };
  } finally {
    clearTimeout(timer);
  }
}
