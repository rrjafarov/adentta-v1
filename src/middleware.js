import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["az", "en", "ru"],
  defaultLocale: "az",
  localePrefix: "as-needed",
});

export default function middleware(req) {
  const { pathname, locale } = req.nextUrl;
  const token = req.cookies.get("token");
  const allowAccess = req.cookies.get("allow-access");

  // Locale'a duyarlı route'lar tanımlanıyor
  const baseRoutes = ["/success_payment", "/error_payment"];
  const restrictedRoutes = baseRoutes.map((route) => `/${locale}${route}`);
  const protectedRoute = `/${locale}/account`;
  const restrictedRoutesForAuth = [
    `/${locale}/login`,
    `/${locale}/forgot-password`,
  ];

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000;
      if (Date.now() >= exp) {
        const response = NextResponse.next();
        response.cookies.delete("token");
        const loginUrl = new URL(`/${locale}/login`, req.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  if (restrictedRoutes.includes(pathname)) {
    if (!allowAccess) {
      const homeUrl = new URL(`/${locale}/`, req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  if (token && restrictedRoutesForAuth.includes(pathname)) {
    const profileUrl = new URL(`/${locale}/account/profile`, req.url);
    return NextResponse.redirect(profileUrl);
  }

  if (pathname.startsWith(protectedRoute) && !token) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

