import { z } from "zod";

const tiktokUrlSchema = z
  .string()
  .trim()
  .min(1, "TikTok profil linki gerekli.")
  .url("Geçerli bir URL girin.")
  .refine(
    (value) => {
      try {
        const host = new URL(value).hostname.replace(/^www\./, "");
        return (
          host === "tiktok.com" ||
          host.endsWith(".tiktok.com") ||
          host === "vm.tiktok.com"
        );
      } catch {
        return false;
      }
    },
    { message: "TikTok profil veya video linki olmalı." }
  );

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v && v.length > 0 ? v : undefined))
  .pipe(z.string().url("Geçerli bir URL girin.").optional());

export const creatorApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı."),
  email: z.string().trim().email("Geçerli bir e-posta girin."),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  tiktokUrl: tiktokUrlSchema,
  instagramUrl: optionalUrl,
  category: z.string().trim().min(1, "İçerik kategorisi seçin."),
  followerRange: z.string().trim().min(1, "Takipçi aralığı seçin."),
  city: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  bio: z
    .string()
    .trim()
    .min(20, "Kısa tanıtım en az 20 karakter olmalı.")
    .max(800, "Kısa tanıtım en fazla 800 karakter olabilir."),
  consent: z.literal(true, {
    error: "Gizlilik onayı gerekli.",
  }),
  website: z.string().optional(),
});

export const brandInquirySchema = z.object({
  fullName: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı."),
  company: z.string().trim().min(2, "Şirket adı gerekli."),
  workEmail: z.string().trim().email("Geçerli bir iş e-postası girin."),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  campaignType: z.string().trim().min(1, "Kampanya tipi seçin."),
  targetPlatform: z.string().trim().min(1, "Hedef platform seçin."),
  budget: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  timing: z.string().trim().min(1, "Zamanlama bilgisi gerekli."),
  message: z
    .string()
    .trim()
    .min(20, "Mesaj en az 20 karakter olmalı.")
    .max(2000, "Mesaj en fazla 2000 karakter olabilir."),
  consent: z.literal(true, {
    error: "Gizlilik onayı gerekli.",
  }),
  website: z.string().optional(),
});

export type CreatorApplicationInput = z.infer<typeof creatorApplicationSchema>;
export type BrandInquiryInput = z.infer<typeof brandInquirySchema>;

export const CREATOR_CATEGORIES = [
  "Müzik",
  "Dans",
  "Komedi",
  "Lifestyle",
  "Güzellik",
  "Yemek",
  "Oyun",
  "Eğitim",
  "Diğer",
] as const;

export const FOLLOWER_RANGES = [
  "1K–10K",
  "10K–50K",
  "50K–100K",
  "100K–500K",
  "500K+",
] as const;

export const CAMPAIGN_TYPES = [
  "Farkındalık",
  "Ürün lansmanı",
  "Müzik / sound",
  "Creator seeding",
  "Sosyal içerik",
  "Performans odaklı",
  "Diğer",
] as const;

export const TARGET_PLATFORMS = [
  "TikTok",
  "TikTok + Instagram",
  "Çoklu platform",
] as const;

export const BUDGET_RANGES = [
  "Henüz net değil",
  "50K TL altı",
  "50–100K TL",
  "100–250K TL",
  "250–500K TL",
  "500K TL+",
] as const;
