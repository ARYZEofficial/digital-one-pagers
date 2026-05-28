import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk } from "next/font/google";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { routing, rtlLocales, type Locale } from "@/i18n/routing";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-stack",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://aryze.io"),
    title: {
      default: "Aryze",
      template: "%s | Aryze",
    },
    description: t("default.description"),
    openGraph: {
      title: "Aryze",
      description: t("default.ogDescription"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Aryze",
      description: t("default.ogDescription"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${GeistSans.variable} ${spaceGrotesk.variable}`}
      style={
        {
          // Geist exposes itself via `--font-geist-sans`; map it to our display stack var.
          "--font-display-stack": "var(--font-geist-sans)",
        } as React.CSSProperties
      }
    >
      <body className="font-body text-ink antialiased">
        <NextIntlClientProvider>
          <GradientBackground />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
