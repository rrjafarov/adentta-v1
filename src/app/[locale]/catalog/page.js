import PdfCatalog from "@/components/PdfCatalog";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";



async function fetchPdfPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  try {
    const { data: pdf } = await axiosInstance.get(`/page-data/pdf`, {
      // headers: { Lang: lang?.value },
      cache: "no-store",
    });
    return pdf;
  } catch (error) {
    throw error;
  }
}


async function getTranslations() {
  try {
    const data = await axiosInstance.get(`/translation-list`);
    return data;
  } catch (err) {
    // console.log(err);
  }
}

//! brandsApi
async function fetchBrandsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  try {
    const { data: brands } = await axiosInstance.get(`/page-data/brands`, {
      // headers: { Lang: lang?.value },
      cache: "no-store",
    });
    return brands;
  } catch (error) {
    throw error;
  }
}
//! brandsApi


async function fetchPdfSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  try {
    const { data: pdfSeo } = await axiosInstance.get(`/page-data/pdf-page-info`, {
      // headers: { Lang: lang?.value },
      cache: "no-store",
    });
    return pdfSeo;
  } catch (error) {
    throw error;
  }
}

// !generateMetaData
export async function generateMetadata() {
  const seo = await fetchPdfSeoData();
  const imageUrl = seo?.data?.og_image || "";
  const imageAlt = seo?.data?.meta_title || "Adentta";
  const canonicalUrl = "https://adentta.az";
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  const fullOg = imageUrl ? `https://admin.adentta.az/storage${imageUrl}` : undefined;

  return {
    title: seo?.data?.meta_title,
    description: seo?.data?.meta_description,
    openGraph: {
      title: seo?.data?.meta_title || "Adentta",
      description: seo?.data?.meta_description,
      url: canonicalUrl,
      images: fullOg
        ? [
            {
              url: fullOg,
              alt: imageAlt,
              width: 1200,
              height: 630,
            },
          ]
        : [],
      site_name: "adentta.az",
      type: "website",
      locale: lang?.value,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.data?.meta_title || "Adentta",
      description: seo?.data?.meta_description || "Adentta",
      creator: "@adentta",
      site: "@adentta",
      images: fullOg ? [fullOg] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
// !generateMetaData

const page = async () => {
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const translations = await getTranslations();
  const t = translations?.data;

  const pdfResponse = await fetchPdfPageData();
  const pdfMembers = pdfResponse?.data?.data || [];



  return (
    <div>
      <PdfCatalog t={t} pdfMembers={pdfMembers} />
      
    </div>
  );
};

export default page;
