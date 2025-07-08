import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Privacy from "@/components/Privacy";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

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
    console.error("Failed to fetch contact page data", error);
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
    console.error("Failed to fetch setting page data", error);
    throw error;
  }
}

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
    console.error("Failed to fetch privacy page data", error);
    throw error;
  }
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
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const translations = await getTranslations();
  const t = translations?.data;

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];
  const privacy = await fetchPrivacyPageData(); 
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];

    const contact = await fetchContactPageData();

  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];
  
  return (
    <div>
      <div className="faqBackImg">
        <Header settingData={settingData} categoryData={categoryData} />
        <Privacy t={t} title={privacy?.data.title} content={privacy?.data.content} />
        <Footer contact={contact} categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
      </div>
    </div>
  );
};

export default page;
