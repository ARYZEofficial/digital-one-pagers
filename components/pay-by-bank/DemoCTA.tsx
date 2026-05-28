import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function DemoCTA() {
  const t = useTranslations("payByBank.demoCta");
  const c = useTranslations("common");

  return (
    <section
      id="demo"
      className="relative overflow-hidden rounded-2xl border border-[rgba(25,34,53,0.34)] bg-gradient-to-br from-navy to-[#101827] p-8 text-white shadow-[var(--shadow-brand-strong)] sm:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/3 -top-1/3 h-[420px] w-[420px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(243,178,63,0.18), transparent 60%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="max-w-[58ch]">
          <p className="section-label text-white/72">{t("eyebrow")}</p>
          <h2 className="mt-3 display-2 text-white">{t("title")}</h2>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-white/72 sm:text-base">
            {t("body")}
          </p>
        </div>
        <div className="grid gap-3 sm:justify-items-end">
          <Button
            href="https://cal.com/rabiiahmadesteitie/lets-connect"
            variant="yellow"
            withArrow
            external
          >
            {c("talkToUs")}
          </Button>
          <Button href="/sandbox-access" variant="mint">
            {c("requestSandbox")}
          </Button>
        </div>
      </div>
    </section>
  );
}
