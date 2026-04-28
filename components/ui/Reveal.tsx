"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: ElementType;
  amount?: number;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView">;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  amount = 0.3,
  once = true,
  className,
  as,
  ...rest
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const Component = motion[(as as keyof typeof motion) ?? "div"] as typeof motion.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      {...rest}
    >
      {children}
    </Component>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  stagger?: number;
  className?: string;
  amount?: number;
  once?: boolean;
};

export function RevealGroup({
  children,
  stagger = 0.08,
  className,
  amount = 0.2,
  once = true,
}: RevealGroupProps) {
  const variants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger },
    },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  y = 20,
  className,
}: {
  children: ReactNode;
  y?: number;
  className?: string;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
