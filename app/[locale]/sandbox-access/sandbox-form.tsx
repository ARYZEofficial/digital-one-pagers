"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useForm, type Path, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  buildEmailBody,
  buildEmailSubject,
  buildSandboxSchema,
  type SandboxErrorMessages,
  type SandboxFormValues,
  sandboxStepFields,
} from "@/lib/sandbox-schema";
import { type SandboxMarket, bandsForMarket } from "@/lib/transaction-bands";
import { cn } from "@/lib/cn";

const RECIPIENT = "rae@aryze.io";

// Canonical English values are submitted and emailed to the Aryze team; the
// `key` selects the translated label shown to the user.
const ROLES = [
  ["Founder / CEO", "founder"],
  ["CFO / Finance Lead", "cfo"],
  ["Head of Payments", "headPayments"],
  ["Payments Manager", "paymentsManager"],
  ["Product Lead", "productLead"],
  ["Operations Lead", "opsLead"],
  ["Risk / Fraud Lead", "riskLead"],
  ["CTO / Engineering Lead", "cto"],
  ["Developer / Technical Lead", "developer"],
  ["Other", "other"],
] as const;

const MARKETS = [
  ["United Kingdom", "uk"],
  ["Denmark", "denmark"],
  ["European Union", "eu"],
  ["Global", "global"],
  ["Other", "other"],
] as const;

const BUSINESS_TYPES = [
  ["Gaming", "gaming"],
  ["Betting", "betting"],
  ["Trading", "trading"],
  ["High-risk merchant", "highRisk"],
  ["E-commerce", "ecommerce"],
  ["Wallet", "wallet"],
  ["Remittance", "remittance"],
  ["Marketplace", "marketplace"],
  ["Financial services", "financialServices"],
  ["Other payment-driven business", "other"],
] as const;

const PAYMENT_FLOWS = [
  ["Checkout payments", "checkout"],
  ["Deposits", "deposits"],
  ["Top-ups", "topups"],
  ["Customer funding", "funding"],
  ["High-value payments", "highValue"],
  ["Recurring payments", "recurring"],
  ["Refunds", "refunds"],
  ["Not sure yet", "notSure"],
] as const;

const PAYMENT_METHODS = [
  ["Cards", "cards"],
  ["Bank transfer", "bankTransfer"],
  ["Open banking", "openBanking"],
  ["Wallets", "wallets"],
  ["Crypto / stablecoins", "crypto"],
  ["Local payment methods", "local"],
  ["Other", "other"],
] as const;

const MONTHLY_VOLUMES = [
  ["Under 1,000 transactions", "under1k"],
  ["1,000 to 10,000 transactions", "1to10k"],
  ["10,000 to 100,000 transactions", "10to100k"],
  ["100,000+ transactions", "100kPlus"],
  ["Not sure", "notSure"],
] as const;

const PAYMENT_CHALLENGES = [
  ["Card fees are too high", "highFees"],
  ["Settlement is too slow", "slowSettlement"],
  ["Chargebacks or disputes create problems", "chargebacks"],
  ["Refunds are hard to manage", "refunds"],
  ["Reconciliation takes too much manual work", "reconciliation"],
  ["Payment status visibility is weak", "visibility"],
  ["Card acceptance is unreliable", "acceptance"],
  ["We want a better alternative to card rails", "alternative"],
  ["Other", "other"],
] as const;

const SANDBOX_TESTS = [
  ["Payment initiation", "initiation"],
  ["Customer bank authorisation flow", "authorisation"],
  ["Checkout payment flow", "checkout"],
  ["Deposit or top-up flow", "deposit"],
  ["Payment status callbacks", "callbacks"],
  ["Refund handling", "refunds"],
  ["Reporting and reconciliation", "reporting"],
  ["Merchant dashboard", "dashboard"],
  ["API integration", "api"],
  ["Not sure yet", "notSure"],
] as const;

const TECH_READINESS = [
  ["Yes, we can test now", "now"],
  ["Yes, but not immediately", "notImmediately"],
  ["No, we need commercial review first", "commercialFirst"],
  ["Not sure", "notSure"],
] as const;

const TIMELINES = [
  ["As soon as possible", "asap"],
  ["Within 2 weeks", "2weeks"],
  ["Within 1 month", "1month"],
  ["Later this quarter", "thisQuarter"],
  ["Not sure yet", "notSure"],
] as const;

const MARKET_BAND_KEY: Record<string, string> = {
  "United Kingdom": "uk",
  Denmark: "denmark",
  "European Union": "eu",
  Global: "global",
  Other: "global",
};

const inputCls =
  "w-full min-h-[48px] rounded-lg border border-sand-line bg-white px-3 py-3 text-sm text-sand-deep transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-sand-teal focus:shadow-[0_0_0_4px_rgba(0,117,153,0.14)] placeholder:text-[#7a8992]";
const errorInputCls = "border-red shadow-[0_0_0_4px_rgba(220,38,38,0.08)]";

const stepKeys = ["company", "business", "payment", "intent"] as const;

export function SandboxForm() {
  const t = useTranslations("sandbox.form");
  const tf = useTranslations("sandbox.form.fields");
  const to = useTranslations("sandbox.form.options");
  const ts = useTranslations("sandbox.success");

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<
    | { kind: "idle" }
    | { kind: "success"; via: "resend" | "mailto" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });
  const successRef = useRef<HTMLDivElement>(null);

  const schema = useMemo(() => {
    const m: SandboxErrorMessages = {
      workEmailRequired: t("errors.workEmailRequired"),
      workEmailInvalid: t("errors.workEmailInvalid"),
      fullNameRequired: t("errors.fullNameRequired"),
      companyNameRequired: t("errors.companyNameRequired"),
      companyWebsiteRequired: t("errors.companyWebsiteRequired"),
      companyWebsiteInvalid: t("errors.companyWebsiteInvalid"),
      roleRequired: t("errors.roleRequired"),
      marketRequired: t("errors.marketRequired"),
      businessTypeRequired: t("errors.businessTypeRequired"),
      paymentFlowRequired: t("errors.paymentFlowRequired"),
      selectAtLeastOne: t("errors.selectAtLeastOne"),
      monthlyVolumeRequired: t("errors.monthlyVolumeRequired"),
      technicalTeamRequired: t("errors.technicalTeamRequired"),
      testingStartRequired: t("errors.testingStartRequired"),
    };
    return buildSandboxSchema(m);
  }, [t]);

  const form = useForm<SandboxFormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      workEmail: "",
      fullName: "",
      companyName: "",
      companyWebsite: "",
      role: "",
      market: undefined as unknown as SandboxFormValues["market"],
      businessType: "",
      paymentFlow: "",
      paymentMethods: [],
      monthlyVolume: "",
      averageTransactionSize: "",
      paymentChallenges: [],
      sandboxTests: [],
      technicalTeam: "",
      testingStart: "",
      additionalContext: "",
    },
  });

  const market = form.watch("market") as SandboxMarket | undefined;
  const transactionBands = useMemo(
    () => bandsForMarket(market ?? ""),
    [market],
  );
  const bandKey = MARKET_BAND_KEY[market ?? "United Kingdom"] ?? "uk";

  const totalSteps = sandboxStepFields.length;

  async function onNext() {
    const fieldsToValidate = sandboxStepFields[step] as Array<
      Path<SandboxFormValues>
    >;
    const ok = await form.trigger(fieldsToValidate, { shouldFocus: true });
    if (!ok) return;
    setStep((s) => Math.min(totalSteps - 1, s + 1));
  }

  function onBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function onSubmit(values: SandboxFormValues) {
    setSubmitting(true);
    setSubmitState({ kind: "idle" });
    try {
      const res = await fetch("/api/sandbox", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSubmitState({ kind: "success", via: "resend" });
        setSubmitting(false);
        return;
      }
      // Fallback to mailto when no Resend key configured (503), or any
      // server-side failure. Mirrors original site behaviour.
      openMailto(values);
      setSubmitState({ kind: "success", via: "mailto" });
    } catch {
      openMailto(values);
      setSubmitState({ kind: "success", via: "mailto" });
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (submitState.kind === "success" && successRef.current) {
      successRef.current.focus();
    }
  }, [submitState]);

  if (submitState.kind === "success") {
    return (
      <SuccessPanel innerRef={successRef} via={submitState.via} ts={ts} />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-sand-line bg-white shadow-[0_18px_48px_rgba(0,30,43,0.08)]">
      <div className="grid gap-4 border-b border-[#e3e8eb] px-7 py-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-[#5a6a74]">
              {t("stepProgress", { current: step + 1, total: totalSteps })}
            </p>
            <h2 className="mt-1 display-3 text-sand-deep">
              {t(`stepTitles.${stepKeys[step]}`)}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2" aria-hidden>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1 rounded-full transition-colors duration-300",
                i <= step ? "bg-sand-teal" : "bg-[#e3e8eb]",
              )}
            />
          ))}
        </div>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="px-7 py-7 sm:px-8"
      >
        <AnimatePresence mode="wait">
          <motion.fieldset
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="m-0 grid min-w-0 border-0 p-0"
          >
            {step === 0 && <Step1 form={form} tf={tf} to={to} />}
            {step === 1 && <Step2 form={form} tf={tf} to={to} />}
            {step === 2 && (
              <Step3
                form={form}
                tf={tf}
                to={to}
                transactionBands={transactionBands}
                bandKey={bandKey}
              />
            )}
            {step === 3 && <Step4 form={form} tf={tf} to={to} />}
          </motion.fieldset>
        </AnimatePresence>

        {step === totalSteps - 1 ? (
          <p className="mt-6 border-t border-[#e3e8eb] pt-4 text-sm leading-relaxed text-[#5a6a74]">
            {t("consent")}
          </p>
        ) : null}

        {submitState.kind === "error" ? (
          <p className="mt-4 rounded-lg border border-red/30 bg-red/5 px-3 py-2 text-sm font-medium text-red">
            {submitState.message}
          </p>
        ) : null}

        <div className="mt-5 flex flex-col-reverse justify-between gap-3 sm:flex-row">
          {step > 0 ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-sand-line bg-white px-4 py-3 text-sm font-semibold text-sand-deep transition-[border-color,box-shadow,transform] hover:border-sand-deep hover:-translate-y-px hover:shadow-[0_14px_30px_rgba(0,30,43,0.08)]"
            >
              {t("back")}
            </button>
          ) : (
            <span aria-hidden />
          )}
          {step < totalSteps - 1 ? (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex min-h-[46px] items-center justify-center rounded-lg bg-sand-teal px-4 py-3 text-sm font-semibold text-white transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(0,117,153,0.28)]"
            >
              {t("continue")}
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-mint-line bg-mint px-5 py-3 text-sm font-semibold text-sand-deep transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(17,132,91,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? t("submitting") : t("submit")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

type StepProps = {
  form: UseFormReturn<SandboxFormValues>;
  tf: ReturnType<typeof useTranslations>;
  to: ReturnType<typeof useTranslations>;
};

function Step1({ form, tf, to }: StepProps) {
  const errs = form.formState.errors;
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <FieldText label={tf("workEmail")} error={errs.workEmail}>
        <input
          type="email"
          placeholder={tf("workEmailPlaceholder")}
          autoComplete="email"
          {...form.register("workEmail")}
          className={cn(inputCls, errs.workEmail && errorInputCls)}
        />
      </FieldText>
      <FieldText label={tf("fullName")} error={errs.fullName}>
        <input
          type="text"
          placeholder={tf("fullNamePlaceholder")}
          autoComplete="name"
          {...form.register("fullName")}
          className={cn(inputCls, errs.fullName && errorInputCls)}
        />
      </FieldText>
      <FieldText label={tf("companyName")} error={errs.companyName}>
        <input
          type="text"
          placeholder={tf("companyNamePlaceholder")}
          autoComplete="organization"
          {...form.register("companyName")}
          className={cn(inputCls, errs.companyName && errorInputCls)}
        />
      </FieldText>
      <FieldText label={tf("companyWebsite")} error={errs.companyWebsite}>
        <input
          type="text"
          inputMode="url"
          placeholder={tf("companyWebsitePlaceholder")}
          autoComplete="url"
          {...form.register("companyWebsite")}
          className={cn(inputCls, errs.companyWebsite && errorInputCls)}
        />
      </FieldText>
      <FieldText label={tf("role")} error={errs.role} wide>
        <select
          {...form.register("role")}
          className={cn(inputCls, errs.role && errorInputCls)}
        >
          <option value="">{tf("rolePlaceholder")}</option>
          {ROLES.map(([value, key]) => (
            <option key={key} value={value}>
              {to(`roles.${key}`)}
            </option>
          ))}
        </select>
      </FieldText>
    </div>
  );
}

function Step2({ form, tf, to }: StepProps) {
  const errs = form.formState.errors;
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <FieldText label={tf("market")} error={errs.market}>
        <select
          {...form.register("market")}
          className={cn(inputCls, errs.market && errorInputCls)}
        >
          <option value="">{tf("marketPlaceholder")}</option>
          {MARKETS.map(([value, key]) => (
            <option key={key} value={value}>
              {to(`markets.${key}`)}
            </option>
          ))}
        </select>
      </FieldText>
      <FieldText label={tf("businessType")} error={errs.businessType}>
        <select
          {...form.register("businessType")}
          className={cn(inputCls, errs.businessType && errorInputCls)}
        >
          <option value="">{tf("businessTypePlaceholder")}</option>
          {BUSINESS_TYPES.map(([value, key]) => (
            <option key={key} value={value}>
              {to(`businessTypes.${key}`)}
            </option>
          ))}
        </select>
      </FieldText>
      <FieldText label={tf("paymentFlow")} error={errs.paymentFlow} wide>
        <select
          {...form.register("paymentFlow")}
          className={cn(inputCls, errs.paymentFlow && errorInputCls)}
        >
          <option value="">{tf("paymentFlowPlaceholder")}</option>
          {PAYMENT_FLOWS.map(([value, key]) => (
            <option key={key} value={value}>
              {to(`paymentFlows.${key}`)}
            </option>
          ))}
        </select>
      </FieldText>
    </div>
  );
}

function Step3({
  form,
  tf,
  to,
  transactionBands,
  bandKey,
}: StepProps & {
  transactionBands: readonly string[];
  bandKey: string;
}) {
  const errs = form.formState.errors;
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <CheckboxField
        label={tf("paymentMethods")}
        wide
        error={
          (errs.paymentMethods as { message?: string } | undefined)?.message
        }
      >
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {PAYMENT_METHODS.map(([value, key]) => (
            <CheckboxLabel key={key} label={to(`paymentMethods.${key}`)}>
              <input
                type="checkbox"
                value={value}
                {...form.register("paymentMethods")}
                className="mt-0.5 h-4 w-4 accent-sand-teal"
              />
            </CheckboxLabel>
          ))}
        </div>
      </CheckboxField>
      <FieldText label={tf("monthlyVolume")} error={errs.monthlyVolume}>
        <select
          {...form.register("monthlyVolume")}
          className={cn(inputCls, errs.monthlyVolume && errorInputCls)}
        >
          <option value="">{tf("monthlyVolumePlaceholder")}</option>
          {MONTHLY_VOLUMES.map(([value, key]) => (
            <option key={key} value={value}>
              {to(`monthlyVolumes.${key}`)}
            </option>
          ))}
        </select>
      </FieldText>
      <FieldText label={tf("averageSize")}>
        <select {...form.register("averageTransactionSize")} className={inputCls}>
          <option value="">{tf("averageSizePlaceholder")}</option>
          {transactionBands.map((value, i) => (
            <option key={value} value={value}>
              {to(`bands.${bandKey}.b${i + 1}`)}
            </option>
          ))}
          <option value="Not sure">{tf("notSure")}</option>
        </select>
      </FieldText>
      <CheckboxField
        label={tf("paymentChallenges")}
        wide
        error={
          (errs.paymentChallenges as { message?: string } | undefined)?.message
        }
      >
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {PAYMENT_CHALLENGES.map(([value, key]) => (
            <CheckboxLabel key={key} label={to(`paymentChallenges.${key}`)}>
              <input
                type="checkbox"
                value={value}
                {...form.register("paymentChallenges")}
                className="mt-0.5 h-4 w-4 accent-sand-teal"
              />
            </CheckboxLabel>
          ))}
        </div>
      </CheckboxField>
    </div>
  );
}

function Step4({ form, tf, to }: StepProps) {
  const errs = form.formState.errors;
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <CheckboxField
        label={tf("sandboxTests")}
        wide
        error={(errs.sandboxTests as { message?: string } | undefined)?.message}
      >
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {SANDBOX_TESTS.map(([value, key]) => (
            <CheckboxLabel key={key} label={to(`sandboxTests.${key}`)}>
              <input
                type="checkbox"
                value={value}
                {...form.register("sandboxTests")}
                className="mt-0.5 h-4 w-4 accent-sand-teal"
              />
            </CheckboxLabel>
          ))}
        </div>
      </CheckboxField>
      <FieldText label={tf("technicalTeam")} error={errs.technicalTeam}>
        <select
          {...form.register("technicalTeam")}
          className={cn(inputCls, errs.technicalTeam && errorInputCls)}
        >
          <option value="">{tf("technicalTeamPlaceholder")}</option>
          {TECH_READINESS.map(([value, key]) => (
            <option key={key} value={value}>
              {to(`techReadiness.${key}`)}
            </option>
          ))}
        </select>
      </FieldText>
      <FieldText label={tf("testingStart")} error={errs.testingStart}>
        <select
          {...form.register("testingStart")}
          className={cn(inputCls, errs.testingStart && errorInputCls)}
        >
          <option value="">{tf("testingStartPlaceholder")}</option>
          {TIMELINES.map(([value, key]) => (
            <option key={key} value={value}>
              {to(`timelines.${key}`)}
            </option>
          ))}
        </select>
      </FieldText>
      <FieldText label={tf("additionalContext")} wide>
        <textarea
          rows={5}
          placeholder={tf("additionalContextPlaceholder")}
          {...form.register("additionalContext")}
          className={cn(inputCls, "min-h-[126px] py-3 resize-y")}
        />
      </FieldText>
    </div>
  );
}

function FieldText({
  label,
  error,
  children,
  wide,
}: {
  label: string;
  error?: { message?: string };
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={cn("grid min-w-0 gap-2", wide && "sm:col-span-2")}>
      <span className="text-[0.94rem] font-bold leading-tight text-sand-deep">
        {label}
      </span>
      {children}
      <small className="min-h-[1.1em] text-xs font-semibold text-red">
        {error?.message ?? ""}
      </small>
    </label>
  );
}

function CheckboxField({
  label,
  error,
  children,
  wide,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid min-w-0 gap-2",
        wide && "sm:col-span-2",
        error && "[&_label]:border-[rgba(220,38,38,0.42)]",
      )}
    >
      <span className="text-[0.94rem] font-bold leading-tight text-sand-deep">
        {label}
      </span>
      {children}
      <small className="min-h-[1.1em] text-xs font-semibold text-red">
        {error ?? ""}
      </small>
    </div>
  );
}

function CheckboxLabel({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex min-h-[44px] gap-2.5 rounded-lg border border-[#d4dbe0] bg-sand-fog p-2.5 text-sm leading-snug text-sand-bay transition-[border-color,box-shadow,background-color] hover:border-sand-teal/40 focus-within:border-sand-teal focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(0,117,153,0.14)]">
      {children}
      <span>{label}</span>
    </label>
  );
}

function SuccessPanel({
  via,
  innerRef,
  ts,
}: {
  via: "resend" | "mailto";
  innerRef?: React.Ref<HTMLDivElement>;
  ts: ReturnType<typeof useTranslations>;
}) {
  return (
    <div
      ref={innerRef}
      tabIndex={-1}
      className="overflow-hidden rounded-2xl border border-sand-line bg-white p-9 shadow-[0_18px_48px_rgba(0,30,43,0.08)] sm:p-12"
    >
      <p className="section-label">
        {via === "resend" ? ts("resendEyebrow") : ts("mailtoEyebrow")}
      </p>
      <h2 className="mt-3 display-2 text-sand-deep">
        {via === "resend" ? ts("resendTitle") : ts("mailtoTitle")}
      </h2>
      <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-[#52636d]">
        {via === "resend" ? ts("resendBody") : ts("mailtoBody")}
      </p>
      <Link
        href="/pay-by-bank"
        className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-lg bg-sand-teal px-5 py-3 text-sm font-semibold text-white transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(0,117,153,0.28)]"
      >
        {ts("back")}
      </Link>
    </div>
  );
}

function openMailto(values: SandboxFormValues) {
  const subject = encodeURIComponent(buildEmailSubject(values));
  const body = encodeURIComponent(buildEmailBody(values));
  const href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
  window.location.href = href;
}
