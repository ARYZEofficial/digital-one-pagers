import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LanguageSelector } from "./LanguageSelector";

type Props = {
  back?: { href: string; labelKey: "overview" | "payByBank" } | null;
  variant?: "default" | "sand";
};

export function SiteHeader({ back = null, variant = "default" }: Props) {
  const t = useTranslations("footer");
  const th = useTranslations("header");

  return (
    <header
      className={cn(
        "site-header relative z-10 mx-auto flex w-[min(1180px,calc(100vw-32px))] items-center justify-between gap-4 pt-5",
      )}
    >
      <Link
        href="/"
        aria-label={th("homeAriaLabel")}
        className="inline-flex items-center"
      >
        <Image
          src="/aryze-logo-wordmark.png"
          alt="Aryze"
          width={224}
          height={64}
          priority
          className="h-7 w-auto"
        />
      </Link>
      <div className="flex items-center gap-3">
        {back ? (
          <Link
            href={back.href}
            className={cn(
              "rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-200",
              variant === "sand"
                ? "border-sand-line text-sand-deep hover:border-sand-deep"
                : "border-line bg-surface text-muted hover:text-ink hover:border-ink/40",
            )}
          >
            {t(back.labelKey)}
          </Link>
        ) : null}
        <LanguageSelector variant={variant} />
      </div>
    </header>
  );
}
