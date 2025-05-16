import BlogPages from "@/components/BlogPages";
import BlogsDetailPage from "@/components/BlogsDetailPage";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

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
async function fetchBlogCategoryPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: blogsCategory } = await axiosInstance.get(`/page-data/blog-categories`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return blogsCategory;
  } catch (error) {
    console.error("Failed to fetch blogsCategory page data", error);
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




async function fetchBlogSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: aboutSeo } = await axiosInstance.get(`/page-data/blog-page-info`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return aboutSeo;
  } catch (error) {
    console.error("Failed to fetch aboutSeo page data", error);
    throw error;
  }
}
// !generateMetaData
export async function generateMetadata({ params }) {
  const { data } = await fetchBlogSeoData();

  return {
    title: data?.meta_title,
    description: data?.meta_description,
    openGraph: {
      title: data?.meta_title || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      description: data?.meta_description,
      images: [
        {
          // url: `/favicon.ico.svg`,
          url: `https://admin.adentta.az/storage${data?.og_image}`,
          alt: data?.meta_title,
          width: 1200,
          height: 630,
        },
      ],
      site_name: data?.meta_title,
    },
    twitter: {
      card: "summary_large_image",
      title: data?.meta_title || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      description: data?.meta_description || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      url: `https://admin.adentta.az/storage${data?.og_image}`,
    },
  };
}

// !generateMetaData



const page = async () => {
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];


  const translations = await getTranslations();
  const t = translations?.data;
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  const blogsResponse = await fetchBlogsPageData();
  const blogData = blogsResponse?.data?.data || [];
  const blogsCategoryResponse = await fetchBlogCategoryPageData();
  const blogsCategoryData = blogsCategoryResponse?.data?.data || [];
  return (
    <div>
      <Header categoryData={categoryData} />
      <BlogPages t={t} blogsCategoryData={blogsCategoryData} blogData={blogData} />
      <Footer categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
    </div>
  );
};

export default page;
