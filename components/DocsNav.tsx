import Link from "next/link";
import { pathToSlug, type NavSection } from "@/lib/docs";

export default function DocsNav({
  nav,
  activeSlug,
  locale,
}: {
  nav: NavSection[];
  activeSlug: string;
  locale: string;
}) {
  return (
    <nav>
      {nav.map((section) => (
        <div key={section.title} className="mb-6">
          <div className="mb-2 font-mono text-xs uppercase tracking-[2px] text-white/30">
            {section.title}
          </div>
          <ul className="list-none space-y-1">
            {section.pages.map((page) => {
              const slug = pathToSlug(page.path);
              const active = slug === activeSlug;
              return (
                <li key={page.path}>
                  <Link
                    href={`/${locale}/docs/${slug}`}
                    className={`block border-l py-1 pl-3 text-sm transition-colors ${
                      active
                        ? "border-white text-white"
                        : "border-white/10 text-white/50 hover:text-white"
                    }`}
                  >
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
