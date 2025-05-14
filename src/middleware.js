import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

// Desteklenen diller: az, en, ru; varsayılan dil: az
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

  // Token kontrolü: Token varsa, süresi kontrol edilir; süresi dolduysa login sayfasına yönlendirilir.
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

  // allowAccess cookie'si olmayan kullanıcılar, restrictedRoutes'e erişmeye çalışırsa ana sayfaya yönlendirilir.
  if (restrictedRoutes.includes(pathname)) {
    if (!allowAccess) {
      const homeUrl = new URL(`/${locale}/`, req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  // Giriş yapmış kullanıcılar, restrictedRoutesForAuth içerisindeki sayfalara erişmeye çalışırsa profil sayfasına yönlendirilir.
  if (token && restrictedRoutesForAuth.includes(pathname)) {
    const profileUrl = new URL(`/${locale}/account/profile`, req.url);
    return NextResponse.redirect(profileUrl);
  }

  // Korunan route'lara erişmek isteyen token'sız kullanıcılar login sayfasına yönlendirilir.
  if (pathname.startsWith(protectedRoute) && !token) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Diğer tüm istekler için next-intl middleware'e bırakılır.
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};




// import createMiddleware from 'next-intl/middleware';
// import {routing} from './i18n/routing';
 
// export default createMiddleware(routing);
 
// export const config = {
//   // Match all pathnames except for
//   // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
//   // - … the ones containing a dot (e.g. `favicon.ico`)
//   matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
// };