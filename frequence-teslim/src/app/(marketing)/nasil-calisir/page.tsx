import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PageCta } from "@/components/layout/PageCta";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ProcessFlow } from "@/components/process/ProcessFlow";
import { ctaLinks } from "@/content/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Nasıl çalışır",
  description:
    "FREQUENCE kampanya süreci: brief, strateji, creator seçimi, içerik ve yayın, takip, raporlama — marka ve operasyon aynı hatta.",
  path: "/nasil-calisir",
});

export default function NasilCalisirPage() {
  return (
    <>
      <PageHero
        eyebrow="Nasıl çalışır"
        title="Nasıl çalışıyoruz"
        description="Altı adım, tek hat. Her adımda senden ne aldığımız, bizim ne yaptığımız ve elinde ne kaldığı açıkça yazıyor."
        tone="steel"
      >
        <div className="flex flex-wrap gap-3">
          <Button href={ctaLinks.campaignStart}>Kampanya Başlat</Button>
          <Button href="/hizmetler" variant="outline">
            Hizmetleri İncele
          </Button>
        </div>
      </PageHero>

      <section className="section-y"><div className="container-site"><ProcessFlow detailed /></div></section>

      <Section tone="elevated" container="site" className="!py-20 md:!py-28">
        <div className="scene-reveal grid gap-8 border-y border-border py-10 md:grid-cols-[1.25fr_0.75fr] md:items-end md:py-14">
        <p className="max-w-[16ch] font-display font-extrabold tracking-[-0.005em] text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Marka da creator da aynı sayfaya bakar.
        </p>
        <p className="max-w-lg text-sm leading-relaxed text-muted md:text-base">
          Yayın bitiş değil. Sesin kullanımını takip etmek ve raporlamak
          sürecin parçası; ölçüm, kampanyanın devamı.
        </p>
        </div>
      </Section>

      <PageCta
        title="İlk adım: brief."
        description="Hedefi ve tarihi paylaş; gerisi bu sayfadaki akışla ilerler."
      />
    </>
  );
}
