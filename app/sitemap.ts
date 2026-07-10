import type { MetadataRoute } from "next";
import { allSlugs } from "@/lib/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://7dawn.ai";
  const paths = ["", ...allSlugs().map((s) => `/docs/${s.join("/")}`)];
  return ["zh", "en"].flatMap((locale) =>
    paths.map((p) => ({
      url: `${base}/${locale}${p}`,
      lastModified: new Date(),
      alternates: { languages: { en: `${base}/en${p}`, zh: `${base}/zh${p}` } },
    })),
  );
}
