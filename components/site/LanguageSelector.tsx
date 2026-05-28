"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LanguageSelector({
  variant = "default",
}: {
  variant?: "default" | "sand";
}) {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onChange(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <label
      className={cn(
        "relative inline-flex items-center gap-2 rounded-lg border px-2.5 py-2 text-sm font-medium transition-colors duration-200",
        variant === "sand"
          ? "border-sand-line text-sand-deep hover:border-sand-deep"
          : "border-line bg-surface text-muted hover:text-ink hover:border-ink/40",
        isPending && "opacity-60",
      )}
    >
      <Languages aria-hidden className="h-4 w-4" />
      <span className="sr-only">{t("language")}</span>
      <select
        aria-label={t("language")}
        value={locale}
        disabled={isPending}
        onChange={(e) => onChange(e.target.value as Locale)}
        className="cursor-pointer appearance-none bg-transparent pr-1 focus:outline-none"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {localeNames[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
