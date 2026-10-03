import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

/**
 * Kök 404 — grup yerleşimleri devreye girmez (not-found sınırı kökte
 * çözülür), bu yüzden pazarlama çerçevesini kendi taşıyor.
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10 flex-1 bg-background">
        <div className="container-site flex min-h-[50vh] flex-col justify-center py-20">
          <p className="meta text-muted">404</p>
          <h1 className="display-lg mt-4 max-w-[16ch]">Bu sayfa burada değil.</h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.55] text-muted">
            Aradığınız adres taşınmış veya hiç var olmamış olabilir. Aşağıdaki
            bağlantılardan devam edebilirsiniz.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/">Ana sayfa</Button>
            <Button href="/hizmetler" variant="outline">
              Hizmetleri incele
            </Button>
          </div>
          <p className="meta-sm mt-8 text-muted">
            veya{" "}
            <Link href="/iletisim" className="text-primary-soft hover:underline">
              bizimle iletişime geçin
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
