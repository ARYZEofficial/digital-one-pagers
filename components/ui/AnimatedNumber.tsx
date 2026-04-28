"use client";

import {
  animate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef } from "react";

type AnimatedNumberProps = {
  value: number;
  format: (value: number) => string;
  className?: string;
  duration?: number;
};

export function AnimatedNumber({
  value,
  format,
  className,
  duration = 0.6,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(value);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    if (prefersReducedMotion) {
      motionValue.set(value);
      ref.current.textContent = format(value);
      return;
    }

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = format(latest);
      },
    });

    return () => controls.stop();
  }, [value, duration, format, motionValue, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
