import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Hero } from "@/components/home/Hero";
import { primaryNav, footerNav } from "@/content/navigation";
import { processSteps } from "@/content/process";
import { servicePillars } from "@/content/service-pillars";

const root = path.resolve(__dirname, "..");

function* walk(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name.startsWith(".git")) continue;
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (/\.(tsx?|css|md|json|txt|mjs|example)$/.test(name) && name !== "package-lock.json") yield full;
  }
}

describe("design tokens", () => {
  const css = readFileSync(path.join(root, "src/app/globals.css"), "utf8");

  it("uses the warm graphite palette with a single amber accent", () => {
    expect(css).toMatch(/--background:\s*#0d0c0b/i);
    expect(css).toMatch(/--foreground:\s*#efe9df/i);
    expect(css).toMatch(/--primary:\s*#f2a623/i);
  });

  it("keeps corners square and supports reduced motion", () => {
    expect(css).toMatch(/--radius-sm:\s*0;/);
    expect(css).toContain("prefers-reduced-motion");
  });
});

describe("homepage", () => {
  it("has one claim, both entry points and the service list", () => {
    render(<Hero />);
    const hero = screen.getByTestId("home-hero");
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(within(hero).getByRole("link", { name: "Kampanya başlat" })).toBeInTheDocument();
    expect(within(hero).getByRole("link", { name: /Creator olarak katıl/ })).toBeInTheDocument();
    const rows = within(screen.getByTestId("home-services")).getAllByRole("listitem");
    expect(rows).toHaveLength(servicePillars.length);
  });
});

describe("content", () => {
  it("keeps six process steps and four service pillars", () => {
    expect(processSteps).toHaveLength(6);
    for (const step of processSteps) {
      expect(step.teamHandles.length).toBeGreaterThan(10);
    }
    expect(servicePillars).toHaveLength(4);
  });

  it("navigation points only to real marketing routes", () => {
    const routes = [
      ...primaryNav,
      ...Object.values(footerNav).flat(),
    ].map((item) => item.href);
    for (const href of routes) {
      const dir = href === "/" ? "" : href.slice(1);
      const page = path.join(root, "src/app/(marketing)", dir, "page.tsx");
      expect(() => statSync(page), href).not.toThrow();
    }
  });
});

describe("handoff hygiene", () => {
  it("contains no personal or previous-project references", () => {
    const banned = /befluencer|ahmet|taşdeler|tasdeler|lvbel|poizi|gel gel gel|supabase|admin\./i;
    for (const file of walk(root)) {
      if (file.endsWith("site.test.tsx")) continue;
      expect(readFileSync(file, "utf8"), file).not.toMatch(banned);
    }
  });
});
