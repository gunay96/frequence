import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  createPageMetadata,
} from "@/lib/seo/metadata";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("SEO helpers", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env, NEXT_PUBLIC_SITE_URL: "https://onfrequence.co" };
  });

  afterEach(() => {
    process.env = env;
  });

  it("creates canonical metadata from configured site URL", () => {
    const metadata = createPageMetadata({
      title: "Markalar",
      description: "Markalar için creator marketing.",
      path: "/markalar",
    });

    expect(metadata.alternates?.canonical).toBe("https://onfrequence.co/markalar");
    expect(metadata.openGraph?.url).toBe("https://onfrequence.co/markalar");
    expect(metadata.twitter?.title).toBe("Markalar · FREQUENCE");
  });

  it("builds JSON-LD with absolute URLs", () => {
    expect(buildOrganizationJsonLd().url).toBe("https://onfrequence.co");
    expect(buildWebSiteJsonLd().inLanguage).toBe("tr-TR");
  });

  it("brands the site name unambiguously for Google", () => {
    const website = buildWebSiteJsonLd();
    expect(website.name).toBe("FREQUENCE");
    expect(website.url).toBe("https://onfrequence.co");
    expect(website.alternateName).toContain("onfrequence.co");

    const organization = buildOrganizationJsonLd();
    expect(organization.name).toBe("FREQUENCE");
    expect(organization.logo?.url).toBe("https://onfrequence.co/icon-96.png");
    expect(organization).not.toHaveProperty("address");
    expect(organization).not.toHaveProperty("telephone");
    expect(organization).not.toHaveProperty("sameAs");
  });

  it("ships a square raster favicon alongside the .ico", () => {
    const root = process.cwd();
    expect(existsSync(path.join(root, "src/app/favicon.ico"))).toBe(true);
    expect(existsSync(path.join(root, "src/app/icon.png"))).toBe(true);
    expect(existsSync(path.join(root, "public/icon-96.png"))).toBe(true);
  });

  it("titles the homepage as a branded search result", () => {
    const metadata = createPageMetadata({
      title: "FREQUENCE - TikTok & Influencer Marketing",
      description: "Test",
      path: "/",
      titleAbsolute: true,
    });
    expect(metadata.title).toMatchObject({
      absolute: "FREQUENCE - TikTok & Influencer Marketing",
    });
    expect(metadata.openGraph?.title).toBe(
      "FREQUENCE - TikTok & Influencer Marketing"
    );
  });

  it("generates sitemap entries for marketing pages only", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://onfrequence.co");
    expect(urls).toContain("https://onfrequence.co/hizmetler");
    for (const url of urls) {
      expect(url.startsWith("https://onfrequence.co")).toBe(true);
      expect(url).not.toMatch(/vaka-calismalari|\/app|\/auth|\/login/);
    }
  });

  it("points robots to sitemap absolute URL", () => {
    const rules = robots();
    expect(rules.sitemap).toBe("https://onfrequence.co/sitemap.xml");
  });

  // Paylaşım önizlemesi için mutlak URL'li OG görseli.
  it("every page ships an absolute share image", () => {
    const metadata = createPageMetadata({
      title: "Test",
      description: "Test",
      path: "/hizmetler",
    });

    const images = metadata.openGraph?.images;
    expect(Array.isArray(images)).toBe(true);
    const first = (images as { url: string; width?: number }[])[0];
    expect(first.url).toMatch(/^https?:\/\/.+\/og\.png$/);
    expect(first.width).toBe(1200);

    const twitterImages = metadata.twitter?.images;
    expect(Array.isArray(twitterImages)).toBe(true);
    expect((twitterImages as string[])[0]).toMatch(/^https?:\/\/.+\/og\.png$/);
  });
});
