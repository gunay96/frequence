import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ctaLinks } from "@/content/navigation";
import { CONTACT_EMAIL } from "@/lib/config/urls";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "İletişim",
  description:
    "FREQUENCE iletişim. Marka kampanya talepleri ve creator başvuruları ayrı formlardan ilerler.",
  path: "/iletisim",
});

export default function IletisimPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Frekansı bul"
        description="Kampanya talebi ve creator başvurusu için iki ayrı form var. Diğer her şey için e-posta yeterli."
      />

      <Section>
        <div className="grid gap-0 border-t border-border md:grid-cols-2">
          <article className="border-b border-border py-10 md:border-b-0 md:border-r md:px-10 md:py-14">
            <p className="eyebrow text-primary-soft">Markalar</p>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-[-0.005em] md:text-3xl">
              Kampanya brief’i
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
              Hedef, zamanlama ve kampanya tipinizi paylaşın. Strateji ve
              operasyon kapsamını birlikte netleştiririz.
            </p>
            <div className="mt-8">
              <Button href={ctaLinks.campaignStart}>Kampanya Başlat</Button>
            </div>
          </article>

          <article className="py-10 md:px-10 md:py-14">
            <p className="eyebrow">Creatorlar</p>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-[-0.005em] md:text-3xl">
              Creator başvurusu
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
              TikTok profiliniz ve içerik dilinizle başvurun. Kabul garanti
              değildir.
            </p>
            <div className="mt-8">
              <Button href={ctaLinks.creatorApply} variant="outline">
                Creator Başvurusu
              </Button>
            </div>
          </article>
        </div>
      </Section>

      <Section tone="elevated" container="narrow" className="!py-12">
        <h2 className="text-center font-display text-xl font-extrabold tracking-[-0.005em]">
          Genel iletişim
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-muted">
          Kampanya, iş birliği veya başvuru için ilgili formu kullanmanızı
          öneririz — ekibimiz oradan daha hızlı dönüş yapar. Genel sorular için{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary-soft underline hover:text-primary"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          adresine yazabilirsiniz.
        </p>
      </Section>
    </>
  );
}
