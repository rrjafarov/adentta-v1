// import "./globals.scss";
// export const metadata = {
//   title: "Adentta - Dental Supplier",
//   description: "Adentta Dental Supplier",
// };
// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
// };


// import NavigationProgress from "@/components/NavigationLoading";
// import Script from "next/script";

// export default async function RootLayout({ children, params }) {
//   const { locale } = await params;

//   return (
//     <html lang={locale || "az"}>
//       <head>
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
//         />
//         {/* GA4 */}
//         <Script
//           src="https://www.googletagmanager.com/gtag/js?id=G-S6C3MFRQLQ"
//           strategy="afterInteractive"
//         />
//         <Script id="ga-init" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-S6C3MFRQLQ');
//           `}
//         </Script>
//       </head>
//       <body suppressHydrationWarning>
//         <NavigationProgress />
//         {children}
//       </body>
//     </html>
//   );
// }













import "./globals.scss";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import NavigationProgress from "@/components/NavigationLoading";
import Script from "next/script";

export const metadata = {
  title: "Adentta - Dental Supplier",
  description: "Adentta Dental Supplier",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

/* ================= FETCH FUNCTIONS ================= */

async function fetchSettingsPageData() {
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  const { data } = await axiosInstance.get(`/page-data/setting`, {
    cache: "no-store",
  });

  return data?.data || [];
}

async function fetchCategoryPageData() {
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  const { data } = await axiosInstance.get(
    `/page-data/categories?per_page=999`,
    { cache: "no-store" }
  );

  return data?.data?.data || [];
}

async function fetchContactPageData() {
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  const { data } = await axiosInstance.get(`/page-data/contact`, {
    cache: "no-store",
  });

  return data;
}

async function fetchBrandsPageData() {
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  const { data } = await axiosInstance.get(`/page-data/brands`, {
    cache: "no-store",
  });

  return data?.data?.data || [];
}

async function fetchEventsPageData() {
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  const { data } = await axiosInstance.get(`/page-data/event`, {
    cache: "no-store",
  });

  return data?.data?.data || [];
}

async function getTranslations() {
  const { data } = await axiosInstance.get("/translation-list", {
    cache: "no-store",
  });

  return data;
}

/* ================= ROOT LAYOUT ================= */

export default async function RootLayout({ children, params }) {
  const { locale } = params;
  /* 🔥 Paralel fetch – daha professional */
  const [
    settingData,
    categoryData,
    contact,
    brandsData,
    eventsData,
    t
  ] = await Promise.all([
    fetchSettingsPageData(),
    fetchCategoryPageData(),
    fetchContactPageData(),
    fetchBrandsPageData(),
    fetchEventsPageData(),
    getTranslations(),
  ]);

  return (
    <html lang={locale || "az"}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        {/* GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S6C3MFRQLQ"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S6C3MFRQLQ');
          `}
        </Script>
      </head>

      <body suppressHydrationWarning>
        <NavigationProgress />

        {/* ✅ HEADER */}
        <Header
          settingData={settingData}
          categoryData={categoryData}
          t={t}
        />

        {children}

        {/* ✅ FOOTER */}
        <Footer
          contact={contact}
          categoryData={categoryData}
          eventsData={eventsData}
          brandsData={brandsData}
          t={t}
        />
      </body>
    </html>
  );
}