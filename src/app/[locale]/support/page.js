import Support from "@/components/Support";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";


async function fetchSupportPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: userTerms } = await axiosInstance.get(
      `/page-data/user-terms`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
    return userTerms;
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



export async function generateMetadata({ params }) {
  const { data } = await fetchSupportPageData();

  return {
    title: data?.title,
    description: data?.content,
    openGraph: {
      title: data?.title || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      description: data?.content || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      images: [
        {
          // url: `/favicon.ico.svg`,
          url: `https://admin.adentta.az/storage${data?.og_image}`,
          alt: data?.title,
          width: 1200,
          height: 630,
        },
      ],
      site_name: data?.title,
    },
    twitter: {
      card: "summary_large_image",
      title: data?.title || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      description: data?.content || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      url: `https://admin.adentta.az/storage${data?.og_image}`,
    },
  };
}

const page = async () => {
  const userTerms = await fetchSupportPageData();
  const translations = await getTranslations();
  const t = translations?.data;

  return (
    <div>
      <div className="faqBackImg">
        <Support t={t} title={userTerms?.data.title} content={userTerms?.data.content}  />
      </div>
    </div>
  );
};

export default page;
