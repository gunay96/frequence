import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { CONTACT_EMAIL } from "@/lib/config/urls";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Çerez politikası",
  description: "FREQUENCE çerez politikası.",
  path: "/cerez-politikasi",
});

export default function CerezPolitikasiPage() {
  return (
    <>
      <PageHero eyebrow="Yasal" title="Çerez Politikası" />

      <Section container="narrow">
        <div className="space-y-6 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              1. Çerez nedir?
            </h2>
            <p className="mt-2">
              Çerezler, web sitesini ziyaret ettiğinizde cihazınıza kaydedilen
              küçük metin dosyalarıdır.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              2. Kullandığımız çerezler
            </h2>
            <p className="mt-2">
              Şu an analitik sağlayıcı devre dışıdır (no-op). Onay ve ölçüm
              altyapısı etkinleştirildiğinde bu politika güncellenecektir.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              3. Zorunlu çerezler
            </h2>
            <p className="mt-2">
              Sitenin temel işlevleri için gerekli oturum ve güvenlik çerezleri
              kullanılabilir.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              4. Tercihleriniz
            </h2>
            <p className="mt-2">
              Tarayıcı ayarlarınızdan çerezleri yönetebilir veya
              silebilirsiniz. Analitik veya pazarlama amaçlı çerezler ileride
              devreye alınırsa, bu politika güncellenecek ve gerekli onay
              mekanizması eklenecektir.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              5. İletişim
            </h2>
            <p className="mt-2">
              Sorularınız için{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary-soft underline hover:text-primary"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              adresinden bize ulaşabilirsiniz.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
