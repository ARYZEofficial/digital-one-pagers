import { Button } from "@/components/ui/Button";
import { MastercardMark } from "@/components/ui/MastercardMark";
import { MetricPill } from "@/components/ui/MetricPill";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function PayByBankHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[rgba(25,34,53,0.12)] bg-gradient-to-br from-white/96 to-[rgba(240,247,255,0.92)] p-8 shadow-[var(--shadow-brand-strong)] sm:p-12 lg:p-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.18), transparent 60%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-[-200px] h-[420px] w-[420px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(17,132,91,0.16), transparent 60%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <RevealGroup className="grid gap-5">
          <RevealItem>
            <p className="section-label">Pay by Bank</p>
          </RevealItem>
          <RevealItem>
            <h1 className="display-1 max-w-[20ch] text-ink">
              Stop letting card fees scale with your growth.
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="max-w-[60ch] text-base leading-relaxed text-muted sm:text-lg">
              For casinos, iGaming, and high-volume merchants that need
              predictable pricing, fewer disputes, and faster deposits via
              Mastercard Payment Rails.
              <MastercardMark inline className="ml-1.5" />
            </p>
          </RevealItem>
          <RevealItem>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button href="#calculator" variant="solid" pulse withArrow>
                Calculate savings
              </Button>
              <Button
                href="https://cal.com/rabiiahmadesteitie/lets-connect"
                variant="ghost"
                external
              >
                Talk to us
              </Button>
            </div>
          </RevealItem>
        </RevealGroup>

        <RevealItem className="lg:justify-self-end">
          <MetricPill
            label="Best fit"
            value="Casinos, iGaming, betting, and high-volume deposit flows."
            bullets={[
              "Fixed flat fees",
              "Near-zero chargebacks",
              "Mastercard Open Banking rails",
            ]}
          />
        </RevealItem>
      </div>
    </section>
  );
}
