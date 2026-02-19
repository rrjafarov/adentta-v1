import BlogPages from "@/components/BlogPages";
import BlogsDetailPage from "@/components/BlogsDetailPage";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

async function fetchBlogsPageData(page = 1) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: blogs } = await axiosInstance.get(
      `/page-data/blog?page=${page}`,
      {
        cache: "no-store",
      }
    );
    return blogs;
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
        cache: "no-store",
      }
    );
    return category;
  } catch (error) {
    throw error;
  }
}

async function fetchBlogCategoryPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: blogsCategory } = await axiosInstance.get(
      `/page-data/blog-categories`,
      {
        cache: "no-store",
      }
    );
    return blogsCategory;
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

async function fetchBrandsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: brands } = await axiosInstance.get(
      `/page-data/brands`,
      {
        cache: "no-store",
      }
    );
    return brands;
  } catch (error) {
    throw error;
  }
}

async function fetchEventsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: events } = await axiosInstance.get(
      `/page-data/event`,
      {
        cache: "no-store",
      }
    );
    return events;
  } catch (error) {
    throw error;
  }
}

async function fetchEventSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: aboutSeo } = await axiosInstance.get(
      `/page-data/blog-page-info`,
      {
        cache: "no-store",
      }
    );
    return aboutSeo;
  } catch (error) {
    throw error;
  }
}

export async function generateMetadata() {
  const seo = await fetchEventSeoData();
  const imageUrl = seo?.data.og_image;
  const imageAlt = seo?.data.meta_title || "Adentta";
  const canonicalUrl = "https://adentta.az";
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
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

async function fetchSettingsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: setting } = await axiosInstance.get(`/page-data/setting`, {
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
      cache: "no-store",
    });
    return contact;
  } catch (error) {
    throw error;
  }
}

const page = async () => {
  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  const contact = await fetchContactPageData();

  const translations = await getTranslations();
  const t = translations?.data;
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  
  const blogsResponse = await fetchBlogsPageData(1);
  const initialBlogData = blogsResponse?.data?.data || [];
  
  const blogsCategoryResponse = await fetchBlogCategoryPageData();
  const blogsCategoryData = blogsCategoryResponse?.data?.data || [];
  
  return (
    <div>
      <Header settingData={settingData} categoryData={categoryData} />
      <BlogPages
        t={t}
        blogsCategoryData={blogsCategoryData}
        initialBlogData={initialBlogData}
      />
      <Footer
        contact={contact}
        categoryData={categoryData}
        eventsData={eventsData}
        brandsData={brandsData}
      />
    </div>
  );
};

export default page;