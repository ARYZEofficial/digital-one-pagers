import { useTranslations } from "next-intl";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const keys = ["fees", "chargebacks", "abandon"] as const;

export function PaymentPain() {
  const t = useTranslations("payByBank.pain");

  return (
    <section aria-labelledby="payment-pain-title" className="grid gap-5 py-6">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("body")}
        size="large"
        id="payment-pain-title"
      />
      <RevealGroup className="grid gap-3 sm:grid-cols-3" stagger={0.06}>
        {keys.map((key) => (
          <RevealItem key={key}>
            <article className="h-full rounded-xl border border-[rgba(18,20,23,0.08)] bg-white/74 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(194,65,50,0.22)]">
              <h3 className="text-base font-semibold leading-tight text-ink">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`items.${key}.body`)}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
