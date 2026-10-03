import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  absoluteUrl,
  canonicalPath,
  getSiteUrl,
  SITE_NAME,
} from "./urls";

describe("urls config", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  afterEach(() => {
    process.env = env;
  });

  it("uses production fallbacks when env is unset", () => {
    expect(getSiteUrl()).toBe("https://onfrequence.co");
  });

  it("reads configured public origins", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://staging.onfrequence.co/";

    expect(getSiteUrl()).toBe("https://staging.onfrequence.co");
  });

  it("builds absolute URLs without Host header", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://onfrequence.co";
    expect(absoluteUrl("/markalar")).toBe("https://onfrequence.co/markalar");
    expect(absoluteUrl("/")).toBe("https://onfrequence.co");
  });

  it("normalizes canonical paths", () => {
    expect(canonicalPath("/")).toBe("/");
    expect(canonicalPath("/markalar/")).toBe("/markalar");
    expect(canonicalPath("hizmetler")).toBe("/hizmetler");
  });

  it("exports site name", () => {
    expect(SITE_NAME).toBe("FREQUENCE");
  });
});
