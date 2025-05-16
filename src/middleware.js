// import createMiddleware from "next-intl/middleware";
// import { NextResponse } from "next/server";

// // Desteklenen diller: az, en, ru; varsayılan dil: az
// const intlMiddleware = createMiddleware({
//   locales: ["az", "en", "ru"],
//   defaultLocale: "az",
//   localePrefix: "as-needed",
//   localeDetection: true,
// });

// export default function middleware(req) {
//   const { pathname, locale } = req.nextUrl;
//   const token = req.cookies.get("token");
//   const allowAccess = req.cookies.get("allow-access");

//   // Locale'a duyarlı route'lar tanımlanıyor
//   const baseRoutes = ["/success_payment", "/error_payment"];
//   const restrictedRoutes = baseRoutes.map((route) => `/${locale}${route}`);
//   const protectedRoute = `/${locale}/account`;
//   const restrictedRoutesForAuth = [
//     `/${locale}/login`,
//     `/${locale}/forgot-password`,
//   ];

//   // Token kontrolü: Token varsa, süresi kontrol edilir; süresi dolduysa login sayfasına yönlendirilir.
//   if (token) {
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       const exp = payload.exp * 1000;
//       if (Date.now() >= exp) {
//         const response = NextResponse.next();
//         response.cookies.delete("token");
//         const loginUrl = new URL(`/${locale}/login`, req.url);
//         return NextResponse.redirect(loginUrl);
//       }
//     } catch (error) {
//       console.error("Invalid token:", error);
//     }
//   }

//   // allowAccess cookie'si olmayan kullanıcılar, restrictedRoutes'e erişmeye çalışırsa ana sayfaya yönlendirilir.
//   if (restrictedRoutes.includes(pathname)) {
//     if (!allowAccess) {
//       const homeUrl = new URL(`/${locale}/`, req.url);
//       return NextResponse.redirect(homeUrl);
//     }
//   }

//   // Giriş yapmış kullanıcılar, restrictedRoutesForAuth içerisindeki sayfalara erişmeye çalışırsa profil sayfasına yönlendirilir.
//   if (token && restrictedRoutesForAuth.includes(pathname)) {
//     const profileUrl = new URL(`/${locale}/account/profile`, req.url);
//     return NextResponse.redirect(profileUrl);
//   }

//   // Korunan route'lara erişmek isteyen token'sız kullanıcılar login sayfasına yönlendirilir.
//   if (pathname.startsWith(protectedRoute) && !token) {
//     const loginUrl = new URL(`/${locale}/login`, req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Diğer tüm istekler için next-intl middleware'e bırakılır.
//   return intlMiddleware(req);
// }

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };




















// import createMiddleware from "next-intl/middleware";
// import { NextResponse } from "next/server";

// const intlMiddleware = createMiddleware({
//   locales: ["az", "ru", "en"], // Supported locales
//   defaultLocale: "az", // Default locale
//   localePrefix: "as-needed", // Add prefix only when necessary
//   localeDetection: true, // Disable browser locale detection
//   urlMappingStrategy: "rewriteDefault", // Rewrite default locale without prefix
// });

// export default function middleware(req) {
//   const nextLocale = req.cookies.get("NEXT_LOCALE")?.value ?? "az";
//   const { pathname } = req.nextUrl;

//   // Exclude static files from localization
//   const isStaticAsset =
//     /\.(jpg|jpeg|png|gif|svg|ttf|woff|woff2|eot|otf|mp4|webm|json|css|js|ico|txt|xml)$/.test(
//       pathname
//     );
//   if (isStaticAsset) {
//     return NextResponse.next(); // Skip processing for static files
//   }

//   // const disallowedPaths = ["/doctors", "/product", "/concierge"];
//   // const isDisallowedPath =
//   //   disallowedPaths.includes(pathname) || /^\/doctors\/[^/]+$/.test(pathname);
//   // if (isDisallowedPath) {
//   //   return new NextResponse("Access Denied", { status: 403 });
//   // }

//   // Check if the pathname includes a locale
//   const hasLocale = /^\/(az|ru|en)(\/|$)/.test(pathname);

//   if (!hasLocale && !nextLocale && pathname === "/") {
//     const url = req.nextUrl.clone();
//     url.pathname = "/az" + (pathname === "/" ? "" : pathname);
//     return NextResponse.redirect(url);
//   }

//   // Handle regular localization using intlMiddleware
//   return intlMiddleware(req);
// }

// export const config = {
//   matcher: ["/", "/((?!api|_next|.\\..).*)"], // Match all routes except static files
// };



























import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["az", "en", "ru"], // Supported locales
  defaultLocale: "az", // Default locale
  localePrefix: "as-needed", // Add prefix only when necessary
  localeDetection: false, // Disable browser locale detection
  urlMappingStrategy: "rewriteDefault", // Rewrite default locale without prefix
});

export default function middleware(req) {
  const { cookies } = req;
  const nextLocale = cookies.get("NEXT_LOCALE")?.value; // Get locale from the cookie
  const { pathname } = req.nextUrl;

  // Exclude static files from localization
  const isStaticAsset =
    /\.(jpg|jpeg|png|gif|svg|ttf|woff|woff2|eot|otf|mp4|webm|json|css|js)$/.test(
      pathname
    );
  if (isStaticAsset) {
    return NextResponse.next(); // Skip processing for static files
  }

  // Check if the pathname includes a locale
  const hasLocale = /^\/(az|ru|en)(\/|$)/.test(pathname);

  if (nextLocale && !hasLocale) {
    const url = req.nextUrl.clone();
    // Only redirect if the NEXT_LOCALE is not az (since it's the default)
    if (nextLocale !== "az") {
      url.pathname = `/${nextLocale}${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(url);
    }
  }

  // Handle regular localization using intlMiddleware
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/((?!api|_next|.\\..).*)"], // Match all routes except static files
};