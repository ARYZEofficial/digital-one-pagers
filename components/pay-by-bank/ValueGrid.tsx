import type { ReactNode } from "react";
import { MastercardMark } from "@/components/ui/MastercardMark";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Feature = { title: string; body: string; mark?: ReactNode };

const features: Feature[] = [
  { title: "Fixed per transaction", body: "Predictable cost per payment." },
  { title: "Near-zero chargebacks", body: "Irrevocable A2A payments." },
  { title: "Direct bank payment", body: "Players pay directly from their bank." },
  { title: "Secure authentication", body: "Bank-level SCA approval." },
  {
    title: "Mastercard rails",
    body: "Built for deposits at scale.",
    mark: <MastercardMark className="mb-3" />,
  },
];

export function ValueGrid() {
  return (
    <section
      aria-labelledby="aryze-gains-title"
      className="grid gap-5 py-6"
    >
      <SectionHeading
        eyebrow="What changes"
        title="What merchants gain."
        body="A new payment method without rebuilding your checkout."
        size="large"
        id="aryze-gains-title"
      />
      <RevealGroup
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        stagger={0.05}
      >
        {features.map((f) => (
          <RevealItem key={f.title} className="h-full">
            <article className="group relative flex h-full flex-col rounded-xl border border-line bg-gradient-to-b from-white to-surface-raised p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(37,99,235,0.22)] hover:shadow-[0_18px_44px_rgba(18,20,23,0.08)]">
              {f.mark ? (
                f.mark
              ) : (
                <span
                  aria-hidden
                  className="mb-3 block h-[3px] w-7 rounded-full bg-blue"
                />
              )}
              <h3 className="text-[0.95rem] font-semibold leading-tight text-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-snug text-muted">{f.body}</p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
