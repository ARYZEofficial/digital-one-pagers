import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mx-auto mt-24 mb-10 w-[min(1180px,calc(100vw-32px))]">
      <div className="grid grid-cols-1 items-center gap-4 border-t border-line pt-6 sm:grid-cols-[1fr_auto] sm:gap-8">
        <p className="text-sm text-quiet">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <Link href="/" className="hover:text-ink transition-colors">
            {t("overview")}
          </Link>
          <Link href="/pay-by-bank" className="hover:text-ink transition-colors">
            {t("payByBank")}
          </Link>
          <Link
            href="/stablecoin-factory"
            className="hover:text-ink transition-colors"
          >
            {t("stablecoinFactory")}
          </Link>
          <Link
            href="/digital-cash"
            className="hover:text-ink transition-colors"
          >
            {t("digitalCash")}
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
