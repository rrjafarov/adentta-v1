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

  const { data: blogs } = await axiosInstance.get(
    `/page-data/blog?per_page=999`,
    {
      cache: "no-store",
      // headers: { Lang: lang.value },
    }
  );
  return blogs.data.data;
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
    const { data: brands } = await axiosInstance.get(
      `/page-data/brands?per_page=999`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
    return brands;
  } catch (error) {
    console.error("Failed to fetch brands page data", error);
    throw error;
  }
}
//! brandsApi


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
    console.error("Failed to fetch setting page data", error);
    throw error;
  }
}

//! eventsApi
async function fetchEventsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: events } = await axiosInstance.get(
      `/page-data/event?per_page=999`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
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

export async function generateMetadata({ params }) {
  const slug = params.id.split("-").pop();
  const allBlogs = await fetchBlogsPageData();
  const blog = allBlogs.find((b) => b.id.toString() === slug);

  if (!blog) {
    return {
      title: "Adentta",
      description: "Blog not found.",
    };
  }

  const imageUrl = blog.image;
  const imageAlt = blog.title || "Adentta";
  const canonicalUrl = `https://adentta.az/brands/${params.id}`;

  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value;

  return {
    title: blog.title,
    description: blog.title,
    openGraph: {
      title: blog.title,
      description: blog.title,
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
      title: blog.title,
      description: blog.title,
      creator: "@adentta",
      site: "@adentta",
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const page = async ({ params }) => {
  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];

  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  const translations = await getTranslations();
  const t = translations?.data;
  const { id } = params;
  const slug = id.split("-").pop();
  const blogsData = await fetchBlogsPageData();
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  // URL'den gelen id ile eşleşen kariyer verisini buluyoruz:
  const rawBlogDetail = blogsData.find((item) => item.id.toString() === slug);

  if (!rawBlogDetail) {
    return <div>Blogs not found.</div>;
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
        <Header settingData={settingData} categoryData={categoryData} />
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
