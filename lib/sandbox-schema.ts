import { z } from "zod";
import { SANDBOX_MARKETS } from "./transaction-bands";

export type SandboxErrorMessages = {
  workEmailRequired: string;
  workEmailInvalid: string;
  fullNameRequired: string;
  companyNameRequired: string;
  companyWebsiteRequired: string;
  companyWebsiteInvalid: string;
  roleRequired: string;
  marketRequired: string;
  businessTypeRequired: string;
  paymentFlowRequired: string;
  selectAtLeastOne: string;
  monthlyVolumeRequired: string;
  technicalTeamRequired: string;
  testingStartRequired: string;
};

const defaultMessages: SandboxErrorMessages = {
  workEmailRequired: "Work email is required.",
  workEmailInvalid: "Enter a valid work email.",
  fullNameRequired: "Full name is required.",
  companyNameRequired: "Company name is required.",
  companyWebsiteRequired: "Company website is required.",
  companyWebsiteInvalid: "Enter a valid company website.",
  roleRequired: "Role is required.",
  marketRequired: "Select a market.",
  businessTypeRequired: "Business type is required.",
  paymentFlowRequired: "Payment flow is required.",
  selectAtLeastOne: "Select at least one option.",
  monthlyVolumeRequired: "Monthly transaction volume is required.",
  technicalTeamRequired: "Technical team readiness is required.",
  testingStartRequired: "Testing timeline is required.",
};

export function buildSandboxSchema(m: SandboxErrorMessages = defaultMessages) {
  const urlSchema = z
    .string()
    .trim()
    .min(1, { message: m.companyWebsiteRequired })
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
      { message: m.companyWebsiteInvalid },
    );

  return z.object({
    // Step 1
    workEmail: z
      .string()
      .trim()
      .min(1, m.workEmailRequired)
      .email(m.workEmailInvalid),
    fullName: z.string().trim().min(1, { message: m.fullNameRequired }),
    companyName: z.string().trim().min(1, { message: m.companyNameRequired }),
    companyWebsite: urlSchema,
    role: z.string().trim().min(1, { message: m.roleRequired }),

    // Step 2
    market: z.enum(SANDBOX_MARKETS, {
      errorMap: () => ({ message: m.marketRequired }),
    }),
    businessType: z.string().trim().min(1, { message: m.businessTypeRequired }),
    paymentFlow: z.string().trim().min(1, { message: m.paymentFlowRequired }),

    // Step 3
    paymentMethods: z.array(z.string()).min(1, m.selectAtLeastOne),
    monthlyVolume: z
      .string()
      .trim()
      .min(1, { message: m.monthlyVolumeRequired }),
    averageTransactionSize: z.string().optional().default(""),
    paymentChallenges: z.array(z.string()).min(1, m.selectAtLeastOne),

    // Step 4
    sandboxTests: z.array(z.string()).min(1, m.selectAtLeastOne),
    technicalTeam: z
      .string()
      .trim()
      .min(1, { message: m.technicalTeamRequired }),
    testingStart: z.string().trim().min(1, { message: m.testingStartRequired }),
    additionalContext: z.string().optional().default(""),
  });
}

export const sandboxSchema = buildSandboxSchema();

export type SandboxFormValues = z.infer<typeof sandboxSchema>;

export const sandboxStepFields: ReadonlyArray<readonly (keyof SandboxFormValues)[]> = [
  ["workEmail", "fullName", "companyName", "companyWebsite", "role"],
  ["market", "businessType", "paymentFlow"],
  ["paymentMethods", "monthlyVolume", "averageTransactionSize", "paymentChallenges"],
  ["sandboxTests", "technicalTeam", "testingStart", "additionalContext"],
];

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
