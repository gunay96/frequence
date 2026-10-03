import { Button } from "@/components/ui/Button";
import { ctaLinks } from "@/content/navigation";

type PageCtaProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** brand = campaign primary; creator = application-forward */
  tone?: "brand" | "creator" | "neutral";
};

/**
 * Shared closing CTA — intentional hierarchy, not every-section buttons.
 */
export function PageCta({
  eyebrow = "bir sonraki adım",
  title,
  description,
  primaryLabel = "Kampanya başlat",
  primaryHref = ctaLinks.campaignStart,
  secondaryLabel,
  secondaryHref,
  tone = "brand",
}: PageCtaProps) {
  const secondary =
    secondaryLabel && secondaryHref
      ? { label: secondaryLabel, href: secondaryHref }
      : tone === "creator"
        ? { label: "Nasıl çalışıyoruz?", href: ctaLinks.howItWorks }
        : tone === "neutral"
          ? { label: "Bizimle iletişime geç", href: ctaLinks.contact }
          : { label: "Nasıl çalışıyoruz?", href: ctaLinks.howItWorks };

  return (
    <section
      aria-labelledby="page-cta-heading"
      className="border-t border-border-strong"
      data-testid="page-cta"
    >
      <div className="container-site relative grid gap-10 py-16 md:py-24 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="page-cta-heading" className="display-lg mt-5 max-w-[14ch]">{title}</h2>
          {description ? <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.55] text-muted">{description}</p> : null}
        </div>
        <div className="flex flex-col items-stretch gap-3 min-[430px]:flex-row lg:justify-end">
          <Button href={primaryHref} size="lg" movingBorder>
            {primaryLabel}
          </Button>
          <Button href={secondary.href} variant="outline" size="lg">
            {secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
