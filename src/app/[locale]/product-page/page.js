// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import NewProductPage from "@/components/Footer/NewProductPage";
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// async function fetchAboutPageData() {
//  const cookieStore = await cookies();
//  const lang = cookieStore.get("NEXT_LOCALE");
//  try {
//    const { data: product } = await axiosInstance.get(`/page-data/product`, {
//      // headers: { Lang: lang.value },
//      cache: "no-store",
//    });
//    return product.data.data;
//  } catch (error) {
//    throw error;
//  }
// }

// const page = async () => {
//  const productData = await fetchAboutPageData();

//  return (
//    <div>
//      {/* <Header /> */}
//      <ProductsPageHero />
//      <NewProductPage productData={productData} />
//      {/* <Footer /> */}
//    </div>
//  );
// };

// export default page;




// app/product-page/page.js
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
import NewProductPage from "@/components/Footer/NewProductPage";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

function buildRawQuery(searchParams = {}) {
  const parts = [];
  for (const [key, value] of Object.entries(searchParams || {})) {
    if (Array.isArray(value)) {
      for (const v of value)
        parts.push(`${key}=${encodeURIComponent(String(v))}`);
    } else if (value !== undefined && value !== null && value !== "") {
      parts.push(`${key}=${encodeURIComponent(String(value))}`);
    }
  }
  return parts.join("&");
}

async function fetchProductsPageData(searchParams = {}) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("NEXT_LOCALE");
  const locale = langCookie?.value ?? undefined;

  const queryString =
    searchParams && Object.keys(searchParams).length > 0
      ? buildRawQuery(searchParams)
      : "per_page=12";

  try {
    // DƏYIŞDI: endpoint postmandakı forma ilə eynidir
    const { data } = await axiosInstance.get(
      `/page-data/product?${queryString}`,
      {
        headers: locale ? { Lang: locale } : {},
        cache: "no-store",
      }
    );

    // Normalizasiya: müxtəlif backend strukturlarına uyğun çıxarırıq
    const items = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.data?.data)
      ? data.data.data
      : Array.isArray(data?.items)
      ? data.items
      : [];

    return items;
  } catch (error) {
    throw error;
  }
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
async function fetchBrandsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return brands;
  } catch (error) {
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

// !generateMetadata for product page
export async function generateMetadata({ searchParams }) {
  const products = await fetchProductsPageData(searchParams ?? {}); // Productları backenddən alırıq
  const firstProduct = products[0]; // İlk məhsulu götürürük
  const firstCategory = firstProduct?.categories?.[0]; // İlk kateqoriyanı götürürük

  const title = firstCategory?.meta_title || "Adentta"; // Meta title
  const description = firstCategory?.meta_description || "Adentta"; // Meta description

  const canonicalUrl = "https://adentta.az"; // Canonical URL

  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: firstCategory?.icon
        ? [
            {
              url: `https://admin.adentta.az/storage${firstCategory.icon}`,
              alt: title,
              width: 1200,
              height: 630,
            },
          ]
        : [],
      site_name: "adentta.az",
      type: "website",
      locale: lang?.value,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@adentta",
      site: "@adentta",
      images: firstCategory?.icon
        ? [`https://admin.adentta.az/storage${firstCategory.icon}`]
        : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}


const Page = async ({ searchParams }) => {
  const productData = await fetchProductsPageData(searchParams ?? {});

  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  const contact = await fetchContactPageData();

  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];
  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  const translations = await getTranslations();
  const t = translations?.data;
  return (
    <div>
      <Header settingData={settingData} categoryData={categoryData} />
      <ProductsPageHero />
      <NewProductPage brandsData={brandsData} t={t} productData={productData} />
      <Footer
        contact={contact}
        categoryData={categoryData}
        eventsData={eventsData}
        brandsData={brandsData}
      />
    </div>
  );
};

export default Page;
