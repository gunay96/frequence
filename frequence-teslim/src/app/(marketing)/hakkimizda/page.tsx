import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PageCta } from "@/components/layout/PageCta";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { PremiumMarquee } from "@/components/interaction/PremiumMarquee";
import { SpotlightSurface } from "@/components/interaction/SpotlightSurface";
import { WhyFrequence } from "@/components/home/WhyFrequence";
import { ctaLinks } from "@/content/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Hakkımızda",
  description:
    "FREQUENCE; müzik çıkışları ve markalar için TikTok creator kampanyaları yürüten İstanbul merkezli bir ekip. Creator seçimi, yayın takibi ve doğrulanmış raporlama aynı yerde.",
  path: "/hakkimizda",
});

const principles = [
  {
    title: "Önce uyum",
    body: "Takipçi sayısından önce içerik dili ve şarkıyla uyum.",
  },
  {
    title: "Net brief",
    body: "İyi içerik, mesajın ve sınırların ne kadar net yazıldığıyla başlar.",
  },
  {
    title: "Görünür süreç",
    body: "Güven dağınık yazışmalardan değil, takip edilebilir bir akıştan gelir.",
  },
  {
    title: "Dürüst rakam",
    body: "Sonuç paylaşılabilir ve anlaşılır olmalı. Abartı değil, doğrulanmış veri.",
  },
] as const;

export default function HakkimizdaPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title="Şarkıyla creator arasındaki hat"
        description="FREQUENCE, müzik çıkışları ve markalar için TikTok creator kampanyaları yürütür: creator seçimi, yayın takibi ve doğrulanmış raporlama aynı ekipte."
        tone="steel"
      >
        <div className="flex flex-wrap gap-3">
          <Button href={ctaLinks.campaignStart}>Kampanya Başlat</Button>
          <Button href={ctaLinks.howItWorks} variant="outline">
            Nasıl Çalışıyoruz?
          </Button>
        </div>
      </PageHero>

      <section className="section-y relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-10 top-10 select-none font-display font-extrabold tracking-[-0.005em] text-[clamp(5rem,20vw,14rem)] leading-none text-primary/5"
          aria-hidden
        >
          FQ
        </div>
        <div className="manifesto-reveal container-site relative grid gap-16 lg:grid-cols-[1.35fr_0.65fr] lg:gap-24">
          <div>
            <p className="eyebrow text-primary-soft">neden varız</p>
            <h2 className="mt-5 max-w-[15ch] text-balance font-display font-extrabold tracking-[-0.005em] text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">
              İyi bir şarkı, doğru creator’a ulaşmadığında sessiz kalır.
            </h2>
          </div>
          <div className="space-y-8 border-l border-border pl-6 text-sm leading-relaxed text-muted md:text-base lg:mt-24 lg:pl-8">
            <p>
              Çıkış haftası kısa, creator listesi uzun. Seçim, onay, yayın
              takvimi ve rapor ayrı ayrı yürüyünce zaman kaybolur, uyum
              zayıflar, sonuç geç ve dağınık gelir.
            </p>
            <p>
              FREQUENCE bu parçaları tek ekipte topluyor. Önce TikTok: kısa
              video kültürü, ses kullanımı ve creator formatları etrafında
              çalışıyoruz. Trend garantisi yok, ölçülebilir yön var.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-label="Ses, creator, yayılım, kültür, takip, ölçüm"
        className="relative overflow-hidden border-y border-border bg-surface"
      >
        <div className="py-8 md:py-12"><PremiumMarquee items={["SES", "CREATOR", "YAYILIM", "KÜLTÜR", "TAKİP", "ÖLÇÜM"]} className="py-4 [&_span]:text-4xl sm:[&_span]:text-6xl" /></div>
      </section>

      <WhyFrequence />

      <Section className="overflow-hidden" tone="light" eyebrow="ilkeler" title="Vazgeçmediklerimiz">
        <ul className="divide-y divide-border-light border-y border-border-light">
          {principles.map((item, i) => (
            <li key={item.title}><SpotlightSurface className="scene-reveal grid gap-5 py-10 sm:grid-cols-[7rem_1fr] sm:py-14">
              <p className="font-display font-extrabold tracking-[-0.005em] text-7xl leading-none text-primary-strong/35">
                0{i + 1}
              </p>
              <div><h3 className="font-display font-extrabold tracking-[-0.005em] text-4xl text-on-light sm:text-5xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-on-light-muted">
                {item.body}
              </p></div>
            </SpotlightSurface></li>
          ))}
        </ul>
      </Section>

      <Section container="narrow">
        <p className="text-sm leading-relaxed text-muted md:text-base">
          Bu site marka ve creator tarafı için bilgi, başvuru ve iletişim
          kanalıdır.
        </p>
        <p className="mt-4 text-sm text-muted">
          Ekip sayısı, “pazar lideri” gibi iddialar yazmıyoruz. Güveni net
          süreç ve şeffaf ölçümle kuruyoruz.
        </p>
      </Section>

      <PageCta
        title="Tanışmak için bir brief yeter."
        description="Şarkıyı ve hedefi paylaş, gerisini birlikte netleştirelim."
        secondaryLabel="Bizimle İletişime Geç"
        secondaryHref={ctaLinks.contact}
      />
    </>
  );
}
