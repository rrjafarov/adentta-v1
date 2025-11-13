// import "./globals.scss";

// export const metadata = {
//   title: "Adentta - Dental Supplier",
//   description: "Adentta Dental Supplier",
//   // icons: "/favicon.ico.svg",
// };
// import NavigationProgress from "@/components/NavigationLoading";

// export default async function RootLayout({ children, params }) {
//   const { locale } = await params;

//   return (
//     <html lang={locale || "az"}>
//       <head>
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
//         />
//       </head>
//       <body suppressHydrationWarning>
//         <NavigationProgress />
        
//         {children}
//       </body>
//     </html>
//   );
// }











import "./globals.scss";

export const metadata = {
  title: "Adentta - Dental Supplier",
  description: "Adentta Dental Supplier",
  // icons: "/favicon.ico.svg",
};

import NavigationProgress from "@/components/NavigationLoading";
import Script from "next/script";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

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
        {children}
      </body>
    </html>
  );
}




























// import "./globals.scss";

// export const metadata = {
//   title: "Adentta - Dental Supplier",
//   description: "Adentta Dental Supplier",
//   // icons: "/favicon.ico.svg",
// };

// import NavigationProgress from "@/components/NavigationLoading";

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
//         <script
//           async
//           src="https://www.googletagmanager.com/gtag/js?id=G-S6C3MFRQLQ"
//         ></script>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', 'G-S6C3MFRQLQ');
//             `,
//           }}
//         ></script>
//       </head>
//       <body suppressHydrationWarning>
//         <NavigationProgress />
//         {children}
//       </body>
//     </html>
//   );
// }
