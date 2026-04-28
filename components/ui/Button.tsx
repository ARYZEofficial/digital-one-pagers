import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "solid"
  | "ghost"
  | "mint"
  | "yellow"
  | "teal"
  | "navy"
  | "outline-on-dark";

const baseStyles =
  "inline-flex items-center justify-center gap-2 min-h-[46px] rounded-lg px-4 py-3 " +
  "text-sm font-semibold leading-none transition-all duration-200 ease-out " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-blue cursor-pointer select-none whitespace-nowrap";

const variantStyles: Record<ButtonVariant, string> = {
  solid:
    "bg-ink text-white hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(18,20,23,0.18)]",
  ghost:
    "border border-line bg-surface text-ink hover:-translate-y-px hover:border-[rgba(37,99,235,0.32)] hover:shadow-[0_14px_30px_rgba(18,20,23,0.08)]",
  mint:
    "border border-mint-line bg-mint text-sand-deep hover:-translate-y-px hover:shadow-[0_14px_30px_rgba(17,132,91,0.18)]",
  yellow:
    "bg-yellow text-ink hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(243,178,63,0.32)]",
  teal:
    "bg-sand-teal text-white hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(0,117,153,0.28)]",
  navy:
    "bg-navy text-white hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(25,34,53,0.32)]",
  "outline-on-dark":
    "border border-white/30 bg-white/5 text-white hover:-translate-y-px hover:bg-white/10 hover:border-white/50",
};

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  withArrow?: boolean;
  pulse?: boolean;
};

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
};

type RealButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

function isAnchorProps(
  p: AnchorProps | RealButtonProps,
): p is AnchorProps {
  return typeof (p as AnchorProps).href === "string";
}

function ArrowOrChildren({
  children,
  withArrow,
}: {
  children: ReactNode;
  withArrow?: boolean;
}) {
  return (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
        />
      ) : null}
    </>
  );
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  AnchorProps | RealButtonProps
>(function Button(props, ref) {
  const {
    variant = "solid",
    className,
    children,
    withArrow,
    pulse,
  } = props;
  const composed = cn(
    baseStyles,
    variantStyles[variant],
    pulse && variant === "solid" ? "cta-pulse" : "",
    "group",
    className,
  );

  if (isAnchorProps(props)) {
    const { href, external } = props;
    if (external || /^https?:\/\//.test(href) || href.startsWith("mailto:")) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={composed}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
        >
          <ArrowOrChildren withArrow={withArrow}>{children}</ArrowOrChildren>
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={composed}
      >
        <ArrowOrChildren withArrow={withArrow}>{children}</ArrowOrChildren>
      </Link>
    );
  }

  const { variant: _v, className: _c, withArrow: _w, pulse: _p, children: _ch, ...rest } =
    props;
  void _v;
  void _c;
  void _w;
  void _p;
  void _ch;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={composed}
      {...rest}
    >
      <ArrowOrChildren withArrow={withArrow}>{children}</ArrowOrChildren>
    </button>
  );
});
