// import React from "react";
// import BrandsDetailPage from "@/components/BrandsDetailPage";
// import axiosInstance from "@/lib/axios";
// import { cookies } from "next/headers";

// async function fetchBrandsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   const { data: brands } = await axiosInstance.get(
//     `/page-data/brands?per_page=999`,
//     {
//       cache: "no-store",
//       // headers: { Lang: lang.value },
//     },
//   );
//   return brands.data.data;
// }

// // *categories
// async function fetchCategoryPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: category } = await axiosInstance.get(
//       `/page-data/categories?per_page=999`,
//       {
//         // headers: { Lang: lang.value },
//         cache: "no-store",
//       },
//     );
//     return category;
//   } catch (error) {
//     throw error;
//   }
// }
// // *categories

// async function getTranslations() {
//   try {
//     const data = axiosInstance.get("/translation-list");
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// //! brandsApi
// async function fetchBrandsPageDataFoot() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: brands } = await axiosInstance.get(
//       `/page-data/brands?per_page=999`,
//       {
//         // headers: { Lang: lang.value },
//         cache: "no-store",
//       },
//     );
//     return brands;
//   } catch (error) {
//     throw error;
//   }
// }
// //! brandsApi

// async function fetchContactPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");
//   try {
//     const { data: contact } = await axiosInstance.get(`/page-data/contact`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return contact;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function generateMetadata({ params }) {
//   // URL-dən slug-u ayırırıq
//   const slug = params.id.split("-").pop();

//   // Bütün brendləri çəkirik
//   const allBrands = await fetchBrandsPageData();

//   // Cari brendi tapırıq
//   const brand = allBrands.find((b) => b.id.toString() === slug);

//   if (!brand) {
//     return {
//       title: "Adentta",
//       description: "Brand not found.",
//     };
//   }

//   // brand obyektindən birbaşa götürürük
//   const imageUrl = brand.logo;
//   const imageAlt = brand.title || "Adentta";
//   const canonicalUrl = `https://adentta.az/brands/${params.id}`;

//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE")?.value;

//   return {
//     title: brand.title,
//     description: brand.title,
//     openGraph: {
//       title: brand.title,
//       description: brand.title,
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
//       locale: lang,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: brand.title,
//       description: brand.title,
//       creator: "@adentta",
//       site: "@adentta",
//       images: [imageUrl],
//     },
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   };
// }

// const page = async ({ params }) => {
//   const brandsResponse = await fetchBrandsPageDataFoot();
//   const brandsData = brandsResponse?.data?.data || [];

//   const translations = await getTranslations();
//   const t = translations?.data;
//   const { id } = params;
//   const slug = id.split("-").pop(); // URL'den gelen id'yi alıyoruz
//   const brandsDetailData = await fetchBrandsPageData();

//   const brandsDetailDataDetail = brandsDetailData.find(
//     (item) => item.id.toString() === slug,
//   );

//   if (!brandsDetailDataDetail) {
//     return <div>Blog not found.</div>;
//   }

//   const otherBrands = brandsDetailData.filter(
//     (item) => item.id.toString() !== slug,
//   );
//   const categoryResponse = await fetchCategoryPageData();
//   const categoryData = categoryResponse?.data?.data || [];

//   const contact = await fetchContactPageData();
//   const rawPhone = contact?.data?.phone || "";
//   const whatsappNumber = rawPhone
//     .replace(/\D+/g, "")
//     .replace(/^00/, "")
//     .replace(/^0/, "994")
//     .replace(/^(?!994)/, "994");

//   return (
//     <div>
//       <BrandsDetailPage
//         whatsappNumber={whatsappNumber}
//         t={t}
//         brandsDetailDataDetail={brandsDetailDataDetail}
//         otherBrands={otherBrands}
//       />
//     </div>
//   );
// };

// export default page;








// ! Yeni fast version
import React from "react";
import BrandsDetailPage from "@/components/BrandsDetailPage";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";

async function fetchBrandById(id) {
  const { data } = await axiosInstance.get(`/first-page-data/${id}`, {
    cache: "no-store",
  });
  return data?.data || data;
}

async function fetchOtherBrands() {
  const { data: brands } = await axiosInstance.get(`/page-data/brands`, {
    cache: "no-store",
  });
  return brands.data.data;
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
      },
    );
    return category;
  } catch (error) {
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

export async function generateMetadata({ params }) {
  // URL-dən slug-u ayırırıq
  const slug = params.id.split("-").pop();

  // Cari brendi çəkirik
  const brand = await fetchBrandById(slug);

  if (!brand) {
    return {
      title: "Adentta",
      description: "Brand not found.",
    };
  }

  // brand obyektindən birbaşa götürürük
  const imageUrl = brand.logo;
  const imageAlt = brand.title || "Adentta";
  const canonicalUrl = `https://adentta.az/brands/${params.id}`;

  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value;

  return {
    title: brand.title,
    description: brand.title,
    openGraph: {
      title: brand.title,
      description: brand.title,
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
      title: brand.title,
      description: brand.title,
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
  const translations = await getTranslations();
  const t = translations?.data;
  const { id } = params;
  const slug = id.split("-").pop();

  const brandsDetailDataDetail = await fetchBrandById(slug);

  if (!brandsDetailDataDetail) {
    return <div>Blog not found.</div>;
  }

  const brandsData = await fetchOtherBrands();
  const otherBrands = brandsData.filter(
    (item) => item.id.toString() !== slug,
  );

  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];

  const contact = await fetchContactPageData();
  const rawPhone = contact?.data?.phone || "";
  const whatsappNumber = rawPhone
    .replace(/\D+/g, "")
    .replace(/^00/, "")
    .replace(/^0/, "994")
    .replace(/^(?!994)/, "994");

  return (
    <div>
      <BrandsDetailPage
        whatsappNumber={whatsappNumber}
        t={t}
        brandsDetailDataDetail={brandsDetailDataDetail}
        otherBrands={otherBrands}
      />
    </div>
  );
};

export default page;