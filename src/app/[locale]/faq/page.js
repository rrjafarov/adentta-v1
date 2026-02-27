import FAQs from "@/components/FAQs";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

async function fetchFaqPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: faq } = await axiosInstance.get(`/page-data/faq`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return faq;
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

async function fetchFaqSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: aboutSeo } = await axiosInstance.get(
      `/page-data/faq-page-info`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      },
    );
    return aboutSeo;
  } catch (error) {
    throw error;
  }
}

export async function generateMetadata() {
  const seo = await fetchFaqSeoData();
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

const page = async () => {
  const translations = await getTranslations();
  const t = translations?.data;
  const faq = await fetchFaqPageData();
  const faqData = faq?.data?.data || [];

  return (
    <div>
      <div className="faqBackImg">
        <FAQs t={t} faqData={faqData} />
      </div>
    </div>
  );
};

export default page;
