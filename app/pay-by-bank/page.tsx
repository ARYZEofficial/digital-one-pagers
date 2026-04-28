import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { PayByBankHero } from "@/components/pay-by-bank/Hero";
import { PaymentPain } from "@/components/pay-by-bank/PaymentPain";
import { ValueGrid } from "@/components/pay-by-bank/ValueGrid";
import { OnboardingSteps } from "@/components/pay-by-bank/OnboardingSteps";
import { AboutAryze } from "@/components/pay-by-bank/AboutAryze";
import { DemoCTA } from "@/components/pay-by-bank/DemoCTA";
import { Calculator } from "./calculator";

export const metadata: Metadata = {
  title: "Pay by Bank",
  description:
    "Pay by Bank helps UK merchants reduce card friction and understand potential payment savings.",
};

export default function PayByBankPage() {
  return (
    <>
      <SiteHeader back={{ href: "/", label: "Overview" }} />
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
