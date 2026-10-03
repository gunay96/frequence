# FREQUENCE tasarım sistemi — "sinyal"

## Karakter

Müzik/ses odaklı, sade. Dekoratif efekt yerine tipografi ve boşlukla konuşur.
Uydurma dalga formu, animasyonlu equalizer, sahte rakam yok.

## Renk (`src/app/globals.css`)

| Token | Değer | Not |
|---|---|---|
| `--background` | `#0d0c0b` | sıcak grafit |
| `--foreground` | `#efe9df` | kemik beyazı |
| `--muted` | `#9a9187` | |
| `--primary` | `#f2a623` | tek vurgu: VU ibresi amberi |
| `--primary-soft` | `#f7bd52` | |
| `--primary-strong` | `#cc8410` | |

Vurgu yalnızca yapısal yerlerde: birincil CTA, aktif nav, başlık önündeki
sinyal karesi, odak halkası. Gradyan, glow, neon yok. Köşeler keskin (radius 0).

## Tipografi

Kendi sunucumuzda, `globals.css` içinde `@font-face` + `unicode-range`
(latin + latin-ext; Türkçe karakterler dahil). Lisanslar: SIL OFL.

- **Big Shoulders Display** — başlıklar. Dar poster grotesk; `display-mega` /
  `display-xl` büyük harf.
- **Instrument Sans** — gövde.
- **IBM Plex Mono** — künye, etiket, sayı altyazısı.

Dar font nedeniyle başlıklarda `leading` 0.9'un altına inme: Ş/Ç çengelleri
ve Ü/Ö noktaları kırpılır (`truncate` kullanan satırlarda `leading-[1.15]`).

## Ana sayfa

1. Tek iddia ("Şarkın duyulsun.") + iki kapı (Kampanya başlat / Creator olarak katıl)
2. Hizmet listesi (`src/content/service-pillars.ts`)
3. Kapanış CTA

Kampanya sonuçları/portfolyo henüz yok. Eklenecekse yalnızca doğrulanmış,
yayın izni olan işlerle ayrı bir bölüm olarak kurulmalı.
