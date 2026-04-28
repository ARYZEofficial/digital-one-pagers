import { z } from "zod";
import { SANDBOX_MARKETS } from "./transaction-bands";

const trimmed = (min: number, label: string) =>
  z
    .string()
    .trim()
    .min(min, { message: `${label} is required.` });

const urlSchema = z
  .string()
  .trim()
  .min(1, { message: "Company website is required." })
  .transform((v) => (/^[a-z][a-z\d+\-.]*:\/\//i.test(v) ? v : `https://${v}`))
  .refine(
    (v) => {
      try {
        const u = new URL(v);
        return Boolean(u.hostname.includes("."));
      } catch {
        return false;
      }
    },
    { message: "Enter a valid company website." },
  );

export const sandboxSchema = z.object({
  // Step 1
  workEmail: z
    .string()
    .trim()
    .min(1, "Work email is required.")
    .email("Enter a valid work email."),
  fullName: trimmed(1, "Full name"),
  companyName: trimmed(1, "Company name"),
  companyWebsite: urlSchema,
  role: trimmed(1, "Role"),

  // Step 2
  market: z.enum(SANDBOX_MARKETS, {
    errorMap: () => ({ message: "Select a market." }),
  }),
  businessType: trimmed(1, "Business type"),
  paymentFlow: trimmed(1, "Payment flow"),

  // Step 3
  paymentMethods: z
    .array(z.string())
    .min(1, "Select at least one option."),
  monthlyVolume: trimmed(1, "Monthly transaction volume"),
  averageTransactionSize: z.string().optional().default(""),
  paymentChallenges: z
    .array(z.string())
    .min(1, "Select at least one option."),

  // Step 4
  sandboxTests: z.array(z.string()).min(1, "Select at least one option."),
  technicalTeam: trimmed(1, "Technical team readiness"),
  testingStart: trimmed(1, "Testing timeline"),
  additionalContext: z.string().optional().default(""),
});

export type SandboxFormValues = z.infer<typeof sandboxSchema>;

export const sandboxStepFields: ReadonlyArray<readonly (keyof SandboxFormValues)[]> = [
  ["workEmail", "fullName", "companyName", "companyWebsite", "role"],
  ["market", "businessType", "paymentFlow"],
  ["paymentMethods", "monthlyVolume", "averageTransactionSize", "paymentChallenges"],
  ["sandboxTests", "technicalTeam", "testingStart", "additionalContext"],
];

export const sandboxStepTitles = [
  "Your company",
  "Your business",
  "Current payment setup",
  "Sandbox intent",
] as const;

export const fieldLabels: Record<keyof SandboxFormValues, string> = {
  workEmail: "Work email",
  fullName: "Full name",
  companyName: "Company name",
  companyWebsite: "Company website",
  role: "Role",
  market: "Business operates in",
  businessType: "Business type",
  paymentFlow: "Payment flow to improve or test",
  paymentMethods: "Payment methods used today",
  monthlyVolume: "Estimated monthly transaction volume",
  averageTransactionSize: "Average transaction size",
  paymentChallenges: "Main payment challenges",
  sandboxTests: "Sandbox testing intent",
  technicalTeam: "Technical team readiness",
  testingStart: "Preferred testing start",
  additionalContext: "Additional context",
};

export function buildEmailBody(values: SandboxFormValues): string {
  const lines = [
    "New Pay by Bank sandbox access request",
    "",
    ...(Object.keys(fieldLabels) as (keyof SandboxFormValues)[]).map((key) => {
      const value = values[key];
      const display = Array.isArray(value)
        ? value.length
          ? value.join(", ")
          : "Not provided"
        : value && String(value).trim()
          ? String(value)
          : "Not provided";
      return `${fieldLabels[key]}: ${display}`;
    }),
  ];
  return lines.join("\n");
}

export function buildEmailSubject(values: SandboxFormValues): string {
  const company = values.companyName?.trim() || "Merchant";
  return `Pay by Bank sandbox request - ${company}`;
}
