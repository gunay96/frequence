# FREQUENCE Web

FREQUENCE'ın pazarlama sitesi: müzik çıkışları ve markalar için TikTok creator
kampanyaları.

**Domain:** [onfrequence.co](https://onfrequence.co)

## Teknoloji

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS v4
- Zod · Vitest

## Kurulum

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresinde açılır.

## Yayından önce doldurulacaklar

| Ne | Nerede |
|----|--------|
| İletişim e-postası (`CONTACT_EMAIL`) | `src/lib/config/urls.ts` |
| KVKK veri sorumlusu (`DATA_CONTROLLER`) | `src/lib/config/urls.ts` — köşeli parantezli yer tutucu sitede görünür |
| Yasal metinlerin hukuki kontrolü | `src/app/(marketing)/gizlilik`, `kullanim-kosullari`, `cerez-politikasi` |
| Form backend'i (isteğe bağlı) | `docs/forms.md` |

## Ortam değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_SITE_URL` | Site kökeni (varsayılan `https://onfrequence.co`) |
| `FORM_SUBMISSION_PROVIDER` | `none` (varsayılan, formlar kapalı) veya `webhook` |
| `FORM_WEBHOOK_URL` | `webhook` seçiliyse gönderim adresi |
| `FORM_WEBHOOK_SECRET` | İsteğe bağlı; `Authorization: Bearer` olarak gider |

Örnek: `.env.example`.

## Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production build |
| `npm run start` | Build'i sunar |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest |

## Dokümanlar

- [Tasarım sistemi](docs/design-system.md)
- [Formlar](docs/forms.md)
- [SEO](docs/seo.md)

## Yayın (Vercel)

1. Kendi Vercel hesabında projeyi oluştur (`npx vercel` veya repo bağlayarak)
2. Ortam değişkenlerini gir
3. `onfrequence.co` domainini projeye ekle, DNS kayıtlarını Vercel'in gösterdiği şekilde gir
4. `/sitemap.xml`, iletişim ve yasal sayfaları kontrol et
