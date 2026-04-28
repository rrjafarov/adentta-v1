// import React from "react";
// import EventsDetailPage from "@/components/EventsDetailPage";
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";
// // import Header from "@/components/Header/Header";
// import axiosInstance from "@/lib/axios";
// import { cookies } from "next/headers";

// async function fetchEventsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   const { data: events } = await axiosInstance.get(
//     `/page-data/event?per_page=999`,
//     {
//       cache: "no-store",
//       // headers: { Lang: lang.value },
//     },
//   );
//   return events.data.data;
// }

// async function getTranslations() {
//   try {
//     const data = await axiosInstance.get("/translation-list");
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// export async function generateMetadata({ params }) {
//   const slug = params.id.split("-").pop();
//   const allEvents = await fetchEventsPageData();
//   const event = allEvents.find((b) => b.id.toString() === slug);

//   if (!event) {
//     return {
//       title: "Adentta",
//       description: "Event not found.",
//     };
//   }

//   const imageUrl = event.image || "";
//   const imageAlt = event.title || "Adentta";

//   const baseUrl = "https://adentta.az";
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE")?.value || "az";

//   // lazım olan dilləri burada tənzimlə
//   const locales = ["az", "ru", "en"];

//   // canonical: baseUrl/{lang}/events/{params.id}
//   const canonicalUrl = `${baseUrl}/${lang}/events/${params.id}`;

//   // alternates.languages map-i qururuq
//   const languages = locales.reduce((acc, l) => {
//     acc[l] = `${baseUrl}/${l}/events/${params.id}`;
//     return acc;
//   }, {});
//   languages["x-default"] = baseUrl;

//   return {
//     title: event.title,
//     description: event.title,
//     openGraph: {
//       title: event.title,
//       description: event.title,
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
//       locale: lang,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: event.title,
//       description: event.title,
//       creator: "@adentta",
//       site: "@adentta",
//       images: [`https://admin.adentta.az/storage${imageUrl}`],
//     },
//     alternates: {
//       canonical: canonicalUrl,
//       languages,
//     },
//   };
// }

// const page = async ({ params }) => {
//   const translations = await getTranslations();
//   const t = translations?.data;
//   const { id } = await params;
//   const slug = id.split("-").pop(); // URL'den gelen id'yi alıyoruz
//   const eventsData = await fetchEventsPageData(); // Kariyer verilerinin bulunduğu dizi

//   // URL'den gelen id ile eşleşen kariyer verisini buluyoruz:
//   const eventsDetail = eventsData.find((item) => item.id.toString() === slug);

//   if (!eventsDetail) {
//     return <div>Events not found.</div>;
//   }

//   const otherEvents = eventsData.filter((item) => item.id.toString() !== slug);
//   return (
//     <div>
//       <div className="eventDPBack">
//         <EventsDetailPage
//           t={t}
//           eventsDetail={eventsDetail}
//           otherEvents={otherEvents}
//         />
//       </div>
//     </div>
//   );
// };

// export default page;



// ! New fast version




import React from "react";
import EventsDetailPage from "@/components/EventsDetailPage";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";

async function fetchEventById(id) {
  const { data } = await axiosInstance.get(`/first-page-data/${id}`, {
    cache: "no-store",
  });
  return data?.data || data;
}

async function fetchOtherEvents() {
  const { data: events } = await axiosInstance.get(`/page-data/event`, {
    cache: "no-store",
  });
  return events.data.data;
}

async function getTranslations() {
  try {
    const data = await axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function generateMetadata({ params }) {
  const slug = params.id.split("-").pop();
  const event = await fetchEventById(slug);

  if (!event) {
    return {
      title: "Adentta",
      description: "Event not found.",
    };
  }

  const imageUrl = event.image || "";
  const imageAlt = event.title || "Adentta";

  const baseUrl = "https://adentta.az";
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "az";

  // lazım olan dilləri burada tənzimlə
  const locales = ["az", "ru", "en"];

  // canonical: baseUrl/{lang}/events/{params.id}
  const canonicalUrl = `${baseUrl}/${lang}/events/${params.id}`;

  // alternates.languages map-i qururuq
  const languages = locales.reduce((acc, l) => {
    acc[l] = `${baseUrl}/${l}/events/${params.id}`;
    return acc;
  }, {});
  languages["x-default"] = baseUrl;

  return {
    title: event.title,
    description: event.title,
    openGraph: {
      title: event.title,
      description: event.title,
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
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.title,
      creator: "@adentta",
      site: "@adentta",
      images: [`https://admin.adentta.az/storage${imageUrl}`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}

const page = async ({ params }) => {
  const translations = await getTranslations();
  const t = translations?.data;
  const { id } = await params;
  const slug = id.split("-").pop();

  const eventsDetail = await fetchEventById(slug);

  if (!eventsDetail) {
    return <div>Events not found.</div>;
  }

  const eventsData = await fetchOtherEvents();
  const otherEvents = eventsData.filter((item) => item.id.toString() !== slug);

  return (
    <div>
      <div className="eventDPBack">
        <EventsDetailPage
          t={t}
          eventsDetail={eventsDetail}
          otherEvents={otherEvents}
        />
      </div>
    </div>
  );
};

export default page;