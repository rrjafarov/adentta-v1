import DoctorsDetailPage from "@/components/DoctorsDetailPage";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";


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
async function fetchDoctorsDetailPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  const { data: doctors } = await axiosInstance.get(`/page-data/doctors?per_page=999`, {
    cache: "no-store",
    // headers: { Lang: lang.value },
  });
  return doctors.data.data;
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
    const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
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
    const { data: events } = await axiosInstance.get(`/page-data/event?per_page=999`, {
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


export async function generateMetadata({ params }) {
  const slug = params.id.split("-").pop();
  const allDoctors = await fetchDoctorsDetailPageData();
  const doctor = allDoctors.find((b) => b.id.toString() === slug);

  if (!doctor) {
    return {
      title: "Adentta",
      description: "Doctor not found.",
    };
  }

  // brand obyektindən birbaşa götürürük
  const imageUrl = doctor.image;
  const imageAlt = doctor.title || "Adentta";
  const canonicalUrl = `https://adentta.az/brands/${params.id}`;

  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value;

  return {
    title: doctor.title,
    description: doctor.title,
    openGraph: {
      title: doctor.title,
      description: doctor.title,
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
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title: doctor.title,
      description: doctor.title,
      creator: "@adentta",
      site: "@adentta",
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const page = async ({ params }) => {
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];
  const contact = await fetchContactPageData();

  const translations = await getTranslations();
  const t = translations?.data;

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];
  // Removed `await` when destructuring params to correctly extract `id`
  const { id } = params; // Updated: removed await to correctly destructure params
  const slug = id.split("-").pop(); // URL'den gelen id'yi alıyoruz

  const doctorsDetailData = await fetchDoctorsDetailPageData();

  // URL'den gelen id ile eşleşen kariyer verisini buluyoruz:
  const doctorsDetailDataDetail = doctorsDetailData.find(
    (item) => item.id.toString() === slug
  );

  if (!doctorsDetailDataDetail) {
    return <div>Doctor not found.</div>;
  }

  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];

  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];

  const otherDoctors = doctorsDetailData.filter(
    (item) => item.id.toString() !== slug
  );

  return (
    <div>
      <Header settingData={settingData} categoryData={categoryData} />
      <DoctorsDetailPage
        t={t}
        doctorsDetailDataDetail={doctorsDetailDataDetail}
        otherDoctors={otherDoctors}
      />
      <Footer
        categoryData={categoryData}
        eventsData={eventsData}
        brandsData={brandsData}
        contact={contact}
      />
    </div>
  );
};

export default page;
