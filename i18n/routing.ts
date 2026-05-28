import { defineRouting } from "next-intl/routing";

export const locales = ["en", "it", "es", "zh", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Locales that render right-to-left.
export const rtlLocales: readonly Locale[] = ["ar"];

// Native-script display names for the language selector.
export const localeNames: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  es: "Español",
  zh: "中文",
  ar: "العربية",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Always show the locale in the URL (/en, /it, ...). Visiting `/` redirects
  // to the best match from the Accept-Language header.
  localePrefix: "always",
});
