import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ctaLinks } from "@/content/navigation";
import { processSteps } from "@/content/process";
import { faqs } from "@/content/faqs";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Creatorlar için iş birlikleri",
  description:
    "FREQUENCE creator başvurusu. TikTok odaklı içerik üreticileri için kampanya iş birlikleri. Kabul garanti değildir.",
  path: "/creatorlar",
});

export default function CreatorlarPage() {
  const creatorFaqs = faqs.filter(
    (f) => f.audience === "creator" || f.audience === "both"
  );

  return (
    <>
      <PageHero
        eyebrow="Creatorlar"
        title="Creator’lar için"
        description="Şarkıyı kendi formatında yorumlayan creator’larla çalışıyoruz. Önce TikTok. Başvuru sürecin ilk adımı; kabul garanti değil."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={ctaLinks.creatorApply} size="lg">
            Creator Başvurusu
          </Button>
          <Button href={ctaLinks.howItWorks} variant="outline" size="lg">
            Nasıl Çalışıyoruz?
          </Button>
        </div>
      </PageHero>

      <Section tone="light" eyebrow="kimler için" title="Kimleri arıyoruz">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            {
              title: "TikTok odaklı üretim",
              body: "Kısa video formatında tanınabilir bir içerik diliniz olmalı.",
            },
            {
              title: "Kategori netliği",
              body: "Müzik, dans, lifestyle, komedi gibi net bir içerik alanınız olmalı.",
            },
            {
              title: "Brief uyumu",
              body: "Kampanya mesajını kendi formatınıza uyarlayabilecek esneklik.",
            },
          ].map((item, i) => (
            <article key={item.title}>
              <p className="meta text-[var(--primary-soft)]">
                0{i + 1}
              </p>
              <h2 className="mt-2 font-display text-xl font-extrabold tracking-[-0.005em] text-on-light">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-on-light-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        tone="elevated"
        eyebrow="creator tarafında"
        title="Net brief, belli tarih"
      >
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <li key={step.number} className="border-t border-border pt-5">
              <p className="meta text-primary-soft">
                {step.number}
              </p>
              <h3 className="mt-2 font-display text-lg font-extrabold tracking-[-0.005em]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.creatorNote}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section container="narrow" eyebrow="sss" title="Creator’ların sorduğu">
        <FaqAccordion items={creatorFaqs} />
        <p className="mt-10 text-sm text-muted">
          Marka kampanyası başlatmak istiyorsanız{" "}
          <Link
            href={ctaLinks.campaignStart}
            className="text-primary-soft hover:underline"
          >
            Kampanya Başlat
          </Link>{" "}
          formunu kullanın.
        </p>
      </Section>
    </>
  );
}
