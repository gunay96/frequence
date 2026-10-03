import { describe, expect, it } from "vitest";
import {
  brandInquirySchema,
  creatorApplicationSchema,
} from "./schema";

describe("form schemas", () => {
  it("validates a complete creator application", () => {
    const result = creatorApplicationSchema.safeParse({
      fullName: "Ada Yılmaz",
      email: "ada@example.com",
      tiktokUrl: "https://www.tiktok.com/@ada",
      category: "Müzik",
      followerRange: "10K–50K",
      bio: "TikTok'ta müzik odaklı kısa videolar üretiyorum ve kampanyalara uyum sağlayabilirim.",
      consent: true,
      website: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid TikTok URLs", () => {
    const result = creatorApplicationSchema.safeParse({
      fullName: "Ada Yılmaz",
      email: "ada@example.com",
      tiktokUrl: "https://example.com/profile",
      category: "Müzik",
      followerRange: "10K–50K",
      bio: "TikTok'ta müzik odaklı kısa videolar üretiyorum ve kampanyalara uyum sağlayabilirim.",
      consent: true,
    });

    expect(result.success).toBe(false);
  });

  it("validates a complete brand inquiry", () => {
    const result = brandInquirySchema.safeParse({
      fullName: "Can Demir",
      company: "Demo Marka",
      workEmail: "can@demomarka.com",
      campaignType: "Farkındalık",
      targetPlatform: "TikTok",
      timing: "Q2 lansman",
      message:
        "Yeni ürün lansmanı için TikTok creator kampanyası planlıyoruz. Sound odaklı bir aktivasyon da değerlendirilebilir.",
      consent: true,
    });

    expect(result.success).toBe(true);
  });

  it("returns Turkish validation messages", () => {
    const result = creatorApplicationSchema.safeParse({
      fullName: "A",
      email: "not-an-email",
      tiktokUrl: "",
      category: "",
      followerRange: "",
      bio: "kısa",
      consent: false,
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    const messages = Object.values(result.error.flatten().fieldErrors)
      .flat()
      .filter(Boolean);

    expect(messages.some((m) => m?.includes("e-posta"))).toBe(true);
    expect(messages.some((m) => m?.includes("TikTok"))).toBe(true);
  });
});
