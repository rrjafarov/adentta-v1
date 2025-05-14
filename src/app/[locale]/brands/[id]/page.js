import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import BrandsDetailPage from "@/components/BrandsDetailPage";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";

async function fetchBrandsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  const { data: brands } = await axiosInstance.get(`/page-data/brands`, {
    cache: "no-store",
    // headers: { Lang: lang.value },
  });
  return brands.data.data;
}

// *categories
async function fetchCategoryPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: category } = await axiosInstance.get(`/page-data/categories`, {
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
    const data = axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
  }
}





//! brandsApi
async function fetchBrandsPageDataFoot() {
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

const page = async ({ params }) => {

  const brandsResponse = await fetchBrandsPageDataFoot();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  const translations = await getTranslations();
  const t = translations?.data;
  const { id } = params;
  const slug =  id.split("-").pop(); // URL'den gelen id'yi alıyoruz
  const brandsDetailData = await fetchBrandsPageData();

  const brandsDetailDataDetail = brandsDetailData.find((item) => item.id.toString() === slug);

  if (!brandsDetailDataDetail) {
    return <div>Blog not found.</div>;
  }

  const otherBrands = brandsDetailData.filter((item) => item.id.toString() !== slug);
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];

  return (
    <div>
      <div className="bradsBackColor">
        <Header categoryData={categoryData} />
      </div>


      <BrandsDetailPage t={t} brandsDetailDataDetail={brandsDetailDataDetail} otherBrands={otherBrands} />


      <div className="bradsBackColor">
        <Footer categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
      </div>
    </div>
  );
};

export default page;
