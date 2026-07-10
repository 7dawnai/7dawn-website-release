import { describe, it, expect } from "vitest";
import {
  rewriteDocLink,
  loadNav,
  loadDoc,
  pathToSlug,
  allSlugs,
} from "../lib/docs";

describe("rewriteDocLink", () => {
  it("rewrites same-directory relative links", () => {
    expect(rewriteDocLink("./computer-panel.md", "guides", "zh")).toBe(
      "/zh/docs/guides/computer-panel",
    );
  });
  it("rewrites parent-directory links", () => {
    expect(rewriteDocLink("../faq.md", "guides", "en")).toBe("/en/docs/faq");
  });
  it("rewrites root-page links into subdirectories", () => {
    expect(rewriteDocLink("./guides/agents.md", "", "zh")).toBe(
      "/zh/docs/guides/agents",
    );
  });
  it("preserves anchors", () => {
    expect(rewriteDocLink("./chat.md#添加附件", "guides", "zh")).toBe(
      "/zh/docs/guides/chat#添加附件",
    );
  });
  it("leaves external links untouched", () => {
    expect(rewriteDocLink("https://example.com/a.md", "guides", "zh")).toBe(
      "https://example.com/a.md",
    );
  });
  it("leaves pure anchors and absolute paths untouched", () => {
    expect(rewriteDocLink("#总览", "guides", "zh")).toBe("#总览");
    expect(rewriteDocLink("/zh/docs/faq", "guides", "zh")).toBe("/zh/docs/faq");
  });
});

describe("content/docs consistency", () => {
  const nav = loadNav();

  it("nav.json has sections with pages", () => {
    expect(nav.length).toBeGreaterThanOrEqual(3);
    expect(allSlugs().length).toBeGreaterThanOrEqual(10);
  });

  for (const section of nav) {
    for (const page of section.pages) {
      it(`${page.path} exists with complete frontmatter`, () => {
        const doc = loadDoc(pathToSlug(page.path).split("/"));
        expect(doc).not.toBeNull();
        expect(doc!.meta.title).not.toBe("");
        expect(doc!.meta.description).not.toBe("");
      });
    }
  }

  it("redirect target getting-started exists", () => {
    expect(loadDoc(["getting-started"])).not.toBeNull();
  });

  it("unknown slug returns null", () => {
    expect(loadDoc(["no-such-page"])).toBeNull();
  });
});
