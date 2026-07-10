import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DocsNav from "@/components/DocsNav";
import DocsMarkdown from "@/components/DocsMarkdown";
import { allSlugs, loadDoc, loadNav } from "@/lib/docs";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = loadDoc(slug);
  if (!doc) return {};
  return { title: `${doc.meta.title} | 7dawn`, description: doc.meta.description };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const doc = loadDoc(slug);
  if (!doc) notFound();

  const nav = loadNav();
  const activeSlug = slug.join("/");
  const currentDir = slug.slice(0, -1).join("/");

  return (
    <>
      <Nav />
      <main className="mx-auto flex max-w-[1100px] items-start gap-12 px-6 pt-28 pb-24 md:px-12">
        <aside className="sticky top-28 hidden w-56 shrink-0 lg:block">
          <DocsNav nav={nav} activeSlug={activeSlug} locale={locale} />
        </aside>
        <div className="min-w-0 max-w-[720px] flex-1">
          <details className="mb-8 border border-white/10 lg:hidden">
            <summary className="cursor-pointer px-4 py-3 font-mono text-xs uppercase tracking-[2px] text-white/50">
              目录
            </summary>
            <div className="px-4 pb-4">
              <DocsNav nav={nav} activeSlug={activeSlug} locale={locale} />
            </div>
          </details>
          <DocsMarkdown body={doc.body} currentDir={currentDir} locale={locale} />
        </div>
      </main>
      <Footer />
    </>
  );
}
