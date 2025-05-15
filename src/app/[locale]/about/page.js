import AboutPageBanner from "@/components/AboutPageBanner";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import ChangeYear from "@/components/ChangeYear";
import AboutPageParallax from "@/components/AboutPageParallax";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";


// export const metadata = {
//   robots: {
//     index: false,
//     follow: false,
//   },
// };

async function fetchAboutPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: about } = await axiosInstance.get(`/page-data/about`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return about;
  } catch (error) {
    console.error("Failed to fetch about page data", error);
    throw error;
  }
}

async function fetchHistoryPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: history } = await axiosInstance.get(`/page-data/history`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return history;
  } catch (error) {
    console.error("Failed to fetch history page data", error);
    throw error;
  }
}


// *categories
async function fetchCategoryPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: category } = await axiosInstance.get(`/page-data/categories`, {
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



async function fetchAboutSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: aboutSeo } = await axiosInstance.get(`/page-data/page-info`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return aboutSeo;
  } catch (error) {
    console.error("Failed to fetch aboutSeo page data", error);
    throw error;
  }
}
// !generateMetaData
export async function generateMetadata({ params }) {
  const { data } = await fetchAboutSeoData();

  return {
    title: data?.meta_title,
    description: data?.meta_description,
    openGraph: {
      title: data?.meta_title || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      description: data?.meta_description,
      images: [
        {
          // url: `/favicon.ico.svg`,
          url: `https://admin.adentta.az/storage${data.og_image}`,
          alt: data?.meta_title,
          width: 1200,
          height: 630,
        },
      ],
      site_name: data.meta_title,
    },
    twitter: {
      card: "summary_large_image",
      title: data?.meta_title || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      description: data?.meta_description || "Adentta – Stomatoloji Məhsullar və Peşəkar Diş Həlləri",
      url: `https://admin.adentta.az/storage${data.og_image}`,
    },
  };
}


// !generateMetaData





const page = async () => {
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  const translations = await getTranslations();
  const t = translations?.data;
  const about = await fetchAboutPageData();
  const aboutYears = about?.data?.data || [];
  const history = await fetchHistoryPageData(); // History verisini çekiyoruz
  const historyYears = history?.data?.data || []; // History verilerini alıyoruz

  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];

  return (
    <div>
      <Header categoryData={categoryData} />
      <AboutPageBanner
        t={t}
        image={about?.data.image}
        title={about?.data.title}
        content={about?.data.content}
        statistica1={about?.data.statistica_1}
        statistica2={about?.data.statistica_2}
        statistica3={about?.data.statistica_3}
        statistica4={about?.data.statistica_4}
        statistica2Title={about?.data.statistica_2_title}
        statistica3Title={about?.data.statistica_3_title}
        statistica4Title={about?.data.statistica_4_title}
        statistica1Img={about?.data.statistica_1_image}
        statistica2Img={about?.data.statistica_2_image}
        statistica3Img={about?.data.statistica_3_image}
        statistica4Img={about?.data.statistica_4_image}

      />

      <ChangeYear  t={t} historyYears={historyYears} aboutYears={aboutYears} />
      <AboutPageParallax
        t={t}
        videoUrl={about?.data.video_url}
        videoTitle={about?.data.video_title}
        videoCover={about?.data.video_cover}
        directorName={about?.data.director_name}
        directorTitle={about?.data.director_title}
        directorMessage={about?.data.director_message}
        directorImage={about?.data.director_image_1}
        directorImage2={about?.data.director_image_2}
      />

      <div className="aboutFooterBack">
        <Footer categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
      </div>
    </div>
  );
};

export default page;
