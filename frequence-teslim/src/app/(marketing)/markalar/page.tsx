import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PageCta } from "@/components/layout/PageCta";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ctaLinks } from "@/content/navigation";
import { processSteps } from "@/content/process";
import { faqs } from "@/content/faqs";
import { whyFrequence } from "@/content/why-frequence";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Markalar için creator marketing",
  description:
    "FREQUENCE markalar için creator seçimi, kampanya yönetimi ve ölçülebilir raporlama sunar. Brief’ten rapora tek hat.",
  path: "/markalar",
});

export default function MarkalarPage() {
  const brandFaqs = faqs.filter((f) => f.audience === "brand" || f.audience === "both");

  return (
    <>
      <PageHero
        eyebrow="Markalar"
        title="Markalar için"
        description="Stratejiden rapora tek ekip. Takipçi sayısından önce uyum, trend vaadinden önce ölçülebilir sonuç."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={ctaLinks.campaignStart} size="lg">
            Kampanya Başlat
          </Button>
          <Button href={ctaLinks.howItWorks} variant="outline" size="lg">
            Nasıl Çalışıyoruz?
          </Button>
        </div>
      </PageHero>

      <Section
        eyebrow="marka tarafında"
        title="Karar, yayın ve rapor tek yerde"
      >
        <div className="grid gap-8 md:grid-cols-2">
          {whyFrequence.map((item, i) => (
            <article key={item.title} className="border-t border-border pt-6">
              <p className="meta text-primary-soft">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-display text-xl font-extrabold tracking-[-0.005em] md:text-2xl">
                {item.title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="pale" eyebrow="süreç" title="Brief’ten rapora">
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <li key={step.number}>
              <p className="meta text-primary-strong">
                {step.number}
              </p>
              <h3 className="mt-2 font-display text-lg font-extrabold tracking-[-0.005em] text-on-light">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-on-light-muted">
                {step.brandNote}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        tone="elevated"
        container="narrow"
        eyebrow="sss"
        title="Markaların sorduğu"
      >
        <FaqAccordion items={brandFaqs} />
      </Section>

      <PageCta
        title="Brief’ini gönder."
        description="Hedefi, tarihi ve kampanya tipini paylaş; kapsamı birlikte çıkaralım."
      />
    </>
  );
}
