import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const issues = [
  {
    title: "High card fees",
    body: "Percentage costs grow with every deposit.",
  },
  {
    title: "Chargebacks drain time",
    body: "Disputes cost revenue and operational focus.",
  },
  {
    title: "Players abandon deposits",
    body: "Card details add friction at checkout.",
  },
] as const;

export function PaymentPain() {
  return (
    <section
      aria-labelledby="payment-pain-title"
      className="grid gap-5 py-6"
    >
      <SectionHeading
        eyebrow="Payment pain"
        title="Is your checkout costing you?"
        body="The three costs most high-volume merchants feel first."
        size="large"
        id="payment-pain-title"
      />
      <RevealGroup
        className="grid gap-3 sm:grid-cols-3"
        stagger={0.06}
      >
        {issues.map((issue) => (
          <RevealItem key={issue.title}>
            <article className="h-full rounded-xl border border-[rgba(18,20,23,0.08)] bg-white/74 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(194,65,50,0.22)]">
              <h3 className="text-base font-semibold leading-tight text-ink">
                {issue.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {issue.body}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
