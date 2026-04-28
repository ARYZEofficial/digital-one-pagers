import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const points = [
  {
    label: "Focus",
    body: "Bank payments and digital money infrastructure.",
  },
  {
    label: "Market",
    body: "Serving regulated and payment-heavy merchants.",
  },
  {
    label: "Access",
    body: "UK licence via partnership. Mastercard Open Banking rails.",
  },
] as const;

export function AboutAryze() {
  return (
    <section
      aria-labelledby="about-aryze-title"
      className="grid items-start gap-6 py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
    >
      <div className="max-w-[52ch]">
        <p className="section-label">About Aryze</p>
        <h2 id="about-aryze-title" className="mt-2 display-2 text-ink">
          Built for predictable money movement.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Founded in Denmark in 2017, Aryze PSP builds payment infrastructure
          for predictable money movement.
        </p>
      </div>
      <RevealGroup
        className="grid gap-3 sm:grid-cols-3"
        stagger={0.06}
      >
        {points.map((p) => (
          <RevealItem key={p.label}>
            <article className="h-full rounded-xl border border-[rgba(18,20,23,0.08)] bg-white/72 p-4">
              <span className="block text-sm font-bold text-ink">
                {p.label}
              </span>
              <p className="mt-1.5 text-sm leading-snug text-muted">
                {p.body}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
