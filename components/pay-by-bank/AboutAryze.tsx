import { useTranslations } from "next-intl";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const keys = ["focus", "market", "access"] as const;

export function AboutAryze() {
  const t = useTranslations("payByBank.about");

  return (
    <section
      aria-labelledby="about-aryze-title"
      className="grid items-start gap-6 py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
    >
      <div className="max-w-[52ch]">
        <p className="section-label">{t("eyebrow")}</p>
        <h2 id="about-aryze-title" className="mt-2 display-2 text-ink">
          {t("title")}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">{t("body")}</p>
      </div>
      <RevealGroup className="grid gap-3 sm:grid-cols-3" stagger={0.06}>
        {keys.map((key) => (
          <RevealItem key={key}>
            <article className="h-full rounded-xl border border-[rgba(18,20,23,0.08)] bg-white/72 p-4">
              <span className="block text-sm font-bold text-ink">
                {t(`points.${key}.label`)}
              </span>
              <p className="mt-1.5 text-sm leading-snug text-muted">
                {t(`points.${key}.body`)}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
