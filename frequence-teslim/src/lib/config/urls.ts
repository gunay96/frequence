/**
 * Central domain configuration. Never derive canonical URLs from Host headers.
 */

function readPublicOrigin(
  value: string | undefined,
  fallback: string
): string {
  const candidate = (value ?? fallback).trim();
  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return fallback;
    }
    return url.origin;
  } catch {
    return fallback;
  }
}

export const SITE_NAME = "FREQUENCE";

/**
 * Sitede görünen tek iletişim adresi (iletişim sayfası, yasal sayfalar,
 * form kapalıyken gösterilen mesaj). Yayından önce gerçek adresle doldurun.
 */
export const CONTACT_EMAIL = "iletisim@onfrequence.co";

/**
 * Yasal sayfalardaki veri sorumlusu (KVKK). Yayından önce şirket unvanı
 * veya şahıs adıyla doldurulmalı; köşeli parantez sitede görünür kalır.
 */
export const DATA_CONTROLLER = "[VERİ SORUMLUSU — AD SOYAD / ŞİRKET UNVANI]";

export function getSiteUrl(): string {
  return readPublicOrigin(
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://onfrequence.co"
  );
}

export function absoluteUrl(path = "/"): string {
  const origin = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized === "/" ? "" : normalized}`;
}

export function canonicalPath(path: string): string {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path.replace(/\/+$/, "") : `/${path}`;
}
