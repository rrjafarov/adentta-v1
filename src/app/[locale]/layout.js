// import "./globals.scss";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";
// import NavigationProgress from "@/components/NavigationLoading";
// import Script from "next/script";
// import "@/components/Header/header.scss";

// export const metadata = {
//   title: "Adentta - Dental Supplier",
//   description: "Adentta Dental Supplier",
// };

// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
// };

// async function fetchSettingsPageData() {
//   const cookieStore = cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   const { data } = await axiosInstance.get(`/page-data/setting`, {
//     cache: "no-store",
//   });

//   return data?.data || [];
// }

// async function fetchCategoryPageData() {
//   const cookieStore = cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   const { data } = await axiosInstance.get(
//     `/page-data/categories?per_page=999`,
//     { cache: "no-store" },
//   );

//   return data?.data?.data || [];
// }

// async function fetchContactPageData() {
//   const cookieStore = cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   const { data } = await axiosInstance.get(`/page-data/contact`, {
//     cache: "no-store",
//   });

//   return data;
// }

// async function fetchBrandsPageData() {
//   const cookieStore = cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   const { data } = await axiosInstance.get(`/page-data/brands?per_page=7`, {
//     cache: "no-store",
//   });

//   return data?.data?.data || [];
// }




// async function fetchEventsPageData() {
//   const { data } = await axiosInstance.get(`/page-data/event?per_page=6`, {
//     cache: "no-store",
//   });

//   const events = data?.data?.data || [];

//   return events.filter((item) => item.event_status === "0");
// }

// async function getTranslations() {
//   const { data } = await axiosInstance.get("/translation-list", {
//     cache: "no-store",
//   });

//   return data;
// }

// export default async function RootLayout({ children, params }) {
//   const { locale } = params;
//   const [settingData, categoryData, contact, brandsData, eventsData, t] =
//     await Promise.all([
//       fetchSettingsPageData(),
//       fetchCategoryPageData(),
//       fetchContactPageData(),
//       fetchBrandsPageData(),
//       fetchEventsPageData(),
//       getTranslations(),
//     ]);

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
//         <Header settingData={settingData} categoryData={categoryData} t={t} />
//         {children}
//         <Footer
//           contact={contact}
//           categoryData={categoryData}
//           eventsData={eventsData}
//           brandsData={brandsData}
//           t={t}
//         />
//       </body>
//     </html>
//   );
// }














// ! new tag manager

import "./globals.scss";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import NavigationProgress from "@/components/NavigationLoading";
import Script from "next/script";
import "@/components/Header/header.scss";

export const metadata = {
  title: "Adentta - Dental Supplier",
  description: "Adentta Dental Supplier",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

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
    { cache: "no-store" },
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

  const { data } = await axiosInstance.get(`/page-data/brands?per_page=7`, {
    cache: "no-store",
  });

  return data?.data?.data || [];
}

async function fetchEventsPageData() {
  const { data } = await axiosInstance.get(`/page-data/event?per_page=6`, {
    cache: "no-store",
  });

  const events = data?.data?.data || [];

  return events.filter((item) => item.event_status === "0");
}

async function getTranslations() {
  const { data } = await axiosInstance.get("/translation-list", {
    cache: "no-store",
  });

  return data;
}

export default async function RootLayout({ children, params }) {
  const { locale } = params;
  const [settingData, categoryData, contact, brandsData, eventsData, t] =
    await Promise.all([
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
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N3HN9VXT');`}
        </Script>
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N3HN9VXT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <NavigationProgress />
        <Header settingData={settingData} categoryData={categoryData} t={t} />
        {children}
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