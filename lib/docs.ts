import { readFileSync } from "node:fs";
import { join } from "node:path";

export type DocMeta = { title: string; description: string };
export type NavPage = { path: string; title: string };
export type NavSection = { title: string; pages: NavPage[] };

const CONTENT_DIR = join(process.cwd(), "content/docs");

export function loadNav(): NavSection[] {
  const raw = readFileSync(join(CONTENT_DIR, "nav.json"), "utf8");
  return (JSON.parse(raw) as { sections: NavSection[] }).sections;
}

export function pathToSlug(path: string): string {
  return path.replace(/\.md$/, "");
}

export function allSlugs(): string[][] {
  return loadNav().flatMap((s) => s.pages.map((p) => pathToSlug(p.path).split("/")));
}

// Fixed three-field frontmatter (title/description/last_verified_commit);
// a hand-rolled parser avoids a YAML dependency.
function parseFrontmatter(raw: string): { meta: DocMeta; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return { meta: { title: "", description: "" }, body: raw };
  const fields: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) fields[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return {
    meta: { title: fields.title ?? "", description: fields.description ?? "" },
    body: raw.slice(m[0].length),
  };
}

export function loadDoc(slug: string[]): { meta: DocMeta; body: string } | null {
  const rel = slug.join("/");
  // Reject anything outside plain page slugs (also blocks path traversal).
  if (!/^[a-z0-9/-]+$/.test(rel) || rel.includes("..")) return null;
  let raw: string;
  try {
    raw = readFileSync(join(CONTENT_DIR, `${rel}.md`), "utf8");
  } catch {
    return null;
  }
  return parseFrontmatter(raw);
}

export function rewriteDocLink(href: string, currentDir: string, locale: string): string {
  // External schemes, pure anchors, and absolute paths pass through.
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("#") || href.startsWith("/")) {
    return href;
  }
  const [path, anchor] = href.split("#");
  if (!path.endsWith(".md")) return href;
  const segs = currentDir ? currentDir.split("/") : [];
  for (const part of path.split("/")) {
    if (part === "." || part === "") continue;
    if (part === "..") segs.pop();
    else segs.push(part);
  }
  const slug = segs.join("/").replace(/\.md$/, "");
  return `/${locale}/docs/${slug}${anchor ? `#${anchor}` : ""}`;
}
