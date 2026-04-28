import Footer from "@/components/Footer/Footer";
import CareersDetailPage from "@/components/CareersDetailPage";
import Header from "@/components/Header/Header";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";
import React from "react";

async function fetchCareersPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  const { data: careers } = await axiosInstance.get(`/page-data/vacancies`, {
    cache: "no-store",
    // headers: { Lang: lang.value },
  });
  return careers.data.data;
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
  const slug = params.id.split("-").pop();
  const allCareers = await fetchCareersPageData();
  const careers = allCareers.find((b) => b.id.toString() === slug);

  if (!careers) {
    return {
      title: "Adentta",
      description: "Careers not found.",
    };
  }

  // brand obyektindən birbaşa götürürük
  const imageUrl = careers.image;
  const imageAlt = careers.title || "Adentta";
  const canonicalUrl = `https://adentta.az/brands/${params.id}`;

  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value;

  return {
    title: careers.meta_title || careers.title || "Adentta",
    description: careers.meta_description || "Adentta Careers",
    openGraph: {
      title: careers.meta_title || careers.title || "Adentta",
      description: careers.meta_description || "Adentta Careers",
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
      title: careers.meta_title || careers.title || "Adentta",
      description: careers.meta_description || "Adentta Careers",
      creator: "@adentta",
      site: "@adentta",
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page({ params }) {
  const { id } = params;
  const slug = id.split("-").pop(); // URL'den gelen id'yi alıyoruz

  const translations = await getTranslations();
  const t = translations?.data;

  const careersData = await fetchCareersPageData(); // Kariyer verilerinin bulunduğu dizi

  // URL'den gelen id ile eşleşen kariyer verisini buluyoruz:
  const careerDetail = careersData.find((item) => item.id.toString() === slug);

  if (!careerDetail) {
    return <div>Career not found.</div>;
  }

  return (
    <div>
      <CareersDetailPage t={t} careerData={careerDetail} />
    </div>
  );
}
