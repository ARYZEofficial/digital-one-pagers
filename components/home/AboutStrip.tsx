import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const items = [
  {
    label: "Mission",
    body: "Build payment products that give merchants more control, clearer evidence, and fewer operational compromises.",
  },
  {
    label: "Vision",
    body: "A payments environment where merchants can move faster without sacrificing clarity, control, or accountability.",
  },
  {
    label: "Values",
    body: "Clear rules, evidence over story, operator-first design, and scaling without losing control.",
  },
] as const;

export function AboutStrip() {
  return (
    <RevealGroup
      className="grid gap-3 sm:grid-cols-3"
      stagger={0.06}
    >
      {items.map((item) => (
        <RevealItem key={item.label}>
          <article className="h-full rounded-xl border border-[rgba(18,20,23,0.08)] bg-white/76 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(37,99,235,0.22)] hover:shadow-[0_18px_44px_rgba(18,20,23,0.06)]">
            <span className="block text-sm font-bold text-ink">
              {item.label}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </article>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
