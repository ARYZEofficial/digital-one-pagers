import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto mt-24 mb-10 w-[min(1180px,calc(100vw-32px))]">
      <div className="grid grid-cols-1 items-center gap-4 border-t border-line pt-6 sm:grid-cols-[1fr_auto] sm:gap-8">
        <p className="text-sm text-quiet">
          © {new Date().getFullYear()} Aryze. Built in Copenhagen.
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <Link href="/" className="hover:text-ink transition-colors">
            Overview
          </Link>
          <Link href="/pay-by-bank" className="hover:text-ink transition-colors">
            Pay by Bank
          </Link>
          <Link
            href="/stablecoin-factory"
            className="hover:text-ink transition-colors"
          >
            Stablecoin Factory
          </Link>
          <Link
            href="/digital-cash"
            className="hover:text-ink transition-colors"
          >
            Digital Cash
          </Link>
          <a
            href="https://aryze.io"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-ink transition-colors"
          >
            aryze.io
          </a>
        </nav>
      </div>
    </footer>
  );
}
