// import { getRequestConfig } from "next-intl/server";
// import axiosInstance from "@/src/lib/axios";
// import { routing } from "./routing";
// import { cookies } from "next/headers"; // Import cookies from next/headers

// export default getRequestConfig(async ({ requestLocale }) => {
//   let locale = requestLocale;

//   if (!locale || !routing.locales.includes(locale)) {
//     locale = routing.defaultLocale;
//   }

//   // Await cookies to get the NEXT_LOCALE cookie value
//   const cookieStore = await cookies();
//   const language = cookieStore.get("NEXT_LOCALE")?.value || locale;

//   try {
//     const response = await axiosInstance.get(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/translation-list`,
//       {
//         headers: {
//           Lang: language,
//         },
//       }
//     );

//     // Transform the response data to the format expected by next-intl
//     const messages = response.data.reduce((acc, { key, value }) => {
//       acc[key] = value;
//       return acc;
//     }, {});

//     return {
//       locale,
//       messages,
//     };
//   } catch (error) {
//     console.error("Failed to load translations:", error);
//     return {
//       locale,
//       messages: {}, // Fallback to empty messages if the API request fails
//     };
//   }
// });







import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { cookies } from "next/headers";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = requestLocale;

  if (!locale  || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  const cookieStore = await cookies();
  const language = cookieStore.get("NEXT_LOCALE")?.value || locale;

  return {
    locale: language,
  };
});