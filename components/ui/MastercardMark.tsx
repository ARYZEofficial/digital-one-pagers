import { cn } from "@/lib/cn";

type Props = { className?: string; inline?: boolean; "aria-label"?: string };

export function MastercardMark({
  className,
  inline = false,
  "aria-label": ariaLabel = "Mastercard",
}: Props) {
  const base = inline
    ? "inline-flex relative w-[26px] h-[15px] mx-0.5 align-[-2px]"
    : "relative flex items-center w-[34px] h-[19px]";
  const dotSize = inline ? 15 : 19;
  const offset = inline ? 8 : 11;
  return (
    <span aria-label={ariaLabel} className={cn(base, className)}>
      <span
        className="absolute top-0 left-0 rounded-full"
        style={{ width: dotSize, height: dotSize, background: "#eb001b" }}
      />
      <span
        className="absolute top-0 rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          left: offset,
          background: "#f79e1b",
          opacity: 0.92,
        }}
      />
    </span>
  );
}
