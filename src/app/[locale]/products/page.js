// File: app/products/page.js
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import ProductsPageFilter from "@/components/ProductsPageFilter";
// import Footer from "@/components/Footer/Footer";

// // Fetch all products (unfiltered)
// async function fetchAboutPageData() {
//   try {
//     const { data: product } = await axiosInstance.get("/page-data/product?per_page=999999", {
//       cache: "no-store",
//     });
//     return product.data.data;
//   } catch (error) {
//     console.error("Failed to fetch product page data", error);
//     return [];
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
//     console.error("Failed to fetch contact page data", error);
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
//     console.error("Failed to fetch setting page data", error);
//     throw error;
//   }
// }

// async function getTranslations() {
//   try {
//     return await axiosInstance.get("/translation-list");
//   } catch (err) {
//     console.log("Translation fetch error:", err);
//     return null;
//   }
// }

// async function fetchBrandFilterPageData() {
//   try {
//     const { data: brands } = await axiosInstance.get("/page-data/brands?per_page=999", {
//       cache: "no-store",
//     });
//     return brands.data.data;
//   } catch (error) {
//     console.error("Failed to fetch brands page data", error);
//     return [];
//   }
// }

// async function fetchCategoryPageData() {
//   try {
//     const { data: category } = await axiosInstance.get("/page-data/categories?per_page=999", {
//       cache: "no-store",
//     });
//     return category.data.data;
//   } catch (error) {
//     console.error("Failed to fetch category page data", error);
//     return [];
//   }
// }

// async function fetchBrandsPageData() {
//   try {
//     const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
//       cache: "no-store",
//     });
//     return brands;
//   } catch (error) {
//     console.error("Failed to fetch brands page data", error);
//     throw error;
//   }
// }

// async function fetchEventsPageData() {
//   try {
//     const { data: events } = await axiosInstance.get(`/page-data/event?per_page=999`, {
//       cache: "no-store",
//     });
//     return events;
//   } catch (error) {
//     console.error("Failed to fetch events page data", error);
//     throw error;
//   }
// }

// async function fetchProductsSeoData() {
//   try {
//     const { data: aboutSeo } = await axiosInstance.get(`/page-data/product-page-info`, {
//       cache: "no-store",
//     });
//     return aboutSeo;
//   } catch (error) {
//     console.error("Failed to fetch products SEO data", error);
//     throw error;
//   }
// }

// async function fetchProductsByFilters(categoryIds = [], brandIds = []) {
//   const filters = [];
//   if (categoryIds.length) {
//     filters.push({ key: "categories", operator: "IN", values: categoryIds });
//   }
//   if (brandIds.length) {
//     filters.push({ key: "brands", operator: "IN", values: brandIds });
//   }
//   if (!filters.length) {
//     return await fetchAboutPageData();
//   }
//   const query = filters
//     .map((f, idx) => {
//       const base = `filters[${idx}][key]=${encodeURIComponent(f.key)}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//       const vals = f.values
//         .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//         .join("&");
//       return `${base}&${vals}`;
//     })
//     .join("&");
//   const url = `/page-data/product?per_page=999999&${query}`;
//   try {
//     const res = await axiosInstance.get(url, { cache: "no-store" });
//     return res.data.data.data;
//   } catch (err) {
//     console.error("Filter fetch error (server)", err);
//     return [];
//   }
// }

// export async function generateMetadata({ searchParams }) {
//   const globalSeo = await fetchProductsSeoData();
//   let title = globalSeo.data.meta_title;
//   let description = globalSeo.data.meta_description;
//   let ogImage = globalSeo.data.og_image;
//   let canonicalUrl = "https://adentta.az/products";

//   const categoryParam = searchParams.category || null;
//   if (categoryParam) {
//     const allCategories = await fetchCategoryPageData();
//     const slugs = categoryParam.split(",");
//     const lastSlug = slugs[slugs.length - 1];
//     const sel = allCategories.find((c) => c.url_slug === lastSlug);
//     if (sel?.meta_title && sel?.meta_description) {
//       title = sel.meta_title;
//       description = sel.meta_description;
//       canonicalUrl = `https://adentta.az/products?category=${encodeURIComponent(categoryParam)}`;
//     }
//   }

//   const cookieStore = await cookies();
//   const locale = cookieStore.get("NEXT_LOCALE")?.value;

//   return {
//     title,
//     description,
//     alternates: { canonical: canonicalUrl },
//     openGraph: {
//       title,
//       description,
//       url: canonicalUrl,
//       images: ogImage
//         ? [
//             {
//               url: `https://admin.adentta.az/storage${ogImage}`,
//               alt: title,
//               width: 1200,
//               height: 630,
//             },
//           ]
//         : [],
//       site_name: "adentta.az",
//       type: "website",
//       locale,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       creator: "@adentta",
//       site: "@adentta",
//       images: ogImage ? [ogImage] : [],
//     },
//   };
// }

// export default async function page({ searchParams }) {
//   const categoryParam = searchParams.category || null;
//   const brandsParamRaw = searchParams.brands || null;

//   const productData = await fetchAboutPageData();
//   const brandsDataFilter = await fetchBrandFilterPageData();
//   const categoryData = await fetchCategoryPageData();

//   let selectedCategoryObj = null;
//   if (categoryParam) {
//     const categorySlugs = categoryParam.split(",");
//     const lastSlug = categorySlugs[categorySlugs.length - 1];
//     selectedCategoryObj = categoryData.find((c) => c.url_slug === lastSlug) || null;
//   }

//   const brandIds = brandsParamRaw
//     ? brandsParamRaw.split(",").map((s) => parseInt(s, 10)).filter(Boolean)
//     : [];

//   const initialProducts = await fetchProductsByFilters(
//     selectedCategoryObj ? [selectedCategoryObj.id] : [],
//     brandIds
//   );

//   const initialSelectedBrands = brandsDataFilter.filter((b) =>
//     brandIds.includes(b.id)
//   );
//   const initialSelectedCategories = categoryParam
//     ? categoryParam
//         .split(",")
//         .map((slug) => categoryData.find((c) => c.url_slug === slug))
//         .filter(Boolean)
//     : [];
//   const contact = await fetchContactPageData();

//   const categoryMetaTitle = selectedCategoryObj?.meta_title || null;
//   const categoryMetaDescription = selectedCategoryObj?.meta_description || null;
//   const categoryPageTitle = selectedCategoryObj?.page_title || null;
//   const categoryPageDescription = selectedCategoryObj?.page_description || null;

//   const translations = await getTranslations();
//   const t = translations?.data;
//   const brandsResponse = await fetchBrandsPageData();
//   const brandsData = brandsResponse?.data?.data || [];
//   const eventsResponse = await fetchEventsPageData();
//   const eventsData = eventsResponse?.data?.data || [];

//   const setting = await fetchSettingsPageData();
//   const settingData = setting?.data || [];

//   let subcategoriesForSelected = [];
//   if (selectedCategoryObj) {
//     const selId =
//       typeof selectedCategoryObj.id === "number"
//         ? selectedCategoryObj.id
//         : parseInt(selectedCategoryObj.id, 10);
//     subcategoriesForSelected = categoryData.filter((c) => {
//       if (!c.parent_id) return false;
//       if (Array.isArray(c.parent_id)) {
//         return c.parent_id.some((p) => {
//           const pid = typeof p.id === "number" ? p.id : parseInt(p.id, 10);
//           return pid === selId;
//         });
//       }
//       if (typeof c.parent_id === "object" && c.parent_id.id != null) {
//         const pid =
//           typeof c.parent_id.id === "number"
//             ? c.parent_id.id
//             : parseInt(c.parent_id.id, 10);
//         return pid === selId;
//       }
//       return c.parent_id === selId;
//     });
//   }

//   return (
//     <>
//       <Header settingData={settingData} categoryData={categoryData} />

//       <ProductsPageHero
//         t={t}
//         productData={productData}
//         selectedCategory={selectedCategoryObj}
//         subcategories={subcategoriesForSelected}
//       />

//       <ProductsPageFilter
//         allProducts={productData}
//         initialProducts={initialProducts}
//         categoryData={categoryData}
//         brandsDataFilter={brandsDataFilter}
//         initialSelectedBrands={initialSelectedBrands}
//         initialSelectedCategories={initialSelectedCategories}
//         t={t}
//         categoryMetaTitle={categoryMetaTitle}
//         categoryMetaDescription={categoryMetaDescription}
//         categoryPageTitle={categoryPageTitle}
//         categoryPageDescription={categoryPageDescription}
//         categoryId={selectedCategoryObj?.id || null}
//       />

//       <Footer
//         categoryData={categoryData}
//         eventsData={eventsData}
//         brandsData={brandsData}
//         contact={contact}
//       />
//     </>
//   );
// }








// ! Bukod isleyir amma search support etmir

// File: app/products/page.js
// "use client";

// import React from "react";
// import { cookies } from "next/headers";
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/lib/axios";

// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import ProductsPageFilter from "@/components/ProductsPageFilter";
// import Footer from "@/components/Footer/Footer";

// // --- Yeni: search_text ile ürünleri çeken fonksiyon ---
// async function fetchProductsBySearch(searchText, perPage = 12) {
//   try {
//     const { data } = await axiosInstance.get(
//       `/page-data/product?per_page=${perPage}&search_text=${encodeURIComponent(searchText)}`,
//       { cache: "no-store" }
//     );
//     return data.data.data;
//   } catch (err) {
//     console.error("Search fetch error (server)", err);
//     return [];
//   }
// }

// // Varolan: tüm ürünleri çeken fonksiyon (unfiltered)
// async function fetchAboutPageData() {
//   try {
//     const { data: product } = await axiosInstance.get("/page-data/product?per_page=999999", {
//       cache: "no-store",
//     });
//     return product.data.data;
//   } catch (error) {
//     console.error("Failed to fetch product page data", error);
//     return [];
//   }
// }

// // Varolan: kategori/marka filtre fonksiyonu
// async function fetchProductsByFilters(categoryIds = [], brandIds = []) {
//   const filters = [];
//   if (categoryIds.length) {
//     filters.push({ key: "categories", operator: "IN", values: categoryIds });
//   }
//   if (brandIds.length) {
//     filters.push({ key: "brands", operator: "IN", values: brandIds });
//   }
//   if (!filters.length) {
//     return await fetchAboutPageData();
//   }
//   const query = filters
//     .map((f, idx) => {
//       const base = `filters[${idx}][key]=${encodeURIComponent(f.key)}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//       const vals = f.values
//         .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//         .join("&");
//       return `${base}&${vals}`;
//     })
//     .join("&");
//   try {
//     const res = await axiosInstance.get(`/page-data/product?per_page=999999&${query}`, {
//       cache: "no-store",
//     });
//     return res.data.data.data;
//   } catch (err) {
//     console.error("Filter fetch error (server)", err);
//     return [];
//   }
// }

// // Diğer page-data fetch fonksiyonlarınız...
// async function fetchContactPageData() { /* ... */ }
// async function fetchSettingsPageData() { /* ... */ }
// async function getTranslations() { /* ... */ }
// async function fetchBrandFilterPageData() { /* ... */ }
// async function fetchCategoryPageData() { /* ... */ }
// async function fetchBrandsPageData() { /* ... */ }
// async function fetchEventsPageData() { /* ... */ }
// async function fetchProductsSeoData() { /* ... */ }

// export async function generateMetadata({ searchParams }) {
//   // Meta üretimi aynen kalabilir
//   /* ... mevcut generateMetadata içeriği ... */
// }

// export default async function page({ searchParams }) {
//   const categoryParam = searchParams.category || null;
//   const brandsParamRaw = searchParams.brands || null;
//   const searchTextParam = searchParams.search_text || null;

//   // — Global veriler —
//   const productData = await fetchAboutPageData();
//   const brandsDataFilter = await fetchBrandFilterPageData();
//   const categoryData = await fetchCategoryPageData();
//   const contact = await fetchContactPageData();
//   const settingData = (await fetchSettingsPageData())?.data || [];
//   const eventsData = (await fetchEventsPageData()).data?.data || [];
//   const translations = (await getTranslations())?.data;
//   const t = translations || {};

//   // — Seçili kategori/marka objeleri —
//   let selectedCategoryObj = null;
//   if (categoryParam) {
//     const slugs = categoryParam.split(",");
//     const lastSlug = slugs[slugs.length - 1];
//     selectedCategoryObj = categoryData.find((c) => c.url_slug === lastSlug) || null;
//   }
//   const brandIds = brandsParamRaw
//     ? brandsParamRaw.split(",").map((s) => parseInt(s, 10)).filter(Boolean)
//     : [];

//   // — Ürünleri getirme önceliği: search_text > filters > tüm ürünler —
//   let initialProducts = [];
//   if (searchTextParam) {
//     initialProducts = await fetchProductsBySearch(searchTextParam, 12);
//   } else if (categoryParam || brandIds.length) {
//     const catIds = selectedCategoryObj ? [selectedCategoryObj.id] : [];
//     initialProducts = await fetchProductsByFilters(catIds, brandIds);
//   } else {
//     initialProducts = productData;
//   }

//   // — Seçili filtre listeleri —
//   const initialSelectedBrands = brandsDataFilter.filter((b) => brandIds.includes(b.id));
//   const initialSelectedCategories = categoryParam
//     ? categoryParam
//         .split(",")
//         .map((slug) => categoryData.find((c) => c.url_slug === slug))
//         .filter(Boolean)
//     : [];

//   // — Alt kategoriler (mevcut) —
//   let subcategoriesForSelected = [];
//   if (selectedCategoryObj) {
//     const selId = Number(selectedCategoryObj.id);
//     subcategoriesForSelected = categoryData.filter((c) => {
//       if (!c.parent_id) return false;
//       const pidArr = Array.isArray(c.parent_id)
//         ? c.parent_id.map((p) => Number(p.id))
//         : [Number(c.parent_id.id || c.parent_id)];
//       return pidArr.includes(selId);
//     });
//   }

//   return (
//     <>
//       <Header settingData={settingData} categoryData={categoryData} />

//       <ProductsPageHero
//         t={t}
//         productData={productData}
//         selectedCategory={selectedCategoryObj}
//         subcategories={subcategoriesForSelected}
//       />

//       <ProductsPageFilter
//         allProducts={productData}
//         initialProducts={initialProducts}
//         categoryData={categoryData}
//         brandsDataFilter={brandsDataFilter}
//         initialSelectedBrands={initialSelectedBrands}
//         initialSelectedCategories={initialSelectedCategories}
//         t={t}
//         categoryMetaTitle={selectedCategoryObj?.meta_title || null}
//         categoryMetaDescription={selectedCategoryObj?.meta_description || null}
//         categoryPageTitle={selectedCategoryObj?.page_title || null}
//         categoryPageDescription={selectedCategoryObj?.page_description || null}
//         categoryId={selectedCategoryObj?.id || null}
//       />

//       <Footer
//         categoryData={categoryData}
//         eventsData={eventsData}
//         brandsData={brandsData}
//         contact={contact}
//       />
//     </>
//   );
// }
// ! Bukod isleyir amma search support etmir







// File: app/products/page.js
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

import Header from "@/components/Header/Header";
import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
import ProductsPageFilter from "@/components/ProductsPageFilter";
import Footer from "@/components/Footer/Footer";

// Fetch products with search support
async function fetchProductsWithSearch(searchText = "", per_page = 999999) {
  try {
    let url = `/page-data/product?per_page=${per_page}`;
    if (searchText) {
      url += `&search_text=${encodeURIComponent(searchText)}`;
    }
    
    const { data: product } = await axiosInstance.get(url, {
      cache: "no-store",
    });
    return product.data.data;
  } catch (error) {
    console.error("Failed to fetch product page data", error);
    return [];
  }
}

// Fetch all products (unfiltered) - keeping original function for compatibility
async function fetchAboutPageData() {
  try {
    const { data: product } = await axiosInstance.get("/page-data/product?per_page=999999", {
      cache: "no-store",
    });
    return product.data.data;
  } catch (error) {
    console.error("Failed to fetch product page data", error);
    return [];
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

async function fetchSettingsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  try {
    const { data: setting } = await axiosInstance.get(`/page-data/setting`, {
      cache: "no-store",
    });
    return setting;
  } catch (error) {
    console.error("Failed to fetch setting page data", error);
    throw error;
  }
}

async function getTranslations() {
  try {
    return await axiosInstance.get("/translation-list");
  } catch (err) {
    console.log("Translation fetch error:", err);
    return null;
  }
}

async function fetchBrandFilterPageData() {
  try {
    const { data: brands } = await axiosInstance.get("/page-data/brands?per_page=999", {
      cache: "no-store",
    });
    return brands.data.data;
  } catch (error) {
    console.error("Failed to fetch brands page data", error);
    return [];
  }
}

async function fetchCategoryPageData() {
  try {
    const { data: category } = await axiosInstance.get("/page-data/categories?per_page=999", {
      cache: "no-store",
    });
    return category.data.data;
  } catch (error) {
    console.error("Failed to fetch category page data", error);
    return [];
  }
}

async function fetchBrandsPageData() {
  try {
    const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
      cache: "no-store",
    });
    return brands;
  } catch (error) {
    console.error("Failed to fetch brands page data", error);
    throw error;
  }
}

async function fetchEventsPageData() {
  try {
    const { data: events } = await axiosInstance.get(`/page-data/event?per_page=999`, {
      cache: "no-store",
    });
    return events;
  } catch (error) {
    console.error("Failed to fetch events page data", error);
    throw error;
  }
}

async function fetchProductsSeoData() {
  try {
    const { data: aboutSeo } = await axiosInstance.get(`/page-data/product-page-info`, {
      cache: "no-store",
    });
    return aboutSeo;
  } catch (error) {
    console.error("Failed to fetch products SEO data", error);
    throw error;
  }
}

async function fetchProductsByFilters(categoryIds = [], brandIds = [], searchText = "") {
  const filters = [];
  if (categoryIds.length) {
    filters.push({ key: "categories", operator: "IN", values: categoryIds });
  }
  if (brandIds.length) {
    filters.push({ key: "brands", operator: "IN", values: brandIds });
  }
  
  let url = `/page-data/product?per_page=999999`;
  
  // Add search parameter if provided
  if (searchText) {
    url += `&search_text=${encodeURIComponent(searchText)}`;
  }
  
  // Add filters if any
  if (filters.length) {
    const query = filters
      .map((f, idx) => {
        const base = `filters[${idx}][key]=${encodeURIComponent(f.key)}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
        const vals = f.values
          .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
          .join("&");
        return `${base}&${vals}`;
      })
      .join("&");
    url += `&${query}`;
  }
  
  try {
    const res = await axiosInstance.get(url, { cache: "no-store" });
    return res.data.data.data;
  } catch (err) {
    console.error("Filter fetch error (server)", err);
    return [];
  }
}

export async function generateMetadata({ searchParams }) {
  const globalSeo = await fetchProductsSeoData();
  let title = globalSeo.data.meta_title;
  let description = globalSeo.data.meta_description;
  let ogImage = globalSeo.data.og_image;
  let canonicalUrl = "https://adentta.az/products";

  const categoryParam = searchParams.category || null;
  const searchText = searchParams.search_text || null;
  
  if (categoryParam) {
    const allCategories = await fetchCategoryPageData();
    const slugs = categoryParam.split(",");
    const lastSlug = slugs[slugs.length - 1];
    const sel = allCategories.find((c) => c.url_slug === lastSlug);
    if (sel?.meta_title && sel?.meta_description) {
      title = sel.meta_title;
      description = sel.meta_description;
      canonicalUrl = `https://adentta.az/products?category=${encodeURIComponent(categoryParam)}`;
    }
  }
  
  // Update canonical URL if search is present
  if (searchText) {
    const params = new URLSearchParams();
    if (categoryParam) params.set('category', categoryParam);
    if (searchParams.brands) params.set('brands', searchParams.brands);
    if (searchParams.per_page) params.set('per_page', searchParams.per_page);
    params.set('search_text', searchText);
    canonicalUrl = `https://adentta.az/products?${params.toString()}`;
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: ogImage
        ? [
            {
              url: `https://admin.adentta.az/storage${ogImage}`,
              alt: title,
              width: 1200,
              height: 630,
            },
          ]
        : [],
      site_name: "adentta.az",
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@adentta",
      site: "@adentta",
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function page({ searchParams }) {
  const categoryParam = searchParams.category || null;
  const brandsParamRaw = searchParams.brands || null;
  const searchText = searchParams.search_text || null;
  const perPage = searchParams.per_page || 999999;

  // Fetch all products for filter data (unfiltered)
  const productData = await fetchAboutPageData();
  const brandsDataFilter = await fetchBrandFilterPageData();
  const categoryData = await fetchCategoryPageData();

  let selectedCategoryObj = null;
  if (categoryParam) {
    const categorySlugs = categoryParam.split(",");
    const lastSlug = categorySlugs[categorySlugs.length - 1];
    selectedCategoryObj = categoryData.find((c) => c.url_slug === lastSlug) || null;
  }

  const brandIds = brandsParamRaw
    ? brandsParamRaw.split(",").map((s) => parseInt(s, 10)).filter(Boolean)
    : [];

  // Fetch filtered products including search
  const initialProducts = await fetchProductsByFilters(
    selectedCategoryObj ? [selectedCategoryObj.id] : [],
    brandIds,
    searchText
  );

  const initialSelectedBrands = brandsDataFilter.filter((b) =>
    brandIds.includes(b.id)
  );
  const initialSelectedCategories = categoryParam
    ? categoryParam
        .split(",")
        .map((slug) => categoryData.find((c) => c.url_slug === slug))
        .filter(Boolean)
    : [];
  const contact = await fetchContactPageData();

  const categoryMetaTitle = selectedCategoryObj?.meta_title || null;
  const categoryMetaDescription = selectedCategoryObj?.meta_description || null;
  const categoryPageTitle = selectedCategoryObj?.page_title || null;
  const categoryPageDescription = selectedCategoryObj?.page_description || null;

  const translations = await getTranslations();
  const t = translations?.data;
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];
  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];

  let subcategoriesForSelected = [];
  if (selectedCategoryObj) {
    const selId =
      typeof selectedCategoryObj.id === "number"
        ? selectedCategoryObj.id
        : parseInt(selectedCategoryObj.id, 10);
    subcategoriesForSelected = categoryData.filter((c) => {
      if (!c.parent_id) return false;
      if (Array.isArray(c.parent_id)) {
        return c.parent_id.some((p) => {
          const pid = typeof p.id === "number" ? p.id : parseInt(p.id, 10);
          return pid === selId;
        });
      }
      if (typeof c.parent_id === "object" && c.parent_id.id != null) {
        const pid =
          typeof c.parent_id.id === "number"
            ? c.parent_id.id
            : parseInt(c.parent_id.id, 10);
        return pid === selId;
      }
      return c.parent_id === selId;
    });
  }

  return (
    <>
      <Header settingData={settingData} categoryData={categoryData} />

      <ProductsPageHero
        t={t}
        productData={productData}
        selectedCategory={selectedCategoryObj}
        subcategories={subcategoriesForSelected}
      />

      <ProductsPageFilter
        allProducts={productData}
        initialProducts={initialProducts}
        categoryData={categoryData}
        brandsDataFilter={brandsDataFilter}
        initialSelectedBrands={initialSelectedBrands}
        initialSelectedCategories={initialSelectedCategories}
        t={t}
        categoryMetaTitle={categoryMetaTitle}
        categoryMetaDescription={categoryMetaDescription}
        categoryPageTitle={categoryPageTitle}
        categoryPageDescription={categoryPageDescription}
        categoryId={selectedCategoryObj?.id || null}
        searchText={searchText}
        perPage={perPage}
      />

      <Footer
        categoryData={categoryData}
        eventsData={eventsData}
        brandsData={brandsData}
        contact={contact}
      />
    </>
  );
}






















































































// !BU kod isledi
// // File: app/products/page.js
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import ProductsPageFilter from "@/components/ProductsPageFilter";
// import Footer from "@/components/Footer/Footer";

// // Fetch all products (unfiltered)
// async function fetchAboutPageData() {
//   try {
//     const { data: product } = await axiosInstance.get("/page-data/product?per_page=999999", {
//       cache: "no-store",
//     });
//     return product.data.data;
//   } catch (error) {
//     console.error("Failed to fetch product page data", error);
//     return [];
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
//     console.error("Failed to fetch setting page data", error);
//     throw error;
//   }
// }

// async function getTranslations() {
//   try {
//     return await axiosInstance.get("/translation-list");
//   } catch (err) {
//     console.log("Translation fetch error:", err);
//     return null;
//   }
// }

// async function fetchBrandFilterPageData() {
//   try {
//     const { data: brands } = await axiosInstance.get("/page-data/brands?per_page=999", {
//       cache: "no-store",
//     });
//     return brands.data.data;
//   } catch (error) {
//     console.error("Failed to fetch brands page data", error);
//     return [];
//   }
// }

// async function fetchCategoryPageData() {
//   try {
//     const { data: category } = await axiosInstance.get("/page-data/categories?per_page=999", {
//       cache: "no-store",
//     });
//     return category.data.data;
//   } catch (error) {
//     console.error("Failed to fetch category page data", error);
//     return [];
//   }
// }

// async function fetchBrandsPageData() {
//   try {
//     const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
//       cache: "no-store",
//     });
//     return brands;
//   } catch (error) {
//     console.error("Failed to fetch brands page data", error);
//     throw error;
//   }
// }

// async function fetchEventsPageData() {
//   try {
//     const { data: events } = await axiosInstance.get(`/page-data/event?per_page=999`, {
//       cache: "no-store",
//     });
//     return events;
//   } catch (error) {
//     console.error("Failed to fetch events page data", error);
//     throw error;
//   }
// }

// async function fetchProductsSeoData() {
//   try {
//     const { data: aboutSeo } = await axiosInstance.get(`/page-data/product-page-info`, {
//       cache: "no-store",
//     });
//     return aboutSeo;
//   } catch (error) {
//     console.error("Failed to fetch products SEO data", error);
//     throw error;
//   }
// }

// async function fetchProductsByFilters(categoryIds = [], brandIds = []) {
//   const filters = [];
//   if (categoryIds.length) {
//     filters.push({ key: "categories", operator: "IN", values: categoryIds });
//   }
//   if (brandIds.length) {
//     filters.push({ key: "brands", operator: "IN", values: brandIds });
//   }
//   if (!filters.length) {
//     return await fetchAboutPageData();
//   }
//   const query = filters
//     .map((f, idx) => {
//       const base = `filters[${idx}][key]=${encodeURIComponent(f.key)}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//       const vals = f.values
//         .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//         .join("&");
//       return `${base}&${vals}`;
//     })
//     .join("&");
//   const url = `/page-data/product?per_page=999999&${query}`;
//   try {
//     const res = await axiosInstance.get(url, { cache: "no-store" });
//     return res.data.data.data;
//   } catch (err) {
//     console.error("Filter fetch error (server)", err);
//     return [];
//   }
// }

// export async function generateMetadata({ searchParams }) {
//   const globalSeo = await fetchProductsSeoData();
//   let title = globalSeo.data.meta_title;
//   let description = globalSeo.data.meta_description;
//   let ogImage = globalSeo.data.og_image;
//   let canonicalUrl = "https://adentta.az/products";

//   const categoryParam = searchParams.category || null;
//   if (categoryParam) {
//     const allCategories = await fetchCategoryPageData();
//     const slugs = categoryParam.split(",");
//     const lastSlug = slugs[slugs.length - 1];
//     const sel = allCategories.find((c) => c.url_slug === lastSlug);
//     if (sel?.meta_title && sel?.meta_description) {
//       title = sel.meta_title;
//       description = sel.meta_description;
//       canonicalUrl = `https://adentta.az/products?category=${encodeURIComponent(categoryParam)}`;
//     }
//   }

//   const cookieStore = await cookies();
//   const locale = cookieStore.get("NEXT_LOCALE")?.value;

//   return {
//     title,
//     description,
//     alternates: { canonical: canonicalUrl },
//     openGraph: {
//       title,
//       description,
//       url: canonicalUrl,
//       images: ogImage
//         ? [
//             {
//               url: `https://admin.adentta.az/storage${ogImage}`,
//               alt: title,
//               width: 1200,
//               height: 630,
//             },
//           ]
//         : [],
//       site_name: "adentta.az",
//       type: "website",
//       locale,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       creator: "@adentta",
//       site: "@adentta",
//       images: ogImage ? [ogImage] : [],
//     },
//   };
// }

// export default async function page({ searchParams }) {
//   const categoryParam = searchParams.category || null;
//   const brandsParamRaw = searchParams.brands || null;

//   const productData = await fetchAboutPageData();
//   const brandsDataFilter = await fetchBrandFilterPageData();
//   const categoryData = await fetchCategoryPageData();

//   let selectedCategoryObj = null;
//   if (categoryParam) {
//     const categorySlugs = categoryParam.split(",");
//     const lastSlug = categorySlugs[categorySlugs.length - 1];
//     selectedCategoryObj = categoryData.find((c) => c.url_slug === lastSlug) || null;
//   }

//   const brandIds = brandsParamRaw
//     ? brandsParamRaw.split(",").map((s) => parseInt(s, 10)).filter(Boolean)
//     : [];

//   const initialProducts = await fetchProductsByFilters(
//     selectedCategoryObj ? [selectedCategoryObj.id] : [],
//     brandIds
//   );

//   const initialSelectedBrands = brandsDataFilter.filter((b) =>
//     brandIds.includes(b.id)
//   );
//   const initialSelectedCategories = categoryParam
//     ? categoryParam
//         .split(",")
//         .map((slug) => categoryData.find((c) => c.url_slug === slug))
//         .filter(Boolean)
//     : [];

//   const categoryMetaTitle = selectedCategoryObj?.meta_title || null;
//   const categoryMetaDescription = selectedCategoryObj?.meta_description || null;
//   const categoryPageTitle = selectedCategoryObj?.page_title || null;
//   const categoryPageDescription = selectedCategoryObj?.page_description || null;

//   const translations = await getTranslations();
//   const t = translations?.data;
//   const brandsResponse = await fetchBrandsPageData();
//   const brandsData = brandsResponse?.data?.data || [];
//   const eventsResponse = await fetchEventsPageData();
//   const eventsData = eventsResponse?.data?.data || [];

//   const setting = await fetchSettingsPageData();
//   const settingData = setting?.data || [];

//   let subcategoriesForSelected = [];
//   if (selectedCategoryObj) {
//     const selId =
//       typeof selectedCategoryObj.id === "number"
//         ? selectedCategoryObj.id
//         : parseInt(selectedCategoryObj.id, 10);
//     subcategoriesForSelected = categoryData.filter((c) => {
//       if (!c.parent_id) return false;
//       if (Array.isArray(c.parent_id)) {
//         return c.parent_id.some((p) => {
//           const pid = typeof p.id === "number" ? p.id : parseInt(p.id, 10);
//           return pid === selId;
//         });
//       }
//       if (typeof c.parent_id === "object" && c.parent_id.id != null) {
//         const pid =
//           typeof c.parent_id.id === "number"
//             ? c.parent_id.id
//             : parseInt(c.parent_id.id, 10);
//         return pid === selId;
//       }
//       return c.parent_id === selId;
//     });
//   }

//   return (
//     <>
//       <Header settingData={settingData} categoryData={categoryData} />

//       <ProductsPageHero
//         t={t}
//         productData={productData}
//         selectedCategory={selectedCategoryObj}
//         subcategories={subcategoriesForSelected}
//       />

//       <ProductsPageFilter
//         allProducts={productData}
//         initialProducts={initialProducts}
//         categoryData={categoryData}
//         brandsDataFilter={brandsDataFilter}
//         initialSelectedBrands={initialSelectedBrands}
//         initialSelectedCategories={initialSelectedCategories}
//         t={t}
//         categoryMetaTitle={categoryMetaTitle}
//         categoryMetaDescription={categoryMetaDescription}
//         categoryPageTitle={categoryPageTitle}
//         categoryPageDescription={categoryPageDescription}
//         categoryId={selectedCategoryObj?.id || null}
//       />

//       <Footer
//         categoryData={categoryData}
//         eventsData={eventsData}
//         brandsData={brandsData}
//       />
//     </>
//   );
// }


