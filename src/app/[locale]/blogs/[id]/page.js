import React from "react";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";
import BlogsDetailPage from "@/components/BlogsDetailPage";

async function fetchBlogById(id) {
  const { data } = await axiosInstance.get(`/first-page-data/${id}`, {
    cache: "no-store",
  });
  return data?.data || data;
}

async function fetchOtherBlogs() {
  const { data: blogs } = await axiosInstance.get(`/page-data/blog`, {
    cache: "no-store",
  });
  return blogs.data.data;
}
async function getTranslations() {
  try {
    const data = axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
  }
}
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
  const blog = await fetchBlogById(slug);

  if (!blog) {
    return {
      title: "Adentta",
      description: "Blog not found.",
    };
  }
  const imageUrl = blog.image || "";
  const imageAlt = blog.title || "Adentta";
  const baseUrl = "https://adentta.az";
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "az";
  const locales = ["az", "ru", "en"];
  const canonicalUrl = `${baseUrl}/${lang}/blogs/${params.id}`;
  const languages = locales.reduce((acc, l) => {
    acc[l] = `${baseUrl}/${l}/blogs/${params.id}`;
    return acc;
  }, {});
  languages["x-default"] = baseUrl;
  return {
    title: blog.title,
    description: blog.title,
    openGraph: {
      title: blog.title,
      description: blog.title,
      url: canonicalUrl,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STORAGE_URL}${imageUrl}`,
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
      images: [`${process.env.NEXT_PUBLIC_STORAGE_URL}${imageUrl}`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}


const page = async ({ params }) => {

  const translations = await getTranslations();
  const t = translations?.data;
  const { id } = params;
  const slug = id.split("-").pop();
  const rawBlogDetail = await fetchBlogById(slug);

  if (!rawBlogDetail) {
    return <div>Blogs not found.</div>;
  }
  const blogDetail = {
    ...rawBlogDetail,
    published_date: formatDate(rawBlogDetail.published_date),
  };

  const blogsData = await fetchOtherBlogs();
  const otherBlogs = blogsData
    .filter((item) => item.id.toString() !== slug)
    .map((item) => ({
      ...item,
      published_date: formatDate(item.published_date),
    }));

  return (
    <div>
      <div className="eventDPBack">
        <BlogsDetailPage
          t={t}
          blogDetail={blogDetail}
          otherBlogs={otherBlogs}
        />
      </div>
    </div>
  );
};

export default page;
