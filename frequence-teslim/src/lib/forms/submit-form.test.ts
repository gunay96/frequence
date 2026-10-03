import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

describe("submitForm", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
    delete process.env.FORM_SUBMISSION_PROVIDER;
    delete process.env.FORM_WEBHOOK_URL;
  });

  afterEach(() => {
    process.env = env;
    vi.resetModules();
  });

  it("rejects honeypot submissions", async () => {
    const { submitForm } = await import("./submit-form");

    const result = await submitForm({
      kind: "creator_application",
      payload: {},
      website: "https://spam.example",
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.code).toBe("honeypot");
  });

  it("returns unconfigured when provider is not webhook", async () => {
    const { submitForm } = await import("./submit-form");

    const result = await submitForm({
      kind: "brand_inquiry",
      payload: {
        fullName: "Can Demir",
        company: "Demo Marka",
        workEmail: "can@demomarka.com",
        campaignType: "Farkındalık",
        targetPlatform: "TikTok",
        timing: "Q2",
        message:
          "Yeni ürün lansmanı için TikTok creator kampanyası planlıyoruz. Sound odaklı bir aktivasyon da değerlendirilebilir.",
        consent: true,
      },
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.code).toBe("provider_unconfigured");
  });

  it("returns validation errors for incomplete payloads", async () => {
    const { submitForm } = await import("./submit-form");

    const result = await submitForm({
      kind: "creator_application",
      payload: { fullName: "A" },
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.code).toBe("validation_error");
    expect(result.fieldErrors).toBeDefined();
  });
});
