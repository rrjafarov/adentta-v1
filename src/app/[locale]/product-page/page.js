// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import NewProductPage from "@/components/Footer/NewProductPage";
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// function buildRawQuery(searchParams = {}) {
//   const parts = [];
//   for (const [key, value] of Object.entries(searchParams || {})) {
//     if (Array.isArray(value)) {
//       for (const v of value)
//         parts.push(`${key}=${encodeURIComponent(String(v))}`);
//     } else if (value !== undefined && value !== null && value !== "") {
//       parts.push(`${key}=${encodeURIComponent(String(value))}`);
//     }
//   }
//   return parts.join("&");
// }

// async function fetchProductsPageData(searchParams = {}) {
//   const cookieStore = await cookies();
//   const langCookie = cookieStore.get("NEXT_LOCALE");
//   const locale = langCookie?.value ?? undefined;

//   const queryString =
//     searchParams && Object.keys(searchParams).length > 0
//       ? buildRawQuery(searchParams)
//       : "per_page=12";

//   try {
//     // DƏYIŞDI: endpoint postmandakı forma ilə eynidir
//     const { data } = await axiosInstance.get(
//       `/page-data/product?${queryString}`,
//       {
//         headers: locale ? { Lang: locale } : {},
//         cache: "no-store",
//       }
//     );

//     // Normalizasiya: müxtəlif backend strukturlarına uyğun çıxarırıq
//     const items = Array.isArray(data)
//       ? data
//       : Array.isArray(data?.data)
//       ? data.data
//       : Array.isArray(data?.data?.data)
//       ? data.data.data
//       : Array.isArray(data?.items)
//       ? data.items
//       : [];

//     return items;
//   } catch (error) {
//     throw error;
//   }
// }

// async function fetchSettingsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: setting } = await axiosInstance.get(`/page-data/setting`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return setting;
//   } catch (error) {
//     throw error;
//   }
// }
// async function fetchCategoryPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: category } = await axiosInstance.get(
//       `/page-data/categories?per_page=999`,
//       {
//         // headers: { Lang: lang.value },
//         cache: "no-store",
//       }
//     );
//     return category;
//   } catch (error) {
//     throw error;
//   }
// }
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
// async function fetchEventsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: events } = await axiosInstance.get(`/page-data/event`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return events;
//   } catch (error) {
//     throw error;
//   }
// }
// async function fetchBrandsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
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

// // !generateMetadata for product page
// export async function generateMetadata({ searchParams }) {
//   const products = await fetchProductsPageData(searchParams ?? {}); // Productları backenddən alırıq
//   const firstProduct = products[0]; // İlk məhsulu götürürük
//   const firstCategory = firstProduct?.categories?.[0]; // İlk kateqoriyanı götürürük

//   const title = firstCategory?.meta_title || "Adentta"; // Meta title
//   const description = firstCategory?.meta_description || "Adentta"; // Meta description

//   const canonicalUrl = "https://adentta.az"; // Canonical URL

//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url: canonicalUrl,
//       images: firstCategory?.icon
//         ? [
//             {
//               url: `https://admin.adentta.az/storage${firstCategory.icon}`,
//               alt: title,
//               width: 1200,
//               height: 630,
//             },
//           ]
//         : [],
//       site_name: "adentta.az",
//       type: "website",
//       locale: lang?.value,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       creator: "@adentta",
//       site: "@adentta",
//       images: firstCategory?.icon
//         ? [`https://admin.adentta.az/storage${firstCategory.icon}`]
//         : [],
//     },
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   };
// }


// const Page = async ({ searchParams }) => {
//   const productData = await fetchProductsPageData(searchParams ?? {});

//   const setting = await fetchSettingsPageData();
//   const settingData = setting?.data || [];
//   const categoryResponse = await fetchCategoryPageData();
//   const categoryData = categoryResponse?.data?.data || [];
//   const contact = await fetchContactPageData();

//   const brandsResponse = await fetchBrandsPageData();
//   const brandsData = brandsResponse?.data?.data || [];
//   const eventsResponse = await fetchEventsPageData();
//   const eventsData = eventsResponse?.data?.data || [];

//   const translations = await getTranslations();
//   const t = translations?.data;
//   return (
//     <div>
//       <Header settingData={settingData} categoryData={categoryData} />
//       <ProductsPageHero />
//       <NewProductPage categoryData={categoryData} brandsData={brandsData} t={t} productData={productData}  />
//       <Footer
//         contact={contact}
//         categoryData={categoryData}
//         eventsData={eventsData} 
//         brandsData={brandsData}
//       />
//     </div>
//   );
// };

// export default Page;











import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
import NewProductPage from "@/components/Footer/NewProductPage";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

function buildRawQuery(searchParams = {}) {
  const parts = [];
  for (const [key, value] of Object.entries(searchParams || {})) {
    if (Array.isArray(value)) {
      for (const v of value)
        parts.push(`${key}=${encodeURIComponent(String(v))}`);
    } else if (value !== undefined && value !== null && value !== "") {
      parts.push(`${key}=${encodeURIComponent(String(value))}`);
    }
  }
  return parts.join("&");
}

function parseCategoryIdFromParam(categoryParam) {
  if (!categoryParam) return null;
  const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
  const cleaned = raw.split("?")[0].replace(/\/+$/, "");
  const parts = cleaned.split("-");
  const last = parts[parts.length - 1];
  return /^\d+$/.test(last) ? last : null;
}

async function fetchProductsPageData(searchParams = {}) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("NEXT_LOCALE");
  const locale = langCookie?.value ?? undefined;

  try {
    const categoryId = parseCategoryIdFromParam(searchParams?.category ?? searchParams?.["category"]);
    const perPage = searchParams && searchParams.per_page ? String(searchParams.per_page) : "12";

    if (categoryId) {
      const otherParams = {};
      for (const [k, v] of Object.entries(searchParams || {})) {
        if (k === "category" || k === "per_page") continue;
        if (/^filters?\[.*\]/.test(k)) continue;
        otherParams[k] = v;
      }

      const otherQuery = buildRawQuery(otherParams);

      let queryString = `per_page=${encodeURIComponent(perPage)}&filters[0][key]=categories&filters[0][operator]=IN&filters[0][value][]=${encodeURIComponent(
        String(categoryId)
      )}`;

      if (otherQuery) {
        queryString = `${queryString}&${otherQuery}`;
      }

      const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
        headers: locale ? { Lang: locale } : {},
        cache: "no-store",
      });

      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.data)
        ? data.data.data
        : Array.isArray(data?.items)
        ? data.items
        : [];

      return items;
    }

    const queryString =
      searchParams && Object.keys(searchParams).length > 0
        ? buildRawQuery(searchParams)
        : "per_page=12";

    const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
      headers: locale ? { Lang: locale } : {},
      cache: "no-store",
    });

    const items = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.data?.data)
      ? data.data.data
      : Array.isArray(data?.items)
      ? data.items
      : [];

    return items;
  } catch (error) {
    throw error;
  }
}

async function fetchSettingsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: setting } = await axiosInstance.get(`/page-data/setting`, {
      cache: "no-store",
    });
    return setting;
  } catch (error) {
    throw error;
  }
}

async function fetchCategoryPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: category } = await axiosInstance.get(
      `/page-data/categories?per_page=999`,
      {
        cache: "no-store",
      }
    );
    return category;
  } catch (error) {
    throw error;
  }
}

async function fetchContactPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  try {
    const { data: contact } = await axiosInstance.get(`/page-data/contact`, {
      cache: "no-store",
    });
    return contact;
  } catch (error) {
    throw error;
  }
}

async function fetchEventsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: events } = await axiosInstance.get(`/page-data/event`, {
      cache: "no-store",
    });
    return events;
  } catch (error) {
    throw error;
  }
}

async function fetchBrandsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
      cache: "no-store",
    });
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

export async function generateMetadata({ searchParams }) {
  const products = await fetchProductsPageData(searchParams ?? {});
  const firstProduct = products[0];
  const firstCategory = firstProduct?.categories?.[0];

  const title = firstCategory?.meta_title || "Adentta";
  const description = firstCategory?.meta_description || "Adentta";

  const canonicalUrl = "https://adentta.az";

  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: firstCategory?.icon
        ? [
            {
              url: `https://admin.adentta.az/storage${firstCategory.icon}`,
              alt: title,
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
      title,
      description,
      creator: "@adentta",
      site: "@adentta",
      images: firstCategory?.icon
        ? [`https://admin.adentta.az/storage${firstCategory.icon}`]
        : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const Page = async ({ searchParams }) => {
  const productData = await fetchProductsPageData(searchParams ?? {});

  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  const contact = await fetchContactPageData();

  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];
  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  const translations = await getTranslations();
  const t = translations?.data;

  // Seçilmiş kateqoriyanı tap
  const categoryId = parseCategoryIdFromParam(searchParams?.category);
  let selectedCategoryObj = null;
  if (categoryId) {
    selectedCategoryObj = categoryData.find((c) => String(c.id) === String(categoryId)) || null;
  }

  // Alt kateqoriyaları tap
  let subcategoriesForSelected = [];
  if (selectedCategoryObj) {
    const selId = parseInt(selectedCategoryObj.id, 10);
    
    subcategoriesForSelected = categoryData.filter((c) => {
      if (!c.parent_id) return false;
      
      if (Array.isArray(c.parent_id)) {
        return c.parent_id.some((p) => {
          const pid = typeof p.id === "number" ? p.id : parseInt(p.id, 10);
          return pid === selId;
        });
      }
      
      if (typeof c.parent_id === "object" && c.parent_id.id != null) {
        const pid = typeof c.parent_id.id === "number" ? c.parent_id.id : parseInt(c.parent_id.id, 10);
        return pid === selId;
      }
      
      return c.parent_id === selId;
    });
  }

  return (
    <div>
      <Header settingData={settingData} categoryData={categoryData} />
      <ProductsPageHero 
        t={t}
        productData={productData}
        selectedCategory={selectedCategoryObj}
        subcategories={subcategoriesForSelected}
      />
      <NewProductPage 
        categoryData={categoryData} 
        brandsData={brandsData} 
        t={t} 
        productData={productData}
        selectedCategory={selectedCategoryObj}
      />
      <Footer
        contact={contact}
        categoryData={categoryData}
        eventsData={eventsData} 
        brandsData={brandsData}
      />
    </div>
  );
};

export default Page;





















// * Burda her sey var amma hero hissesi var 
// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import NewProductPage from "@/components/Footer/NewProductPage";
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// function buildRawQuery(searchParams = {}) {
//   const parts = [];
//   for (const [key, value] of Object.entries(searchParams || {})) {
//     if (Array.isArray(value)) {
//       for (const v of value)
//         parts.push(`${key}=${encodeURIComponent(String(v))}`);
//     } else if (value !== undefined && value !== null && value !== "") {
//       parts.push(`${key}=${encodeURIComponent(String(value))}`);
//     }
//   }
//   return parts.join("&");
// }

// function parseCategoryIdFromParam(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   const parts = cleaned.split("-");
//   const last = parts[parts.length - 1];
//   return /^\d+$/.test(last) ? last : null;
// }

// async function fetchProductsPageData(searchParams = {}) {
//   const cookieStore = await cookies();
//   const langCookie = cookieStore.get("NEXT_LOCALE");
//   const locale = langCookie?.value ?? undefined;

//   try {
//     const categoryId = parseCategoryIdFromParam(searchParams?.category ?? searchParams?.["category"]);
//     const perPage = searchParams && searchParams.per_page ? String(searchParams.per_page) : "12";

//     if (categoryId) {
//       const otherParams = {};
//       for (const [k, v] of Object.entries(searchParams || {})) {
//         if (k === "category" || k === "per_page") continue;
//         if (/^filters?\[.*\]/.test(k)) continue;
//         otherParams[k] = v;
//       }

//       const otherQuery = buildRawQuery(otherParams);

//       let queryString = `per_page=${encodeURIComponent(perPage)}&filters[0][key]=categories&filters[0][operator]=IN&filters[0][value][]=${encodeURIComponent(
//         String(categoryId)
//       )}`;

//       if (otherQuery) {
//         queryString = `${queryString}&${otherQuery}`;
//       }

//       const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
//         headers: locale ? { Lang: locale } : {},
//         cache: "no-store",
//       });

//       const items = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       return items;
//     }

//     const queryString =
//       searchParams && Object.keys(searchParams).length > 0
//         ? buildRawQuery(searchParams)
//         : "per_page=12";

//     const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
//       headers: locale ? { Lang: locale } : {},
//       cache: "no-store",
//     });

//     const items = Array.isArray(data)
//       ? data
//       : Array.isArray(data?.data)
//       ? data.data
//       : Array.isArray(data?.data?.data)
//       ? data.data.data
//       : Array.isArray(data?.items)
//       ? data.items
//       : [];

//     return items;
//   } catch (error) {
//     throw error;
//   }
// }

// async function fetchSettingsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: setting } = await axiosInstance.get(`/page-data/setting`, {
//       cache: "no-store",
//     });
//     return setting;
//   } catch (error) {
//     throw error;
//   }
// }
// async function fetchCategoryPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: category } = await axiosInstance.get(
//       `/page-data/categories?per_page=999`,
//       {
//         cache: "no-store",
//       }
//     );
//     return category;
//   } catch (error) {
//     throw error;
//   }
// }
// async function fetchContactPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");
//   try {
//     const { data: contact } = await axiosInstance.get(`/page-data/contact`, {
//       cache: "no-store",
//     });
//     return contact;
//   } catch (error) {
//     throw error;
//   }
// }
// async function fetchEventsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: events } = await axiosInstance.get(`/page-data/event`, {
//       cache: "no-store",
//     });
//     return events;
//   } catch (error) {
//     throw error;
//   }
// }
// async function fetchBrandsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
//       cache: "no-store",
//     });
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

// export async function generateMetadata({ searchParams }) {
//   const products = await fetchProductsPageData(searchParams ?? {});
//   const firstProduct = products[0];
//   const firstCategory = firstProduct?.categories?.[0];

//   const title = firstCategory?.meta_title || "Adentta";
//   const description = firstCategory?.meta_description || "Adentta";

//   const canonicalUrl = "https://adentta.az";

//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url: canonicalUrl,
//       images: firstCategory?.icon
//         ? [
//             {
//               url: `https://admin.adentta.az/storage${firstCategory.icon}`,
//               alt: title,
//               width: 1200,
//               height: 630,
//             },
//           ]
//         : [],
//       site_name: "adentta.az",
//       type: "website",
//       locale: lang?.value,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       creator: "@adentta",
//       site: "@adentta",
//       images: firstCategory?.icon
//         ? [`https://admin.adentta.az/storage${firstCategory.icon}`]
//         : [],
//     },
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   };
// }


// const Page = async ({ searchParams }) => {
//   const productData = await fetchProductsPageData(searchParams ?? {});

//   const setting = await fetchSettingsPageData();
//   const settingData = setting?.data || [];
//   const categoryResponse = await fetchCategoryPageData();
//   const categoryData = categoryResponse?.data?.data || [];
//   const contact = await fetchContactPageData();

//   const brandsResponse = await fetchBrandsPageData();
//   const brandsData = brandsResponse?.data?.data || [];
//   const eventsResponse = await fetchEventsPageData();
//   const eventsData = eventsResponse?.data?.data || [];

//   const translations = await getTranslations();
//   const t = translations?.data;

//   // Seçilmiş kateqoriyanı tap
//   const categoryId = parseCategoryIdFromParam(searchParams?.category);
//   let selectedCategoryObj = null;
//   if (categoryId) {
//     selectedCategoryObj = categoryData.find((c) => String(c.id) === String(categoryId)) || null;
//   }

//   // Alt kateqoriyaları tap
//   let subcategoriesForSelected = [];
//   if (selectedCategoryObj) {
//     const selId = parseInt(selectedCategoryObj.id, 10);
    
//     subcategoriesForSelected = categoryData.filter((c) => {
//       if (!c.parent_id) return false;
      
//       if (Array.isArray(c.parent_id)) {
//         return c.parent_id.some((p) => {
//           const pid = typeof p.id === "number" ? p.id : parseInt(p.id, 10);
//           return pid === selId;
//         });
//       }
      
//       if (typeof c.parent_id === "object" && c.parent_id.id != null) {
//         const pid = typeof c.parent_id.id === "number" ? c.parent_id.id : parseInt(c.parent_id.id, 10);
//         return pid === selId;
//       }
      
//       return c.parent_id === selId;
//     });
//   }

//   return (
//     <div>
//       <Header settingData={settingData} categoryData={categoryData} />
//       <ProductsPageHero 
//         t={t}
//         productData={productData}
//         selectedCategory={selectedCategoryObj}
//         subcategories={subcategoriesForSelected}
//       />
//       <NewProductPage 
//         categoryData={categoryData} 
//         brandsData={brandsData} 
//         t={t} 
//         productData={productData}  
//       />
//       <Footer
//         contact={contact}
//         categoryData={categoryData}
//         eventsData={eventsData} 
//         brandsData={brandsData}
//       />
//     </div>
//   );
// };

// export default Page;














//? prosta testdir Hero hise burda yoxdur 

// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import NewProductPage from "@/components/Footer/NewProductPage";
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// function buildRawQuery(searchParams = {}) {
//   const parts = [];
//   for (const [key, value] of Object.entries(searchParams || {})) {
//     if (Array.isArray(value)) {
//       for (const v of value)
//         parts.push(`${key}=${encodeURIComponent(String(v))}`);
//     } else if (value !== undefined && value !== null && value !== "") {
//       parts.push(`${key}=${encodeURIComponent(String(value))}`);
//     }
//   }
//   return parts.join("&");
// }

// // Robust parser: slug-id formatından son hissəni götürür, yalnız tam rəqəmdirsə id sayır.
// function parseCategoryIdFromParam(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, ""); // varsa query/son slash-ları təmizlə
//   const parts = cleaned.split("-");
//   const last = parts[parts.length - 1];
//   return /^\d+$/.test(last) ? last : null;
// }

// async function fetchProductsPageData(searchParams = {}) {
//   const cookieStore = await cookies();
//   const langCookie = cookieStore.get("NEXT_LOCALE");
//   const locale = langCookie?.value ?? undefined;

//   try {
//     // category param varsa id-ni çıxar
//     const categoryId = parseCategoryIdFromParam(searchParams?.category ?? searchParams?.["category"]);

//     // default per_page
//     const perPage = searchParams && searchParams.per_page ? String(searchParams.per_page) : "12";

//     if (categoryId) {
//       // ƏN VACİB: category varsa, backend-ə **tam** dəqiq formatda yalnız bu filter-i göndəririk.
//       // Mövcud filters[...] açarlarını əlavə etmirik (toqquşma səbəbi ilə).
//       // Digər sadə paramları (məs: sort, q) saxlamaq istəsək, onları əlavə edə bilərik — amma filters[...] tipi əlavə olunmayacaq.
//       const otherParams = {};
//       for (const [k, v] of Object.entries(searchParams || {})) {
//         if (k === "category" || k === "per_page") continue;
//         // filters tipli açarları daxil etmirik
//         if (/^filters?\[.*\]/.test(k)) continue;
//         otherParams[k] = v;
//       }

//       const otherQuery = buildRawQuery(otherParams); // sort, q və s. varsa əlavə edəcəyik

//       // Dəqiq tələb olunan query formatı:
//       // per_page=12&filters[0][key]=categories&filters[0][operator]=IN&filters[0][value][]=<ID>
//       let queryString = `per_page=${encodeURIComponent(perPage)}&filters[0][key]=categories&filters[0][operator]=IN&filters[0][value][]=${encodeURIComponent(
//         String(categoryId)
//       )}`;

//       if (otherQuery) {
//         queryString = `${queryString}&${otherQuery}`;
//       }

//       const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
//         headers: locale ? { Lang: locale } : {},
//         cache: "no-store",
//       });

//       const items = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       return items;
//     }

//     // category param yoxdursa, əvvəlki ümumi davranış
//     const queryString =
//       searchParams && Object.keys(searchParams).length > 0
//         ? buildRawQuery(searchParams)
//         : "per_page=12";

//     const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
//       headers: locale ? { Lang: locale } : {},
//       cache: "no-store",
//     });

//     const items = Array.isArray(data)
//       ? data
//       : Array.isArray(data?.data)
//       ? data.data
//       : Array.isArray(data?.data?.data)
//       ? data.data.data
//       : Array.isArray(data?.items)
//       ? data.items
//       : [];

//     return items;
//   } catch (error) {
//     throw error;
//   }
// }

// async function fetchSettingsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: setting } = await axiosInstance.get(`/page-data/setting`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return setting;
//   } catch (error) {
//     throw error;
//   }
// }
// async function fetchCategoryPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: category } = await axiosInstance.get(
//       `/page-data/categories?per_page=999`,
//       {
//         // headers: { Lang: lang.value },
//         cache: "no-store",
//       }
//     );
//     return category;
//   } catch (error) {
//     throw error;
//   }
// }
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
// async function fetchEventsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: events } = await axiosInstance.get(`/page-data/event`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return events;
//   } catch (error) {
//     throw error;
//   }
// }
// async function fetchBrandsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
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

// // !generateMetadata for product page
// export async function generateMetadata({ searchParams }) {
//   const products = await fetchProductsPageData(searchParams ?? {}); // Productları backenddən alırıq
//   const firstProduct = products[0]; // İlk məhsulu götürük
//   const firstCategory = firstProduct?.categories?.[0]; // İlk kateqoriyanı götürük

//   const title = firstCategory?.meta_title || "Adentta"; // Meta title
//   const description = firstCategory?.meta_description || "Adentta"; // Meta description

//   const canonicalUrl = "https://adentta.az"; // Canonical URL

//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url: canonicalUrl,
//       images: firstCategory?.icon
//         ? [
//             {
//               url: `https://admin.adentta.az/storage${firstCategory.icon}`,
//               alt: title,
//               width: 1200,
//               height: 630,
//             },
//           ]
//         : [],
//       site_name: "adentta.az",
//       type: "website",
//       locale: lang?.value,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       creator: "@adentta",
//       site: "@adentta",
//       images: firstCategory?.icon
//         ? [`https://admin.adentta.az/storage${firstCategory.icon}`]
//         : [],
//     },
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   };
// }


// const Page = async ({ searchParams }) => {
//   const productData = await fetchProductsPageData(searchParams ?? {});

//   const setting = await fetchSettingsPageData();
//   const settingData = setting?.data || [];
//   const categoryResponse = await fetchCategoryPageData();
//   const categoryData = categoryResponse?.data?.data || [];
//   const contact = await fetchContactPageData();

//   const brandsResponse = await fetchBrandsPageData();
//   const brandsData = brandsResponse?.data?.data || [];
//   const eventsResponse = await fetchEventsPageData();
//   const eventsData = eventsResponse?.data?.data || [];

//   const translations = await getTranslations();
//   const t = translations?.data;
//   return (
//     <div>
//       <Header settingData={settingData} categoryData={categoryData} />
//       <ProductsPageHero />
//       <NewProductPage categoryData={categoryData} brandsData={brandsData} t={t} productData={productData}  />
//       <Footer
//         contact={contact}
//         categoryData={categoryData}
//         eventsData={eventsData} 
//         brandsData={brandsData}
//       />
//     </div>
//   );
// };

// export default Page;


























