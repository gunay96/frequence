import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config/urls";

const staticPaths = [
  "/",
  "/markalar",
  "/creatorlar",
  "/hizmetler",
  "/nasil-calisir",
  "/hakkimizda",
  "/iletisim",
  "/marka-iletisim",
  "/creator-basvuru",
  "/gizlilik",
  "/kullanim-kosullari",
  "/cerez-politikasi",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
