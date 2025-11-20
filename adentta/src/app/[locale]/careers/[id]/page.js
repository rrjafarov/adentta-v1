

import Footer from "@/components/Footer/Footer";
import CareersDetailPage from "@/components/CareersDetailPage";
import Header from "@/components/Header/Header";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";
import React from "react";

async function fetchCareersPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  const { data: careers } = await axiosInstance.get(`/page-data/vacancies`, {
    cache: "no-store",
    // headers: { Lang: lang.value },
  });
  return careers.data.data;
}

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
    throw error;
  }
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
    throw error;
  }
}
// *categories


//! brandsApi
async function fetchBrandsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: brands } = await axiosInstance.get(`/page-data/brands`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return brands;
  } catch (error) {
    throw error;
  }
}
//! brandsApi

//! eventsApi
async function fetchEventsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: events } = await axiosInstance.get(`/page-data/event`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return events;
  } catch (error) {
    throw error;
  }
}
//! eventsApi

async function getTranslations() {
  try {
    const data = axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
  }
}






export async function generateMetadata({ params }) {
  const slug = params.id.split("-").pop();  
  const allCareers = await fetchCareersPageData();  
  const careers = allCareers.find(b => b.id.toString() === slug);

  
  if (!careers) {
    return {
      title: "Adentta",
      description: "Careers not found.",
    };
  }

  // brand obyektindən birbaşa götürürük
  const imageUrl = careers.image;
  const imageAlt = careers.title || "Adentta";
  const canonicalUrl = `https://adentta.az/brands/${params.id}`;

  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value;

  return {
    title: careers.title,
    description: careers.title,
    openGraph: {
      title: careers.title,
      description: careers.title,
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
      title: careers.title,
      description: careers.title,
      creator: "@adentta",
      site: "@adentta",
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}


async function fetchContactPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  try {
    const { data: contact } = await axiosInstance.get(`/page-data/contact`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return contact;
  } catch (error) {
    throw error;
  }
}






export default async function Page({ params }) {
  const { id } = params;
  const slug =  id.split("-").pop(); // URL'den gelen id'yi alıyoruz
  
  const translations = await getTranslations();
  const t = translations?.data;

  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];
    const contact = await fetchContactPageData();

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];
  const careersData = await fetchCareersPageData(); // Kariyer verilerinin bulunduğu dizi
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  // URL'den gelen id ile eşleşen kariyer verisini buluyoruz:
  const careerDetail = careersData.find((item) => item.id.toString() === slug);


  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];

  if (!careerDetail) {
    return <div>Career not found.</div>;
  }

  return (
    <div>
      <Header settingData={settingData}  categoryData={categoryData} />
      <CareersDetailPage t={t} careerData={careerDetail} />
      <Footer contact={contact} categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
    </div>
  );
}
