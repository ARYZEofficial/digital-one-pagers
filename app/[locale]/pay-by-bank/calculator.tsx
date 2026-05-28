"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  averageTransactionValueOptions,
  computeSavings,
  monthlyTransactionOptions,
} from "@/lib/calculator";
import { type Currency, formatCurrency, formatUnitPrice } from "@/lib/format";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const currencies: Currency[] = ["EUR", "GBP", "USD", "DKK"];

export function Calculator() {
  const t = useTranslations("payByBank.calculator");
  const c = useTranslations("common");
  const [monthlyTransactions, setMonthlyTransactions] = useState(750_000);
  const [averageTransactionValue, setAverageTransactionValue] = useState(50);
  // Stored as a string so users can fully clear the field; parsed for math.
  // Accepts both "." and "," as decimal separators (locale-friendly).
  const [cardFeeInput, setCardFeeInput] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("EUR");

  const currentCardFeePercent = useMemo(() => {
    const normalized = cardFeeInput.replace(",", ".");
    const n = Number.parseFloat(normalized);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [cardFeeInput]);

  const result = useMemo(
    () =>
      computeSavings({
        monthlyTransactions,
        averageTransactionValue,
        currentCardFeePercent,
      }),
    [monthlyTransactions, averageTransactionValue, currentCardFeePercent],
  );

  const cur = (n: number) => formatCurrency(n, currency);
  const unit = (n: number) => formatUnitPrice(n, currency);

  return (
    <section
      id="calculator"
      className="relative scroll-mt-20 overflow-hidden rounded-2xl border border-[rgba(18,20,23,0.10)] bg-gradient-to-b from-white to-[#f8fafc] p-7 shadow-[0_22px_56px_rgba(18,20,23,0.10)] sm:p-10"
    >
      <span
        aria-hidden
        className="absolute left-8 top-0 h-1 w-[210px] rounded-full bg-green"
      />
      <div className="mb-6 max-w-[720px]">
        <p className="section-label text-quiet">{t("eyebrow")}</p>
        <h2 className="mt-2 display-2 text-ink max-w-[14ch]">{t("title")}</h2>
        <p className="mt-3 max-w-[40rem] text-base leading-relaxed text-muted">
          {t("body")}
        </p>
        <p className="mt-3 max-w-[58ch] text-xs leading-snug text-quiet">
          {t("disclaimer")}
        </p>
      </div>

      <div className="grid items-start gap-3 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)]">
        <form
          className="grid h-fit gap-2.5 rounded-xl border border-[rgba(18,20,23,0.08)] bg-white/72 p-3.5"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field label={t("fields.monthlyTransactions")}>
            <select
              value={monthlyTransactions}
              onChange={(e) => setMonthlyTransactions(Number(e.target.value))}
              className={fieldInput}
            >
              {monthlyTransactionOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {t(`transactionOptions.${o.key}`)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("fields.averagePayment")}>
            <select
              value={averageTransactionValue}
              onChange={(e) =>
                setAverageTransactionValue(Number(e.target.value))
              }
              className={fieldInput}
            >
              {averageTransactionValueOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {t(`averageOptions.${o.key}`)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("fields.cardFee")}>
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              placeholder={t("fields.cardFeePlaceholder")}
              value={cardFeeInput}
              onChange={(e) => {
                // Allow only digits + a single decimal separator (".", ",").
                const cleaned = e.target.value.replace(/[^0-9.,]/g, "");
                setCardFeeInput(cleaned);
              }}
              className={fieldInput}
              aria-label={t("fields.cardFeeAria")}
            />
          </Field>
          <Field label={t("fields.currency")}>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className={fieldInput}
            >
              {currencies.map((cc) => (
                <option key={cc} value={cc}>
                  {cc}
                </option>
              ))}
            </select>
          </Field>
        </form>

        <div className="grid gap-2.5">
          <article
            className={cn(
              "relative overflow-hidden rounded-xl p-5 text-white shadow-[var(--shadow-green)] transition-colors",
              result.isNegative
                ? "border border-[rgba(194,65,50,0.24)] bg-gradient-to-br from-[#2a1d1d] to-[#15171b]"
                : "border border-[rgba(17,132,91,0.36)] bg-gradient-to-br from-green to-[#0a5f42]",
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-1/3 -top-1/3 h-[280px] w-[280px] rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.22), transparent 60%)",
                filter: "blur(28px)",
              }}
            />
            <div className="relative">
              <p className="section-label text-white/68">
                {t("result.potentialSaving")}
              </p>
              <p className="mt-2 text-base text-white/68">
                {t.rich("result.estimatedMonthly", {
                  b: (chunks) => (
                    <strong className="inline-block rounded-full bg-white/18 px-2 py-px font-extrabold">
                      {chunks}
                    </strong>
                  ),
                })}
              </p>
              {result.isNegative ? (
                <p className="mt-3 text-[1.85rem] font-bold leading-tight text-[#ffd8d4] [text-shadow:0_10px_28px_rgba(0,0,0,0.18)] sm:text-[2.15rem]">
                  {t("result.noSaving")}
                </p>
              ) : (
                <p className="mt-3 text-[2rem] font-bold leading-tight text-white [text-shadow:0_10px_28px_rgba(0,0,0,0.18)] sm:text-[2.45rem]">
                  <AnimatedNumber
                    value={result.monthlySavings}
                    format={cur}
                  />
                </p>
              )}
              <p
                className={cn(
                  "mt-2 text-sm font-medium leading-snug",
                  result.isNegative ? "text-[#ffd8d4]" : "text-white/86",
                )}
              >
                {result.isNegative
                  ? t("result.negativeNote")
                  : t("result.savingNote")}
              </p>
            </div>
          </article>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <ResultCard label={t("result.monthlyVolume")}>
              <AnimatedNumber value={result.monthlyVolume} format={cur} />
            </ResultCard>
            <ResultCard label={t("result.currentCardCost")} tone="red">
              <AnimatedNumber value={result.currentCardCost} format={cur} />
            </ResultCard>
            <ResultCard label={t("result.yearlySavings")} tone="green">
              {result.isNegative ? (
                t("result.noSaving")
              ) : (
                <AnimatedNumber value={result.yearlySavings} format={cur} />
              )}
            </ResultCard>
            <ResultCard label={t("result.fixedPrice")} tone="blue">
              {t("result.perTx", { price: unit(result.unitPrice) })}
            </ResultCard>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2.5 rounded-xl border border-[rgba(25,34,53,0.10)] bg-white/72 p-3.5">
            <Button
              href="https://cal.com/rabiiahmadesteitie/lets-connect"
              variant="solid"
              external
              className="flex-1 min-w-[220px]"
              withArrow
            >
              {c("talkToUs")}
            </Button>
            <Button
              href="/sandbox-access"
              variant="mint"
              className="flex-1 min-w-[220px]"
            >
              {c("requestSandbox")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const fieldInput =
  "w-full min-h-[46px] rounded-lg border border-[rgba(18,20,23,0.12)] bg-white px-3 py-2 text-sm text-ink shadow-[0_1px_0_rgba(18,20,23,0.03)] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[rgba(25,34,53,0.10)] focus:border-[rgba(25,34,53,0.35)] transition-colors";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid min-w-0 gap-1.5">
      <span className="text-[0.84rem] font-semibold leading-tight text-ink [overflow-wrap:anywhere]">
        {label}
      </span>
      {children}
    </label>
  );
}

function ResultCard({
  label,
  children,
  tone,
}: {
  label: string;
  children: React.ReactNode;
  tone?: "red" | "green" | "blue";
}) {
  const valueColor =
    tone === "red"
      ? "text-red"
      : tone === "green"
        ? "text-green"
        : tone === "blue"
          ? "text-blue"
          : "text-ink";

  return (
    <article className="grid min-h-[78px] content-center rounded-xl border border-[rgba(18,20,23,0.09)] bg-white p-3">
      <p className="section-label text-quiet">{label}</p>
      <p
        className={cn(
          "mt-2 text-[1.28rem] font-bold leading-tight tabular-nums",
          valueColor,
        )}
      >
        {children}
      </p>
    </article>
  );
}
