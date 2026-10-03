import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "@/components/layout/SiteHeader";

vi.mock("next/navigation", () => ({
  usePathname: () => "/hizmetler",
}));

describe("SiteHeader navigation", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollY", 0);
  });

  it("exposes accessible primary navigation and CTAs", () => {
    render(<SiteHeader />);

    const nav = screen.getByRole("navigation", { name: "Ana navigasyon" });
    expect(nav).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "FREQUENCE ana sayfa" })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Kampanya başlat" }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: "Creator ol" }).length
    ).toBeGreaterThan(0);
    expect(screen.queryByText("Platforma Giriş")).toBeNull();

    const hizmetlerLinks = screen.getAllByRole("link", { name: "Hizmetler" });
    expect(
      hizmetlerLinks.some((link) => link.getAttribute("aria-current") === "page")
    ).toBe(true);
  });
});

