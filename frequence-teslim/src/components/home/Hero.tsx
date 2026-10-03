import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { ctaLinks } from "@/content/navigation";
import { servicePillars } from "@/content/service-pillars";

/**
 * Ana sayfa — tek iddia, iki kapı, ardından ne yaptığımızın kısa listesi.
 * Arka plan efekti, kart ızgarası, uydurma rakam yok; kampanya sonuçları
 * gerçek çalışmalar yayınlandığında ayrı bir bölüm olarak eklenir.
 */
export function Hero() {
  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="relative border-b border-border"
        data-testid="home-hero"
      >
        <div className="container-site pb-16 pt-28 md:pb-24 md:pt-36">
          <p className="meta flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
            <span className="inline-block size-2 bg-[var(--primary)]" aria-hidden />
            <span>frequence</span>
            <span aria-hidden>/</span>
            <span>müzik ve creator kampanyaları</span>
            <span aria-hidden>/</span>
            <span>istanbul</span>
          </p>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
            <h1 id="hero-heading" className="display-mega">
              Şarkın
              <br />
              duyulsun.
            </h1>
            <div className="max-w-md lg:pb-3">
              <p className="text-[1.0625rem] leading-[1.6] text-foreground/85 md:text-lg">
                Single, EP ve albüm çıkışları için TikTok creator kampanyaları
                kuruyoruz. Sesi doğru creator&apos;a veriyor, yayılımı takip
                ediyor, sonucu şeffaf şekilde raporluyoruz.
              </p>
              <div className="mt-8 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:items-center">
                <Button href={ctaLinks.campaignStart} size="lg">
                  Kampanya başlat
                </Button>
                <Link
                  href={ctaLinks.creatorApply}
                  className="inline-flex h-14 items-center gap-2 px-1 text-[0.95rem] font-semibold text-foreground underline decoration-[color-mix(in_srgb,currentColor_35%,transparent)] decoration-[1.5px] underline-offset-[6px] hover:decoration-[var(--primary)]"
                >
                  Creator olarak katıl <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-services-heading" className="section-y">
        <div className="container-site">
          <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">ne yapıyoruz</p>
              <h2 id="home-services-heading" className="display-lg mt-3">
                Çıkıştan rapora
              </h2>
            </div>
            <Link
              href="/hizmetler"
              className="meta text-muted underline decoration-[color-mix(in_srgb,currentColor_35%,transparent)] underline-offset-4 hover:text-foreground"
            >
              Tüm hizmetler →
            </Link>
          </div>
          <ol className="border-t border-border-strong" data-testid="home-services">
            {servicePillars.map((pillar) => (
              <li
                key={pillar.id}
                className="grid gap-3 border-b border-border py-6 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)] sm:gap-8"
              >
                <span className="meta-sm text-muted tabular-nums">{pillar.number}</span>
                <h3 className="font-display text-2xl font-bold uppercase leading-[1.1] sm:text-3xl">
                  {pillar.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-muted">{pillar.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
