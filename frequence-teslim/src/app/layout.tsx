import type { Metadata } from "next";
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  getDefaultMetadata,
} from "@/lib/seo/metadata";
import "./globals.css";

/*
 * Fontlar kendi sunucumuzda (public/fonts, latin + latin-ext alt kümeleri)
 * ve globals.css'teki @font-face kurallarıyla, unicode-range ile yüklenir —
 * dış istek yok. FREQUENCE kimliği: dar poster grotesk (Big Shoulders
 * Display) başlıklar, Instrument Sans gövde, IBM Plex Mono künye.
 */

export const metadata: Metadata = {
  ...getDefaultMetadata(),
  title: {
    default: "FREQUENCE",
    template: "%s · FREQUENCE",
  },
};

/*
 * Kök kabuk yalnızca belge iskeletini taşır (JSON-LD, body). Header/footer
 * `(marketing)` grubundadır.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationJsonLd = buildOrganizationJsonLd();
  const webSiteJsonLd = buildWebSiteJsonLd();

  return (
    <html
      lang="tr"
      /* globals.css'te scroll-behavior: smooth var; Next.js 16 SPA
         geçişlerinde bunu artık kendisi ele almıyor — override davranışı
         bu öznitelikle geri açılır. */
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
        {children}
      </body>
    </html>
  );
}
