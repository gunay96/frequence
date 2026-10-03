import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  tone?: "default" | "steel";
};

/**
 * Alt sayfa başlığı — iki kolon: solda büyük poster başlık, sağda altta
 * hizalanmış kısa açıklama. Mono üst satırın başında tek amber sinyal
 * noktası. Dekoratif zemin efekti yok.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  tone = "default",
}: PageHeroProps) {
  return (
    <section
      className={[
        "relative border-b border-border",
        tone === "steel" ? "bg-surface-steel" : "",
      ].join(" ")}
    >
      <div className="container-site relative pb-12 pt-28 md:pb-16 md:pt-36">
        {eyebrow ? (
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block size-2 bg-[var(--primary)]" aria-hidden />
            {eyebrow}
          </p>
        ) : null}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
          <h1 className="display-xl max-w-[14ch]">{title}</h1>
          {description ? (
            <p className="max-w-md text-[1.0625rem] leading-[1.6] text-muted lg:pb-2">
              {description}
            </p>
          ) : null}
        </div>
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
