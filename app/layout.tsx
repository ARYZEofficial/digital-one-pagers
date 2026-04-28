import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk } from "next/font/google";
import { GradientBackground } from "@/components/ui/GradientBackground";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-stack",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aryze.io"),
  title: {
    default: "Aryze",
    template: "%s | Aryze",
  },
  description:
    "Aryze builds payment products for operators that need clearer control, clearer evidence, and payment flows that hold up in practice.",
  openGraph: {
    title: "Aryze",
    description:
      "Built in Copenhagen for better money movement. Pay by Bank, Stablecoin Factory, Digital Cash.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryze",
    description:
      "Built in Copenhagen for better money movement. Pay by Bank, Stablecoin Factory, Digital Cash.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${spaceGrotesk.variable}`}
      style={
        {
          // Geist exposes itself via `--font-geist-sans`; map it to our display stack var.
          "--font-display-stack": "var(--font-geist-sans)",
        } as React.CSSProperties
      }
    >
      <body className="font-body text-ink antialiased">
        <GradientBackground />
        {children}
      </body>
    </html>
  );
}
