import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware drop-in replacements for next/link and next/navigation.
// `Link` automatically prefixes the active locale; `useRouter`/`usePathname`
// operate on locale-stripped pathnames.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
