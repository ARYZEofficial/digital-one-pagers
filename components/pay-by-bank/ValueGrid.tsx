import { useTranslations } from "next-intl";
import { MastercardMark } from "@/components/ui/MastercardMark";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const keys = ["fixed", "chargebacks", "direct", "auth", "rails"] as const;

export function ValueGrid() {
  const t = useTranslations("payByBank.value");

  return (
    <section aria-labelledby="aryze-gains-title" className="grid gap-5 py-6">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("body")}
        size="large"
        id="aryze-gains-title"
      />
      <RevealGroup
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        stagger={0.05}
      >
        {keys.map((key) => (
          <RevealItem key={key} className="h-full">
            <article className="group relative flex h-full flex-col rounded-xl border border-line bg-gradient-to-b from-white to-surface-raised p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(37,99,235,0.22)] hover:shadow-[0_18px_44px_rgba(18,20,23,0.08)]">
              {key === "rails" ? (
                <MastercardMark className="mb-3" />
              ) : (
                <span
                  aria-hidden
                  className="mb-3 block h-[3px] w-7 rounded-full bg-blue"
                />
              )}
              <h3 className="text-[0.95rem] font-semibold leading-tight text-ink">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-snug text-muted">
                {t(`items.${key}.body`)}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
