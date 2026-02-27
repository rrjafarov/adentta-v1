import BlogPages from "@/components/BlogPages";
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
      },
    );
    return blogs;
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
      },
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

async function fetchEventSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: aboutSeo } = await axiosInstance.get(
      `/page-data/blog-page-info`,
      {
        cache: "no-store",
      },
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

const page = async () => {
  const translations = await getTranslations();
  const t = translations?.data;

  const blogsResponse = await fetchBlogsPageData(1);
  const initialBlogData = blogsResponse?.data?.data || [];

  const blogsCategoryResponse = await fetchBlogCategoryPageData();
  const blogsCategoryData = blogsCategoryResponse?.data?.data || [];

  return (
    <div>
      <BlogPages
        t={t}
        blogsCategoryData={blogsCategoryData}
        initialBlogData={initialBlogData}
      />
    </div>
  );
};

export default page;
