import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { PayByBankHero } from "@/components/pay-by-bank/Hero";
import { PaymentPain } from "@/components/pay-by-bank/PaymentPain";
import { ValueGrid } from "@/components/pay-by-bank/ValueGrid";
import { OnboardingSteps } from "@/components/pay-by-bank/OnboardingSteps";
import { AboutAryze } from "@/components/pay-by-bank/AboutAryze";
import { DemoCTA } from "@/components/pay-by-bank/DemoCTA";
import { Calculator } from "./calculator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.payByBank" });
  return { title: t("title"), description: t("description") };
}

export default async function PayByBankPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader back={{ href: "/", labelKey: "overview" }} />
      <main className="mx-auto mt-7 grid w-[min(1180px,calc(100vw-32px))] gap-6">
        <PayByBankHero />
        <PaymentPain />
        <ValueGrid />
        <Calculator />
        <OnboardingSteps />
        <AboutAryze />
        <DemoCTA />
      </main>
      <Footer />
    </>
  );
}
