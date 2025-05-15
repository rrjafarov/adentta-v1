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
// import Logo from "../../../public/icons/logo.svg";

//! ProductsApi
async function fetchProductsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: product } = await axiosInstance.get(`/page-data/product`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return product.data.data;
  } catch (error) {
    console.error("Failed to fetch product page data", error);
    throw error;
  }
}
//! ProductsApi

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

//! blogsApi
async function fetchBlogsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: blogs } = await axiosInstance.get(`/page-data/blog`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return blogs;
  } catch (error) {
    console.error("Failed to fetch blogs page data", error);
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
    console.error("Failed to fetch slider page data", error);
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
    console.error("Failed to fetch banner page data", error);
    throw error;
  }
}
//! bannerApi
async function getTranslations (){
  try {
    const data = axiosInstance.get("/translation-list")
    return data;
  }catch(err){
    console.log(err)
  }
}
// !categories
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
    console.error("Failed to fetch homepage page data", error);
    throw error;
  }
}



// !generateMetaData
export async function generateMetadata({ params }) {
  const { data } = await fetchHomePageData();

  return {
    title: data?.meta_title,
    description: data?.meta_description,
    openGraph: {
      title: data?.meta_title || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      description: data?.meta_description,
      images: [
        {
          // url: `/favicon.ico.svg`,
          url: `https://admin.adentta.az/storage${data.og_image}`,
          alt: data?.meta_title,
          width: 1200,
          height: 630,
        },
      ],
      site_name: data.meta_title,
    },
    twitter: {
      card: "summary_large_image",
      title: data?.meta_title || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      description: data?.meta_description || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      url: `https://admin.adentta.az/storage${data.og_image}`,
    },
  };
}


// !generateMetaData




const Home = async () => {
  const translations = await getTranslations()
  const t = translations?.data

  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];

  const productData = await fetchProductsPageData();
  //
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  const blogsResponse = await fetchBlogsPageData();
  const blogData = blogsResponse?.data?.data || [];

  const heroSliderResponse = await fetchHeroSlidePageData();
  const heroSliderData = heroSliderResponse?.data?.data || [];

  const bannerResponse = await fetchBannerPageData();
  // const bannerData = bannerResponse?.data?.data || [];
  const bannerData = bannerResponse?.data || {};

  const homepageResponse = await fetchHomePageData();
  const homepageData = homepageResponse?.data || {};


  return (
    <div>
      <Header categoryData={categoryData} isHomePage={true} />
      <HeroSlider bannerData={bannerData} heroSliderData={heroSliderData} />
      <LittleCard t={t} />
      <HomePageProducts  t={t} productData={productData} categoryData={categoryData} />
      <VideoProviderHomePage  t={t} homepageData={homepageData}  />
      <TopBrandsHomePage t={t} brandsData={brandsData} />
      <OurEventsHomePage t={t} eventsData={eventsData} />
      <GlobalExcellence t={t} brandsData={brandsData} />
      <OurBlogsHomePage t={t}  blogData={blogData} />
      <Footer isHomePage={true} t={t} categoryData={categoryData} eventsData={eventsData} brandsData={brandsData} />
    </div>
  );
};

export default Home;
