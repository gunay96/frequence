"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

export function SpotlightSurface({ children, className = "" }: { children: ReactNode; className?: string }) {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <div
      className={`spotlight-surface ${className}`}
      onPointerMove={handlePointerMove}
      style={{ "--spotlight-x": "50%", "--spotlight-y": "50%" } as CSSProperties}
    >
      {children}
    </div>
  );
}
