import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { BrandInquiryForm } from "@/components/forms/BrandInquiryForm";
import { ctaLinks } from "@/content/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Kampanya Başlat",
  description:
    "FREQUENCE marka kampanya talebi formu. Hedef, zamanlama ve brief’inizi paylaşın; ekibimiz sizinle iletişime geçsin.",
  path: "/marka-iletisim",
});

const briefSteps = [
  {
    n: "01",
    title: "Brief’i paylaşın",
    text: "Hedef, zamanlama ve kampanya tipinizi yazın.",
  },
  {
    n: "02",
    title: "Kapsamı netleştiririz",
    text: "Strateji, creator yaklaşımı ve operasyon çerçevesini konuşuruz.",
  },
  {
    n: "03",
    title: "Süreci başlatırız",
    text: "Uygunsa brief’ten seçime ve yayına ilerleriz.",
  },
] as const;

export default function MarkaIletisimPage() {
  return (
    <>
      <PageHero
        eyebrow="Markalar · Kampanya Başlat"
        title="Brief gönder"
        description="Şarkıyı ya da ürünü, çıkış tarihini ve hedefi paylaş. Dönüşü bu bilgilerle, doğru bağlamda yapıyoruz."
        tone="steel"
      />

      <section className="border-b border-border bg-surface py-8 md:py-10">
        <div className="container-site grid gap-6 md:grid-cols-3">
          {briefSteps.map((step) => (
            <div key={step.n} className="flex gap-3">
              <span className="meta text-primary-soft">
                {step.n}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-muted">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Section container="narrow">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-xl font-extrabold tracking-[-0.005em] md:text-2xl">
            Kampanya talep formu
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Zorunlu alanlar yeterli; bütçe ve telefon opsiyoneldir. Süreç
            hakkında daha fazla bilgi için{" "}
            <Link
              href={ctaLinks.howItWorks}
              className="text-primary-soft hover:underline"
            >
              Nasıl Çalışır
            </Link>
            .
          </p>
        </div>
        <BrandInquiryForm />
      </Section>
    </>
  );
}
