"use client";

import { useCallback, useState } from "react";
import { ContainerScrollAnimation } from "@/components/ui/container-scroll-animation";
import { servicePillars, type ServicePillar } from "@/content/service-pillars";

export function ServicesScrollStory() {
  const [active, setActive] = useState(0);
  const updateProgress = useCallback((progress: number) => {
    setActive(Math.min(servicePillars.length - 1, Math.floor(progress * servicePillars.length)));
  }, []);

  return (
    <section
      className="bg-background py-16 md:py-24"
      aria-label="Tek ekip, dört iş"
    >
      <div className="container-site mb-12 md:mb-0"><p className="eyebrow">çıkıştan rapora</p></div>

      <div className="hidden md:block motion-reduce:hidden">
        <ContainerScrollAnimation title={<h2>Tek ekip, dört iş.</h2>} onProgress={updateProgress}>
          <ServiceStage pillar={servicePillars[active]} />
        </ContainerScrollAnimation>
      </div>

      <div className="container-site space-y-14 md:hidden motion-reduce:md:block">
        <h2 className="display-lg" id="services-story-heading-mobile">Tek ekip, dört iş.</h2>
        {servicePillars.map((pillar) => (
          <article key={pillar.id} id={pillar.id} className="border-t border-border pt-8">
            <ServiceStage pillar={pillar} compact />
          </article>
        ))}
      </div>
    </section>
  );
}

function ServiceStage({ pillar, compact = false }: { pillar: ServicePillar; compact?: boolean }) {
  return (
    <div className={`service-stage ${compact ? "service-stage--compact" : ""}`} aria-live={compact ? undefined : "polite"}>
      <div className="service-stage__number" aria-hidden>{pillar.number}</div>
      <div className="service-stage__core">
        <p className="meta text-primary-soft">{pillar.number} / 04</p>
        <h3 className="service-stage__title mt-4 font-display font-extrabold tracking-[-0.005em] text-4xl sm:text-5xl">{pillar.title}</h3>
        <p className="service-stage__summary mt-5 max-w-xl text-base leading-relaxed text-foreground/85">{pillar.value}</p>
        {!compact ? <div className="service-stage__progress mt-10 bg-border"><span className="block bg-primary-soft motion-reduce:transition-none" /></div> : null}
      </div>
      <div className="service-stage__detail">
        <p className="text-xs leading-relaxed text-muted">{pillar.what}</p>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {pillar.points.map((point) => <li key={point} className="py-3 text-sm text-foreground/90">{point}</li>)}
        </ul>
      </div>
    </div>
  );
}
