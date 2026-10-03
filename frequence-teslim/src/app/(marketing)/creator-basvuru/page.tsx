import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { CreatorApplicationForm } from "@/components/forms/CreatorApplicationForm";
import { ctaLinks } from "@/content/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Creator başvurusu",
  description:
    "FREQUENCE creator başvuru formu. TikTok odaklı içerik üreticileri için; kabul garanti değildir.",
  path: "/creator-basvuru",
});

export default function CreatorBasvuruPage() {
  return (
    <>
      <PageHero
        eyebrow="Creatorlar"
        title="Sesi sen taşı"
        description="TikTok’ta içerik üreten creator’lar için başvuru formu. Her başvuruyu kampanya bağlamına ve içerik diline göre değerlendiriyoruz; kabul garanti değil."
      />

      <section className="border-b border-border bg-surface-steel py-8">
        <div className="container-site grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Fit önemli",
              text: "Takipçi sayısından önce içerik dili ve kampanya uyumu.",
            },
            {
              title: "Kabul garanti değil",
              text: "Başvuru değerlendirme başlangıcıdır; her başvuru kampanyaya dönüşmez.",
            },
            {
              title: "Marka yolu ayrı",
              text: "Kampanya talepleri için marka formunu kullanın.",
            },
          ].map((item) => (
            <div key={item.title}>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-1.5 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Section container="narrow">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-xl font-extrabold tracking-[-0.005em] md:text-2xl">
            Başvuru formu
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Marka kampanyası başlatmak istiyorsanız{" "}
            <Link
              href={ctaLinks.campaignStart}
              className="text-primary-soft hover:underline"
            >
              Kampanya Başlat
            </Link>{" "}
            formunu kullanın.
          </p>
        </div>
        <CreatorApplicationForm />
      </Section>
    </>
  );
}
