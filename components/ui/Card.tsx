import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  surface?: "raised" | "flat" | "navy" | "glass" | "sand";
};

const surfaceStyles: Record<NonNullable<CardProps["surface"]>, string> = {
  raised:
    "bg-surface border border-line shadow-[var(--shadow-brand)]",
  flat:
    "bg-white/74 border border-[rgba(18,20,23,0.08)]",
  navy:
    "bg-navy text-white border border-[rgba(25,34,53,0.4)] shadow-[var(--shadow-navy)]",
  glass:
    "bg-white/72 border border-white/60 shadow-[var(--shadow-brand)] backdrop-blur-md",
  sand:
    "bg-white border border-sand-line shadow-[0_18px_48px_rgba(0,30,43,0.08)]",
};

export function Card({
  surface = "raised",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl",
        surfaceStyles[surface],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
