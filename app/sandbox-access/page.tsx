import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { SandboxForm } from "./sandbox-form";

export const metadata: Metadata = {
  title: "Sandbox Access",
  description:
    "Request sandbox access for Aryze Pay by Bank and share your company, payment setup, and testing intent.",
};

export default function SandboxAccessPage() {
  return (
    <>
      <SiteHeader
        back={{ href: "/pay-by-bank", label: "Pay by Bank" }}
        variant="sand"
      />
      <main className="mx-auto mt-9 w-[min(1180px,calc(100vw-32px))]">
        <section className="max-w-[880px] py-12 sm:py-14">
          <p className="section-label">Aryze Pay by Bank</p>
          <h1 className="mt-3 display-1 max-w-[20ch] text-sand-deep">
            Get sandbox access for Pay by Bank
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-sand-bay">
            Test a direct account-to-account payment flow built for merchants
            that need faster settlement, lower payment friction, and stronger
            control over incoming payments.
          </p>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[#586873]">
            Tell us about your business, payment setup, and what you want to
            test. We&rsquo;ll use this to understand whether Pay by Bank is the
            right fit and prepare the right sandbox access for your use case.
          </p>
        </section>

        <section
          aria-label="Sandbox request"
          className="grid items-start gap-8 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1fr)]"
        >
          <aside className="sticky top-6 grid gap-4">
            <div className="rounded-2xl border border-sand-line bg-white p-7">
              <p className="section-label">Sandbox overview</p>
              <h2 className="mt-3 display-3 text-sand-deep">
                Built for payment-driven merchants
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#52636d]">
                Pay by Bank is designed for merchants where payments affect
                margin, settlement, cash flow, customer experience, chargebacks,
                refunds, reconciliation, and daily operations.
              </p>
            </div>
            <div className="grid gap-2.5" aria-label="Sandbox benefits">
              {[
                ["01", "Test the payment flow before going live"],
                ["02", "Share your payment setup and use case"],
                ["03", "Get the right sandbox access for your business"],
              ].map(([n, body]) => (
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
