"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { primaryNav, ctaLinks } from "@/content/navigation";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled
          ? "border-border bg-[var(--background)]"
          : "border-transparent bg-[var(--background)]",
      ].join(" ")}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-display text-[1.35rem] font-extrabold uppercase tracking-[0.04em] md:text-[1.55rem]"
          aria-label="FREQUENCE ana sayfa"
        >
          <span aria-hidden className="inline-block size-2.5 bg-[var(--primary)]" />
          FREQUENCE
        </Link>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Ana navigasyon"
        >
          {primaryNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "meta relative px-3 py-2 transition-colors after:absolute after:inset-x-3 after:bottom-1.5 after:h-px after:origin-left after:bg-[var(--primary)] after:transition-transform after:duration-300",
                  active
                    ? "text-foreground after:scale-x-100"
                    : "text-muted after:scale-x-0 hover:text-foreground hover:after:scale-x-100",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Button href={ctaLinks.creatorApply} variant="outline" size="sm">
            Creator ol
          </Button>
          <Button href={ctaLinks.campaignStart} size="sm">
            Kampanya başlat
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-border-strong lg:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-foreground transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-border bg-[var(--background)] lg:hidden"
      >
        <nav
          className="container-site flex flex-col gap-1 py-4"
          aria-label="Mobil navigasyon"
        >
          {primaryNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "border-l-2 px-3 py-3 text-base",
                  active ? "border-[var(--primary)] text-[var(--primary-soft)]" : "border-transparent text-foreground",
                ].join(" ")}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
            <Button href={ctaLinks.creatorApply} variant="outline">
              Creator ol
            </Button>
            <Button href={ctaLinks.campaignStart}>Kampanya başlat</Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
