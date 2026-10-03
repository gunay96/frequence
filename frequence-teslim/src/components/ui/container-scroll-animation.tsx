"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

type ContainerScrollProps = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  onProgress?: (progress: number) => void;
};

type ScrollStyle = CSSProperties & { "--scroll-progress": number };

export function ContainerScrollAnimation({ title, children, className, contentClassName, onProgress }: ContainerScrollProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(-1);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const travel = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      const stepProgress = Math.round(progress * 200) / 200;
      if (stepProgress !== progressRef.current) {
        progressRef.current = stepProgress;
        onProgress?.(stepProgress);
      }
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [onProgress]);

  return (
    <div ref={rootRef} className={["container-scroll", className].filter(Boolean).join(" ")} style={{ "--scroll-progress": 0 } as ScrollStyle}>
      <div className="container-scroll__sticky">
        <div className="container-scroll__title">{title}</div>
        <div className={["container-scroll__stage", contentClassName].filter(Boolean).join(" ")}>{children}</div>
      </div>
    </div>
  );
}
