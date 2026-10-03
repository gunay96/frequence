import Link from "next/link";
import { footerNav, ctaLinks } from "@/content/navigation";
import { SITE_NAME } from "@/lib/config/urls";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="cinematic-footer relative z-0 flex overflow-hidden border-t border-border bg-[var(--surface)] md:items-end">
      <div className="container-site section-y relative w-full">
        <div className="mb-12 grid gap-8">
          <div>
            <p
              className="cinematic-footer__brand display-mega block max-w-full overflow-hidden leading-[0.8] text-foreground opacity-[0.07]"
              aria-hidden
            >
              FREQUENCE
            </p>
            <p className="cinematic-footer__content mt-8 max-w-2xl text-[1.15rem] leading-snug text-foreground/90 md:text-[1.6rem]">
              Şarkıları doğru creator’larla buluşturan TikTok kampanya
              ekibi. Çıkıştan rapora.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link
              href={ctaLinks.campaignStart}
              className="meta text-[var(--primary-soft)] hover:underline"
            >
              kampanya başlat →
            </Link>
            <Link
              href={ctaLinks.creatorApply}
              className="meta text-muted hover:text-[var(--primary-soft)]"
            >
              creator başvurusu →
            </Link>
          </div>
        </div>

        <div className="cinematic-footer__content grid gap-10 border-t border-border pt-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <p className="font-display text-lg font-extrabold tracking-[-0.005em]">
              FREQUENCE
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Creator seçimi, yayın takibi ve doğrulanmış raporlama; tek
              ekipte.
            </p>
          </div>

          <FooterGroup title="şirket" items={footerNav.company} />
          <FooterGroup title="keşfet" items={footerNav.solutions} />
          <FooterGroup title="kaynaklar" items={footerNav.resources} />
          <div>
            <p className="meta-sm text-muted">
              yasal
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/90 transition-colors hover:text-primary-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="meta-sm mt-14 flex flex-col gap-2 border-t border-border pt-6 text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE_NAME} · tüm hakları saklıdır
          </p>
          <p>creator marketing · kampanya · ölçümleme</p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="meta-sm text-muted">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-foreground/90 transition-colors hover:text-primary-soft"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
