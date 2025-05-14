// // import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.scss";

// // const geistSans = Geist({
// //   variable: "--font-geist-sans",
// //   subsets: ["latin"],
// // });

// // const geistMono = Geist_Mono({
// //   variable: "--font-geist-mono",
// //   subsets: ["latin"],
// // });

// export const metadata = {
//   title: "Adentta - Dental Supplier", 
//   description: "Adentta Dental Supplier",
//   icons: "/favicon.ico.svg",
// };
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
//       </head>
//       <body
//         suppressHydrationWarning
//         // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }










// app/[locale]/layout.js

import "./globals.scss";

export const metadata = {
  title: "Adentta - Dental Supplier",
  description: "Adentta Dental Supplier",
  icons: "/favicon.ico.svg",
};

export default function RootLayout({ children, params }) {
  const { locale } = params;

  return (
    <html lang={locale || "az"}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
