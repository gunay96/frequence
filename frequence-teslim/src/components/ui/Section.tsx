import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  container?: "site" | "narrow" | "none";
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "default" | "elevated" | "contrast" | "steel" | "light" | "pale";
  /**
   * Başlık düzeni: `split` açıklamayı başlığın karşısına alır, `bare`
   * yalnızca başlıkla açılır.
   */
  headerLayout?: "stack" | "split" | "bare";
};

export function Section({
  id,
  children,
  className = "",
  container = "site",
  eyebrow,
  title,
  description,
  tone = "default",
  headerLayout = "stack",
}: SectionProps) {
  const toneClass =
    tone === "elevated"
      ? "bg-surface"
      : tone === "contrast"
        ? "bg-surface-elevated"
        : tone === "steel"
          ? "bg-surface-steel"
          : tone === "light"
            ? "section-light"
            : tone === "pale"
              ? "bg-surface-pale text-on-light"
              : "";

  const containerClass =
    container === "site"
      ? "container-site"
      : container === "narrow"
        ? "container-narrow"
        : "";

  const isLight = tone === "light" || tone === "pale";
  const isSplit = headerLayout === "split";
  const showDescription = Boolean(description) && headerLayout !== "bare";

  return (
    <section id={id} className={`section-y ${toneClass} ${className}`}>
      <div className={containerClass}>
        {(eyebrow || title || showDescription) && (
          <header
            className={
              isSplit
                ? "mb-10 grid gap-5 pb-8 md:mb-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16"
                : "mb-10 max-w-4xl md:mb-14"
            }
          >
            <div className={isSplit ? "" : "contents"}>
              {eyebrow ? (
                <p className={`eyebrow mb-4 ${isLight ? "text-on-light-muted" : ""}`}>
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className={`display-md ${isLight ? "text-on-light" : "text-foreground"}`}>
                  {title}
                </h2>
              ) : null}
            </div>
            {showDescription ? (
              <p
                className={[
                  "text-[1.0625rem] leading-[1.55]",
                  isSplit ? "lg:pb-2" : "mt-5 max-w-2xl",
                  isLight ? "text-on-light-muted" : "text-muted",
                ].join(" ")}
              >
                {description}
              </p>
            ) : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
