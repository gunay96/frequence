import { Section } from "@/components/ui/Section";
import { whyFrequence } from "@/content/why-frequence";

/** Neden FREQUENCE — dört ilke, sade liste. */
export function WhyFrequence() {
  return (
    <Section
      id="neden"
      tone="steel"
      headerLayout="bare"
      title="Uyum, süreç ve rapor bir arada"
    >
      <div className="grid border-t border-border-strong md:grid-cols-2">
        {whyFrequence.map((item, index) => (
          <div
            key={item.title}
            className={[
              "border-b border-border py-8 md:py-10",
              index % 2 === 0 ? "md:border-r md:pr-10" : "md:pl-10",
            ].join(" ")}
          >
            <h3 className="font-display text-2xl font-extrabold tracking-[-0.005em] md:text-3xl">
              {item.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
