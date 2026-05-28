import { useTranslations } from "next-intl";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const keys = ["mission", "vision", "values"] as const;

export function AboutStrip() {
  const t = useTranslations("home.about");

  return (
    <RevealGroup className="grid gap-3 sm:grid-cols-3" stagger={0.06}>
      {keys.map((key) => (
        <RevealItem key={key}>
          <article className="h-full rounded-xl border border-[rgba(18,20,23,0.08)] bg-white/76 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(37,99,235,0.22)] hover:shadow-[0_18px_44px_rgba(18,20,23,0.06)]">
            <span className="block text-sm font-bold text-ink">
              {t(`${key}.label`)}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t(`${key}.body`)}
            </p>
          </article>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
