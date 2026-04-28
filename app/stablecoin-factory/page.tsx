import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Stablecoin Factory",
  description:
    "Stablecoin Factory is a coming-soon Aryze product for simpler stablecoin deployment.",
};

export default function StablecoinFactoryPage() {
  return (
    <>
      <SiteHeader back={{ href: "/", label: "Overview" }} />
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
              <p className="section-label">Stablecoin Factory</p>
              <h1 className="mt-3 display-1 max-w-[16ch] text-ink">
                Launch a simple stablecoin faster.
              </h1>
              <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted sm:text-lg">
                A coming-soon deployment flow for builders and technical teams
                with a clear stablecoin idea.
              </p>
            </div>
          </section>
        </Reveal>

        <RevealGroup
          className="grid gap-4 sm:grid-cols-2"
          stagger={0.06}
        >
          <RevealItem>
            <article className="h-full rounded-xl border border-line bg-surface p-6">
              <p className="section-label">For</p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Builders, technical teams, product teams, innovation teams, and
                exploratory operators.
              </p>
            </article>
          </RevealItem>
          <RevealItem>
            <article className="h-full rounded-xl border border-line bg-surface p-6">
              <p className="section-label">Helps with</p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Moving from stablecoin concept to simple deployment without a
                long enterprise process.
              </p>
            </article>
          </RevealItem>
        </RevealGroup>

        <Reveal>
          <section className="grid items-start gap-3 rounded-2xl border border-line bg-white/72 p-7 sm:p-9">
            <p className="section-label text-quiet">Coming soon</p>
            <h2 className="display-2 text-ink">
              This product page is not active yet.
            </h2>
            <p className="max-w-[60ch] text-base leading-relaxed text-muted">
              Pay by Bank is the current focus. Stablecoin Factory remains part
              of the Aryze product architecture.
            </p>
            <div className="mt-2">
              <Button href="/" variant="solid" withArrow>
                Back to overview
              </Button>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
