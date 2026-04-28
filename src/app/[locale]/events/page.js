// import EventsPage from "@/components/EventsPage";
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";


// async function fetchEventsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: events } = await axiosInstance.get(`/page-data/event?per_page=999`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return events;
//   } catch (error) {
//     throw error;
//   }
// }

// async function getTranslations() {
//   try {
//     const data = await axiosInstance.get("/translation-list");
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }



// async function fetchEventSeoData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: aboutSeo } = await axiosInstance.get(`/page-data/event-page-info`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return aboutSeo;
//   } catch (error) {
//     throw error;
//   }
// }

// // !generateMetaData
// export async function generateMetadata() {
//   const seo = await fetchEventSeoData();
//   const imageUrl = seo?.data.og_image;
//   const imageAlt = seo?.data.meta_title || "Adentta";
//   const canonicalUrl = "https://adentta.az";
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");
//   return {
//     title: seo?.data.meta_title,
//     description: seo?.data.meta_description,
//     // icons: {
//     //   icon: "https://adentta.az/favicon.ico.svg",
//     // },
//     openGraph: {
//       title: seo?.data.meta_title || "Adentta",
//       description: seo?.data.meta_description,
//       url: canonicalUrl,
//       images: [
//         {
//           url: `https://admin.adentta.az/storage${imageUrl}`,
//           alt: imageAlt,
//           width: 1200,
//           height: 630,
//         },
//       ],
//       site_name: "adentta.az",
//       type: "website",
//       locale: lang?.value,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: seo?.data.meta_title || "Adentta",
//       description: seo?.data.meta_description || "Adentta",
//       creator: "@adentta",
//       site: "@adentta",
//       images: [imageUrl],
//     },
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   };
// }


// const page = async () => {

//   const translations = await getTranslations();
//   const t = translations?.data;
//   const eventsResponse = await fetchEventsPageData();
//   const eventsData = eventsResponse?.data?.data || [];
//   // Tarixə görə köhnədən yeniyə sıralama
//   const sortedEvents = [...eventsData].sort((a, b) => {
//     const dateA = new Date(a.event_start_date).getTime();
//     const dateB = new Date(b.event_start_date).getTime();
//     // return dateA - dateB;
//     return dateB - dateA;
//   });

//   return (
//     <div>
//       <EventsPage t={t} eventsData={sortedEvents} />
//     </div>
//   );
// };

// export default page;




// ! Yesni fast version



import EventsPage from "@/components/EventsPage";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

async function fetchEventsPageData(page = 1) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: events } = await axiosInstance.get(`/page-data/event?page=${page}`, {
      cache: "no-store",
    });
    return events;
  } catch (error) {
    throw error;
  }
}

async function getTranslations() {
  try {
    const data = await axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function fetchEventSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: aboutSeo } = await axiosInstance.get(`/page-data/event-page-info`, {
      cache: "no-store",
    });
    return aboutSeo;
  } catch (error) {
    throw error;
  }
}

export async function generateMetadata() {
  const seo = await fetchEventSeoData();
  const imageUrl = seo?.data.og_image;
  const imageAlt = seo?.data.meta_title || "Adentta";
  const canonicalUrl = "https://adentta.az";
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  return {
    title: seo?.data.meta_title,
    description: seo?.data.meta_description,
    openGraph: {
      title: seo?.data.meta_title || "Adentta",
      description: seo?.data.meta_description,
      url: canonicalUrl,
      images: [
        {
          url: `https://admin.adentta.az/storage${imageUrl}`,
          alt: imageAlt,
          width: 1200,
          height: 630,
        },
      ],
      site_name: "adentta.az",
      type: "website",
      locale: lang?.value,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.data.meta_title || "Adentta",
      description: seo?.data.meta_description || "Adentta",
      creator: "@adentta",
      site: "@adentta",
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const page = async ({ searchParams }) => {
  const translations = await getTranslations();
  const t = translations?.data;

  const currentPage = Number((await searchParams)?.page) || 1;

  const eventsResponse = await fetchEventsPageData(currentPage);
  const eventsData = eventsResponse?.data?.data || [];
  const pagination = eventsResponse?.data || {};

  const sortedEvents = [...eventsData].sort((a, b) => {
    const dateA = new Date(a.event_start_date).getTime();
    const dateB = new Date(b.event_start_date).getTime();
    return dateB - dateA;
  });

  return (
    <div>
      <EventsPage
        t={t}
        eventsData={sortedEvents}
        currentPage={currentPage}
        totalPages={pagination.last_page || 1}
      />
    </div>
  );
};

export default page;