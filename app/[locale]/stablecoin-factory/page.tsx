import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "metadata.stablecoinFactory",
  });
  return { title: t("title"), description: t("description") };
}

export default async function StablecoinFactoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("stablecoinFactory");
  const c = await getTranslations("common");

  return (
    <>
      <SiteHeader back={{ href: "/", labelKey: "overview" }} />
      <main className="mx-auto mt-7 grid w-[min(1180px,calc(100vw-32px))] gap-6">
        <Reveal>
          <section className="relative overflow-hidden rounded-2xl border border-[rgba(25,34,53,0.12)] bg-gradient-to-br from-white/96 to-[rgba(248,250,252,0.9)] p-8 shadow-[var(--shadow-brand)] sm:p-12 lg:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(circle, rgba(243,178,63,0.18), transparent 60%)",
                filter: "blur(28px)",
              }}
            />
            <div className="relative">
              <p className="section-label">{t("hero.eyebrow")}</p>
              <h1 className="mt-3 display-1 max-w-[16ch] text-ink">
                {t("hero.title")}
              </h1>
              <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted sm:text-lg">
                {t("hero.body")}
              </p>
            </div>
          </section>
        </Reveal>

        <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.06}>
          <RevealItem>
            <article className="h-full rounded-xl border border-line bg-surface p-6">
              <p className="section-label">{c("for")}</p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {t("forBody")}
              </p>
            </article>
          </RevealItem>
          <RevealItem>
            <article className="h-full rounded-xl border border-line bg-surface p-6">
              <p className="section-label">{c("helpsWith")}</p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {t("helpsBody")}
              </p>
            </article>
          </RevealItem>
        </RevealGroup>

        <Reveal>
          <section className="grid items-start gap-3 rounded-2xl border border-line bg-white/72 p-7 sm:p-9">
            <p className="section-label text-quiet">{t("comingSoon.eyebrow")}</p>
            <h2 className="display-2 text-ink">{t("comingSoon.title")}</h2>
            <p className="max-w-[60ch] text-base leading-relaxed text-muted">
              {t("comingSoon.body")}
            </p>
            <div className="mt-2">
              <Button href="/" variant="solid" withArrow>
                {c("backToOverview")}
              </Button>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
