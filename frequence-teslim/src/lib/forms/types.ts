export type FormKind = "creator_application" | "brand_inquiry";

export type FormSubmissionResult =
  | { ok: true; id?: string }
  | {
      ok: false;
      code:
        | "validation_error"
        | "honeypot"
        | "provider_unconfigured"
        | "provider_error"
        | "timeout"
        | "unknown";
      message: string;
      fieldErrors?: Record<string, string[]>;
    };

export type FormProviderName = "webhook" | "none";

export type SubmitFormInput = {
  kind: FormKind;
  payload: Record<string, unknown>;
  /** Honeypot field — must be empty */
  website?: string;
};
