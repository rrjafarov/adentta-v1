import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HomePageProducts from "@/components/HomePageProducts";
import LittleCard from "@/components/LittleCard";
import GlobalExcellence from "@/components/Sliders/GlobalExcellence";
import HeroSlider from "@/components/Sliders/HeroSlider";
import OurBlogsHomePage from "@/components/Sliders/OurBlogsHomePage";
import OurEventsHomePage from "@/components/Sliders/OurEventsHomePage";
import TopBrandsHomePage from "@/components/Sliders/TopBrandsHomePage";
import VideoProviderHomePage from "@/components/VideoProviderHomePage";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

//! brandsApi
async function fetchBrandsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: brands } = await axiosInstance.get(
      `/page-data/brands`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
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
    const { data: events } = await axiosInstance.get(
      `/page-data/event`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
    return events;
  } catch (error) {
    throw error;
  }
}
//! eventsApi

//! blogsApi
async function fetchBlogsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: blogs } = await axiosInstance.get(
      // `/page-data/blog?per_page=999`,
      `/page-data/blog`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
    return blogs;
  } catch (error) {
    throw error;
  }
}
//! blogsApi

//! heroSliderApi
async function fetchHeroSlidePageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: slider } = await axiosInstance.get(`/page-data/slider`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return slider;
  } catch (error) {
    throw error;
  }
}
//! heroSliderApi

//! bannerApi
async function fetchBannerPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: banner } = await axiosInstance.get(`/page-data/banner`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return banner;
  } catch (error) {
    throw error;
  }
}
//! bannerApi

async function getTranslations() {
  try {
    const data = axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
  }
}

// !categories
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
    throw error;
  }
}
// !categories

async function fetchHomePageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: homepage } = await axiosInstance.get(`/page-data/homepage`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return homepage;
  } catch (error) {
    throw error;
  }
}

// !generateMetaData

export async function generateMetadata() {
  const seo = await fetchHomePageData();
  const imageUrl = seo?.data.og_image;
  const imageAlt = seo?.data.meta_title || "Adentta";
  const canonicalUrl = "https://adentta.az";

  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "az";

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
      locale: lang,
    },

    twitter: {
      card: "summary_large_image",
      title: seo?.data.meta_title || "Adentta",
      description: seo?.data.meta_description || "Adentta",
      creator: "@adentta",
      site: "@adentta",
      images: [`https://admin.adentta.az/storage${imageUrl}`],
    },

    alternates: {
      canonical: canonicalUrl,

      languages: {
        az: "https://adentta.az/az",
        ru: "https://adentta.az/ru",
        en: "https://adentta.az/en",
      },
    },
  };
}

// !generateMetaData

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

const Home = async () => {
  const contact = await fetchContactPageData();
  const translations = await getTranslations();
  const t = translations?.data;

  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];

  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  const blogsResponse = await fetchBlogsPageData();
  const blogData = blogsResponse?.data?.data || [];

  const heroSliderResponse = await fetchHeroSlidePageData();
  const heroSliderData = heroSliderResponse?.data?.data || [];

  const bannerResponse = await fetchBannerPageData();
  const bannerData = bannerResponse?.data || {};

  const homepageResponse = await fetchHomePageData();
  const homepageData = homepageResponse?.data || {};

  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];

  return (
    <div>
      <Header
        settingData={settingData}
        categoryData={categoryData}
        isHomePage={true}
      />
      <HeroSlider bannerData={bannerData} heroSliderData={heroSliderData} />
      <LittleCard t={t} />
      <HomePageProducts
        t={t}
        categoryData={categoryData}
      />
      <VideoProviderHomePage t={t} homepageData={homepageData} />
      <TopBrandsHomePage t={t} brandsData={brandsData} />
      <OurEventsHomePage t={t} eventsData={eventsData} />
      <GlobalExcellence t={t} brandsData={brandsData} />
      <OurBlogsHomePage t={t} blogData={blogData} />
      <Footer
        contact={contact}
        isHomePage={true}
        t={t}
        categoryData={categoryData}
        eventsData={eventsData}
        brandsData={brandsData}
      />
    </div>
  );
};

export default Home;