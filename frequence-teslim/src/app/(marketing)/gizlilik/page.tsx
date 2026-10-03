import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { CONTACT_EMAIL, DATA_CONTROLLER } from "@/lib/config/urls";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Gizlilik politikası",
  description: "FREQUENCE gizlilik politikası.",
  path: "/gizlilik",
});

export default function GizlilikPage() {
  return (
    <>
      <PageHero eyebrow="Yasal" title="Gizlilik Politikası" />

      <Section container="narrow">
        <div className="prose-legal space-y-6 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              1. Veri sorumlusu
            </h2>
            <p className="mt-2">
              Bu web sitesi ve formlar aracılığıyla toplanan kişisel verilerin
              işlenmesi bakımından veri sorumlusu{" "}
              <strong className="text-foreground">{DATA_CONTROLLER}</strong>
              &apos;dir.
              Kişisel verilerinize ilişkin sorularınız için{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary-soft underline hover:text-primary"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              adresinden bize ulaşabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              2. Toplanan veriler
            </h2>
            <p className="mt-2">
              Creator başvuru ve marka iletişim formları aracılığıyla ad soyad,
              e-posta, telefon, sosyal medya profil linkleri, kampanya detayları
              ve benzeri bilgiler toplanabilir.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              3. İşleme amaçları
            </h2>
            <p className="mt-2">
              Veriler; başvuru değerlendirme, kampanya talebi yanıtlama, operasyon
              koordinasyonu ve yasal yükümlülüklerin yerine getirilmesi amacıyla
              işlenebilir.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              4. Saklama ve güvenlik
            </h2>
            <p className="mt-2">
              Veriler, işlenme amacı için gerekli süre boyunca saklanır ve bu
              sürenin sonunda silinir veya anonim hale getirilir. Verilerin
              yetkisiz erişime karşı korunması için makul teknik ve idari
              güvenlik önlemleri alınır.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">
              5. Haklarınız
            </h2>
            <p className="mt-2">
              6698 sayılı KVKK&apos;nın 11. maddesi kapsamında; verilerinizin
              işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi
              talep etme, işlenme amacına uygun kullanılıp kullanılmadığını
              öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme,
              işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde
              silinmesini/yok edilmesini isteme ve bu haklarınızın kullanımı
              için{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary-soft underline hover:text-primary"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              adresine yazılı olarak başvurma hakkınız bulunmaktadır. Talebiniz
              en kısa sürede ve en geç otuz gün içinde sonuçlandırılır.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
