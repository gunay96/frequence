export function PremiumMarquee({ items, className = "" }: { items: readonly string[]; className?: string }) {
  const repeated = [...items, ...items];
  return (
    <div className={`premium-marquee overflow-hidden ${className}`}>
      <p className="sr-only">{items.join(" · ")}</p>
      <div className="premium-marquee__track flex w-max items-center" aria-hidden>
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center whitespace-nowrap font-display text-sm font-semibold uppercase text-foreground/75">
            <span className="mx-7 size-1 bg-primary-soft/65" />{item}
          </span>
        ))}
      </div>
    </div>
  );
}
