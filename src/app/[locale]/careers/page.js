import Careers from "@/components/Careers";
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
      },
    );
    return vacancies;
  } catch (error) {
    throw error;
  }
}

async function fetchLifeOnHerePageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: lifeOnHere } = await axiosInstance.get(
      `/page-data/life-on-here`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      },
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



async function fetchCareersSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: aboutSeo } = await axiosInstance.get(
      `/page-data/careeers-page-info`,
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
  const translations = await getTranslations();
  const t = translations?.data;
  const vacancies = await fetchVacancyPageData();
  const lifeOnHere = await fetchLifeOnHerePageData();
  const vacancy = vacancies?.data?.data || [];
  const lifeOnHereData = lifeOnHere?.data || [];

  return (
    <div>
      <Careers t={t} vacancy={vacancy} lifeOnHereData={lifeOnHereData} />
    </div>
  );
};

export default page;
