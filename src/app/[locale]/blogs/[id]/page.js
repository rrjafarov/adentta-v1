
// ! son verisya
// import EventsDetailPage from "@/components/EventsDetailPage";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";
import BlogsDetailPage from "@/components/BlogsDetailPage";


async function fetchBlogsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  const { data: blogs } = await axiosInstance.get(`/page-data/blog`, {
    cache: "no-store",
    // headers: { Lang: lang.value },
  });
  return blogs.data.data;
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

// Tarixləri Azərbaycan dilində formatlayan funksiya
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const azMonths = {
    1: "yan",
    2: "fev",
    3: "mar",
    4: "apr",
    5: "may",
    6: "iyn",
    7: "iyl",
    8: "avq",
    9: "sen",
    10: "okt",
    11: "noy",
    12: "dek",
  };
  const month = azMonths[date.getMonth() + 1];
  return `${day} ${month} ${year}`;
};

const page = async ({ params }) => {
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];
  
  const translations = await getTranslations();
  const t = translations?.data;
  const { id } = params;
  const slug = id.split("-").pop(); // URL'den gelen id'yi alıyoruz
  const blogsData = await fetchBlogsPageData(); // Kariyer verilerinin bulunduğu dizi
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  // URL'den gelen id ile eşleşen kariyer verisini buluyoruz:
  const rawBlogDetail = blogsData.find((item) => item.id.toString() === slug);

  if (!rawBlogDetail) {
    return <div>Career not found.</div>;
  }

  // Tarixləri formatla
  const blogDetail = {
    ...rawBlogDetail,
    published_date: formatDate(rawBlogDetail.published_date),
  };

  const otherBlogs = blogsData
    .filter((item) => item.id.toString() !== slug)
    .map((item) => ({
      ...item,
      published_date: formatDate(item.published_date),
    }));

  return (
    <div>
      <div className="eventDPBack">
        <Header categoryData={categoryData} />
        <BlogsDetailPage
          t={t}
          blogDetail={blogDetail}
          otherBlogs={otherBlogs}
        />
        <Footer
          categoryData={categoryData}
          eventsData={eventsData}
          brandsData={brandsData}
        />
      </div>
    </div>
  );
};

export default page;

// ! son verisya