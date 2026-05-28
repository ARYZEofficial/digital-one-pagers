import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function HomeHero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[rgba(25,34,53,0.12)] bg-gradient-to-br from-white/96 to-[rgba(248,250,252,0.9)] p-8 shadow-[var(--shadow-brand)] sm:p-12 lg:p-14">
      {/* halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(17,132,91,0.18), transparent 60%)",
          filter: "blur(20px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -bottom-32 h-96 w-96 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.18), transparent 60%)",
          filter: "blur(28px)",
        }}
      />
      <div className="relative grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <RevealGroup className="grid gap-5">
          <RevealItem>
            <p className="section-label">{t("eyebrow")}</p>
          </RevealItem>
          <RevealItem>
            <h1 className="display-1 max-w-[18ch] text-ink">{t("title")}</h1>
          </RevealItem>
          <RevealItem>
            <p className="max-w-[60ch] text-base leading-relaxed text-muted sm:text-lg">
              {t("body")}
            </p>
          </RevealItem>
          <RevealItem>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button href="/pay-by-bank" variant="solid" pulse withArrow>
                {t("ctaPrimary")}
              </Button>
              <Button href="https://aryze.io" variant="ghost" external>
                {t("ctaSecondary")}
              </Button>
            </div>
          </RevealItem>
        </RevealGroup>

        <RevealItem className="lg:justify-self-end">
          <div className="relative overflow-hidden rounded-xl border border-[rgba(25,34,53,0.4)] bg-navy p-6 text-white shadow-[var(--shadow-navy)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-1/3 -top-1/3 h-72 w-72 rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(circle, rgba(243,178,63,0.20), transparent 60%)",
                filter: "blur(28px)",
              }}
            />
            <div className="relative">
              <p className="section-label text-white/64">{t("teamEyebrow")}</p>
              <h2 className="mt-3 display-3 leading-tight text-white">
                {t("teamTitle")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/72">
                {t("teamBody")}
              </p>
            </div>
          </div>
        </RevealItem>
      </div>
    </section>
  );
}
