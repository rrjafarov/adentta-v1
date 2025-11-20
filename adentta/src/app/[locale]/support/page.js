import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Support from "@/components/Support";
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
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

    const contact = await fetchContactPageData();


  const translations = await getTranslations();
  const t = translations?.data;
  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];

  return (
    <div>
      <div className="faqBackImg">
        <Header settingData={settingData} categoryData={categoryData} />
        <Support t={t} title={userTerms?.data.title} content={userTerms?.data.content}  />
        <Footer contact={contact} categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
      </div>
    </div>
  );
};

export default page;
