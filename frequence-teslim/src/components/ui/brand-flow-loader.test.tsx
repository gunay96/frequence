import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Button } from "@/components/ui/Button";
import {
  BrandFlowWordmark,
  BrandLoadingScreen,
  BrandPendingMark,
  BrandSectionLoader,
} from "@/components/ui/brand-flow-loader";

const UI_DIR = path.resolve(__dirname);
const SRC_DIR = path.resolve(__dirname, "../..");

function readSource(relativePath: string): string {
  return readFileSync(path.resolve(UI_DIR, relativePath), "utf8");
}

function listSourceFiles(root: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(root)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = path.join(root, entry);
    if (statSync(full).isDirectory()) {
      out.push(...listSourceFiles(full));
    } else if (/\.(tsx?|css)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

describe("BrandFlowWordmark — rendering", () => {
  it("renders the FREQUENCE wordmark with a clip-masked flow", () => {
    const { container } = render(<BrandFlowWordmark />);
    expect(container.querySelector("svg")).not.toBeNull();
    // Görünür katman + clipPath kopyası aynı kelimeyi taşır.
    expect(container.querySelectorAll("text").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("FREQUENCE").length).toBeGreaterThanOrEqual(1);
    // Maske + gezen demet + reduced-motion duruş katmanı.
    expect(container.querySelector("clipPath")).not.toBeNull();
    expect(container.querySelector(".brand-flow__stream")).not.toBeNull();
    expect(container.querySelector(".brand-flow__glow")).not.toBeNull();
    expect(container.querySelector(".brand-flow__rest")).not.toBeNull();
  });

  it("keeps the wordmark geometry fixed via textLength", () => {
    const { container } = render(<BrandFlowWordmark size="section" />);
    const text = container.querySelector("text");
    expect(text?.getAttribute("textLength")).toBe("960");
    expect(text?.getAttribute("lengthAdjust")).toBe("spacingAndGlyphs");
    expect(text?.getAttribute("font-size")).toBe("100");
    expect(text?.getAttribute("y")).toBe("90");
  });

  it("is decorative for assistive tech", () => {
    const { container } = render(<BrandFlowWordmark />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
    expect(svg?.getAttribute("focusable")).toBe("false");
  });

  it("exposes route and section sizes", () => {
    const route = render(<BrandFlowWordmark size="route" />);
    expect(route.container.querySelector("svg")?.getAttribute("data-size")).toBe(
      "route"
    );
    route.unmount();
    const section = render(<BrandFlowWordmark size="section" />);
    expect(
      section.container.querySelector("svg")?.getAttribute("data-size")
    ).toBe("section");
  });
});

describe("BrandLoadingScreen — full-screen route mode", () => {
  it("announces exactly once via a single polite status region", () => {
    const { container } = render(<BrandLoadingScreen />);
    const statuses = screen.getAllByRole("status");
    expect(statuses).toHaveLength(1);

    const status = statuses[0];
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(status.getAttribute("aria-busy")).toBe("true");
    expect(within(status).getAllByText("Yükleniyor")).toHaveLength(1);
    // Görünür caption duyurulmaz (aria-hidden) — tekrarlı duyuru yok.
    const caption = within(status).getByText("yükleniyor");
    expect(caption.getAttribute("aria-hidden")).toBe("true");
    // SVG (ve içindeki kelime) ekran okuyucudan gizli.
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
    expect(
      container.querySelector('[data-brand-loading="screen"]')
    ).not.toBeNull();
  });

  it("keeps skeletons as a layout promise below the wordmark", () => {
    const { container } = render(
      <BrandLoadingScreen>
        <div className="h-24 w-64" data-testid="skeleton" />
      </BrandLoadingScreen>
    );
    expect(container.querySelector('[data-testid="skeleton"]')).not.toBeNull();
    expect(container.querySelector(".brand-flow__rule")).not.toBeNull();
  });
});

describe("BrandSectionLoader — section/data mode", () => {
  it("is its own polite status region with a compact wordmark", () => {
    const { container } = render(
      <BrandSectionLoader
        caption="creator sonuçları hazırlanıyor"
        hint="RPC"
      />
    );
    const statuses = screen.getAllByRole("status");
    expect(statuses).toHaveLength(1);
    const status = statuses[0];
    expect(status.getAttribute("aria-busy")).toBe("true");
    expect(
      container.querySelector('[data-brand-loading="section"]')
    ).not.toBeNull();
    expect(
      within(status).getByText("creator sonuçları hazırlanıyor")
    ).toBeTruthy();
    expect(within(status).getByText("RPC")).toBeTruthy();
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("data-size")).toBe("section");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders skeletons below the wordmark without extra live regions", () => {
    const { container } = render(
      <BrandSectionLoader>
        <div data-testid="rows" />
      </BrandSectionLoader>
    );
    expect(container.querySelector('[data-testid="rows"]')).not.toBeNull();
    expect(screen.getAllByRole("status")).toHaveLength(1);
  });
});

describe("BrandPendingMark — compact action mode", () => {
  it("is aria-hidden; the action's own text/state carries the announcement", () => {
    const { container } = render(<BrandPendingMark />);
    const mark = container.querySelector(".brand-flow__compact");
    expect(mark?.getAttribute("aria-hidden")).toBe("true");
    expect(mark?.getAttribute("data-tone")).toBe("red");
    expect(
      container.querySelector(".brand-flow__compact-track")
    ).not.toBeNull();
    expect(container.querySelector(".brand-flow__compact-beam")).not.toBeNull();
  });

  it("supports the on-primary tone for red buttons", () => {
    const { container } = render(<BrandPendingMark tone="on-primary" />);
    expect(container.querySelector('[data-tone="on-primary"]')).not.toBeNull();
  });
});

describe("Button — compact pending integration", () => {
  it("renders the branded mark, disables and sets aria-busy while pending", () => {
    const { container, getByRole } = render(
      <Button type="submit" pending>
        Kaydediliyor…
      </Button>
    );
    const button = getByRole("button");
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(container.querySelector(".brand-flow__compact")).not.toBeNull();
    // Amber zeminli primary butonda ışık, buton metni rengiyle akar.
    expect(container.querySelector('[data-tone="on-primary"]')).not.toBeNull();
  });

  it("stays a plain branded action when not pending", () => {
    const { container, getByRole } = render(<Button>Kaydet</Button>);
    const button = getByRole("button");
    expect(button.getAttribute("aria-busy")).toBeNull();
    expect((button as HTMLButtonElement).disabled).toBe(false);
    expect(container.querySelector(".brand-flow__compact")).toBeNull();
  });
});

describe("design invariants — single accent, no cheap effects", () => {
  const css = readFileSync(path.resolve(UI_DIR, "../../app/globals.css"), "utf8");

  const blockStart = css.indexOf("Markalı yükleme sistemi");
  const blockEnd = css.indexOf("Dönen kenar ışığı yok", blockStart);
  const block = css.slice(blockStart, blockEnd);

  it("defines the traveling flow animation", () => {
    expect(block).toContain("@keyframes brand-flow-travel");
    expect(block).toContain("@keyframes brand-flow-rule");
    expect(block).toContain("@keyframes brand-flow-compact");
    expect(block).toContain(".brand-flow__stream");
  });

  it("colors the flow only from the single accent family", () => {
    // Hex/rgb sabit rengi yok: tüm renk tek vurgu token'larından türer —
    // gökkuşağı, mavi/yeşil başlık ya da rastgele neon imkânsız.
    expect(block).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(block).toContain("var(--primary)");
    expect(block).toContain("var(--on-primary)");
    expect(block).not.toMatch(/blue|green|cyan|purple|violet|amber|pink/i);
    // Bileşen tarafındaki gradyan da aynı aileden (soft/strong tonları).
    const component = readSource("brand-flow-loader.tsx");
    expect(component).toContain("var(--primary-soft)");
    expect(component).toContain("var(--primary-strong)");
    expect(component).not.toMatch(/blue|green|cyan|purple|violet|amber|pink/i);
  });

  it("keeps the motion restrained (no neon glow or particle chaos)", () => {
    expect(block).not.toMatch(/box-shadow/);
    expect(block).not.toMatch(/drop-shadow/);
    expect(block).not.toMatch(/animation-duration:\s*[2-9]\d*s/);
    // Yalnızca yumuşak ışık katmanı: tek, sınırlı bulanıklık.
    expect(readSource("brand-flow-loader.tsx")).toMatch(/blur\(9px\)/);
  });

  it("provides a clean static branded state under reduced motion", () => {
    expect(block).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.brand-flow__stream,\s*\n\s*\.brand-flow__glow\s*\{[^}]*display:\s*none/
    );
    expect(block).toMatch(
      /\.brand-flow__rest\s*\{[^}]*display:\s*none[\s\S]*@media \(prefers-reduced-motion: reduce\)[\s\S]*\.brand-flow__rest\s*\{[^}]*display:\s*block/
    );
    expect(block).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.brand-flow__compact-beam[^{]*\{[^}]*animation:\s*none/
    );
    expect(block).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.brand-flow__rule::after[^{]*\{[^}]*animation:\s*none/
    );
  });
});

describe("customer-facing loading states use the branded loader", () => {
  it("route loading boundaries render the branded screen", () => {
    expect(readSource("../../app/(marketing)/loading.tsx")).toContain(
      "BrandLoadingScreen"
    );
  });

  it("meaningful async actions use the compact pending variant", () => {
    const sources = [
      "../../components/forms/CreatorApplicationForm.tsx",
      "../../components/forms/BrandInquiryForm.tsx",
    ];
    for (const source of sources) {
      expect(readSource(source)).toMatch(/pending=\{[^}]+\}/);
    }
    expect(readSource("../ui/Button.tsx")).toContain("BrandPendingMark");
  });

  it("no generic spinners remain in the source tree", () => {
    const offenders = listSourceFiles(SRC_DIR)
      .filter((file) => !file.includes(".test."))
      .filter((file) => {
        const content = readFileSync(file, "utf8");
        return /animate-spin|spinner|LoadingSpinner/i.test(content);
      });
    expect(offenders).toEqual([]);
  });
});
