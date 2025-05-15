import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import VideoGalery from '@/components/VideoGalery'
import React from 'react'
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

async function fetchAboutPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: videoCategory } = await axiosInstance.get(`/page-data/video-categories?per_page=999`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return videoCategory;
  } catch (error) {
    console.error("Failed to fetch videoCategory page data", error);
    throw error;
  }
}

async function getTranslations() {
  try {
    const data = axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
  }
}



async function fetchVideoPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: videos } = await axiosInstance.get(`/page-data/video`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return videos;
  } catch (error) {
    console.error("Failed to fetch video page data", error);
    throw error;
  }
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

const page = async () => {

  const translations = await getTranslations();
  const t = translations?.data;


  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];
  const videoCategory = await fetchAboutPageData();
  const videos = await fetchVideoPageData();
  const videoCategoryData = videoCategory?.data?.data || [];
  const videosData = videos?.data?.data || [];
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  return (
    <div>
        <Header categoryData={categoryData} />
        <VideoGalery t={t} videosData={videosData} videoCategoryData={videoCategoryData} />
        <Footer categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
    </div>
  )
}

export default page
