import { PageCta } from "@/components/layout/PageCta";

export function FinalCta() {
  return (
    <div data-testid="final-cta">
      <PageCta
        title="Çıkış tarihin belli mi?"
        description="Şarkıyı, tarihi ve hedefi yaz. Hangi creator’larla, hangi takvimle ilerleyeceğimizi birlikte çıkaralım."
        secondaryLabel="Bizimle iletişime geç"
        secondaryHref="/iletisim"
      />
    </div>
  );
}
