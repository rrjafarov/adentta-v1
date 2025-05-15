import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MissionPageBanner from "@/components/MissionPageBanner";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

async function fetchAboutPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: about } = await axiosInstance.get(`/page-data/about`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return about;
  } catch (error) {
    console.error("Failed to fetch about page data", error);
    throw error;
  }
}
// *categories
async function fetchCategoryPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: category } = await axiosInstance.get(
      `/page-data/categories?per_page=999`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
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
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];
  const about = await fetchAboutPageData();
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  const translations = await getTranslations();
  const t = translations?.data;

  return (
    <div id="teamer">
      <Header categoryData={categoryData} />
      <MissionPageBanner
        t={t}
        misionTitle={about?.data.misson_title}
        misionContent={about?.data.misson_content}
        visionTitle={about?.data.vision_title}
        vision={about?.data.vision}
        futureGoalTitle={about?.data.future_goal_title}
        futureGoal={about?.data.future_goal}
        misionSubTitle={about?.data.misson_sub_title}
        visionSubTitle={about?.data.vision_sub_title}
        futureGoalSubTitle={about?.data.future_goal_sub_title}
      />
      <Footer
        categoryData={categoryData}
        eventsData={eventsData}
        brandsData={brandsData}
      />
    </div>
  );
};

export default page;
