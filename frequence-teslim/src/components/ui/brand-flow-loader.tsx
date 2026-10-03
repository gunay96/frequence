import { useId, type ReactNode } from "react";

/*
 * FREQUENCE markalı yükleme sistemi
 *
 * Tek yükleme dili: gece zemininde FREQUENCE kelime markası; arkasında
 * tek vurgu rengi ışık akışı harflerin İÇİNDEN geçer (SVG clipPath maskesi).
 * Resmî SVG varlığı yok; mevcut wordmark tipografisi birebir kullanılır
 * (font-display) ve textLength ile geometri her ortamda
 * sabitlenir. Animasyon tamamen CSS'tir; prefers-reduced-motion'da akış
 * kapanır, harflerin içine nazik vurgu rengi bir duruş gradyanı kalır.
 *
 * Üç boyut/mod:
 *  - BrandLoadingScreen  : rota/yönlendirme yüklemesi (loading.tsx)
 *  - BrandSectionLoader  : bölüm/veri yüklemesi (Suspense fallback)
 *  - BrandPendingMark    : compact aksiyon/buton bekleme göstergesi
 *
 * Erişilebilirlik: ekran okuyucu duyurusu kökte TEK role="status" üzerinden
 * yapılır; SVG ve görünür caption aria-hidden'dır — tekrarlı duyuru yok.
 */

const WORDMARK = "FREQUENCE";

const WORDMARK_TEXT_STYLE = {
  fontFamily: "var(--font-display)",
  fontWeight: 900,
  fontStretch: "118%",
  letterSpacing: "-0.03em",
} as const;

type WordmarkSize = "route" | "section";

const WORDMARK_WIDTH: Record<WordmarkSize, string> = {
  route: "w-[min(74vw,26rem)]",
  section: "w-56",
};

/**
 * Çekirdek kelime markası. Alt katman: her zaman okunur soluk ön plan.
 * Üst katman: clipPath ile harflere hapsolmuş vurgu rengi ışık demeti, soldan
 * sağa döngüyle akar. Reduced-motion'da akış yerine statik duruş katmanı.
 */
export function BrandFlowWordmark({
  size = "route",
  className = "",
}: {
  size?: WordmarkSize;
  className?: string;
}) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `bflow-clip-${uid}`;
  const beamId = `bflow-beam-${uid}`;
  const restId = `bflow-rest-${uid}`;

  const textProps = {
    x: 20,
    y: 90,
    fontSize: 100,
    textLength: 960,
    lengthAdjust: "spacingAndGlyphs" as const,
    fill: "currentColor",
    style: WORDMARK_TEXT_STYLE,
  };

  return (
    <svg
      viewBox="0 0 1000 104"
      className={`${WORDMARK_WIDTH[size]} h-auto ${className}`}
      aria-hidden="true"
      focusable="false"
      data-size={size}
    >
      <defs>
        <clipPath id={clipId}>
          <text {...textProps}>{WORDMARK}</text>
        </clipPath>
        {/* Gezen ışık demeti — tek vurgu ailesi, gökkuşağı yok. */}
        <linearGradient
          id={beamId}
          gradientUnits="userSpaceOnUse"
          x1={0}
          y1={0}
          x2={280}
          y2={0}
        >
          <stop offset="0" style={{ stopColor: "var(--primary-strong)", stopOpacity: 0 }} />
          <stop offset="0.22" style={{ stopColor: "var(--primary-strong)", stopOpacity: 0.85 }} />
          <stop offset="0.5" style={{ stopColor: "var(--primary)", stopOpacity: 0.96 }} />
          <stop offset="0.78" style={{ stopColor: "var(--primary-soft)", stopOpacity: 0.85 }} />
          <stop offset="1" style={{ stopColor: "var(--primary-soft)", stopOpacity: 0 }} />
        </linearGradient>
        {/* Reduced-motion duruşu: harflerin içine yerleşen sakin vurgu rengi. */}
        <linearGradient id={restId} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" style={{ stopColor: "var(--primary)", stopOpacity: 0.2 }} />
          <stop offset="0.5" style={{ stopColor: "var(--primary-soft)", stopOpacity: 0.75 }} />
          <stop offset="1" style={{ stopColor: "var(--primary)", stopOpacity: 0.2 }} />
        </linearGradient>
      </defs>

      <text {...textProps} style={{ ...WORDMARK_TEXT_STYLE, fillOpacity: 0.92 }}>
        {WORDMARK}
      </text>

      <g clipPath={`url(#${clipId})`}>
        <rect
          className="brand-flow__glow"
          x={-40}
          y={-12}
          width={280}
          height={128}
          fill={`url(#${beamId})`}
          opacity={0.5}
          style={{ filter: "blur(9px)" }}
        />
        <rect
          className="brand-flow__stream"
          x={-40}
          y={-12}
          width={280}
          height={128}
          fill={`url(#${beamId})`}
        />
        <rect
          className="brand-flow__rest"
          x={0}
          y={-12}
          width={1000}
          height={128}
          fill={`url(#${restId})`}
        />
      </g>
    </svg>
  );
}

type BrandLoadingScreenProps = {
  /** Ekran okuyucuya TEK SEFER duyurulan metin. */
  label?: string;
  /** Görünür mono alt yazı (duyurulmaz). */
  caption?: string;
  /** Wordmark'ın odağı bozmadan altına yerleşen skeleton/icerik. */
  children?: ReactNode;
  className?: string;
};

/**
 * Tam ekran / rota yüklemesi. loading.tsx fallback'i olarak kullanılır:
 * layout etkileşimde kalır, içerik alanında markalı bekleme görünür.
 */
export function BrandLoadingScreen({
  label = "Yükleniyor",
  caption = "yükleniyor",
  children,
  className = "",
}: BrandLoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      data-brand-loading="screen"
      className={`flex min-h-[62vh] flex-col items-center justify-center gap-8 px-6 py-16 ${className}`}
    >
      <span className="sr-only">{label}</span>
      <div className="flex flex-col items-center gap-6" aria-hidden="true">
        <BrandFlowWordmark size="route" className="text-foreground" />
        <div className="brand-flow__rule" />
        <p className="meta text-muted" aria-hidden="true">
          {caption}
        </p>
      </div>
      {children ? <div className="w-full">{children}</div> : null}
    </div>
  );
}

type BrandSectionLoaderProps = {
  label?: string;
  caption?: string;
  hint?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Bölüm/veri yüklemesi: sayfanın geri kalanı etkileşimde kalırken verinin
 * beklendiği bölümde görünür (Suspense fallback). Skeleton'ı wordmark'ın
 * altına children olarak alabilir — layout taahhüdü korunur.
 */
export function BrandSectionLoader({
  label = "Yükleniyor",
  caption = "yükleniyor",
  hint,
  children,
  className = "",
}: BrandSectionLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      data-brand-loading="section"
      className={`flex flex-col items-center gap-7 border border-border bg-surface px-6 py-10 ${className}`}
    >
      <span className="sr-only">{label}</span>
      <div className="flex flex-col items-center gap-5" aria-hidden="true">
        <BrandFlowWordmark size="section" className="text-foreground" />
        <p className="meta text-muted" aria-hidden="true">
          {caption}
        </p>
        {hint ? (
          <p className="meta-sm text-muted" aria-hidden="true">
            {hint}
          </p>
        ) : null}
      </div>
      {children ? <div className="w-full">{children}</div> : null}
    </div>
  );
}

type BrandPendingMarkProps = {
  /**
   * primary butonun vurgu rengi zemininde vurgu rengi ışık okunmaz; orada
   * on-primary (buton metin rengi) tonu kullanılır.
   */
  tone?: "red" | "on-primary";
  className?: string;
};

/**
 * Compact bekleme göstergesi: küçük bir hat üzerinde soldan sağa gezen
 * vurgu rengi parçacık — kelime markasının akışıyla aynı dil, buton ölçeğinde.
 * aria-hidden: duyuruyu buton metni + aria-busy üstlenir (spam yok).
 */
export function BrandPendingMark({
  tone = "red",
  className = "",
}: BrandPendingMarkProps) {
  return (
    <span
      aria-hidden="true"
      data-tone={tone}
      className={`brand-flow__compact inline-flex items-center ${className}`}
    >
      <span className="brand-flow__compact-track">
        <span className="brand-flow__compact-beam" />
      </span>
    </span>
  );
}
