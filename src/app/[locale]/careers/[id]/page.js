

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
    console.error("Failed to fetch brands page data", error);
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
    console.error("Failed to fetch events page data", error);
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

export default async function Page({ params }) {
  const { id } = params;
  const slug =  id.split("-").pop(); // URL'den gelen id'yi alıyoruz
  
  const translations = await getTranslations();
  const t = translations?.data;

  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];
  const careersData = await fetchCareersPageData(); // Kariyer verilerinin bulunduğu dizi
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  // URL'den gelen id ile eşleşen kariyer verisini buluyoruz:
  const careerDetail = careersData.find((item) => item.id.toString() === slug);

  if (!careerDetail) {
    return <div>Career not found.</div>;
  }

  return (
    <div>
      <Header categoryData={categoryData} />
      <CareersDetailPage t={t} careerData={careerDetail} />
      <Footer categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
    </div>
  );
}
