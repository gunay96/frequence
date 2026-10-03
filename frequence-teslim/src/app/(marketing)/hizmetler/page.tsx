import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { PageCta } from "@/components/layout/PageCta";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { PremiumMarquee } from "@/components/interaction/PremiumMarquee";
import { SpotlightSurface } from "@/components/interaction/SpotlightSurface";
import { ServicesScrollStory } from "@/components/services/ServicesScrollStory";
import { ctaLinks } from "@/content/navigation";
import {
  serviceModules,
  servicePillars,
} from "@/content/service-pillars";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Hizmetler",
  description:
    "FREQUENCE creator marketing hizmetleri: TikTok influencer marketing, influencer kampanya yönetimi, müzik pazarlaması ve TikTok ses kampanyaları, creator seçimi, ölçümleme ve şeffaf raporlama.",
  path: "/hizmetler",
});

export default function HizmetlerPage() {
  return (
    <>
      <PageHero
        eyebrow="Hizmetler"
        title="Çıkıştan rapora"
        description="Strateji, creator seçimi, yayın operasyonu ve raporlama tek ekipte. Her aşama elinde somut bir çıktı bırakır."
        tone="steel"
      >
        <div className="flex flex-wrap gap-3">
          <Button href={ctaLinks.campaignStart}>Kampanya Başlat</Button>
          <Button href={ctaLinks.howItWorks} variant="outline">
            Nasıl Çalışıyoruz?
          </Button>
        </div>
      </PageHero>

      <section className="border-b border-border bg-surface py-10 md:py-12">
        <PremiumMarquee items={servicePillars.map((pillar) => pillar.title)} className="py-2 [&_span]:text-2xl sm:[&_span]:text-4xl" />
      </section>

      <ServicesScrollStory />

      <Section
        tone="elevated"
        className="services-support-reveal"
        eyebrow="ölçüm"
        title="Yayın bitiş değil."
        description="İçerik performansı, creator kıyası, kampanyanın büyümesi ve gerektiğinde ses kullanımı aynı raporda."
      >
        <div className="divide-y divide-border border-y border-border">{["İçerik performansı", "Creator karşılaştırması", "Kampanya görünürlüğü", "Paylaşılabilir raporlama"].map((label, index) => <SpotlightSurface key={label} className="services-support-row grid gap-4 py-9 sm:grid-cols-[6rem_1fr] sm:py-11"><span className="meta text-[var(--primary-soft)]">0{index + 1}</span><p className="font-display font-extrabold tracking-[-0.005em] text-3xl sm:text-4xl">{label}</p></SpotlightSurface>)}</div>
        <p className="mt-8 text-sm text-muted">
          Süreç adımlarını görmek için{" "}
          <Link
            href={ctaLinks.howItWorks}
            className="text-primary-soft hover:underline"
          >
            Nasıl Çalışır
          </Link>{" "}
          sayfasına bakın.
        </p>
      </Section>

      <Section className="services-support-reveal" tone="steel" eyebrow="ek katmanlar" title="Kampanyaya göre eklenenler">
        <ul className="divide-y divide-border-strong border-y border-border-strong">
          {serviceModules.map((mod) => (
            <li key={mod.id} className="services-support-row grid gap-5 py-10 sm:grid-cols-[0.8fr_1.2fr] sm:py-12">
              <h3 className="font-display font-extrabold tracking-[-0.005em] text-3xl sm:text-4xl">{mod.title}</h3>
              <p className="max-w-xl text-sm leading-relaxed text-muted">{mod.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <div className="services-final-cta">
        <PageCta
          title="Hangi hizmet sana lazım, birlikte bakalım."
          description="Hedefi ve tarihi paylaş; kapsamı brief üzerinden netleştirelim."
        />
      </div>
    </>
  );
}
