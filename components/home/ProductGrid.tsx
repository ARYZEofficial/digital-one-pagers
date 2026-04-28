import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type Product = {
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  href: string;
  state: "live" | "soon";
};

const products: Product[] = [
  {
    eyebrow: "High-volume merchants",
    title: "Pay by Bank",
    tagline: "Get paid better.",
    body:
      "For UK payment-driven merchants where card friction, settlement, or chargebacks affect performance.",
    href: "/pay-by-bank",
    state: "live",
  },
  {
    eyebrow: "Token issuers",
    title: "Stablecoin Factory",
    tagline: "Launch faster.",
    body:
      "For builders and technical teams with a clear stablecoin idea.",
    href: "/stablecoin-factory",
    state: "soon",
  },
  {
    eyebrow: "Licensed institutions",
    title: "Digital Cash",
    tagline: "Operate properly.",
    body:
      "For already-licensed institutions with digital cash operating needs.",
    href: "/digital-cash",
    state: "soon",
  },
];

export function ProductGrid() {
  return (
    <section
      aria-labelledby="product-overview-title"
      className="grid gap-5"
    >
      <SectionHeading
        eyebrow="Product one-pagers"
        title="Choose where to go next."
        size="large"
        id="product-overview-title"
      />
      <RevealGroup
        className="grid gap-4 lg:grid-cols-3"
        stagger={0.08}
      >
        {products.map((p) => (
          <RevealItem key={p.title} className="h-full">
            <ProductCard product={p} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const isLive = product.state === "live";
  const className = cn(
    "group relative flex h-full flex-col rounded-xl p-7 transition-all duration-200",
    isLive
      ? "bg-navy text-white shadow-[var(--shadow-navy)] hover:-translate-y-0.5 hover:shadow-[0_30px_70px_rgba(25,34,53,0.30)]"
      : "border border-[rgba(25,34,53,0.1)] bg-gradient-to-b from-[#f8fafc] to-[#f3f5f8] text-muted hover:-translate-y-0.5 hover:border-[rgba(37,99,235,0.22)]",
  );

  const inner = (
    <>
      {isLive ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 100% 0%, rgba(243,178,63,0.10), transparent 40%)",
          }}
        />
      ) : null}
      <div className="relative flex h-full flex-col">
        <p className={cn("section-label", isLive && "text-white/72")}>
          {product.eyebrow}
        </p>
        <h3
          className={cn(
            "mt-4 display-3 leading-[1.05]",
            isLive ? "text-white" : "text-ink",
          )}
        >
          {product.title}
        </h3>
        <p className="mt-2 text-base font-semibold text-yellow">
          {product.tagline}
        </p>
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed",
            isLive ? "text-white/72" : "text-muted",
          )}
        >
          {product.body}
        </p>
        <div className="mt-auto pt-6">
          {isLive ? (
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              Read more
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </span>
          ) : (
            <span className="inline-flex w-fit items-center justify-center rounded-full border border-[rgba(25,34,53,0.10)] bg-white/78 px-3.5 py-2 text-xs font-medium text-muted">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (isLive) {
    return (
      <Link href={product.href} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}

export function HomeBottomCta() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[rgba(25,34,53,0.34)] bg-gradient-to-br from-navy to-[#101827] p-8 text-white shadow-[var(--shadow-brand-strong)] sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/3 -top-1/3 h-[420px] w-[420px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(243,178,63,0.18), transparent 60%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="max-w-[58ch]">
          <p className="section-label text-white/72">For payment-driven merchants</p>
          <h2 className="mt-3 display-2 text-white">
            See what fixed pricing could mean for your business.
          </h2>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-white/72 sm:text-base">
            Run the savings calculator on Pay by Bank, then book a call to walk
            through your payment flow.
          </p>
        </div>
        <div className="grid gap-3 sm:justify-items-end">
          <Button href="/pay-by-bank" variant="yellow" withArrow>
            Open Pay by Bank
          </Button>
          <Button
            href="https://cal.com/rabiiahmadesteitie/lets-connect"
            variant="outline-on-dark"
            external
          >
            Talk to us
          </Button>
        </div>
      </div>
    </section>
  );
}
