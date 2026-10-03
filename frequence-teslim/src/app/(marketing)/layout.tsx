import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

/** Pazarlama kabuğu: üst menü + içerik + altbilgi. */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10 flex-1 bg-background">{children}</main>
      <SiteFooter />
    </>
  );
}
