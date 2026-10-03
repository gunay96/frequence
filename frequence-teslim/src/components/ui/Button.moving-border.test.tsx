import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

const cssSource = readFileSync(
  path.resolve(__dirname, "../../app/globals.css"),
  "utf8"
);

const read = (relative: string) =>
  readFileSync(path.resolve(__dirname, "../../../", relative), "utf8");

describe("moving-border CTA — Button bütünleşmesi", () => {
  it("movingBorder ile kenar işareti açılır (link ve buton)", () => {
    const { container } = render(
      <Button href="/marka-iletisim" movingBorder>
        Kampanya başlat
      </Button>
    );
    const link = container.querySelector("a");
    expect(link).toBeTruthy();
    expect(link!.getAttribute("data-accent")).toBe("moving-border");
    expect(link!.getAttribute("data-variant")).toBe("primary");
    expect(link!.className).toContain("btn-moving");
    expect(link!.className).toContain("rounded-none");

    render(
      <Button type="button" movingBorder variant="outline">
        İletişimi başlat
      </Button>
    );
    const button = screen.getByRole("button", { name: "İletişimi başlat" });
    expect(button.getAttribute("data-accent")).toBe("moving-border");
    expect(button.getAttribute("data-variant")).toBe("outline");
  });

  it("prop verilmeden hiçbir CTA'ya kenar bağlantısı eklenmez", () => {
    const { container } = render(
      <Button href="/hizmetler">Hizmetler</Button>
    );
    const link = container.querySelector("a");
    expect(link!.hasAttribute("data-accent")).toBe(false);
    expect(link!.className).not.toContain("btn-moving");
  });

  it("pending davranışı hiç değişmeden çalışır (donuk katman)", () => {
    render(
      <Button type="submit" pending movingBorder>
        Kaydet
      </Button>
    );
    const button = screen.getByRole("button", { name: "Kaydet" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();
    // Markalı bekleme göstergesi buton içindeki yerini korur.
    expect(button.querySelector("[data-tone]")).toBeTruthy();
    expect(button.getAttribute("data-accent")).toBe("moving-border");
  });

  // Sınıf kancası korunur ama animasyon/parlama yoktur.
  it("FREQUENCE'ta dönen kenar ışığı yoktur", () => {
    expect(cssSource).toContain(".btn-moving");
    expect(cssSource).not.toContain("mb-travel");
    expect(cssSource).not.toContain("--mb-angle");
    expect(cssSource).not.toContain("conic-gradient");
  });

  it("yalnızca yüksek değerli CTA'larda kullanılır; filtre/nav/çıkışta yoktur", () => {
    const allowed = [
      "src/components/layout/PageCta.tsx",
      "src/components/forms/BrandInquiryForm.tsx",
    ];
    for (const file of allowed) {
      expect(read(file), file).toContain("movingBorder");
    }

    const forbidden = [
      "src/components/layout/SiteHeader.tsx",
      "src/components/layout/SiteFooter.tsx",
    ];
    for (const file of forbidden) {
      expect(read(file), file).not.toContain("movingBorder");
      expect(read(file), file).not.toContain("btn-moving");
    }
  });
});
