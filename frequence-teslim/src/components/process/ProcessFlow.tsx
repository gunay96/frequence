"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/content/process";

export function ProcessFlow({ detailed = false }: { detailed?: boolean }) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.index));
    }, { rootMargin: "-35% 0px -45%", threshold: [0, 0.35, 0.7] });
    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const current = processSteps[active];
  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      {/* Below `lg` the grid collapses to one column and this panel stacked
          straight above the list, so the current step ("01 Brief" on load)
          rendered twice on every phone. It is a scroll affordance for the
          two-column layout only — the list carries its own numbers. */}
      <div className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
        <p className="font-display font-extrabold tracking-[-0.005em] text-8xl leading-none text-[var(--primary)]/25 sm:text-9xl lg:text-[10rem]">{current.number}</p>
        <h3 className="mt-4 font-display font-extrabold tracking-[-0.005em] text-5xl leading-none text-foreground sm:text-6xl lg:text-7xl">{current.title}</h3>
        <p className="mt-5 max-w-md text-sm leading-7 text-muted md:text-base">{current.summary}</p>
        <div className="mt-8 h-px bg-border"><span className="block h-px bg-primary-soft transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${((active + 1) / processSteps.length) * 100}%` }} /></div>
        <p className="meta-sm mt-3 text-muted">{String(active + 1).padStart(2, "0")} / {String(processSteps.length).padStart(2, "0")}</p>
      </div>
      <ol className="divide-y divide-border">
        {processSteps.map((step, index) => (
          <li key={step.number}>
            <article ref={(node) => { refs.current[index] = node; }} data-index={index} tabIndex={0} onFocus={() => setActive(index)} className={`min-h-64 py-12 transition-[opacity,transform,border-color] duration-500 first:pt-0 lg:min-h-[44vh] lg:py-16 ${active === index ? "translate-y-0 opacity-100" : "translate-y-3 opacity-45 hover:opacity-75 focus:translate-y-0 focus:opacity-100"}`}>
              <p className="meta text-[var(--primary-soft)]">{step.number}</p>
              <h4 className="mt-5 font-display font-extrabold tracking-[-0.005em] text-4xl sm:text-5xl">{step.title}</h4>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted">{step.summary}</p>
              {detailed ? <dl className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-3"><FlowDetail label="Marka" text={step.brandProvides} /><FlowDetail label="FREQUENCE" text={step.teamHandles} /><FlowDetail label="Çıktı" text={step.output} /></dl> : null}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FlowDetail({ label, text }: { label: string; text: string }) {
  return <div><dt className="meta-sm text-[var(--primary-soft)]">{label}</dt><dd className="mt-2 text-sm leading-6 text-muted">{text}</dd></div>;
}
