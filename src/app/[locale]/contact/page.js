
import ContactUS from "@/components/ContactUS";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

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

async function fetchAboutPageData() {
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

async function getTranslations() {
  try {
    const data = axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function fetchContactSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: aboutSeo } = await axiosInstance.get(
      `/page-data/contact-page-info`,
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
export async function generateMetadata() {
  const seo = await fetchContactSeoData();
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

// !generateMetaData

const page = async () => {


  const contact = await fetchAboutPageData();


  const translations = await getTranslations();
  const t = translations?.data;

  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];

  return (
    <div id="contactUS">
      {/* <div className="headerTopNoneBack">
        <Header settingData={settingData} categoryData={categoryData} />
      </div> */}
      <ContactUS
        t={t}
        wpNumber={contact?.data.wp_number}
        phone={contact?.data.phone}
        email={contact?.data.email}
        wpLink={contact?.data.whatsapp_link}
        linkedin={contact?.data.linkedin}
        instagram={contact?.data.instagram}
        facebook={contact?.data.facebook}
        workHoursMondayFriday={contact?.data.work_hours_monday_friday}
        workHoursSaturday={contact?.data.work_hours_saturday}
        map={contact?.data.map}
        videoUrl={contact?.data.video_url}
        locationHeadOffice={contact?.data.location_head_office}
        locationStore={contact?.data.location_store}
        videoTitle={contact?.data.video_title}
      />
      {/* <Footer
        contact={contact}
        categoryData={categoryData}
        eventsData={eventsData}
        brandsData={brandsData}
      /> */}
    </div>
  );
};

export default page;
