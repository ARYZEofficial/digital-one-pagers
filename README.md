# Aryze Digital One-Pagers

Next.js 15 marketing site for Aryze: an overview, **Pay by Bank** with a savings calculator, two coming-soon product pages, and a multi-step **sandbox-access** form.

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS v4 (CSS-first config via `@theme`)
- [Motion](https://motion.dev) (Framer Motion) for animation
- React Hook Form + Zod for the sandbox wizard
- [Resend](https://resend.com) for transactional email (with mailto fallback)

## Local development

```bash
npm install
npm run dev
# http://localhost:3000
```

## Environment

Copy `.env.local.example` to `.env.local` and add a Resend API key when you're ready for real email submissions. Without a key the sandbox form falls back to opening the user's mail client (preserving the original site's behaviour).

```bash
cp .env.local.example .env.local
```

## Deploy to Vercel

```bash
npx vercel link        # one-off, choose / create the project
npx vercel env add RESEND_API_KEY production preview development   # optional
npx vercel deploy      # preview
npx vercel deploy --prod   # production
```

## Layout

```
app/
  layout.tsx, template.tsx, globals.css, page.tsx
  pay-by-bank/page.tsx + calculator.tsx
  sandbox-access/page.tsx + sandbox-form.tsx
  stablecoin-factory/page.tsx
  digital-cash/page.tsx
  api/sandbox/route.ts          # Resend send + Zod validation
components/
  ui/                            # Button, Card, Reveal, AnimatedNumber, ...
  site/                          # SiteHeader, Footer
  home/, pay-by-bank/            # page-specific blocks
lib/
  calculator.ts, format.ts, transaction-bands.ts, sandbox-schema.ts, cn.ts
public/
  aryze-logo-wordmark.png, grain.png
```

## Brand palette

```
--page #f4f6f8   --surface #fff    --ink #121417
--muted #5b6472  --quiet #8a93a1   --line #dfe4ea
--navy #192235   --blue #2563eb    --green #11845b
--red #c24132    --yellow #f3b23f
sandbox: --sand-deep #001e2b  --sand-teal #007599  --sand-mint #d9f5ea
```
