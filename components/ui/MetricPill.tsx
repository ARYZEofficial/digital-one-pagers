import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MetricPillProps = {
  label: ReactNode;
  value: ReactNode;
  bullets?: ReadonlyArray<ReactNode>;
  className?: string;
};

export function MetricPill({ label, value, bullets, className }: MetricPillProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-navy text-white p-6",
        "shadow-[var(--shadow-navy)]",
        className,
      )}
    >
      {/* halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1/2 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(243,178,63,0.18), transparent 38%), radial-gradient(circle at 10% 80%, rgba(37,99,235,0.18), transparent 38%)",
          filter: "blur(28px)",
        }}
      />
      <div className="relative">
        <span className="text-xs font-semibold uppercase tracking-[0.06em] text-white/64">
          {label}
        </span>
        <p className="mt-3 text-lg font-semibold leading-snug">{value}</p>
        {bullets && bullets.length > 0 ? (
          <div className="mt-4 grid gap-2 border-t border-white/16 pt-4">
            {bullets.map((bullet, i) => (
              <p
                key={i}
                className="relative pl-4 text-sm text-white/80 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-yellow"
              >
                {bullet}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
