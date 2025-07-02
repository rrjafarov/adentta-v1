import React from "react";
import EventsDetailPage from "@/components/EventsDetailPage";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";

async function fetchSettingsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: setting } = await axiosInstance.get(`/page-data/setting`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return setting;
  } catch (error) {
    console.error("Failed to fetch setting page data", error);
    throw error;
  }
}

async function fetchEventsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  const { data: events } = await axiosInstance.get(`/page-data/event?per_page=999`, {
    cache: "no-store",
    // headers: { Lang: lang.value },
  });
  return events.data.data;
}
// *categories
async function fetchCategoryPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: category } = await axiosInstance.get(`/page-data/categories?per_page=999`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return category;
  } catch (error) {
    console.error("Failed to fetch category page data", error);
    throw error;
  }
}
// *categories


async function getTranslations() {
  try {
    const data = await axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
  }
}

//! brandsApi
async function fetchBrandsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return brands;
  } catch (error) {
    console.error("Failed to fetch brands page data", error);
    throw error;
  }
}
//! brandsApi



export async function generateMetadata({ params }) {
  
  const slug = params.id.split("-").pop();
  const allEvents = await fetchEventsPageData();
  const event = allEvents.find(b => b.id.toString() === slug);

  if (!event) {
    return {
      title: "Adentta",
      description: "Event not found.",
    };
  }

  const imageUrl = event.image;
  const imageAlt = event.title || "Adentta";
  const canonicalUrl = `https://adentta.az/brands/${params.id}`;

  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value; 

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
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}


const page = async ({params}) => {

  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const translations = await getTranslations();
  const t = translations?.data;
  const { id } = await params;
  const slug =  id.split("-").pop(); // URL'den gelen id'yi alıyoruz
  const eventsData = await fetchEventsPageData(); // Kariyer verilerinin bulunduğu dizi
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  // URL'den gelen id ile eşleşen kariyer verisini buluyoruz:
  const eventsDetail = eventsData.find((item) => item.id.toString() === slug);


  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];

  if (!eventsDetail) {
    return <div>Events not found.</div>;
  }

   const otherEvents = eventsData.filter((item) => item.id.toString() !== slug);
  return (
    <div>
      <div className="eventDPBack">
        <Header settingData={settingData} categoryData={categoryData} />
        <EventsDetailPage t={t} eventsDetail={eventsDetail} otherEvents={otherEvents} />
        <Footer categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
      </div>
    </div>
  );
};

export default page;
