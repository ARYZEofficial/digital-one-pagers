"use client";

import { motion, useReducedMotion } from "motion/react";

export function GradientBackground() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Soft conic mesh — restrained, brand colors at low opacity */}
      <motion.div
        className="absolute -inset-[40%] opacity-[0.45]"
        style={{
          backgroundImage: `
            conic-gradient(
              from 0deg at 30% 20%,
              rgba(37, 99, 235, 0.18),
              rgba(17, 132, 91, 0.10),
              rgba(243, 178, 63, 0.08),
              rgba(25, 34, 53, 0.0),
              rgba(37, 99, 235, 0.18)
            )
          `,
          filter: "blur(80px)",
        }}
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 60, repeat: Infinity, ease: "linear" }
        }
      />
      <motion.div
        className="absolute -inset-[40%] opacity-[0.30] mix-blend-multiply"
        style={{
          backgroundImage: `
            conic-gradient(
              from 180deg at 70% 80%,
              rgba(17, 132, 91, 0.14),
              rgba(37, 99, 235, 0.0),
              rgba(243, 178, 63, 0.10),
              rgba(17, 132, 91, 0.14)
            )
          `,
          filter: "blur(110px)",
        }}
        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 90, repeat: Infinity, ease: "linear" }
        }
      />
      {/* Grain — pure SVG noise, very subtle */}
      <div
        className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
