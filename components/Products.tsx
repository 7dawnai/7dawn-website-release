import { useTranslations } from "next-intl";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

export default function Products() {
  const t = useTranslations("products");

  return (
    <section id="products" className="relative border-t border-white/10 px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal>
          <SectionHeader
            idx="/products"
            kicker="PRODUCT"
            title={
              <>
                {t("titleBefore")}
                <em>{t("titleEm")}</em>
                {t("titleAfter")}
              </>
            }
            lead={t("lead")}
          />
        </ScrollReveal>

        <ScrollReveal>
          <article className="flex flex-col border border-white/10 bg-white/[0.03] p-7 md:p-10">
            <span className="font-mono text-[10px] uppercase tracking-[2px] text-white/50">{t("studio.for")}</span>
            <h3 className="mt-4 font-mono text-3xl font-light tracking-[-0.01em] md:text-5xl">{t("studio.name")}</h3>
            <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-white/70 md:text-base">{t("studio.desc")}</p>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
