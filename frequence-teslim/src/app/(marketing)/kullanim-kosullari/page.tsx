import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { CONTACT_EMAIL } from "@/lib/config/urls";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Kullanım koşulları",
  description: "FREQUENCE web sitesi kullanım koşulları.",
  path: "/kullanim-kosullari",
});

export default function KullanimKosullariPage() {
  return (
    <>
      <PageHero eyebrow="Yasal" title="Kullanım Koşulları" />

      <Section container="narrow">
        <div className="space-y-6 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              1. Kapsam
            </h2>
            <p className="mt-2">
              Bu koşullar onfrequence.co alan adındaki kurumsal web sitesinin
              kullanımına ilişkindir.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              2. Site içeriği
            </h2>
            <p className="mt-2">
              Sitedeki içerik bilgilendirme amaçlıdır; kampanya sonuçlarına
              ilişkin bir garanti veya taahhüt oluşturmaz.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              3. Başvuru ve iletişim
            </h2>
            <p className="mt-2">
              Form gönderimi başvuru veya sözleşme teklifi oluşturmaz. FREQUENCE,
              uygun görmediği talepleri yanıtlamama hakkını saklı tutar.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              4. Fikri mülkiyet
            </h2>
            <p className="mt-2">
              Site tasarımı, metinleri ve marka unsurları FREQUENCE&apos;a aittir.
              İzinsiz kopyalama yasaktır.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              5. Sorumluluk sınırı
            </h2>
            <p className="mt-2">
              Site &quot;olduğu gibi&quot; sunulur. FREQUENCE, sitenin
              kesintisiz veya hatasız çalışacağını garanti etmez; geçici
              erişim kesintileri, üçüncü taraf bağlantılarının içeriği veya
              kullanılabilirliğinden doğabilecek zararlardan, kanunun
              zorunlu kıldığı ölçünün dışında sorumlu tutulamaz.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              6. İletişim
            </h2>
            <p className="mt-2">
              Bu koşullarla ilgili sorularınız için{" "}
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
