import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { BrandPendingMark } from "@/components/ui/brand-flow-loader";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "md" | "lg" | "sm";

/*
 * Köşeler keskin, gölge ve gradyan yok. Birincil eylem amber zemin üzerine
 * koyu metin — yüksek kontrast, sistem vurgusuyla aynı aile.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-strong)]",
  secondary:
    "bg-foreground text-[var(--background)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)]",
  ghost:
    "bg-transparent text-foreground underline decoration-[1.5px] underline-offset-[6px] decoration-[color-mix(in_srgb,currentColor_35%,transparent)] hover:decoration-[var(--primary)]",
  outline:
    "bg-transparent text-foreground shadow-[inset_0_0_0_1px_var(--border-strong)] hover:shadow-[inset_0_0_0_1px_currentColor]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[0.95rem]",
};

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /**
   * Yüksek değerli CTA işareti (kampanya başlatma gibi). Görsel efekt
   * taşımaz; filtre, nav ve ikincil kontrollerde kullanılmaz.
   */
  movingBorder?: boolean;
};

type ButtonAsButton = Common &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
    /**
     * Gerçek async bekleme durumu (useActionState pending vb). Etiketle
     * birlikte compact markalı göstergenin gösterilmesini sağlar; yapay
     * gecikme için değil, yalnızca gerçek bekleme için kullanılır.
     */
    pending?: boolean;
  };

type ButtonAsLink = Common & {
  href: string;
  external?: boolean;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    movingBorder = false,
  } = props;

  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-none font-semibold tracking-[-0.005em] transition-colors duration-150",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]",
    "disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    movingBorder ? "btn-moving" : "",
    className,
  ].join(" ");

  const accentProps = movingBorder
    ? { "data-accent": "moving-border", "data-variant": variant }
    : {};

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external || href.startsWith("http")) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...accentProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...accentProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  // movingBorder bir stil bayrağıdır; DOM'a sızmamalı (React bilinmeyen
  // öznitelik uyarısı). rest'ten açıkça çıkarılır.
  const {
    type = "button",
    pending,
    disabled,
    movingBorder: _movingBorder, // eslint-disable-line @typescript-eslint/no-unused-vars -- DOM'a sızmasını önlemek için rest'ten çıkarılır
    ...rest
  } = buttonProps;
  const isPending = Boolean(pending);
  return (
    <button
      type={type}
      className={classes}
      disabled={isPending || disabled}
      aria-busy={isPending || undefined}
      {...accentProps}
      {...rest}
    >
      {isPending ? (
        <BrandPendingMark tone={variant === "primary" ? "on-primary" : "red"} />
      ) : null}
      {children}
    </button>
  );
}
