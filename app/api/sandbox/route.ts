import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildEmailBody,
  buildEmailSubject,
  sandboxSchema,
} from "@/lib/sandbox-schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = sandboxSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // The client falls back to mailto when the route returns 503. This
    // matches the original site's behaviour and lets us deploy before the
    // user has set up Resend.
    return NextResponse.json(
      { ok: false, error: "Email backend not configured" },
      { status: 503 },
    );
  }

  const values = parsed.data;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM ?? "Aryze Sandbox <sandbox@aryze.io>",
      to: process.env.SANDBOX_RECIPIENT ?? "rae@aryze.io",
      replyTo: values.workEmail,
      subject: buildEmailSubject(values),
      text: buildEmailBody(values),
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
