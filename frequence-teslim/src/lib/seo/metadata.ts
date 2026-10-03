import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "@/lib/config/urls";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  /**
   * Ana sayfa başlığı markanın kendisiyle başlar ve şablona sokulmaz:
   * Google'da `FREQUENCE - TikTok & Influencer Marketing` şeklinde
   * tek satır görünür, sonuna `· FREQUENCE` eklenmez.
   */
  titleAbsolute?: boolean;
};

/**
 * Paylaşım görseli: `public/og.png` sabit dosya; tüm sayfalarda mutlak
 * URL ile verilir.
 */
const OG_IMAGE = {
  url: absoluteUrl("/og.png"),
  width: 1200,
  height: 630,
  alt: "FREQUENCE — creator marketing stüdyosu",
};

export function createPageMetadata(options: PageMetadataOptions): Metadata {
  const { title, description, path, noIndex, titleAbsolute } = options;
  const canonical = absoluteUrl(path);
  const fullTitle = titleAbsolute ? title : `${title} · ${SITE_NAME}`;

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "tr_TR",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}

export function getDefaultMetadata(): Metadata {
  return createPageMetadata({
    title: "FREQUENCE - TikTok & Influencer Marketing",
    titleAbsolute: true,
    description:
      "FREQUENCE; TikTok influencer marketing, müzik pazarlaması ve creator kampanyaları yürütür. Doğru creator seçimi, kampanya yönetimi ve şeffaf raporlama tek elden.",
    path: "/",
  });
}

/**
 * Organization özetini yalnızca depoda doğrulanmış alanlarla taşır:
 * ad, açıklama, kanonik URL ve gerçek var olan marka logosu. Adres,
 * telefon, kuruluş tarihi, ödül veya sosyal medya profili uydurulmaz.
 */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "onfrequence.co",
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon-96.png"),
      width: 96,
      height: 96,
    },
    description:
      "Markaları doğru içerik üreticileriyle buluşturan creator marketing operasyonu. Seçim, kampanya yönetimi ve raporlama.",
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: ["onfrequence.co", "FREQUENCE", "frequence"],
    url: absoluteUrl("/"),
    inLanguage: "tr-TR",
    publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
  };
}
