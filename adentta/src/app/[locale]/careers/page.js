import Careers from "@/components/Careers";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

async function fetchVacancyPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: vacancies } = await axiosInstance.get(
      `/page-data/vacancies`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
    return vacancies;
  } catch (error) {
    throw error;
  }
}

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
    throw error;
  }
}
// *categories

async function fetchLifeOnHerePageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: lifeOnHere } = await axiosInstance.get(
      `/page-data/life-on-here`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
    return lifeOnHere;
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

//! brandsApi
async function fetchBrandsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: brands } = await axiosInstance.get(
      `/page-data/brands`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
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
    const { data: events } = await axiosInstance.get(
      `/page-data/event`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
    return events;
  } catch (error) {
    throw error;
  }
}
//! eventsApi

async function fetchCareersSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: aboutSeo } = await axiosInstance.get(
      `/page-data/careeers-page-info`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
    return aboutSeo;
  } catch (error) {
    throw error;
  }
}
// !generateMetaData
export async function generateMetadata({ params }) {
  const { data } = await fetchCareersSeoData();

  return {
    title: data?.meta_title,
    description: data?.meta_description,
    openGraph: {
      title:
        data?.meta_title ||
        "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      description: data?.meta_description,
      images: [
        {
          // url: `/favicon.ico.svg`,
          url: `https://admin.adentta.az/storage${data?.og_image}`,
          alt: data?.meta_title,
          width: 1200,
          height: 630,
        },
      ],
      site_name: data?.meta_title,
    },
    twitter: {
      card: "summary_large_image",
      title:
        data?.meta_title ||
        "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      description:
        data?.meta_description ||
        "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      url: `https://admin.adentta.az/storage${data?.og_image}`,
    },
  };
}

// !generateMetaData

const page = async () => {
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  const contact = await fetchContactPageData();

  const translations = await getTranslations();
  const t = translations?.data;
  const vacancies = await fetchVacancyPageData();
  const lifeOnHere = await fetchLifeOnHerePageData();
  const vacancy = vacancies?.data?.data || [];
  const lifeOnHereData = lifeOnHere?.data || [];
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];

  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];

  return (
    <div>
      <Header settingData={settingData} categoryData={categoryData} />

      <Careers t={t} vacancy={vacancy} lifeOnHereData={lifeOnHereData} />

      <div className="careersFooterBack">
        <Footer
          contact={contact}
          categoryData={categoryData}
          eventsData={eventsData}
          brandsData={brandsData}
        />
      </div>
    </div>
  );
};

export default page;
