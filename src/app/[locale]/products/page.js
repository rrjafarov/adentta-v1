// !Son versiya
// File: app/products/page.jsx
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
import ProductsPageFilter from "@/components/ProductsPageFilter";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

// Fetch all products (unfiltered)
async function fetchAboutPageData() {
  const cookieStore = await cookies();
  // const lang = cookieStore.get("NEXT_LOCALE"); // Uncomment if needed

  try {
    const { data: product } = await axiosInstance.get("/page-data/product?per_page=999", {
      cache: "no-store",
    });
    return product.data.data;
  } catch (error) {
    console.error("Failed to fetch product page data", error);
    return [];
  }
}

async function getTranslations (){
  try {
    const data = axiosInstance.get("/translation-list")
    return data;
  }catch(err){
    console.log(err)
  }
}

// Fetch brand list
async function fetchBrandFilterPageData() {
  const cookieStore = await cookies();
  // const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: brands } = await axiosInstance.get("/page-data/brands", {
      cache: "no-store",
    });
    return brands.data.data;
  } catch (error) {
    console.error("Failed to fetch brands page data", error);
    return [];
  }
}

// !category
// Fetch category list
async function fetchCategoryPageData() {
  const cookieStore = await cookies();
  // const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: category } = await axiosInstance.get(
      "/page-data/categories?per_page=999",
      {
        cache: "no-store",
      }
    );
    return category.data.data;
  } catch (error) {
    console.error("Failed to fetch category page data", error);
    return [];
  }
}

// !category  



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








async function fetchProductsSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: aboutSeo } = await axiosInstance.get(`/page-data/product-page-info`, {
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
export async function generateMetadata() {
  const seo = await fetchProductsSeoData();
  const imageUrl = seo?.data.og_image;
  const imageAlt = seo?.data.meta_title || "Adentta";
  const canonicalUrl = "https://adentta.az";
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  return {
    title: seo?.data.meta_title,
    description: seo?.data.meta_description,
    // icons: {
    //   icon: "https://adentta.az/favicon.ico.svg",
    // },
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
      locale: lang?.value,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.data.meta_title || "Adentta",
      description: seo?.data.meta_description || "Adentta",
      creator: "@adentta",
      site: "@adentta",
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
// !generateMetaData





// Main page component
export default async function page({ searchParams }) {
  // Read ?category=ID from URL (e.g. /products?category=3)
  const categoryParam = searchParams.category || null;

  // Fetch initial data
  const productData = await fetchAboutPageData();
  const brandsDataFilter = await fetchBrandFilterPageData();
  const categoryData = await fetchCategoryPageData();
  const translations = await getTranslations()
  const t = translations?.data

  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  
  return (
    <>
      {/* <Header /> */}
      <Header categoryData={categoryData} />
      <ProductsPageHero t={t} productData={productData} />
      <ProductsPageFilter
        productData={productData}
        categoryData={categoryData}
        // brandsData={brandsData}
        brandsDataFilter={brandsDataFilter}
        categoryParam={categoryParam}
        t={t}
      />
      <Footer categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
    </>
  );
}

// !Son versiya
