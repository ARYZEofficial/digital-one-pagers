import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  align?: "start" | "center";
  size?: "regular" | "large";
  tone?: "default" | "muted" | "light";
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "start",
  size = "regular",
  tone = "default",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "grid gap-2 max-w-[720px]",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "section-label",
            tone === "light" && "text-white/64",
            tone === "muted" && "text-quiet",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          size === "large" ? "display-2" : "display-3",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            "mt-2 max-w-[640px] text-base leading-relaxed",
            tone === "light" ? "text-white/72" : "text-muted",
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
