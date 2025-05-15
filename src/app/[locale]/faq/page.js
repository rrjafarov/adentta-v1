import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

async function fetchFaqPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: faq } = await axiosInstance.get(`/page-data/faq`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return faq;
  } catch (error) {
    console.error("Failed to fetch faq page data", error);
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


const page = async () => {

  const translations = await getTranslations();
  const t = translations?.data;
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];
  const faq = await fetchFaqPageData(); // History verisini çekiyoruz
  const faqData = faq?.data?.data || [];
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];

  return (
    <div>
      <div className="faqBackImg">
        <Header categoryData={categoryData} />
        <FAQs t={t} faqData={faqData} />
        <Footer categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
      </div>
    </div>
  );
};

export default page;
