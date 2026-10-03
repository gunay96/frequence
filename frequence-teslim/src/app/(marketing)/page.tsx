import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FinalCta } from "@/components/home/FinalCta";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "FREQUENCE - TikTok & Influencer Marketing",
  titleAbsolute: true,
  description:
    "FREQUENCE; TikTok influencer marketing, müzik pazarlaması ve creator kampanyaları yürütür. Doğru creator seçimi, kampanya yönetimi ve şeffaf raporlama tek elden.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <FinalCta />
    </>
  );
}
