import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    n: 1,
    title: "Map payment flow",
    body: "Understand your deposit flow, markets, volume, and current payment friction.",
  },
  {
    n: 2,
    title: "Complete KYB",
    body: "Collect company details, required documents, and approvals.",
  },
  {
    n: 3,
    title: "Integrate & test",
    body: "Set up payment flows, callbacks, reporting, and test journeys.",
  },
  {
    n: 4,
    title: "Go live",
    body: "Launch with monitoring, support, and a clear handover.",
  },
] as const;

export function OnboardingSteps() {
  return (
    <section
      aria-labelledby="onboarding-title"
      className="grid gap-5 py-6"
    >
      <SectionHeading
        eyebrow="Implementation"
        title="From payment flow to live processing."
        body="We map your payment flow, complete KYB, integrate, test, and support launch."
        size="large"
        id="onboarding-title"
      />
      <div
        className="hidden grid-cols-4 gap-3 lg:grid"
        aria-hidden
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="h-0.5 rounded-full bg-[rgba(25,34,53,0.16)]"
          />
        ))}
      </div>
      <RevealGroup
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.07}
      >
        {steps.map((s) => (
          <RevealItem key={s.n} className="h-full">
            <article className="grid h-full content-start gap-3 rounded-xl border border-[rgba(18,20,23,0.08)] bg-white/82 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(18,20,23,0.06)]">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(25,34,53,0.14)] bg-white text-sm font-semibold text-navy">
                {s.n}
              </span>
              <h3 className="text-base font-semibold leading-tight text-ink">
                {s.title}
              </h3>
              <p className="text-sm leading-snug text-muted">{s.body}</p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
