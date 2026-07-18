import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

/**
 * Locale routing middleware: requests without a locale prefix are redirected
 * to the default locale (e.g. "/" -> "/en", "/contact" -> "/en/contact").
 * Static assets (anything with a file extension), Next internals, and API
 * routes are excluded by the matcher.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, and any path containing a dot (files).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
