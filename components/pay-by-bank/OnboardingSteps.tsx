import { useTranslations } from "next-intl";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = ["map", "kyb", "integrate", "golive"] as const;

export function OnboardingSteps() {
  const t = useTranslations("payByBank.onboarding");

  return (
    <section aria-labelledby="onboarding-title" className="grid gap-5 py-6">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("body")}
        size="large"
        id="onboarding-title"
      />
      <div className="hidden grid-cols-4 gap-3 lg:grid" aria-hidden>
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="h-0.5 rounded-full bg-[rgba(25,34,53,0.16)]"
          />
        ))}
      </div>
      <RevealGroup
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.07}
      >
        {steps.map((key, i) => (
          <RevealItem key={key} className="h-full">
            <article className="grid h-full content-start gap-3 rounded-xl border border-[rgba(18,20,23,0.08)] bg-white/82 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(18,20,23,0.06)]">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(25,34,53,0.14)] bg-white text-sm font-semibold text-navy">
                {i + 1}
              </span>
              <h3 className="text-base font-semibold leading-tight text-ink">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="text-sm leading-snug text-muted">
                {t(`steps.${key}.body`)}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
