import type { ReactNode } from "react";
import "./globals.css";

/**
 * Root layout is intentionally a pass-through; the real <html>/<body> and all
 * providers live in `app/[locale]/layout.tsx` so the document can carry the
 * correct `lang`/`dir` per locale.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
