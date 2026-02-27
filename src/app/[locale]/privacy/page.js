import Privacy from "@/components/Privacy";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";
async function fetchPrivacyPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: privacy } = await axiosInstance.get(`/page-data/privacy-policy`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return privacy;
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

// !generateMetaData
export async function generateMetadata({ params }) {
  const { data } = await fetchPrivacyPageData();

  return {
    title: data?.title,
    description: data?.content,
    openGraph: {
      title: data?.title || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      description: data?.content,
      images: [
        {
          // url: `/favicon.ico.svg`,
          url: `https://admin.adentta.az/storage${data?.og_image}`,
          alt: data?.title,
          width: 1200,
          height: 630,
        },
      ],
      site_name: data?.meta_title,
    },
    twitter: {
      card: "summary_large_image",
      title: data?.title || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      description: data?.content || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      url: `https://admin.adentta.az/storage${data?.og_image}`,
    },
  };
}


// !generateMetaData



const page = async () => {

  const translations = await getTranslations();
  const t = translations?.data;
  const privacy = await fetchPrivacyPageData(); 
  
  return (
    <div>
      <div className="faqBackImg">
        <Privacy t={t} title={privacy?.data.title} content={privacy?.data.content} />
      </div>
    </div>
  );
};

export default page;
