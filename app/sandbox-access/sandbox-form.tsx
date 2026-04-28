"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useForm, type Path, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import {
  buildEmailBody,
  buildEmailSubject,
  type SandboxFormValues,
  sandboxSchema,
  sandboxStepFields,
  sandboxStepTitles,
} from "@/lib/sandbox-schema";
import { type SandboxMarket, bandsForMarket } from "@/lib/transaction-bands";
import { cn } from "@/lib/cn";

const RECIPIENT = "rae@aryze.io";

const ROLES = [
  "Founder / CEO",
  "CFO / Finance Lead",
  "Head of Payments",
  "Payments Manager",
  "Product Lead",
  "Operations Lead",
  "Risk / Fraud Lead",
  "CTO / Engineering Lead",
  "Developer / Technical Lead",
  "Other",
] as const;

const MARKETS = [
  "United Kingdom",
  "Denmark",
  "European Union",
  "Global",
  "Other",
] as const;

const BUSINESS_TYPES = [
  "Gaming",
  "Betting",
  "Trading",
  "High-risk merchant",
  "E-commerce",
  "Wallet",
  "Remittance",
  "Marketplace",
  "Financial services",
  "Other payment-driven business",
] as const;

const PAYMENT_FLOWS = [
  "Checkout payments",
  "Deposits",
  "Top-ups",
  "Customer funding",
  "High-value payments",
  "Recurring payments",
  "Refunds",
  "Not sure yet",
] as const;

const PAYMENT_METHODS = [
  "Cards",
  "Bank transfer",
  "Open banking",
  "Wallets",
  "Crypto / stablecoins",
  "Local payment methods",
  "Other",
] as const;

const MONTHLY_VOLUMES = [
  "Under 1,000 transactions",
  "1,000 to 10,000 transactions",
  "10,000 to 100,000 transactions",
  "100,000+ transactions",
  "Not sure",
] as const;

const PAYMENT_CHALLENGES = [
  "Card fees are too high",
  "Settlement is too slow",
  "Chargebacks or disputes create problems",
  "Refunds are hard to manage",
  "Reconciliation takes too much manual work",
  "Payment status visibility is weak",
  "Card acceptance is unreliable",
  "We want a better alternative to card rails",
  "Other",
] as const;

const SANDBOX_TESTS = [
  "Payment initiation",
  "Customer bank authorisation flow",
  "Checkout payment flow",
  "Deposit or top-up flow",
  "Payment status callbacks",
  "Refund handling",
  "Reporting and reconciliation",
  "Merchant dashboard",
  "API integration",
  "Not sure yet",
] as const;

const TECH_READINESS = [
  "Yes, we can test now",
  "Yes, but not immediately",
  "No, we need commercial review first",
  "Not sure",
] as const;

const TIMELINES = [
  "As soon as possible",
  "Within 2 weeks",
  "Within 1 month",
  "Later this quarter",
  "Not sure yet",
] as const;

const inputCls =
  "w-full min-h-[48px] rounded-lg border border-sand-line bg-white px-3 py-3 text-sm text-sand-deep transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-sand-teal focus:shadow-[0_0_0_4px_rgba(0,117,153,0.14)] placeholder:text-[#7a8992]";
const errorInputCls =
  "border-red shadow-[0_0_0_4px_rgba(220,38,38,0.08)]";

export function SandboxForm() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<
    | { kind: "idle" }
    | { kind: "success"; via: "resend" | "mailto" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });
  const successRef = useRef<HTMLDivElement>(null);

  const form = useForm<SandboxFormValues>({
    resolver: zodResolver(sandboxSchema),
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

  const totalSteps = sandboxStepFields.length;

  async function onNext() {
    const fieldsToValidate = sandboxStepFields[step] as Array<Path<SandboxFormValues>>;
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
    return <SuccessPanel innerRef={successRef} via={submitState.via} />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-sand-line bg-white shadow-[0_18px_48px_rgba(0,30,43,0.08)]">
      <div className="grid gap-4 border-b border-[#e3e8eb] px-7 py-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-[#5a6a74]">
              Step {step + 1} of {totalSteps}
            </p>
            <h2 className="mt-1 display-3 text-sand-deep">
              {sandboxStepTitles[step]}
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
            {step === 0 && <Step1 form={form} />}
            {step === 1 && <Step2 form={form} />}
            {step === 2 && (
              <Step3 form={form} transactionBands={transactionBands} />
            )}
            {step === 3 && <Step4 form={form} />}
          </motion.fieldset>
        </AnimatePresence>

        {step === totalSteps - 1 ? (
          <p className="mt-6 border-t border-[#e3e8eb] pt-4 text-sm leading-relaxed text-[#5a6a74]">
            By submitting this form, you agree that Aryze may contact you about
            your sandbox request and related product information.
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
              Back
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
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-mint-line bg-mint px-5 py-3 text-sm font-semibold text-sand-deep transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(17,132,91,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit request"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Step1({
  form,
}: {
  form: UseFormReturn<SandboxFormValues>;
}) {
  const errs = form.formState.errors;
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <FieldText label="Work email" error={errs.workEmail}>
        <input
          type="email"
          placeholder="name@company.com"
          autoComplete="email"
          {...form.register("workEmail")}
          className={cn(inputCls, errs.workEmail && errorInputCls)}
        />
      </FieldText>
      <FieldText label="Full name" error={errs.fullName}>
        <input
          type="text"
          placeholder="Your full name"
          autoComplete="name"
          {...form.register("fullName")}
          className={cn(inputCls, errs.fullName && errorInputCls)}
        />
      </FieldText>
      <FieldText label="Company name" error={errs.companyName}>
        <input
          type="text"
          placeholder="Company Ltd"
          autoComplete="organization"
          {...form.register("companyName")}
          className={cn(inputCls, errs.companyName && errorInputCls)}
        />
      </FieldText>
      <FieldText label="Company website" error={errs.companyWebsite}>
        <input
          type="text"
          inputMode="url"
          placeholder="https://company.com"
          autoComplete="url"
          {...form.register("companyWebsite")}
          className={cn(inputCls, errs.companyWebsite && errorInputCls)}
        />
      </FieldText>
      <FieldText label="Your role" error={errs.role} wide>
        <select
          {...form.register("role")}
          className={cn(inputCls, errs.role && errorInputCls)}
        >
          <option value="">Select role</option>
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </FieldText>
    </div>
  );
}

function Step2({
  form,
}: {
  form: UseFormReturn<SandboxFormValues>;
}) {
  const errs = form.formState.errors;
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <FieldText label="Where does your business operate?" error={errs.market}>
        <select
          {...form.register("market")}
          className={cn(inputCls, errs.market && errorInputCls)}
        >
          <option value="">Select market</option>
          {MARKETS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </FieldText>
      <FieldText label="What type of business are you?" error={errs.businessType}>
        <select
          {...form.register("businessType")}
          className={cn(inputCls, errs.businessType && errorInputCls)}
        >
          <option value="">Select business type</option>
          {BUSINESS_TYPES.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </FieldText>
      <FieldText
        label="Which payment flow do you want to improve or test?"
        error={errs.paymentFlow}
        wide
      >
        <select
          {...form.register("paymentFlow")}
          className={cn(inputCls, errs.paymentFlow && errorInputCls)}
        >
          <option value="">Select payment flow</option>
          {PAYMENT_FLOWS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </FieldText>
    </div>
  );
}

function Step3({
  form,
  transactionBands,
}: {
  form: UseFormReturn<SandboxFormValues>;
  transactionBands: readonly string[];
}) {
  const errs = form.formState.errors;
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <CheckboxField
        label="Which payment methods do you use today?"
        wide
        error={
          (errs.paymentMethods as { message?: string } | undefined)?.message
        }
      >
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {PAYMENT_METHODS.map((m) => (
            <CheckboxLabel key={m} label={m}>
              <input
                type="checkbox"
                value={m}
                {...form.register("paymentMethods")}
                className="mt-0.5 h-4 w-4 accent-sand-teal"
              />
            </CheckboxLabel>
          ))}
        </div>
      </CheckboxField>
      <FieldText
        label="What is your estimated monthly transaction volume?"
        error={errs.monthlyVolume}
      >
        <select
          {...form.register("monthlyVolume")}
          className={cn(inputCls, errs.monthlyVolume && errorInputCls)}
        >
          <option value="">Select volume</option>
          {MONTHLY_VOLUMES.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </FieldText>
      <FieldText label="What is your average transaction size?">
        <select {...form.register("averageTransactionSize")} className={inputCls}>
          <option value="">Select average size</option>
          {transactionBands.map((b) => (
            <option key={b}>{b}</option>
          ))}
          <option>Not sure</option>
        </select>
      </FieldText>
      <CheckboxField
        label="What are your main payment challenges today?"
        wide
        error={
          (errs.paymentChallenges as { message?: string } | undefined)?.message
        }
      >
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {PAYMENT_CHALLENGES.map((c) => (
            <CheckboxLabel key={c} label={c}>
              <input
                type="checkbox"
                value={c}
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

function Step4({
  form,
}: {
  form: UseFormReturn<SandboxFormValues>;
}) {
  const errs = form.formState.errors;
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <CheckboxField
        label="What do you want to test in the sandbox?"
        wide
        error={
          (errs.sandboxTests as { message?: string } | undefined)?.message
        }
      >
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {SANDBOX_TESTS.map((t) => (
            <CheckboxLabel key={t} label={t}>
              <input
                type="checkbox"
                value={t}
                {...form.register("sandboxTests")}
                className="mt-0.5 h-4 w-4 accent-sand-teal"
              />
            </CheckboxLabel>
          ))}
        </div>
      </CheckboxField>
      <FieldText
        label="Do you have a technical team ready to test?"
        error={errs.technicalTeam}
      >
        <select
          {...form.register("technicalTeam")}
          className={cn(inputCls, errs.technicalTeam && errorInputCls)}
        >
          <option value="">Select readiness</option>
          {TECH_READINESS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </FieldText>
      <FieldText
        label="When would you like to start testing?"
        error={errs.testingStart}
      >
        <select
          {...form.register("testingStart")}
          className={cn(inputCls, errs.testingStart && errorInputCls)}
        >
          <option value="">Select timeline</option>
          {TIMELINES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </FieldText>
      <FieldText label="Anything else we should know?" wide>
        <textarea
          rows={5}
          placeholder="Tell us about your payment flow, current setup, or what you want to test."
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
}: {
  via: "resend" | "mailto";
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={innerRef}
      tabIndex={-1}
      className="overflow-hidden rounded-2xl border border-sand-line bg-white p-9 shadow-[0_18px_48px_rgba(0,30,43,0.08)] sm:p-12"
    >
      <p className="section-label">
        {via === "resend" ? "Request received" : "Request prepared"}
      </p>
      <h2 className="mt-3 display-2 text-sand-deep">
        {via === "resend"
          ? "Thank you — we'll be in touch."
          : "Your sandbox request email is ready."}
      </h2>
      <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-[#52636d]">
        {via === "resend"
          ? "Your sandbox request has been sent to the Aryze team. Expect a response within one business day with the next steps."
          : "Your mail app should open with the sandbox request addressed to Aryze. Send the email to share your company, payment use case, and technical setup."}
      </p>
      <a
        href="/pay-by-bank"
        className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-lg bg-sand-teal px-5 py-3 text-sm font-semibold text-white transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(0,117,153,0.28)]"
      >
        Back to Pay by Bank
      </a>
    </div>
  );
}

function openMailto(values: SandboxFormValues) {
  const subject = encodeURIComponent(buildEmailSubject(values));
  const body = encodeURIComponent(buildEmailBody(values));
  const href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
  window.location.href = href;
}
