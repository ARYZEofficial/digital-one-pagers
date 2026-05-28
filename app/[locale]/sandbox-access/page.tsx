import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { SandboxForm } from "./sandbox-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "metadata.sandboxAccess",
  });
  return { title: t("title"), description: t("description") };
}

export default async function SandboxAccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sandbox");

  const benefits = [
    ["01", t("aside.benefits.one")],
    ["02", t("aside.benefits.two")],
    ["03", t("aside.benefits.three")],
  ] as const;

  return (
    <>
      <SiteHeader
        back={{ href: "/pay-by-bank", labelKey: "payByBank" }}
        variant="sand"
      />
      <main className="mx-auto mt-9 w-[min(1180px,calc(100vw-32px))]">
        <section className="max-w-[880px] py-12 sm:py-14">
          <p className="section-label">{t("intro.eyebrow")}</p>
          <h1 className="mt-3 display-1 max-w-[20ch] text-sand-deep">
            {t("intro.title")}
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-sand-bay">
            {t("intro.body")}
          </p>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[#586873]">
            {t("intro.body2")}
          </p>
        </section>

        <section
          aria-label={t("aside.eyebrow")}
          className="grid items-start gap-8 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1fr)]"
        >
          <aside className="sticky top-6 grid gap-4">
            <div className="rounded-2xl border border-sand-line bg-white p-7">
              <p className="section-label">{t("aside.eyebrow")}</p>
              <h2 className="mt-3 display-3 text-sand-deep">
                {t("aside.title")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#52636d]">
                {t("aside.body")}
              </p>
            </div>
            <div className="grid gap-2.5">
              {benefits.map(([n, body]) => (
                <article
                  key={n}
                  className="grid grid-cols-[auto_1fr] items-start gap-3 rounded-xl border border-sand-line/82 bg-white p-4"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sand-mint text-xs font-bold text-sand-deep">
                    {n}
                  </span>
                  <p className="mt-1 text-[0.96rem] leading-snug text-sand-bay">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </aside>

          <div>
            <SandboxForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
