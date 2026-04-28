// import Brands from "@/components/Brands";
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// async function fetchBrandsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: brands } = await axiosInstance.get(
//       `/page-data/brands?per_page=999`,
//       {
//         cache: "no-store",
//       },
//     );
//     return brands;
//   } catch (error) {
//     throw error;
//   }
// }

// async function getTranslations() {
//   try {
//     const data = axiosInstance.get("/translation-list");
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function fetchBrandsSeoData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: aboutSeo } = await axiosInstance.get(
//       `/page-data/brand-page-info`,
//       {
//         cache: "no-store",
//       },
//     );
//     return aboutSeo;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function generateMetadata() {
//   const seo = await fetchBrandsSeoData();
//   const imageUrl = seo?.data.og_image;
//   const imageAlt = seo?.data.meta_title || "Adentta";
//   const canonicalUrl = "https://adentta.az";
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");
//   return {
//     title: seo?.data.meta_title,
//     description: seo?.data.meta_description,
//     openGraph: {
//       title: seo?.data.meta_title || "Adentta",
//       description: seo?.data.meta_description,
//       url: canonicalUrl,
//       images: [
//         {
//           url: `https://admin.adentta.az/storage${imageUrl}`,
//           alt: imageAlt,
//           width: 1200,
//           height: 630,
//         },
//       ],
//       site_name: "adentta.az",
//       type: "website",
//       locale: lang?.value,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: seo?.data.meta_title || "Adentta",
//       description: seo?.data.meta_description || "Adentta",
//       creator: "@adentta",
//       site: "@adentta",
//       images: [imageUrl],
//     },
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   };
// }


// const page = async () => {
//   const translations = await getTranslations();
//   const t = translations?.data;
//   const brandsResponse = await fetchBrandsPageData();
//   const brandsData = brandsResponse?.data?.data || [];


//   return (
//     <div>
//       <Brands t={t} brandsData={brandsData} />
//     </div>
//   );
// };

// export default page;








// ! Yeni fast version
import Brands from "@/components/Brands";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

async function fetchBrandsPageData(page = 1) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: brands } = await axiosInstance.get(
      `/page-data/brands?page=${page}`,
      {
        cache: "no-store",
      },
    );
    return brands;
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

async function fetchBrandsSeoData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: aboutSeo } = await axiosInstance.get(
      `/page-data/brand-page-info`,
      {
        cache: "no-store",
      },
    );
    return aboutSeo;
  } catch (error) {
    throw error;
  }
}

export async function generateMetadata() {
  const seo = await fetchBrandsSeoData();
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

const page = async () => {
  const translations = await getTranslations();
  const t = translations?.data;
  const brandsResponse = await fetchBrandsPageData(1);
  const initialBrandsData = brandsResponse?.data?.data || [];

  return (
    <div>
      <Brands t={t} initialBrandsData={initialBrandsData} />
    </div>
  );
};

export default page;