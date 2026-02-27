import TeamPage from "@/components/TeamPage";
import Image from "next/image";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

async function fetchAboutPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: team } = await axiosInstance.get(`/page-data/team?page=1`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return team;
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

async function fetchTeamSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: aboutSeo } = await axiosInstance.get(
      `/page-data/teams-page-info`,
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
export async function generateMetadata() {
  const seo = await fetchTeamSeoData();
  const imageUrl = seo?.data.og_image;
  const imageAlt = seo?.data.meta_title || "Adentta";
  const canonicalUrl = "https://adentta.az";
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  return {
    title: seo?.data.meta_title,
    description: seo?.data.meta_description,
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
  const translations = await getTranslations();
  const t = translations?.data;
  const teamResponse = await fetchAboutPageData();
  const teamMembers = teamResponse?.data?.data || [];
  return (
    <div>
      <TeamPage t={t} teamMembers={teamMembers} />
    </div>
  );
};

export default page;
