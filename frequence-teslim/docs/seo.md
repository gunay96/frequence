# SEO

## Metadata helper

`src/lib/seo/metadata.ts`:

- `createPageMetadata({ title, description, path })` — title, description, canonical, Open Graph, Twitter
- `getDefaultMetadata()` — homepage defaults
- `buildOrganizationJsonLd()` / `buildWebSiteJsonLd()` — injected in root layout

Title template in layout: **`%s · FREQUENCE`**

## Paylaşım görseli (OG)

`public/og.png` (1200×630) her sayfada `openGraph.images` ve `twitter.images`
olarak, mutlak URL ile verilir (`absoluteUrl("/og.png")`). Görsel statiktir.

## Canonical policy

```ts
import { absoluteUrl } from "@/lib/config/urls";
// canonical = absoluteUrl("/markalar")
```

Never use `headers().get("host")`.

## Sitemap

`src/app/sitemap.ts` — static marketing routes. Served at `/sitemap.xml`.

## Robots

`src/app/robots.ts` — allow all, sitemap URL via `absoluteUrl("/sitemap.xml")`.

## Structured data

Root layout includes Organization + WebSite JSON-LD with `inLanguage: "tr-TR"`.

## Testing

`src/app/seo.test.ts` verifies canonical URLs, sitemap entries, robots config
and the absolute share image against `NEXT_PUBLIC_SITE_URL`.
